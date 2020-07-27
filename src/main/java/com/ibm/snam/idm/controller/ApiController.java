package com.ibm.snam.idm.controller;

import com.ibm.snam.idm.microservices.BackendMicroservice;
import com.ibm.snam.idm.web_socket.CreateTenderController;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {

    Logger logger = LoggerFactory.getLogger(CreateTenderController.class);

    @Autowired
    BackendMicroservice backendMicroservice;

    @GetMapping("/api/documentContent/{id}")
    public ResponseEntity<byte[]> getDocumentContent(@PathVariable("id") String id) {
        return backendMicroservice.getDocumentContent(id);
    }

    @GetMapping("/api/tender/{tenderId}/suppliers")
    public ResponseEntity<JSONObject> getSuppliersByTenderId(@PathVariable("tenderId") String tenderId) {
        return backendMicroservice.getSuppliersByTenderId(tenderId);
    }
}
