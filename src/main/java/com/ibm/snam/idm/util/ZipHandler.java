package com.ibm.snam.idm.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.springframework.web.multipart.MultipartFile;

public class ZipHandler {

    /* public static void main(String[] args) {
        String zipFilePath = "/Users/it059294/Documents/Other_Projects/Snam/IDM/test/Dettaglio_gara.zip";
        
        String destDir = "/Users/it059294/Documents/Other_Projects/Snam/IDM/test/DemoTest"; 
        String zipBase64 = "";      
        
        ArrayList<MultipartFile> multipartFilesArrayList = unzipToMultipartArray(zipBase64);
    } */ 
	
	

    public static ArrayList<MultipartFile> unzipToMultipartArray(String zipBase64String) {

        ByteArrayInputStream fis;
        //buffer for read and write data to file
        byte[] buffer = new byte[1024]; 
        ArrayList<MultipartFile> multipartFilesInZip = new ArrayList<MultipartFile>(); 
        
        try {
        	byte[] decodedBase64Zip = Base64.getDecoder().decode(zipBase64String); 
            fis = new ByteArrayInputStream(decodedBase64Zip); 
            ZipInputStream zis = new ZipInputStream(fis);
            ZipEntry ze = zis.getNextEntry(); 
            
            while(ze != null){   	 	
                String fileName = ze.getName(); 
                
                /* 
                 * Gestisce il caso di sottocartelle 
                 * (il modulo OCR va in errore nel caso
                 * il nome del file contenga il path
                 * della sottocartella) 
                 */
                if(fileName.contains("/")) {
                	String[] fileNameArray= fileName.split("/"); 
                	if(fileNameArray.length < 2 || ze.isDirectory()) {
                		ze = zis.getNextEntry(); 
                		continue; 
                	}
                	fileName = fileNameArray[fileNameArray.length - 1]; 
                	if(fileName.equals("") || fileName.contains("DS_Store")) {
                		ze = zis.getNextEntry(); 
                		continue; 
                	}
                } 
                
                ByteArrayOutputStream fos = new ByteArrayOutputStream(); 
                copyStream(zis, fos, ze); 
                
                MultipartFile document = new Base64DecodedMultipartFile(fos.toByteArray(), fileName); 
                multipartFilesInZip.add(document); 

                zis.closeEntry();
                ze = zis.getNextEntry();
            }

            zis.closeEntry();
            zis.close();
            fis.close();      
        } catch (IOException e) {
            e.printStackTrace();
        } 
        
        
        return multipartFilesInZip; 
        
    } 
    
    
    
    
    private static void copyStream(InputStream in, OutputStream out,
            ZipEntry entry) throws IOException {
        byte[] buffer = new byte[1024 * 4];
        long count = 0;
        int n = 0;
        long size = entry.getSize();
        while (-1 != (n = in.read(buffer)) && count < size) {
            out.write(buffer, 0, n);
            count += n;
        } 
    } 
    
    
}
