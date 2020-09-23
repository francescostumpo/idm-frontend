package com.ibm.snam.idm.threading;

import java.util.ArrayList;
import java.util.Base64;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.Callable;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import com.ibm.snam.idm.microservices.AnalyzerMicroservice;
import com.ibm.snam.idm.util.Base64DecodedMultipartFile;
import com.ibm.snam.idm.util.ZipHandler;
import com.ibm.snam.idm.web_socket.CreateTenderController;

import net.sf.json.JSONObject;

public class ThreadSubmitDocumentToWatson implements Callable {

    @Autowired
    AnalyzerMicroservice analyzerMicroservice;
	
	public String base64File; 
	public String fileName; 
	
    Logger logger = LoggerFactory.getLogger(CreateTenderController.class);

	
	public ThreadSubmitDocumentToWatson(String base64File, String fileName) {
		this.base64File = base64File; 
		this.fileName = fileName; 
	}
	
	@Override
	public JSONObject call() {
		
		JSONObject resultOfCall = new JSONObject(); 

        List<JSONObject> attachmentsId = new LinkedList<>();
        JSONObject responseFromAnalyzer = new JSONObject(); 
        ArrayList<JSONObject> responsesFromAnalyzer = new ArrayList<JSONObject>(); 
        
        // Tratta il caso in cui l'elemento i-esimo sia uno .zip 
        if(FilenameUtils.getExtension(this.fileName).equals("zip")) {
           
        	// Estrae i documenti dallo .zip e li invia a Watson per l'analisi 
        	ArrayList<MultipartFile> zipFilesArrayList = ZipHandler.unzipToMultipartArray(this.base64File); 
        	for(MultipartFile fileInZip : zipFilesArrayList) {
        		logger.info("Uploading document: " + fileInZip.getOriginalFilename()); 
                responseFromAnalyzer = analyzerMicroservice.analyzeFile(fileInZip); 
                logger.info("ResponseFromAnalyze:" + responseFromAnalyzer); 
                responsesFromAnalyzer.add(responseFromAnalyzer); 
                
                JSONObject attachmentId = new JSONObject(); 
            	attachmentId.put("idAttachment", responseFromAnalyzer.getString("idAttachment")); 
            	attachmentId.put("fileName", fileInZip.getOriginalFilename()); 
            	attachmentsId.add(attachmentId); 

        	} 
        	
           

        }
        
        // Caso file non zippati 
        else {   
            byte [] data = Base64.getDecoder().decode(this.base64File);
            MultipartFile document = new Base64DecodedMultipartFile(data, this.fileName);
            JSONObject attachmentId = new JSONObject();
            responseFromAnalyzer = analyzerMicroservice.analyzeFile(document); 
            logger.info("ResponseFromAnalyze:" + responseFromAnalyzer); 
            responsesFromAnalyzer.add(responseFromAnalyzer); 
            attachmentId.put("idAttachment", responseFromAnalyzer.getString("idAttachment"));
            attachmentId.put("fileName", this.fileName);
            attachmentsId.add(attachmentId);
            /*byte [] data = Base64.getDecoder().decode(base64File); 
            MultipartFile document = new Base64DecodedMultipartFile(data, fileName);
            JSONObject attachmentId = new JSONObject();
            responseFromAnalyzer = analyzerMicroservice.analyzeFile(document);
            attachmentId.put("idAttachment", responseFromAnalyzer.getString("idAttachment"));
            attachmentId.put("fileName", fileName);
            attachmentsId.add(attachmentId);   */            
            

        } 
        
        resultOfCall.put("attachmentsId", attachmentsId); 
        resultOfCall.put("responsesFromAnalyzer", responsesFromAnalyzer); 
        return resultOfCall; 
		
	}
	
	
	
}
