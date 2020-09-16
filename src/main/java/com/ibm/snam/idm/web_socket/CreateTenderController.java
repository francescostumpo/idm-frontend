package com.ibm.snam.idm.web_socket;

import com.ibm.snam.idm.common.Constants;
import com.ibm.snam.idm.microservices.AnalyzerMicroservice;
import com.ibm.snam.idm.microservices.BackendMicroservice;
import com.ibm.snam.idm.thread.AnalyzerThread;
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
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

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
            MultipartFile documentRdo = getMultipartFileFromRequest(request, "fileRdo", "fileNameRdo");
            MultipartFile documentLetter = getMultipartFileFromRequest(request, "fileLetter", "fileNameLetter");
            AnalyzerThread analyzerThreadRdo = new AnalyzerThread();
            AnalyzerThread analyzerThreadLetter = new AnalyzerThread();

            analyzeRdoAndLetter(analyzerThreadRdo, analyzerThreadLetter, documentRdo, documentLetter);

            JSONObject responseFromAnalyzerRdo = analyzerThreadRdo.getResponseFromAnalyzer();
            JSONObject responseFromAnalyzerLetter = analyzerThreadLetter.getResponseFromAnalyzer();

            if(responseFromAnalyzerRdo.getInt("status") != HttpStatus.OK.value()
                || responseFromAnalyzerLetter.getInt("status") != HttpStatus.OK.value()){
                logger.error("Error calling analyzer microservice");
                JSONObject response = new JSONObject();
                response.put("status", 500);
                response.put("message", Constants.ERROR_CALLING_ANALYZER);
                return response.toString();
            }
            request.remove("fileRdo");
            request.remove("fileLetter");
            request.put("responseFromAnalyzerLetter", responseFromAnalyzerLetter);
            JSONObject responseFromBackend = backendMicroservice.saveObjectOnDb(request, "/tender/createTender");
            if(responseFromBackend.getInt("status") != HttpStatus.OK.value()){
                logger.error("Error calling backend microservice");
                JSONObject response = new JSONObject();
                //response.put("status", responseFromAnalyzer.getInt("status"));
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

    private void analyzeRdoAndLetter(AnalyzerThread analyzerThreadRdo, AnalyzerThread analyzerThreadLetter, MultipartFile documentRdo, MultipartFile documentLetter) {
        logger.info("analyzeRdoAndLetter -- INIT --");
        try {
            ExecutorService executorService = Executors.newFixedThreadPool(2);
            CountDownLatch latch = new CountDownLatch(2);

            analyzerThreadRdo.setAnalyzerMicroservice(analyzerMicroservice);
            analyzerThreadRdo.setDocument(documentRdo);
            analyzerThreadRdo.setLatch(latch);

            analyzerThreadLetter.setAnalyzerMicroservice(analyzerMicroservice);
            analyzerThreadLetter.setDocument(documentLetter);
            analyzerThreadLetter.setLatch(latch);

            executorService.submit(analyzerThreadRdo);
            executorService.submit(analyzerThreadLetter);
            latch.await();
        }catch (Exception e){
            e.printStackTrace();
        }
        logger.info("analyzeRdoAndLetter -- END --");
    }

    private MultipartFile getMultipartFileFromRequest(JSONObject request, String file, String name) {
        String base64File = request.getString(file);
        String fileName = request.getString(name);
        byte [] data = Base64.getDecoder().decode(base64File);
        MultipartFile document = new Base64DecodedMultipartFile(data, fileName);
        return document;
    }

}
