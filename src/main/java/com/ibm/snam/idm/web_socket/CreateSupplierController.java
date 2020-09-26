package com.ibm.snam.idm.web_socket;

import com.ibm.snam.idm.common.Constants;
import com.ibm.snam.idm.microservices.AnalyzerMicroservice;
import com.ibm.snam.idm.microservices.BackendMicroservice;
import com.ibm.snam.idm.model.UserNotification;
import com.ibm.snam.idm.service.UserNotificationService;
import com.ibm.snam.idm.util.Base64DecodedMultipartFile;
import com.ibm.snam.idm.util.RarHandler;
import com.ibm.snam.idm.util.SevenZipHandler;
import com.ibm.snam.idm.util.ZipHandler;
import com.ibm.snam.idm.web_socket.upload.UploadFileService;
import com.ibm.snam.idm.web_socket.upload.UploadResult;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.io.FilenameUtils;
import org.apache.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Base64;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Controller
public class CreateSupplierController {

    Logger logger = LoggerFactory.getLogger(CreateSupplierController.class);

    @Autowired
    AnalyzerMicroservice analyzerMicroservice;

    @Autowired
    BackendMicroservice backendMicroservice;

    @Autowired
    UploadFileService uploadFileService;

    @Autowired
    UserNotificationService userNotificationService;

    @MessageMapping("/createSupplier")
    @SendToUser("/queue/reply/supplier")
    public String createSupplier(@Payload  JSONObject supplier){
        logger.info("createSupplier -- INIT --");
        JSONObject response = new JSONObject();
        List<Future<UploadResult>> uploadResults = new ArrayList<>();
        try{
            JSONArray files = supplier.getJSONArray("files");
            supplier.remove("files");
            JSONObject supplierCreationResponse = backendMicroservice.saveObjectOnDb(supplier, "/supplier/createSupplier");
            if(supplierCreationResponse.getInt("status") == HttpStatus.SC_INTERNAL_SERVER_ERROR){
                return supplierCreationResponse.toString();
            }
            JSONObject savedSupplier = supplierCreationResponse.getJSONObject("supplier");
            supplier.put("idSupplier", savedSupplier.getString("id"));
            supplier.put("idTender", supplier.getString("idTender"));
            List<String> failedDocuments = new ArrayList<>();
            for(int i = 0 ; i < files.size() ; i++){
                JSONObject file = files.getJSONObject(i);
                String base64File = file.getString("file");
                String fileName = file.getString("fileName");
                ArrayList<MultipartFile> zipFilesArrayList;
                /*
                 * Codice per la gestione di file compressi
                 */
                // Tratta il caso in cui l'elemento i-esimo sia uno .zip 
                if(FilenameUtils.getExtension(fileName).equals("zip")) {
                	// Estrae i documenti dallo .zip e li invia a Watson per l'analisi 
                	zipFilesArrayList = ZipHandler.unzipToMultipartArray(base64File);
                	 for(MultipartFile fileInZip : zipFilesArrayList) {
                	     logger.info("Uploading document (zip): " + fileInZip.getOriginalFilename());
                         Future<UploadResult> uploadResult = uploadFileService.uploadSupplierFile(fileInZip, fileName, supplier);
                         uploadResults.add(uploadResult);
                	 }
                }
                // Tratta il caso SevenZip
                else if(FilenameUtils.getExtension(fileName).equals("7z")) {
                	zipFilesArrayList = SevenZipHandler.unzipToMultipartArray(base64File);
               	    for(MultipartFile fileInZip : zipFilesArrayList) {
               	        logger.info("Uploading document (7z): " + fileInZip.getOriginalFilename());
                        Future<UploadResult> uploadResult = uploadFileService.uploadSupplierFile(fileInZip, fileName, supplier);
                        uploadResults.add(uploadResult);
               	    }
                }
                // Caso .rar: supportate tutte le versioni sino alla RAR4
                else if(FilenameUtils.getExtension(fileName).equals("rar")) {
                	zipFilesArrayList = RarHandler.unzipToMultipartArray(base64File);
               	    for(MultipartFile fileInZip : zipFilesArrayList) {
               	        logger.info("Uploading document (rar): " + fileInZip.getOriginalFilename());
                        Future<UploadResult> uploadResult = uploadFileService.uploadSupplierFile(fileInZip, fileName, supplier);
                        uploadResults.add(uploadResult);
               	    }
                }
                // Caso file non zippati 
                else {   
                    file = files.getJSONObject(i);
                    base64File = file.getString("file");
                    fileName = file.getString("fileName");
                    logger.info("Uploading document: " + fileName);
                    byte [] data = Base64.getDecoder().decode(base64File);
                    MultipartFile document = new Base64DecodedMultipartFile(data, fileName);
                    Future<UploadResult> uploadResult = uploadFileService.uploadSupplierFile(document, fileName, supplier);
                    uploadResults.add(uploadResult);
                }
            }
            for (Future<UploadResult> uploadResultFuture: uploadResults) {
                UploadResult uploadResult = null;
                try {
                    uploadResult = uploadResultFuture.get();
                    logger.info("uploadResult " + uploadResult);
                } catch (InterruptedException | ExecutionException e) {
                    logger.error(e.getMessage());
                }
                if (uploadResult.isFailed()){
                    failedDocuments.add(uploadResult.getFilename());
                }
            }
            savedSupplier.put("idTender", supplier.getString("idTender"));
            response.put("supplier", savedSupplier);
            if (failedDocuments.isEmpty()){
                response.put("status", Constants.HTTP_STATUS_OK);
                response.put("message", Constants.CREATE_SUPPLIER_OK);
                response.put("creationStatus", Constants.SUPPLIER_CREATED);
            } else {
                response.put("status", Constants.HTTP_STATUS_OK);
                String message = Constants.ERROR_CREATING_SUPPLIER + ": " + String.join(", ", failedDocuments);
                response.put("message", message);
                response.put("creationStatus", Constants.SUPPLIER_CREATED_WITH_FILE_ERROR);
            }
            createNotificationForSupplier(response.getJSONObject("supplier"), "supplierCreation", response.getString("creationStatus"), supplier.getString("userId"));
            return response.toString();
        }catch (Exception e){
            logger.error(e.getMessage());
            response.put("status", Constants.HTTP_STATUS_ERROR);
            response.put("message", Constants.ERROR_CREATING_SUPPLIER);
            createNotificationForSupplier(null, "supplierCreation", response.getString("creationStatus"), supplier.getString("userId"));
            return response.toString();
        }
    }

    private void createNotificationForSupplier(JSONObject supplier, String notificationType, String statusCreation, String userId){
        logger.info("createNotificationForSupplier -- INIT -- user : " + userId);
        JSONObject notification = new JSONObject();
        notification.put("userId", userId);
        notification.put("notificationType", notificationType);
        notification.put("status", statusCreation);
        if(supplier != null){
            notification.put("tenderNumber", supplier.getString("tenderSapNumber"));
            notification.put("idSupplier", supplier.getString("id"));
            notification.put("supplierName", supplier.getString("name"));
            notification.put("idTender", supplier.getString("idTender"));
        }
        UserNotification userNotification = userNotificationService.createNotification(notification);
        logger.info("created notification : " + userNotification);
        logger.info("createNotificationForSupplier -- END -- ");
    }

}
