package com.ibm.snam.idm.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "IDM_USER_NOTIFICATION")
public class UserNotification {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Integer id;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "NOTIFICATION_TYPE")
    private String notificationType;

    @Column(name = "ID_TENDER")
    private String idTender;

    @Column(name = "CREATION_DATE")
    private String creationDate;

    @Column(name = "ID_SUPPLIER")
    private String idSupplier;

    @Column(name = "READING_DATE")
    private String readingDate;

    @Column(name = "TENDER_NUMBER")
    private String tenderNumber;

    @Column(name = "STATUS")
    private String status;

    @Column(name = "SUPPLIER_NAME")
    private String supplierName;

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTenderNumber() {
        return tenderNumber;
    }

    public void setTenderNumber(String tenderNumber) {
        this.tenderNumber = tenderNumber;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getNotificationType() {
        return notificationType;
    }

    public void setNotificationType(String notificationType) {
        this.notificationType = notificationType;
    }

    public String getIdTender() {
        return idTender;
    }

    public void setIdTender(String idTender) {
        this.idTender = idTender;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }

    public String getIdSupplier() {
        return idSupplier;
    }

    public void setIdSupplier(String idSupplier) {
        this.idSupplier = idSupplier;
    }

    public String getReadingDate() {
        return readingDate;
    }

    public void setReadingDate(String readingDate) {
        this.readingDate = readingDate;
    }

    @Override
    public String toString() {
        return "UserNotification{" +
                "id=" + id +
                ", userId='" + userId + '\'' +
                ", notificationType='" + notificationType + '\'' +
                ", idTender='" + idTender + '\'' +
                ", creationDate=" + creationDate +
                ", idSupplier='" + idSupplier + '\'' +
                ", readingDate='" + readingDate + '\'' +
                '}';
    }
}
