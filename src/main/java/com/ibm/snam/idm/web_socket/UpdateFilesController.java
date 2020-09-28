package com.ibm.snam.idm.web_socket;

import com.ibm.snam.idm.common.Constants;
import com.ibm.snam.idm.microservices.AnalyzerMicroservice;
import com.ibm.snam.idm.microservices.BackendMicroservice;
import com.ibm.snam.idm.model.UserNotification;
import com.ibm.snam.idm.service.UserNotificationService;
import com.ibm.snam.idm.util.Base64DecodedMultipartFile;
import com.ibm.snam.idm.util.ZipHandler;
import com.ibm.snam.idm.util.RarHandler;
import com.ibm.snam.idm.util.SevenZipHandler;

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
import java.util.concurrent.Future;

@Controller
public class UpdateFilesController {

    Logger logger = LoggerFactory.getLogger(UpdateFilesController.class);

    @Autowired
    UploadFileService uploadFileService;

    @Autowired
    UserNotificationService userNotificationService;

    @MessageMapping("/updateFiles")
    @SendToUser("/queue/reply/updateFiles")
    public String updateFiles(@Payload  JSONObject updateFiles){
        JSONObject response = new JSONObject();
        try{
            JSONArray files = updateFiles.getJSONArray("files");
            updateFiles.remove("files");
            List<Future<UploadResult>> uploadResults = new ArrayList<>();
            List<String> failedDocuments = new ArrayList<>();
            String updated = "supplier";
            for(int i = 0 ; i < files.size() ; i++){
                JSONObject file = files.getJSONObject(i);
                String base64File = file.getString("file");
                String fileName = file.getString("fileName");
                ArrayList<MultipartFile> zipFilesArrayList;
            	ArrayList<JSONObject> responsesFromAnalyzerZip = new ArrayList<>();
                /*
                 * Codice per la gestione di file compressi
                 */
                // Tratta il caso in cui l'elemento i-esimo sia uno .zip 
                if(FilenameUtils.getExtension(fileName).equals("zip")) {
                	// Estrae i documenti dallo .zip e li invia a Watson per l'analisi 
                	zipFilesArrayList = ZipHandler.unzipToMultipartArray(base64File);
                	 for(MultipartFile fileInZip : zipFilesArrayList) {
                	     logger.info("Uploading document (zip): " + fileInZip.getOriginalFilename());
                         Future<UploadResult> uploadResult;
                         if (updateFiles.has("idSupplier")) {
                             uploadResult = uploadFileService.uploadSupplierFile(fileInZip, fileName, updateFiles);
                         } else {
                             uploadResult = uploadFileService.uploadTenderFile(fileInZip, fileName, updateFiles);
                         }
                         uploadResults.add(uploadResult);
                	 }
                }
                // Tratta il caso SevenZip
                else if(FilenameUtils.getExtension(fileName).equals("7z")) {
                	zipFilesArrayList = SevenZipHandler.unzipToMultipartArray(base64File);
               	    for(MultipartFile fileInZip : zipFilesArrayList) {
               	        logger.info("Uploading document (7z): " + fileInZip.getOriginalFilename());
                        Future<UploadResult> uploadResult;
                        if (updateFiles.has("idSupplier")) {
                            uploadResult = uploadFileService.uploadSupplierFile(fileInZip, fileName, updateFiles);
                        } else {
                            uploadResult = uploadFileService.uploadTenderFile(fileInZip, fileName, updateFiles);
                        }
                        uploadResults.add(uploadResult);
               	    }
                }
                // Caso .rar: supportate tutte le versioni sino alla RAR4
                else if(FilenameUtils.getExtension(fileName).equals("rar")) {
                	zipFilesArrayList = RarHandler.unzipToMultipartArray(base64File);
               	    for(MultipartFile fileInZip : zipFilesArrayList) {
               	        logger.info("Uploading document (rar): " + fileInZip.getOriginalFilename());
                        Future<UploadResult> uploadResult;
                        if (updateFiles.has("idSupplier")) {
                            uploadResult = uploadFileService.uploadSupplierFile(fileInZip, fileName, updateFiles);
                        } else {
                            uploadResult = uploadFileService.uploadTenderFile(fileInZip, fileName, updateFiles);
                        }
                        uploadResults.add(uploadResult);
               	    }
                }
                // Gestisce il caso tradizionale in cui i file non sono zippati 
                else {
                    file = files.getJSONObject(i);
                    base64File = file.getString("file");
                    fileName = file.getString("fileName");
                    logger.info("Uploading document: " + fileName);
                    byte [] data = Base64.getDecoder().decode(base64File);
                    MultipartFile document = new Base64DecodedMultipartFile(data, fileName);
                    Future<UploadResult> uploadResult;
                    if (updateFiles.has("idSupplier")) {
                        uploadResult = uploadFileService.uploadSupplierFile(document, fileName, updateFiles);
                    } else {
                        uploadResult = uploadFileService.uploadTenderFile(document, fileName, updateFiles);
                    }
                    uploadResults.add(uploadResult);
                }
            }

            for (Future<UploadResult> uploadResultFuture: uploadResults) {
                UploadResult uploadResult = null;
                try {
                    uploadResult = uploadResultFuture.get();
                    if (uploadResult.isFailed()){
                        failedDocuments.add(uploadResult.getFilename());
                    }
                } catch (InterruptedException | ExecutionException e) {
                    logger.error(e.getMessage());
                    e.printStackTrace();
                }
            }
            fillResponse(response, updated, updateFiles, failedDocuments);
            createNotificationForUploadFile(response, "uploadFileSupplier", response.getString("creationStatus"), updateFiles.getString("userId"));
            return response.toString();
        }catch (Exception e){
            logger.error(e.getMessage());
            e.printStackTrace();
            response.put("status", Constants.HTTP_STATUS_ERROR);
            response.put("message", Constants.ERROR_CALLING_BACKEND);
            response.put("creationStatus", Constants.FILE_NOT_UPDATED);
            createNotificationForUploadFile(null, "uploadFileSupplier", response.getString("creationStatus"), updateFiles.getString("userId"));
            return response.toString();
        }
    }

