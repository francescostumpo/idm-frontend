package com.ibm.snam.idm.web_socket;

import com.ibm.snam.idm.common.Constants;
import com.ibm.snam.idm.microservices.AnalyzerMicroservice;
import com.ibm.snam.idm.microservices.BackendMicroservice;
import com.ibm.snam.idm.util.Base64DecodedMultipartFile;
import com.ibm.snam.idm.util.ZipHandler;

import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
            List<JSONObject> attachmentsId = new LinkedList<>();
            JSONObject responseFromAnalyzer = new JSONObject(); 
            JSONObject responseFromBackend = new JSONObject(); 
            for(int i = 0 ; i < files.size() ; i++){
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
                    attachmentId.put("idAttachment", responseFromAnalyzer.getString("idAttachment"));
                    attachmentId.put("fileName", fileName);
                    attachmentsId.add(attachmentId);
                    /*byte [] data = Base64.getDecoder().decode(base64File); 
                    MultipartFile document = new Base64DecodedMultipartFile(data, fileName);
                    JSONObject attachmentId = new JSONObject();
                    responseFromAnalyzer = analyzerMicroservice.analyzeFile(document);
                    attachmentId.put("idAttachment", responseFromAnalyzer.getString("idAttachment"));
                    attachmentId.put("fileName", fileName);
                    attachmentsId.add(attachmentId);   */            
                    

                }

            }

            supplier.remove("files");
            supplier.put("attachmentsId", attachmentsId);
            supplier.put("responseFromAnalyzer", responseFromAnalyzer);
            responseFromBackend = backendMicroservice.saveObjectOnDb(supplier, "/supplier/createSupplier");
            logger.info("Response from backend : " + responseFromBackend);
            return responseFromBackend.toString();
        }catch (Exception e){
            e.printStackTrace();
            response.put("status", Constants.HTTP_STATUS_ERROR);
            response.put("message", Constants.ERROR_CREATING_SUPPLIER);
            return response.toString();
        }
    }

}
