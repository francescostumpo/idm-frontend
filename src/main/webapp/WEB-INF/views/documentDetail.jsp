<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="snamApp"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>SNAM - IDM</title>

    <jsp:include page="subviews/cssSheets.jsp"></jsp:include>
</head>

<body ng-controller="documentDetailController" id="page-top" class="background-snam text-lato-snam" ng-app="snamApp">


    <div class="card-body" style="width: 70%;  background-color: #E6ECF2; float: left;">
        <div style="width: 100%; height: 5em;">
            <div style="padding-top: 1%;">
                <a href="/fornitoreOverview" class="icon-block">
                    <i class="fa fa-arrow-left" aria-hidden="true"
                        style="float: left; font-size: 1.3em; padding-top: 0.5%; padding-left: 1%;"></i>
                </a>
                <span
                    style="font-family: Ubuntu; font-size: 21px; color: #1D2A30; letter-spacing: 0.56px; text-align: center; padding-left: 35%;">
                    Patto Etico e d'Integrita' </span>
            </div>
        </div>
        <object class="document-container" data="" type="application/pdf" width="100%" style="height: 150vh">
            <embed class="document-container" src="" type="application/pdf"></embed>
        </object>
    </div>



    <div style="width: 30%; height: 161vh; float: left; background-color: #FFFFFF;">
        <div class="doc-detail-buttons">
            <div style="float: left; width: 50%; padding-left: 7%;">
                <button class="btn button-primary-buyer m-4"
                    style="height: 2.5rem; width: 10rem; mrgin-right: 2%; background: #FFFFFF; border: 1px solid #004B9C; border-radius: 4px;">
                    <i class="my-auto fas fa-sync fa-flip-horizontal fa-fw fa-lg pointer" aria-hidden="true"
                        style="float: left; padding-top: 2%;"></i>
                    <span class="ml-1 text-size-14"
                        style="font-family: Ubuntu; font-size: 13px; color: #004B9C; letter-spacing: 0.35px;">Sostituisci</span>
                </button>
            </div>
            <div style="padding-left: 7%;">
                <button
                    ng-click="openModalUploadDocument('uploadDocumentModalOverviewFornitore','fileselect2','filedrag2','imageUpload2')"
                    class="btn button-primary-buyer m-4"
                    style="height: 2.5rem; width: 10rem; mrgin-right: 2%; background: #FFFFFF; border: 1px solid #004B9C; border-radius: 4px;">
                    <i class="far fa-trash-alt fa-fw fa-lg pointer" style="float: left; padding-top: 2%;"></i>
                    <span class="ml-1 text-size-14"
                        style="font-family: Ubuntu; font-size: 13px; color: #004B9C; letter-spacing: 0.35px;">Elimina</span>
                </button>
            </div>

        </div>
        <div class="doc-detail-header">
            <span class="doc-detail-title"
                style="font-family: Ubuntu; font-size: 24px; margin-left: 33px; width: 100%; font-weight: bold; color: #1D2A30; letter-spacing: 0.64px;">
                Patto Etico e di Integrita' </span>
            <span
                style="font-family: Ubuntu; font-size: 12px; width: 100%; float: left; margin-left: 2.2rem; font-weight: bold;margin-top: 5%;color: #004AA2; letter-spacing: 0;">
                VALVITALIA SPA </span>
            <span
                style="font-family: Ubuntu; font-size: 14px; float: left; margin-top: 2%; width: 85%; margin-left: 7%;color: #1D2A30; letter-spacing: 0.38px;">
                Fornitura e installazione in opera di attuatori elettrici per il terminale di Palmi </span>
        </div>
        <div class="doc-detail-content">
            <div class="doc-content-codice-gara">
                <span
                    style="font-family: Ubuntu; font-size: 12px; color: #727888; letter-spacing: 0; width: 100%; float: left; margin-top: 15%; margin-left: 7%; margin-bottom: 2%;">
                    Codice Gara </span>
                <span
                    style="font-family: Ubuntu; font-size: 18px; color: #1D2A30; letter-spacing: 0; margin-left: 7.5%; margin-top:2%;">
                    MAM019-023C </span>
                <hr style="width: 80%; float: left;">
            </div>
            <div class="doc-content-cig">
                <span
                    style="font-family: Ubuntu; font-size: 12px; color: #727888; letter-spacing: 0; width: 100%; float: left; margin-top: 2%; margin-left: 7%; margin-bottom: 2%;">
                    CIG </span>
                <span
                    style="font-family: Ubuntu; font-size: 18px; color: #1D2A30; letter-spacing: 0; margin-left: 7.5%; margin-top:2%;">
                    7600013696 </span>
                <hr style="width: 80%; float: left;">
            </div>
            <div class="doc-content-data">
                <span
                    style="font-family: Ubuntu; font-size: 12px; color: #727888; letter-spacing: 0; width: 100%; float: left; margin-top: 2%; margin-left: 7%; margin-bottom: 2%;">
                    Data Caricamento </span>
                <span
                    style="font-family: Ubuntu; font-size: 18px; color: #1D2A30; letter-spacing: 0; margin-left: 7.5%; margin-top:2%;">
                    23/07/2020 </span>
                <hr style="width: 80%; float: left;">
            </div>
            <div class="doc-content-nome-file">
                <span
                    style="font-family: Ubuntu; font-size: 12px; color: #727888; letter-spacing: 0; width: 100%; float: left; margin-top: 2%; margin-left: 7%;">
                    Nome File </span>
                <span
                    style="font-family: Ubuntu; font-size: 18px; color: #1D2A30; letter-spacing: 0; margin-left: 7.5%; float: left; margin-top:2%;">
                    Patto Etico e d'Integrita' </span>
                <hr style="width: 80%; float: left;">
            </div>
        </div>
        <div class="doc-detail-controlli" style="margin-top: 45%;">
            <span class="doc-controlli-title"
                style="font-family: Ubuntu; font-size: 24px; margin-left: 33px; width: 100%; font-weight: bold; color: #1D2A30; letter-spacing: 0.64px;">Controlli
            </span>
            <span
                style="font-family: Ubuntu; font-size: 12px; color: #727888; letter-spacing: 0; width: 100%; float: left; margin-top: 5%; margin-left: 7%;">
                DATA </span>
            <div>
                <i class="my-auto ml-2 fa fa-check-circle pointer"
                    style="color: limegreen; color: limegreen; padding-left: 5%; padding-top: 4%; padding-right: 5%; font-size: 1.73em;"></i>
                <span
                    style="font-family: Ubuntu; font-size: 18px; font-weight: bold; color: #1D2A30; letter-spacing: 0;">
                    Presente </span>
            </div>
            <hr style="width: 80%; float: left;">
            <span
                style="font-family: Ubuntu; font-size: 12px; color: #727888; letter-spacing: 0; width: 100%; float: left; margin-top: 5%; margin-left: 7%;">
                FIRMA </span>
            <div>
                <i class="my-auto ml-2 fa fa-check-circle pointer"
                    style="color: limegreen; color: limegreen; padding-left: 5%; padding-top: 4%; padding-right: 5%; font-size: 1.73em;"></i>
                <span
                    style="font-family: Ubuntu; font-size: 18px; color: #1D2A30; letter-spacing: 0; font-weight: bold;">
                    Presente </span>
            </div>
            <hr style="width: 80%; float: left;">
            <span
                style="font-family: Ubuntu; font-size: 12px; color: #727888; letter-spacing: 0; width: 100%; float: left; margin-top: 5%; margin-left: 7%;">
                TIMBRO </span>
            <div>
                <i class="my-auto ml-2 fa fa-check-circle pointer"
                    style="color: limegreen; color: limegreen; padding-left: 5%; padding-top: 4%; padding-right: 5%; font-size: 1.73em;"></i>
                <span
                    style="font-family: Ubuntu; font-size: 18px; color: #1D2A30; letter-spacing: 0; font-weight: bold;">
                    Presente </span>
            </div>
            <hr style="width: 80%; float: left;">
            <span
                style="font-family: Ubuntu; font-size: 12px; color: #727888; letter-spacing: 0; width: 100%; float: left; margin-top: 5%; margin-left: 7%;">
                CIG </span>
            <div>
                <i class="my-auto ml-2 fa fa-check-circle pointer"
                    style="color: limegreen; color: limegreen; padding-left: 5%; padding-top: 4%; padding-right: 5%; font-size: 1.73em;"></i>
                <span
                    style="font-family: Ubuntu; font-size: 18px; color: #1D2A30; letter-spacing: 0; font-weight: bold;">
                    Presente </span>
            </div>
            <hr style="width: 80%; float: left;">
            <span
                style="font-family: Ubuntu; font-size: 12px; color: #727888; letter-spacing: 0; width: 100%; float: left; margin-top: 5%; margin-left: 7%;">
                NUMERO GARA </span>
            <div>
                <i class="my-auto ml-2 fa fa-check-circle pointer"
                    style="color: limegreen; color: limegreen; padding-left: 5%; padding-top: 4%; padding-right: 5%; font-size: 1.73em;"></i>
                <span
                    style="font-family: Ubuntu; font-size: 18px; color: #1D2A30; letter-spacing: 0; font-weight: bold;">
                    Presente </span>
            </div>
        </div>
    </div>

</body>

<jsp:include page="subviews/scripts.jsp"></jsp:include>
<script type="text/javascript" src="./webapp/AngularJS/controllers/documentDetailController.js"></script>