package com.ibm.snam.idm.web_socket;

import com.ibm.snam.idm.common.Constants;
import com.ibm.snam.idm.microservices.AnalyzerMicroservice;
import com.ibm.snam.idm.microservices.BackendMicroservice;
import com.ibm.snam.idm.util.Base64DecodedMultipartFile;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.LinkedList;
import java.util.List;

@Controller
public class UpdateTenderFilesController {

    Logger logger = LoggerFactory.getLogger(UpdateTenderFilesController.class);

    @Autowired
    AnalyzerMicroservice analyzerMicroservice;

    @Autowired
    BackendMicroservice backendMicroservice;

    @MessageMapping("/updateTenderFiles")
    @SendToUser("/queue/reply/updateTenderFiles")
    public String updateFiles(@Payload  JSONObject updateFiles){
        JSONObject response = new JSONObject();
        logger.info("tenderFiles : " + updateFiles);
        try{
            JSONArray files = updateFiles.getJSONArray("files");
            List<JSONObject> attachmentsId = new LinkedList<>();
            for(int i = 0 ; i < files.size() ; i++){
                JSONObject file = files.getJSONObject(i);
                String base64File = file.getString("file");
                String fileName = file.getString("fileName");
                byte [] data = Base64.getDecoder().decode(base64File);
                MultipartFile document = new Base64DecodedMultipartFile(data, fileName);
                JSONObject attachmentId = new JSONObject();
                JSONObject responseFromAnalyzer = analyzerMicroservice.analyzeFile(document);
                attachmentId.put("idAttachment", responseFromAnalyzer.getString("idAttachment"));
                attachmentId.put("fileName", fileName);
                attachmentsId.add(attachmentId);
            }
            updateFiles.remove("files");
            updateFiles.put("attachmentsId", attachmentsId);
            JSONObject responseFromBackend = backendMicroservice.saveObjectOnDb(updateFiles, "/attachment/uploadAttachments");
            logger.info("Response from backend : " + responseFromBackend);
            return responseFromBackend.toString();
        }catch (Exception e){
            e.printStackTrace();
            response.put("status", Constants.HTTP_STATUS_ERROR);
            response.put("message", Constants.ERROR_CALLING_BACKEND);
            return response.toString();
        }
    }
}
