package com.ibm.snam.idm;

import fr.opensagres.poi.xwpf.converter.pdf.PdfConverter;
import fr.opensagres.poi.xwpf.converter.pdf.PdfOptions;
import org.apache.poi.xwpf.usermodel.XWPFDocument;

import org.junit.jupiter.api.Test;

import java.io.*;


public class DocToPdf {

    private final static String docPath = "/document.docx";
    private final static String pdfPath = "document.pdf";

    @Test
    public void convert(){
        try {
            InputStream doc = DocToPdf.class.getResourceAsStream(docPath);
            XWPFDocument document = new XWPFDocument(doc);
            PdfOptions options = PdfOptions.create();
            OutputStream out = new FileOutputStream(new File(pdfPath));
            PdfConverter.getInstance().convert(document, out, options);
            System.out.println("Done");
        } catch (FileNotFoundException ex) {
            System.out.println(ex.getMessage());
        } catch (IOException ex) {
            System.out.println(ex.getMessage());
        }
    }
}
