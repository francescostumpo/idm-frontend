package com.ibm.snam.idm.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

public class Util {

    public static String getNow(){
        SimpleDateFormat dateFormat = (SimpleDateFormat)SimpleDateFormat.getDateInstance(DateFormat.SHORT, Locale.ITALY);
        dateFormat.setTimeZone(TimeZone.getTimeZone("Europe/Rome"));
        dateFormat.applyPattern("dd.MM.yyyy HH:mm");
        Date date = new Date();
        return dateFormat.format(date);
    }

}
