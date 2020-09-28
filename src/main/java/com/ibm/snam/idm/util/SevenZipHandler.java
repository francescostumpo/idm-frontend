package com.ibm.snam.idm.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.zip.ZipEntry;

import org.apache.commons.compress.archivers.sevenz.SevenZArchiveEntry;
import org.apache.commons.compress.archivers.sevenz.SevenZFile;
import org.apache.commons.compress.utils.SeekableInMemoryByteChannel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import com.ibm.snam.idm.web_socket.CreateSupplierController;

public class SevenZipHandler {

    private static Logger logger = LoggerFactory.getLogger(SevenZipHandler.class);

    public static ArrayList<MultipartFile> unzipToMultipartArray(String zipBase64String) {
    	
        ByteArrayInputStream fis; 
        
        //buffer for read and write data to file
        byte[] buffer = new byte[1024]; 
        ArrayList<MultipartFile> multipartFilesInZip = new ArrayList<MultipartFile>(); 
        
        try {
        	byte[] decodedBase64Zip = Base64.getDecoder().decode(zipBase64String); 
            fis = new ByteArrayInputStream(decodedBase64Zip); 
            
            SevenZFile sevenZipFile = new SevenZFile(new SeekableInMemoryByteChannel(decodedBase64Zip)); 
            SevenZArchiveEntry entry = sevenZipFile.getNextEntry(); 
            while(entry != null) {
            	
            	logger.info("Extracting entry: " + entry.getName()); 
            	String fileName = entry.getName(); 
            	
                /* 
                 * Gestisce il caso di sottocartelle 
                 * (il modulo OCR va in errore nel caso
                 * il nome del file contenga il path
                 * della sottocartella) 
                 */
                if(fileName.contains("/")) {
                	String[] fileNameArray= fileName.split("/"); 
                	if(fileNameArray.length < 2 || entry.isDirectory()) { //|| fileName.matches("[\\s\\w]+\\/[\\s\\w]+\\.zip")) {
                		entry = sevenZipFile.getNextEntry(); 
                		continue; 
                	}
                	fileName = fileNameArray[fileNameArray.length - 1]; 
                	if(fileName.equals("") || fileName.contains("DS_Store") || fileName.startsWith(".") || fileName.contains("MACOSX")) {
                		entry = sevenZipFile.getNextEntry(); 
                		continue; 
                	}         
                    
                } 
                
                
                ByteArrayOutputStream fos = new ByteArrayOutputStream(); 
                copyStream(sevenZipFile, fos, entry); 

                if(fos.toByteArray().length != 0) {
                    MultipartFile document = new Base64DecodedMultipartFile(fos.toByteArray(), fileName); 
                    multipartFilesInZip.add(document); 
                }


                entry = sevenZipFile.getNextEntry();          
            	
            } 
            
            sevenZipFile.close();
            fis.close();  
            
            
            
        } 
        catch(IOException e) {
        	e.printStackTrace(); 
        } 
        
        return multipartFilesInZip; 
    } 
    
    
    
    private static void copyStream(SevenZFile in, OutputStream out,
            SevenZArchiveEntry entry) throws IOException {
        byte[] buffer = new byte[1024 * 4];
        long count = 0;
        int n = 0;
        long size = Integer.MAX_VALUE;
        while (-1 != (n = in.read(buffer)) && count < size) {
            out.write(buffer, 0, n);
            count += n;
        } 
    } 
    
    
}
