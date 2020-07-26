package com.ibm.snam.idm.util;

import org.springframework.web.multipart.MultipartFile;

import javax.activation.MimetypesFileTypeMap;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

public class Base64DecodedMultipartFile implements MultipartFile {

    private byte[] contentFile;
    private String fileName;

    public Base64DecodedMultipartFile(byte[] fileData, String name) {
        this.contentFile = fileData;
        this.fileName = name;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    @Override
    public String getName() {
        return fileName;
    }

    @Override
    public String getOriginalFilename() {
        return fileName;
    }

    @Override
    public String getContentType() {
        MimetypesFileTypeMap fileTypeMap = new MimetypesFileTypeMap();
        String mimeType = fileTypeMap.getContentType(fileName);
        return mimeType;
    }

    @Override
    public byte[] getBytes() throws IOException {
        return contentFile;
    }

    @Override
    public boolean isEmpty() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public long getSize() {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public InputStream getInputStream() throws IOException {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void transferTo(File dest) throws IOException, IllegalStateException {
        // TODO Auto-generated method stub

    }


}
