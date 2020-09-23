package com.ibm.snam.idm.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import com.github.junrar.Archive;
import com.github.junrar.exception.RarException;
import com.github.junrar.rarfile.FileHeader;

public class RarHandler {

	
    private static Logger logger = LoggerFactory.getLogger(RarHandler.class);

	
    public static ArrayList<MultipartFile> unzipToMultipartArray(String zipBase64String) throws RarException {

        ByteArrayInputStream fis;
        //buffer for read and write data to file
        byte[] buffer = new byte[1024]; 
        ArrayList<MultipartFile> multipartFilesInZip = new ArrayList<MultipartFile>(); 
        
        
        try {
        	byte[] decodedBase64Zip = Base64.getDecoder().decode(zipBase64String); 
            fis = new ByteArrayInputStream(decodedBase64Zip); 
            
            final Archive archive = new Archive(fis); 
            
            FileHeader fileHeader = archive.nextFileHeader();

            
            while (true) {
                if (fileHeader == null) {
                    break;
                } 
                
                
                /* 
                 * Gestisce il caso di sottocartelle 
                 * (il modulo OCR va in errore nel caso
                 * il nome del file contenga il path
                 * della sottocartella) 
                 */
                String fileName = fileHeader.getFileName(); 
                if(fileName.contains("\\")) {
                	String[] fileNameArray= fileName.split("\\\\"); 
                	if(fileNameArray.length < 2 || fileHeader.isDirectory()) { //|| fileName.matches("[\\s\\w]+\\/[\\s\\w]+\\.zip")) {
                		fileHeader = archive.nextFileHeader();  
                		continue; 
                	}
                	fileName = fileNameArray[fileNameArray.length - 1]; 
                	if(fileName.equals("") || fileName.contains("DS_Store") || fileName.startsWith(".") || fileName.contains("MACOSX")) {
                		fileHeader = archive.nextFileHeader(); 
                		continue; 
                	}         
                    
                }
                
                
                ByteArrayOutputStream fos = new ByteArrayOutputStream(); 
                archive.extractFile(fileHeader, fos); 
                
                if(fos.toByteArray().length != 0) {
                    MultipartFile document = new Base64DecodedMultipartFile(fos.toByteArray(), fileName); 
                    multipartFilesInZip.add(document); 
                } 
                
        		fileHeader = archive.nextFileHeader();  

            } 
            

            archive.close(); 

        } 
        catch(IOException e) {
        	logger.error("IOException while reading RAR file: " + e.getMessage());
        } 
        catch(RarException e) {
        	logger.error("Error while extracting RAR file: " + e.getMessage());  
        } 
        
        return multipartFilesInZip; 
        
    }
}
