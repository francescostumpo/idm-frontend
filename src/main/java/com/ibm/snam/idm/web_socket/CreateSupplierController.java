package com.ibm.snam.idm.web_socket;

import com.ibm.snam.idm.common.Constants;
import com.ibm.snam.idm.microservices.AnalyzerMicroservice;
import com.ibm.snam.idm.microservices.BackendMicroservice;
import com.ibm.snam.idm.util.Base64DecodedMultipartFile;
import com.ibm.snam.idm.util.ZipHandler;
import com.ibm.snam.idm.web_socket.upload.UploadFileService;
import com.ibm.snam.idm.web_socket.upload.UploadResult;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.io.FilenameUtils;
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
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Controller
public class CreateSupplierController {

    Logger logger = LoggerFactory.getLogger(CreateSupplierController.class);

    @Autowired
    BackendMicroservice backendMicroservice;

    @Autowired
    UploadFileService uploadFileService;

    @MessageMapping("/createSupplier")
    @SendToUser("/queue/reply/supplier")
    public String createSupplier(@Payload  JSONObject supplier){
        JSONObject response = new JSONObject();
        List<Future<UploadResult>> uploadResults = new ArrayList<>();
        try{
            JSONArray files = supplier.getJSONArray("files");
            supplier.remove("files");
            JSONObject supplierCreationResponse = backendMicroservice.saveObjectOnDb(supplier, "/supplier/createSupplier");
            JSONObject savedSupplier = supplierCreationResponse.getJSONObject("supplier");
            supplier.put("idSupplier", savedSupplier.getString("id"));
            List<String> failedDocuments = new ArrayList<>();
            for(int i = 0 ; i < files.size() ; i++){
                JSONObject file = files.getJSONObject(i);
                String base64File = file.getString("file");
                String fileName = file.getString("fileName"); 
                
                
                // Tratta il caso in cui l'elemento i-esimo sia uno .zip 
                if(FilenameUtils.getExtension(fileName).equals("zip")) {
                   
                	// Estrae i documenti dallo .zip e li invia a Watson per l'analisi 
                	ArrayList<MultipartFile> zipFilesArrayList = ZipHandler.unzipToMultipartArray(base64File);
                	for(MultipartFile fileInZip : zipFilesArrayList) {
                		logger.info("Uploading document: " + fileInZip.getOriginalFilename());
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

            if (failedDocuments.isEmpty()){
                response.put("status", Constants.HTTP_STATUS_OK);
                response.put("message", Constants.CREATE_SUPPLIER_OK);
            } else {
                response.put("status", Constants.HTTP_STATUS_ERROR);
                String message = Constants.ERROR_CREATING_SUPPLIER + ": " + String.join(", ", failedDocuments);
                response.put("message", message);
            }
            return response.toString();

        }catch (Exception e){
            logger.error(e.getMessage());
            response.put("status", Constants.HTTP_STATUS_ERROR);
            response.put("message", Constants.ERROR_CREATING_SUPPLIER);
            return response.toString();
        }
    }
}
