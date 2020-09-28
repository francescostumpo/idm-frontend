package com.ibm.snam.idm.web_socket.upload;

import com.ibm.snam.idm.microservices.AnalyzerMicroservice;
import com.ibm.snam.idm.microservices.BackendMicroservice;
import net.sf.json.JSONObject;
import org.apache.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Component
public class UploadFileService {

    Logger logger = LoggerFactory.getLogger(UploadSupplierFileTask.class);

    private final static int NUM_THREAD = 5;

    @Autowired
    BackendMicroservice backendMicroservice;

    @Autowired
    AnalyzerMicroservice analyzerMicroservice;

    protected class UploadSupplierFileTask implements Callable {

        private String filename;
        private MultipartFile document;
        private JSONObject supplier;

        public UploadSupplierFileTask(MultipartFile document, String filename, JSONObject supplier) {
            this.document = document;
            this.filename = filename;
            this.supplier = supplier;
        }

        @Override
        public UploadResult call() throws Exception {
            JSONObject responseFromAnalyzer = analyzerMicroservice.analyzeFile(document);
            logger.info("Response from analyzer " + responseFromAnalyzer.toString());
            JSONObject fileToUpdate = buildFileToUpload(supplier, responseFromAnalyzer, document);
            logger.info("Uploading attachment for supplier");
            UploadResult result = new UploadResult(false, filename);
            JSONObject responseFromBackend = backendMicroservice.saveObjectOnDb(fileToUpdate, "/attachment/uploadAttachmentsForSupplier");
            logger.info("Response from backend : " + responseFromBackend);
            if (!responseFromBackend.get("status").equals(HttpStatus.SC_OK)) {
                result.setFailed(true);
            }
            logger.info("uploadResult " + result);
            return result;
        }

        private JSONObject buildFileToUpload(@Payload JSONObject supplier, JSONObject responseFromAnalyzer, MultipartFile file) {
            List<JSONObject> attachmentsId = new LinkedList<>();
            JSONObject attachmentId = new JSONObject();
            attachmentId.put("idAttachment", responseFromAnalyzer.getString("idAttachment"));
            attachmentId.put("fileName", file.getOriginalFilename());
            attachmentsId.add(attachmentId);
            JSONObject fileToUpload = new JSONObject();
            fileToUpload.put("idSupplier", supplier.get("idSupplier"));
            fileToUpload.put("idTender", supplier.get("idTender"));
            fileToUpload.put("attachmentsId", attachmentsId);
            fileToUpload.put("responseFromAnalyzer", responseFromAnalyzer);
            logger.info("fileToUpload", fileToUpload.toString());
            return fileToUpload;
        }
    }

    protected class UploadTenderFileTask implements Callable {

        private String filename;
        private MultipartFile document;
        private JSONObject tender;

        public UploadTenderFileTask(MultipartFile document, String filename, JSONObject tender) {
            this.document = document;
            this.filename = filename;
            this.tender = tender;
        }

        @Override
        public UploadResult call() throws Exception {
            JSONObject responseFromAnalyzer = analyzerMicroservice.analyzeFile(document);
            logger.info("Response from analyzer " + responseFromAnalyzer.toString());
            JSONObject fileToUpdate = buildFileToUpload(tender, responseFromAnalyzer, document);
            logger.info("Uploading attachment for tender");
            UploadResult result = new UploadResult(false, filename);
            JSONObject responseFromBackend = backendMicroservice.saveObjectOnDb(fileToUpdate, "/attachment/uploadAttachmentsForTender");
            responseFromBackend.put("updated", "tender");
            responseFromBackend.put("cig", fileToUpdate.getString("cig"));
            responseFromBackend.put("idTender", fileToUpdate.getString("idTender"));
            logger.info("Response from backend : " + responseFromBackend);
            if (!responseFromBackend.get("status").equals(HttpStatus.SC_OK)) {
                result.setFailed(true);
            }
            logger.info("uploadResult " + result);
            return result;
        }

        private JSONObject buildFileToUpload(@Payload JSONObject tender, JSONObject responseFromAnalyzer, MultipartFile file) {
            List<JSONObject> attachmentsId = new LinkedList<>();
            JSONObject attachmentId = new JSONObject();
            attachmentId.put("idAttachment", responseFromAnalyzer.getString("idAttachment"));
            attachmentId.put("fileName", file.getOriginalFilename());
            attachmentsId.add(attachmentId);
            JSONObject fileToUpload = new JSONObject();
            fileToUpload.put("cig", tender.get("cig"));
            fileToUpload.put("idTender", tender.get("idTender"));
            fileToUpload.put("attachmentsId", attachmentsId);
            fileToUpload.put("responseFromAnalyzer", responseFromAnalyzer);
            logger.info("fileToUpload", fileToUpload.toString());
            return fileToUpload;
        }
    }

    public Future<UploadResult> uploadSupplierFile(MultipartFile document, String filename, JSONObject supplier){
        ExecutorService executor = Executors.newSingleThreadExecutor();
        return executor.submit(new UploadSupplierFileTask(document, filename, supplier));
    }

    public Future<UploadResult> uploadTenderFile(MultipartFile document, String filename, JSONObject tender){
        ExecutorService executor = Executors.newSingleThreadExecutor();
        return executor.submit(new UploadSupplierFileTask(document, filename, tender));
    }
}

