package com.ibm.snam.idm.microservices;

import com.ibm.snam.idm.common.Config;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;

@Service
public class BackendMicroservice {

    Logger logger = LoggerFactory.getLogger(BackendMicroservice.class);

    @Autowired
    Config config;


    public JSONObject  saveObjectOnDb(JSONObject object, String service){
        logger.info("saveTenderOnDb -- INIT --");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String serverBackend = "http://localhost:8080";
        String url = serverBackend + service;
        RestTemplate httpRestTemplate = new RestTemplate();
        httpRestTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));
        HttpEntity<String> request = new HttpEntity<String>(object.toString(), headers);
        logger.info("calling url : " + url);
        logger.info("JSON: " + object);
        JSONObject responseAsJsonObject = httpRestTemplate.postForObject(url, request, JSONObject.class);
        logger.info("saveTenderOnDb -- END --");
        return responseAsJsonObject;
    }

    public ResponseEntity<byte[]> getDocumentContent(String id) {
        logger.info("getDocumentContent -- INIT --");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        String serverBackend = config.getBackendUrl();
        String serviceGetDocumentContent = "/document/"+ id + "/content";
        String url = serverBackend + serviceGetDocumentContent;
        RestTemplate httpRestTemplate = new RestTemplate();
        httpRestTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));
        HttpEntity<String> request = new HttpEntity<String>(headers);
        logger.info("calling url : " + url);
        ResponseEntity<byte[]> response = httpRestTemplate.exchange(url, HttpMethod.GET, request, byte[].class);
        logger.info("getDocumentContent -- END --");
        return response;
    }

    public ResponseEntity<JSONArray> getSuppliersByTenderId(String tenderId) {
        logger.info("getSuppliersByTenderId -- INIT --");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String serverBackend = config.getBackendUrl();
        String endpoint = "/tender/"+ tenderId + "/suppliers";
        String url = serverBackend + endpoint;
        RestTemplate httpRestTemplate = new RestTemplate();
        httpRestTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));
        HttpEntity<String> request = new HttpEntity<String>(headers);
        logger.info("calling url : " + url);
        ResponseEntity<JSONArray> response = httpRestTemplate.exchange(url, HttpMethod.GET, request, JSONArray.class);
        logger.info("getSuppliersByTenderId -- END --");
        return response;
    }
}
