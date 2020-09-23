package com.ibm.snam.idm.web_socket;

import com.ibm.snam.idm.common.Constants;
import com.ibm.snam.idm.microservices.AnalyzerMicroservice;
import com.ibm.snam.idm.microservices.BackendMicroservice;
import com.ibm.snam.idm.util.Base64DecodedMultipartFile;
import com.ibm.snam.idm.util.RarHandler;
import com.ibm.snam.idm.util.SevenZipHandler;
import com.ibm.snam.idm.util.ZipHandler;

import net.sf.json.JSON;
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
public class CreateSupplierController {

    Logger logger = LoggerFactory.getLogger(CreateSupplierController.class);

    @Autowired
    AnalyzerMicroservice analyzerMicroservice;

    @Autowired
    BackendMicroservice backendMicroservice;

    @MessageMapping("/createSupplier")
    @SendToUser("/queue/reply/supplier")
    public String crateSupplier(@Payload  JSONObject supplier){
        JSONObject response = new JSONObject();
        try{
            JSONArray files = supplier.getJSONArray("files");
            supplier.remove("files");
            JSONObject supplierCreationResponse = backendMicroservice.saveObjectOnDb(supplier, "/supplier/createSupplier");
            if(supplierCreationResponse.getInt("status") == HttpStatus.SC_INTERNAL_SERVER_ERROR){
                return supplierCreationResponse.toString();
            }
            JSONObject savedSupplier = supplierCreationResponse.getJSONObject("supplier");
            supplier.put("idSupplier", savedSupplier.getString("id"));
            List<String> failedDocuments = new ArrayList<>();
            for(int i = 0 ; i < files.size() ; i++){
                List<JSONObject> attachmentsId = new LinkedList<>();
                JSONObject responseFromAnalyzer = new JSONObject();
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
                 		JSONObject result = extractWatsonEnrichedDataFromUnzippedFile(fileInZip);
                 		responseFromAnalyzer = (JSONObject) result.get("responseFromAnalyzer");
                        responsesFromAnalyzerZip.add(responseFromAnalyzer);
                        attachmentsId.add((JSONObject) result.get("attachmentId"));
                         saveDocumentsForSupplier(supplier, failedDocuments, attachmentsId, responseFromAnalyzer, fileInZip.getOriginalFilename());
                     }
                }
                // Tratta il caso SevenZip
                else if(FilenameUtils.getExtension(fileName).equals("7z")) {
                	zipFilesArrayList = SevenZipHandler.unzipToMultipartArray(base64File);
               	    for(MultipartFile fileInZip : zipFilesArrayList) {
               	        logger.info("Uploading document (7z): " + fileInZip.getOriginalFilename());
              		    JSONObject result = extractWatsonEnrichedDataFromUnzippedFile(fileInZip);
              		    responseFromAnalyzer = (JSONObject) result.get("responseFromAnalyzer");
                        responsesFromAnalyzerZip.add(responseFromAnalyzer);
                        attachmentsId.add((JSONObject) result.get("attachmentId"));
                        saveDocumentsForSupplier(supplier, failedDocuments, attachmentsId, responseFromAnalyzer, fileInZip.getOriginalFilename());
                    }
                }
                // Caso .rar: supportate tutte le versioni sino alla RAR4
                else if(FilenameUtils.getExtension(fileName).equals("rar")) {
                	zipFilesArrayList = RarHandler.unzipToMultipartArray(base64File);
               	    for(MultipartFile fileInZip : zipFilesArrayList) {
               	        logger.info("Uploading document (rar): " + fileInZip.getOriginalFilename());
              		    JSONObject result = extractWatsonEnrichedDataFromUnzippedFile(fileInZip);
              		    responseFromAnalyzer = (JSONObject) result.get("responseFromAnalyzer");
                        responsesFromAnalyzerZip.add(responseFromAnalyzer);
                        attachmentsId.add((JSONObject) result.get("attachmentId"));
                        saveDocumentsForSupplier(supplier, failedDocuments, attachmentsId, responseFromAnalyzer, fileInZip.getOriginalFilename());
                    }
                }
                // Caso file non zippati 
                else {   
                    file = files.getJSONObject(i);
                    base64File = file.getString("file");
                    fileName = file.getString("fileName");
                    byte [] data = Base64.getDecoder().decode(base64File);
                    MultipartFile document = new Base64DecodedMultipartFile(data, fileName);
                    JSONObject attachmentId = new JSONObject();
                    responseFromAnalyzer = analyzerMicroservice.analyzeFile(document);
                    logger.info("Response from analyzer", responseFromAnalyzer);
                    attachmentId.put("idAttachment", responseFromAnalyzer.getString("idAttachment"));
                    attachmentId.put("fileName", fileName);
                    attachmentsId.add(attachmentId);
                    saveDocumentsForSupplier(supplier, failedDocuments, attachmentsId, responseFromAnalyzer, fileName);
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
            return response.toString();
        }catch (Exception e){
            logger.error(e.getMessage());
            response.put("status", Constants.HTTP_STATUS_ERROR);
            response.put("message", Constants.ERROR_CREATING_SUPPLIER);
            return response.toString();
        }
    }




    private JSONObject extractWatsonEnrichedDataFromUnzippedFile(MultipartFile zipFile) {
        JSONObject responseFromAnalyzer;
        JSONObject result = new JSONObject();
        logger.info("Uploading document: " + zipFile.getOriginalFilename());
        responseFromAnalyzer = analyzerMicroservice.analyzeFile(zipFile);
        result.put("responseFromAnalyzer", responseFromAnalyzer);
        JSONObject attachmentId = new JSONObject();
        attachmentId.put("idAttachment", responseFromAnalyzer.getString("idAttachment"));
        attachmentId.put("fileName", zipFile.getOriginalFilename());
        result.put("attachmentId", attachmentId);
        return result;
    }

    private void saveDocumentsForSupplier(JSONObject supplier, List<String> failedDocuments, List<JSONObject> attachmentsId, JSONObject responseFromAnalyzer, String fileName) {
        logger.info("saveDocumentsForSupplier -- INIT --");
        JSONObject filesToUpdate = new JSONObject();
        filesToUpdate.put("idSupplier", supplier.get("idSupplier"));
        filesToUpdate.put("idTender", supplier.get("idTender"));
        filesToUpdate.put("attachmentsId", attachmentsId);
        filesToUpdate.put("responseFromAnalyzer", responseFromAnalyzer);
        JSONObject responseFromBackend = null;
        logger.info("Response from analyzer : " + responseFromAnalyzer);
        responseFromBackend = backendMicroservice.saveObjectOnDb(filesToUpdate, "/attachment/uploadAttachmentsForSupplier");
        logger.info("Response from backend : " + responseFromBackend);
        if (!responseFromBackend.get("status").equals(HttpStatus.SC_OK)){
            failedDocuments.add(fileName);
        }
        logger.info("saveDocumentsForSupplier -- END --");
    }

}
