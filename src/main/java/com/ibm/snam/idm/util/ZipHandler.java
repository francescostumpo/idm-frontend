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
import java.util.zip.ZipFile;
import java.util.zip.ZipInputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.io.ByteSource;

public class ZipHandler {

    /* public static void main(String[] args) {
        String zipFilePath = "/Users/it059294/Documents/Other_Projects/Snam/IDM/test/Dettaglio_gara.zip";
        
        String destDir = "/Users/it059294/Documents/Other_Projects/Snam/IDM/test/DemoTest"; 
        String zipBase64 = "";      
        
        ArrayList<MultipartFile> multipartFilesArrayList = unzipToMultipartArray(zipBase64);
    } */ 
	
	
    private static Logger logger = LoggerFactory.getLogger(ZipHandler.class);


    public static ArrayList<MultipartFile> unzipToMultipartArray(String zipBase64String) {

        ByteArrayInputStream fis;
        //buffer for read and write data to file
        byte[] buffer = new byte[1024]; 
        ArrayList<MultipartFile> multipartFilesInZip = new ArrayList<MultipartFile>(); 
        
        try {
        	byte[] decodedBase64Zip = Base64.getDecoder().decode(zipBase64String); 
            fis = new ByteArrayInputStream(decodedBase64Zip); 
            ZipInputStream originalZis = new ZipInputStream(fis); 
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
                	if(fileNameArray.length < 2 || ze.isDirectory()) { //|| fileName.matches("[\\s\\w]+\\/[\\s\\w]+\\.zip")) {
                		ze = zis.getNextEntry(); 
                		continue; 
                	}
                	fileName = fileNameArray[fileNameArray.length - 1]; 
                	if(fileName.equals("") || fileName.contains("DS_Store") || fileName.startsWith(".") || fileName.contains("MACOSX")) {
                		ze = zis.getNextEntry(); 
                		continue; 
                	}         
                    
                }
                
                
                
                    String[] fileNameSplittedByDots = fileName.split("\\."); 

                    if (fileNameSplittedByDots[fileNameSplittedByDots.length - 1].equals("zip")) {

                    	ZipInputStream subZipContentAsZipStream = new ZipInputStream(zis); 
                    	
                        ZipEntry subZipEntry = subZipContentAsZipStream.getNextEntry(); 

                        
                        while(subZipEntry != null) {
                            String fileNameSubZip = subZipEntry.getName(); 
                            
                            if(fileNameSubZip.contains("/")) {
                            	String[] fileNameArraySubZip= fileNameSubZip.split("/"); 
                            	if(fileNameArraySubZip.length < 2 || subZipEntry.isDirectory()) {
                            		subZipEntry = subZipContentAsZipStream.getNextEntry(); 
                            		continue; 
                            	}
                            	fileNameSubZip = fileNameArraySubZip[fileNameArraySubZip.length - 1]; 
                            	if(fileNameSubZip.equals("") || fileNameSubZip.contains("DS_Store") || fileNameSubZip.startsWith(".") || fileNameSubZip.contains("MACOSX")) {
                            		subZipEntry = subZipContentAsZipStream.getNextEntry(); 
                            		continue; 
                            	}
                            }
                                           
                            ByteArrayOutputStream fosSubZip = new ByteArrayOutputStream(); 
                            copyStream(subZipContentAsZipStream, fosSubZip, subZipEntry); 
                            
                            // Aggiunge il documento del sotto-zip alla lista dei documenti da ritornare 
                            MultipartFile documentInSubZip = new Base64DecodedMultipartFile(fosSubZip.toByteArray(), fileNameSubZip); 
                            multipartFilesInZip.add(documentInSubZip); 

                            subZipContentAsZipStream.closeEntry();
                            subZipEntry = subZipContentAsZipStream.getNextEntry(); 

  
                            
                         } 
                        
                        
                        zis.closeEntry();
                        ze = zis.getNextEntry();
                        
                    }
                    
                    
                 
                 
                

                     
                if(!fileName.endsWith("zip")) { 
                    ByteArrayOutputStream fos = new ByteArrayOutputStream(); 
                    copyStream(zis, fos, ze); 

                    MultipartFile document = new Base64DecodedMultipartFile(fos.toByteArray(), fileName); 
                    multipartFilesInZip.add(document); 

                    zis.closeEntry();
                    ze = zis.getNextEntry();
                }


            }

            zis.closeEntry();
            zis.close();
            fis.close();      
        } catch (IOException e) {
            e.printStackTrace();
        } 
        
        
        return multipartFilesInZip; 
        
    } 
    
    
    
    private static InputStream convertZipInputStreamToInputStream(ZipInputStream in, ZipEntry entry) throws IOException
    {
        final int BUFFER = 2048;
        int count = 0;
        byte data[] = new byte[BUFFER];
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        while ((count = in.read(data, 0, BUFFER)) != -1) {
            out.write(data);
        }       
        InputStream is = new ByteArrayInputStream(out.toByteArray());
        return is;
    }
    
    /*
    
    public static byte[] getByteArrayFromZipInputStream(ZipInputStream zipStream, ZipEntry entry) throws IOException {
    	
    	long zipEntrySize = entry.getSize(); 
    	if (zipEntrySize < 0) {
    	    zipEntrySize = 0xffffffffl + zipEntrySize;
    	}
    	byte[] bytes = entry; 
    	int i = 0;
    	while (i < bytes.length) {
    	    // .read doesn't always fill the buffer we give it.
    	    // Keep calling it until we get all the bytes for this entry.
    	    i += zipStream.read(bytes, i, bytes.length - i);
    	}
    	return bytes; 
    } */ 
    
    
    
    public static ZipInputStream findEntry(ZipInputStream in, String name) throws IOException {
        ZipEntry entry = null;
        while ((entry = in.getNextEntry()) != null) {
            if (entry.getName().contains(name)) {
                return in;
            }
        }
        return null;
    }
    
        
    private static void copyStream(InputStream in, OutputStream out,
            ZipEntry entry) throws IOException {
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
