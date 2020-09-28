package com.ibm.snam.idm.thread;

import com.ibm.snam.idm.microservices.AnalyzerMicroservice;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.util.concurrent.CountDownLatch;

public class AnalyzerThread implements Runnable {

    private AnalyzerMicroservice analyzerMicroservice;
    private MultipartFile document;
    private JSONObject responseFromAnalyzer;
    private CountDownLatch latch;

    Logger logger = LoggerFactory.getLogger(AnalyzerThread.class);

    @Override
    public void run() {
        logger.info("Starting thread for analyzer call... Document : " + document.getOriginalFilename());
        try {
            responseFromAnalyzer = analyzerMicroservice.analyzeFile(document);
            //logger.info("response from document : " + document.getOriginalFilename() + " : " + responseFromAnalyzer);
        }catch (Exception e){
            e.printStackTrace();
        }
        logger.info("Thread for document " + document.getOriginalFilename() + " finished");
        latch.countDown();
    }

    public CountDownLatch getLatch() {
        return latch;
    }

    public void setLatch(CountDownLatch latch) {
        this.latch = latch;
    }

    public AnalyzerMicroservice getAnalyzerMicroservice() {
        return analyzerMicroservice;
    }

    public void setAnalyzerMicroservice(AnalyzerMicroservice analyzerMicroservice) {
        this.analyzerMicroservice = analyzerMicroservice;
    }

    public MultipartFile getDocument() {
        return document;
    }

    public void setDocument(MultipartFile document) {
        this.document = document;
    }

    public JSONObject getResponseFromAnalyzer() {
        return responseFromAnalyzer;
    }

    public void setResponseFromAnalyzer(JSONObject responseFromAnalyzer) {
        this.responseFromAnalyzer = responseFromAnalyzer;
    }
}
