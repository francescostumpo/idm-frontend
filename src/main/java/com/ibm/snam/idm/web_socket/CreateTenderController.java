package com.ibm.snam.idm.web_socket;

import com.ibm.snam.idm.common.Constants;
import com.ibm.snam.idm.microservices.AnalyzerMicroservice;
import com.ibm.snam.idm.microservices.BackendMicroservice;
import com.ibm.snam.idm.thread.AnalyzerThread;
import com.ibm.snam.idm.util.Base64DecodedMultipartFile;
import net.sf.json.JSON;
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
            boolean createWithOneFile = request.getBoolean("uploadOneFile");
            JSONObject responseFromAnalyzerRdo;
            JSONObject responseFromAnalyzerLetter;
            if(createWithOneFile){
                logger.info("Creating tender from one file");
                MultipartFile document = getMultipartFileFromRequest(request, "file", "fileName");
                AnalyzerThread analyzerThread = new AnalyzerThread();
                analyzeFile(analyzerThread, document);
                responseFromAnalyzerRdo = analyzerThread.getResponseFromAnalyzer();
                responseFromAnalyzerLetter = analyzerThread.getResponseFromAnalyzer();
            }
            else{
                logger.info("Creating tender from two files");
                MultipartFile documentRdo = getMultipartFileFromRequest(request, "fileRdo", "fileNameRdo");
                MultipartFile documentLetter = getMultipartFileFromRequest(request, "fileLetter", "fileNameLetter");
                AnalyzerThread analyzerThreadRdo = new AnalyzerThread();
                AnalyzerThread analyzerThreadLetter = new AnalyzerThread();
                analyzeRdoAndLetter(analyzerThreadRdo, analyzerThreadLetter, documentRdo, documentLetter);
                responseFromAnalyzerRdo = analyzerThreadRdo.getResponseFromAnalyzer();
                responseFromAnalyzerLetter = analyzerThreadLetter.getResponseFromAnalyzer();
            }

            if(responseFromAnalyzerRdo.getInt("status") != HttpStatus.OK.value()
                || responseFromAnalyzerLetter.getInt("status") != HttpStatus.OK.value()){
                logger.error("Error calling analyzer microservice");
                JSONObject response = new JSONObject();
                response.put("status", 500);
                response.put("message", Constants.ERROR_CALLING_ANALYZER);
                return response.toString();
            }
            JSONObject responseFromBackendCreateTender = createTenderOnBackend(request, responseFromAnalyzerLetter);
            if(responseFromBackendCreateTender.getInt("status") == Constants.HTTP_STATUS_ERROR){
                return responseFromBackendCreateTender.toString();
            }
            else if(responseFromBackendCreateTender.getString("creationStatus").equals(Constants.TENDER_ALREADY_EXIST)){
                logger.info("There is already a tender with the same SAP number");
                JSONObject response = new JSONObject();
                response.put("status", Constants.HTTP_STATUS_OK);
                response.put("message", Constants.TENDER_ALREADY_PRESENT);
                response.put("creationStatus", responseFromBackendCreateTender.getString("creationStatus"));
                response.put("tender", responseFromBackendCreateTender.getString("tender"));
                return response.toString();
            }
            JSONObject responseFromBackendUpdateRequiredAttachments = updateRequiredAttachmentsOnBackend(responseFromBackendCreateTender, request, responseFromAnalyzerRdo);
            if(responseFromBackendUpdateRequiredAttachments.getInt("status") == Constants.HTTP_STATUS_ERROR){
                return responseFromBackendUpdateRequiredAttachments.toString();
            }
            if(responseFromBackendCreateTender.getString("creationStatus").equals(Constants.TENDER_CREATED_WITH_MISSING_DATA)){
                logger.info("Tender created with missing data");
                responseFromBackendCreateTender.replace("message", Constants.MESSAGE_TENDER_CREATED_WITH_MISSING_DATA);
            }
            logger.info("Returning message");
            return responseFromBackendCreateTender.toString();
        } catch (Exception e) {
            e.printStackTrace();
            JSONObject response = new JSONObject();
            response.put("status", Constants.HTTP_STATUS_ERROR);
            response.put("message", Constants.ERROR_CREATING_TENDER);
            return response.toString();
        }
    }

    private JSONObject updateRequiredAttachmentsOnBackend(JSONObject responseFromBackend, JSONObject request, JSONObject responseFromAnalyzerRdo) {
        request.remove("responseFromAnalyzerLetter");
        request.put("responseFromAnalyzerRdo", responseFromAnalyzerRdo);
        JSONObject tender = responseFromBackend.getJSONObject("tender");
        request.put("idTender", tender.getString("id"));
        JSONObject responseFromBackendUpdateRequiredAttachments = backendMicroservice.saveObjectOnDb(request, "/tender/updateTenderRequiredAttachments");
        logger.info("responseFromBackendUpdateRequiredAttachments : " + responseFromBackendUpdateRequiredAttachments);
        if(responseFromBackendUpdateRequiredAttachments.getInt("status") != HttpStatus.OK.value()){
            logger.error("Error calling backend microservice (update required attachments)");
            JSONObject response = new JSONObject();
            response.put("status", Constants.HTTP_STATUS_ERROR);
            response.put("message", Constants.ERROR_CALLING_BACKEND);
            return response;
        }
        return responseFromBackendUpdateRequiredAttachments;
    }

    private JSONObject createTenderOnBackend(JSONObject request, JSONObject responseFromAnalyzerLetter) {
        request.remove("fileRdo");
        request.remove("fileLetter");
        request.put("responseFromAnalyzerLetter", responseFromAnalyzerLetter);
        JSONObject responseFromBackend = backendMicroservice.saveObjectOnDb(request, "/tender/createTender");
        logger.info("responseFromBackend : " + responseFromBackend);
        if(responseFromBackend.getInt("status") != HttpStatus.OK.value()){
            logger.error("Error calling backend microservice (create tender)");
            JSONObject response = new JSONObject();
            response.put("status", Constants.HTTP_STATUS_ERROR);
            response.put("message", Constants.ERROR_CALLING_BACKEND);
            return response;
        }
        return responseFromBackend;
    }

    private void analyzeFile(AnalyzerThread analyzerThread, MultipartFile document){
        logger.info("analyzeFile -- INIT --");
        try{
            ExecutorService executorService = Executors.newFixedThreadPool(1);
            CountDownLatch latch = new CountDownLatch(1);

            analyzerThread.setAnalyzerMicroservice(analyzerMicroservice);
            analyzerThread.setDocument(document);
            analyzerThread.setLatch(latch);

            executorService.submit(analyzerThread);
            latch.await();
        }catch (Exception e){
            e.printStackTrace();
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