    private void createNotificationForUploadFile(JSONObject response, String notificationType, String creationStatus, String userId){
        logger.info("createNotificationForUploadFile -- INIT -- : " + userId);
        JSONObject notification = new JSONObject();
        notification.put("userId", userId);
        notification.put("notificationType", notificationType);
        notification.put("status", creationStatus);
        if(response != null){
            notification.put("idTender", response.getString("idTender"));
            notification.put("idSupplier", response.getString("idSupplier"));
            notification.put("tenderNumber", response.getString("sapNumber"));
            notification.put("supplierName", response.getString("supplierName"));
        }
        UserNotification userNotification = userNotificationService.createNotification(notification);
        logger.info("Created notification : " + userNotification);
        logger.info("createNotificationForUploadFile -- END -- : ");
    }

    private void fillResponse(JSONObject response, String updated, JSONObject updateFiles, List<String> failedDocuments) {
        response.put("updated", updated);
        response.put("idTender", updateFiles.getString("idTender"));
        response.put("creationStatus", Constants.FILE_UPDATED);
        if(updated.equals("supplier")){
            response.put("sapNumber", updateFiles.getString("tenderNumber"));
            response.put("idSupplier", updateFiles.getString("idSupplier"));
            response.put("supplierName", updateFiles.getString("supplierName"));
        }
        else{
            response.put("sapNumber", updateFiles.getString("sapNumber"));
        }
        if (failedDocuments.isEmpty()){
            response.put("status", Constants.HTTP_STATUS_OK);
            response.put("message", Constants.UPLOAD_DOCUMENTS_OK);
        } else {
            response.put("status", Constants.HTTP_STATUS_ERROR);
            String message = Constants.UPLOAD_DOCUMENTS_ERROR + ": " + String.join(", ", failedDocuments);
            response.put("message", message);
        }
    }

}
