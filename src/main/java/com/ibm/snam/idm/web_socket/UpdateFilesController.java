package com.ibm.snam.idm.web_socket;

import com.ibm.snam.idm.common.Constants;
import com.ibm.snam.idm.microservices.AnalyzerMicroservice;
import com.ibm.snam.idm.microservices.BackendMicroservice;
import com.ibm.snam.idm.util.Base64DecodedMultipartFile;
import com.ibm.snam.idm.util.ZipHandler;

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

@Controller
public class UpdateFilesController {

    Logger logger = LoggerFactory.getLogger(UpdateFilesController.class);

    @Autowired
    AnalyzerMicroservice analyzerMicroservice;

    @Autowired
    BackendMicroservice backendMicroservice;

    @MessageMapping("/updateFiles")
    @SendToUser("/queue/reply/updateFiles")
    public String updateFiles(@Payload  JSONObject updateFiles){
        JSONObject response = new JSONObject();
        try{
            JSONArray files = updateFiles.getJSONArray("files");
            updateFiles.remove("files");
            List<String> failedDocuments = new ArrayList<>();
            for(int i = 0 ; i < files.size() ; i++){
                List<JSONObject> attachmentsId = new LinkedList<>();
                JSONObject responseFromAnalyzer = new JSONObject();
                JSONObject file = files.getJSONObject(i);
                String base64File = file.getString("file");
                String fileName = file.getString("fileName");
                // Tratta il caso in cui l'elemento i-esimo sia uno .zip 
                if(FilenameUtils.getExtension(fileName).equals("zip")) {
                	// Estrae i documenti dallo .zip e li invia a Watson per l'analisi 
                	ArrayList<MultipartFile> zipFilesArrayList = ZipHandler.unzipToMultipartArray(base64File); 
                	ArrayList<JSONObject> responsesFromAnalyzerZip = new ArrayList<JSONObject>(); 
                	for(MultipartFile fileInZip : zipFilesArrayList) {
                		logger.info("Uploading document: " + fileInZip.getOriginalFilename()); 
                        responseFromAnalyzer = analyzerMicroservice.analyzeFile(fileInZip); 
                        responsesFromAnalyzerZip.add(responseFromAnalyzer); 
                        
                        JSONObject attachmentId = new JSONObject(); 
                    	attachmentId.put("idAttachment", responseFromAnalyzer.getString("idAttachment")); 
                    	attachmentId.put("fileName", fileInZip.getOriginalFilename()); 
                    	attachmentsId.add(attachmentId);
                        uploadAttachmentsForSupplierOrTender(updateFiles, failedDocuments, attachmentsId, responseFromAnalyzer, fileName);
                	}
                }
                // Gestisce il caso tradizionale in cui i file non sono zippati 
                else {
                    file = files.getJSONObject(i);
                    base64File = file.getString("file");
                    fileName = file.getString("fileName");
                    byte [] data = Base64.getDecoder().decode(base64File);
                    MultipartFile document = new Base64DecodedMultipartFile(data, fileName);
                    JSONObject attachmentId = new JSONObject();
                    responseFromAnalyzer = analyzerMicroservice.analyzeFile(document);
                    attachmentId.put("idAttachment", responseFromAnalyzer.getString("idAttachment"));
                    attachmentId.put("fileName", fileName);
                    attachmentsId.add(attachmentId);
                    uploadAttachmentsForSupplierOrTender(updateFiles, failedDocuments, attachmentsId, responseFromAnalyzer, fileName);
                }


            }

            if (failedDocuments.isEmpty()){
                response.put("status", Constants.HTTP_STATUS_OK);
                response.put("message", Constants.UPLOAD_DOCUMENTS_OK);
            } else {
                response.put("status", Constants.HTTP_STATUS_ERROR);
                String message = Constants.UPLOAD_DOCUMENTS_ERROR + ": " + String.join(", ", failedDocuments);
                response.put("message", message);
            }
            return response.toString();
        }catch (Exception e){
            logger.error(e.getMessage());
            response.put("status", Constants.HTTP_STATUS_ERROR);
            response.put("message", Constants.ERROR_CALLING_BACKEND);
            return response.toString();
        }
    }

    private void uploadAttachmentsForSupplierOrTender(@Payload JSONObject updateFiles, List<String> failedDocuments, List<JSONObject> attachmentsId, JSONObject responseFromAnalyzer, String fileName) {
        updateFiles.put("attachmentsId", attachmentsId);
        updateFiles.put("responseFromAnalyzer", responseFromAnalyzer);
        JSONObject responseFromBackend = null;
        if(updateFiles.has("idSupplier")){
            logger.info("Response from analyzer : " + responseFromAnalyzer);
            responseFromBackend = backendMicroservice.saveObjectOnDb(updateFiles, "/attachment/uploadAttachmentsForSupplier");
            responseFromBackend.put("updated", "supplier");
            responseFromBackend.put("idSupplier", updateFiles.getString("idSupplier"));
            responseFromBackend.put("tenderNumber", updateFiles.getString("tenderNumber"));
        }
        else{
            responseFromBackend = backendMicroservice.saveObjectOnDb(updateFiles, "/attachment/uploadAttachmentsForTender");
            responseFromBackend.put("updated", "tender");
        }
        responseFromBackend.put("cig", updateFiles.getString("cig"));
        responseFromBackend.put("idTender", updateFiles.getString("idTender"));
        logger.info("Response from backend : " + responseFromBackend);
        if (!responseFromBackend.get("status").equals(HttpStatus.SC_OK)){
            failedDocuments.add(fileName);
        }
    }
}
