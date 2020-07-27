package com.ibm.snam.idm.web_socket;

import com.ibm.snam.idm.common.Constants;
import com.ibm.snam.idm.microservices.AnalyzerMicroservice;
import com.ibm.snam.idm.microservices.BackendMicroservice;
import com.ibm.snam.idm.util.Base64DecodedMultipartFile;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Base64;

@Controller
public class CreateTenderController {

    Logger logger = LoggerFactory.getLogger(CreateTenderController.class);

    @Autowired
    AnalyzerMicroservice analyzerMicroservice;

    @Autowired
    BackendMicroservice backendMicroservice;

    @MessageMapping("/createTender")
    @SendToUser("/queue/reply")
    public String createTender(@Payload JSONObject request){
        try{
            logger.info("Waiting... ");
            String base64File = request.getString("file");
            String fileName = request.getString("fileName");
            byte [] data = Base64.getDecoder().decode(base64File);
            MultipartFile document = new Base64DecodedMultipartFile(data, fileName);
            JSONObject responseFromAnalyzer = analyzerMicroservice.analyzeFile(document);
            if(responseFromAnalyzer.getInt("status") != HttpStatus.OK.value()){
                logger.error("Error calling analyzer microservice");
                JSONObject response = new JSONObject();
                response.put("status", responseFromAnalyzer.getInt("status"));
                response.put("message", Constants.ERROR_CALLING_ANALYZER);
                return response.toString();
            }
            request.remove("file");
            request.put("responseFromAnalyzer", responseFromAnalyzer);
            JSONObject responseFromBackend = backendMicroservice.saveTenderOnDb(request);
            if(responseFromBackend.getInt("status") != HttpStatus.OK.value()){
                logger.error("Error calling backend microservice");
                JSONObject response = new JSONObject();
                response.put("status", responseFromAnalyzer.getInt("status"));
                response.put("message", Constants.ERROR_CALLING_BACKEND);
                return response.toString();
            }
            logger.info("responseFromBackend : " + responseFromBackend);
            logger.info("Returning message");
            return responseFromBackend.toString();
        } catch (Exception e) {
            e.printStackTrace();
            JSONObject response = new JSONObject();
            response.put("status", Constants.HTTP_STATUS_ERROR);
            response.put("message", Constants.ERROR_CREATING_TENDER);
            return response.toString();
        }
    }

}
