package com.ibm.snam.idm.common;

public class Constants {

    public static final String ERROR_CALLING_ANALYZER = "Errore nella chiamata al microservizio Analyzer";

    public static final String ERROR_CALLING_BACKEND = "Errore nella chiamata al backend";
    public static final String ERROR_CREATING_TENDER = "Errore nella creazione della gara";
    public static final String ERROR_CREATING_SUPPLIER = "Errore nella creazione del fornitore";
    public static final String TENDER_ALREADY_PRESENT = "Esiste una gara con lo stesso numero SAP";
    public static final int HTTP_STATUS_OK = 200;
    public static final int HTTP_STATUS_ERROR = 500;

    public static final String ERROR_DELETING_NOTIFICATION = "Errore durante l'eliminazione della notifica";
    public static final String TENDER_ALREADY_EXIST = "TENDER_ALREADY_EXIST";
    public static final String TENDER_CREATED_WITH_MISSING_DATA = "TENDER_CREATED_WITH_MISSING_DATA";

    public static final String SUPPLIER_CREATED_WITH_FILE_ERROR = "SUPPLIER_CREATED_WITH_FILE_ERROR";
    public static final String SUPPLIER_CREATED = "SUPPLIER_CREATED";

    public static final String FILE_UPDATED = "FILE_UPDATED";
    public static final String FILE_NOT_UPDATED = "FILE_NOT_UPDATED";

    public static final Object MESSAGE_TENDER_CREATED_WITH_MISSING_DATA = "Gara creata con parametri mancanti";

    public static final String UPLOAD_DOCUMENTS_OK = "Documentazione caricata con successo";
    public static final String UPLOAD_DOCUMENTS_ERROR = "Errore durante il caricamento documentazione";
    public static final String CREATE_SUPPLIER_OK = "Fornitore creato con successo";


}
