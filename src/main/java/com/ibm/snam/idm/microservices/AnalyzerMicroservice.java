package com.ibm.snam.idm.microservices;

import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import java.net.URI;

@Service
public class AnalyzerMicroservice {

    Logger logger = LoggerFactory.getLogger(AnalyzerMicroservice.class);

    public JSONObject analyzeFile(MultipartFile document){
        logger.info("analyzeFile -- INIT --");
        try {
            logger.info("bytes : " + document.getBytes());
            logger.info("name : " + document.getOriginalFilename());
            RestTemplate restTemplate = new RestTemplate();
            ByteArrayResource contentsAsResource = null;
            final String filename = document.getOriginalFilename();
            contentsAsResource = new ByteArrayResource(document.getBytes()) {
                @Override
                public String getFilename() {
                    return filename;
                }
            };
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("document", contentsAsResource);
            String serverAnalyzer = "http://localhost:8085";
            String serviceAnalyzeDocument = "/analyzerDocument/analyze/document";
            String url = serverAnalyzer + serviceAnalyzeDocument;
            logger.info("Calling URL : " + url);
            URI uri = new URI(url);
            JSONObject result = restTemplate.postForObject(uri, body, JSONObject.class);
            logger.info("analyzeFile --END--");
            return result;
        }catch (Exception e){
            e.printStackTrace();
            return new JSONObject();
        }
    }

}
