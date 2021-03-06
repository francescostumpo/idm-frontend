package com.ibm.snam.idm.common;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class Config {

    @Value("${BACKEND_URL}")
    private String BACKEND_URL;

    @Value("${ANALYZER_URL}")
    private String ANALYZER_URL;

    public String getBackendUrl() {
        return BACKEND_URL;
    }

    public String getAnalyzerUrl() { return ANALYZER_URL; }
}
