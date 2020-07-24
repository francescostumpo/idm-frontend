package com.ibm.snam.idm.microservices;

import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;

@Service
public class BackendMicroservice {

    Logger logger = LoggerFactory.getLogger(BackendMicroservice.class);

    public JSONObject  saveTenderOnDb(JSONObject tender){
        logger.info("saveTenderOnDb -- INIT --");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String serverBackend = "http://localhost:8080";
        String serviceCreateTender = "/tender/createTender";
        String url = serverBackend + serviceCreateTender;
        RestTemplate httpRestTemplate = new RestTemplate();
        httpRestTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));
        HttpEntity<String> request = new HttpEntity<String>(tender.toString(), headers);
        logger.info("calling url : " + url);
        logger.info("JSON: " + tender);
        JSONObject responseAsJsonObject = httpRestTemplate.postForObject(url, request, JSONObject.class);
        logger.info("saveTenderOnDb -- END --");
        return responseAsJsonObject;
    }

}
