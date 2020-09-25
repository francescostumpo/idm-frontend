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

<body ng-controller="commonController" id="page-top" class="background-color-application text-lato-snam" ng-app="snamApp">
    <div id="loading" style="background-color: white">
        <img id="loading-image" src="webapp/img/spinner-gif.gif" height="25%" />
    </div>
    <nav id="dashboardNavbar" ng-if="!sidebarIsClosed" ng-controller="navbarController" ng-if="!sidebarIsClosed"
        class="navbar navbar-expand navbar-light bg-white topbar navbar-background-snam shadow">
        <jsp:include page="subviews/dashboardNavbar.jsp"></jsp:include>
    </nav>
    <jsp:include page="subviews/dashboardSidebar.jsp"></jsp:include>

    <div ng-controller="overviewFornitoreController">
        <div id="content-wrapper" class="d-flex flex-column">
            <!-- Header Section -->
            <div class="header-section">
                <div class="container-fluid">
                    <div class="col-lg-12 col-md-12 col-sm-12 mt-3">
                        <jsp:include page="subviews/breadcrumb.jsp"></jsp:include>
                        <div class="col-md-12 col-sm-12 col-lg-12 row">
                            <h3 class="my-auto font-bold">{{fornitoreOverview.name}}</h3>
                            <div class="ml-2 my-auto col-lg-1 col-md-1 col-sm-1">
                                <i class="text-primary fa fa-ellipsis-h" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false" style="cursor: pointer;"></i>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <p ng-click="openModalEditSupplier()" class="text-primary dropdown-item no-margin-bottom" style="cursor: pointer;">
                                        <i class="far fa-edit fa-fw fa-lg pointer"></i>
                                        <span  class="ml-2">Modifica</span>
                                    </p>
                                    <div class="dropdown-divider"></div>
                                    <p class="text-primary dropdown-item no-margin-bottom" style="cursor: pointer;">
                                        <i class="far fa-trash-alt fa-fw fa-lg pointer"></i>
                                        <span class="ml-2">Elimina</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 mb-2" style="padding-left: 0rem !important;">
                            <div class="row mt-4">
                                <div class="col-lg-2 col-md-2 col-sm-12">
                                    <div class="form-group">
                                        <label class="label-item">CODICE GARA</label>
                                        <p class="font-bold">{{bandoGara.sapNumber}}</p>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-12">
                                    <div class="form-group">
                                        <label class="label-item">CIG</label>
                                        <p class="font-bold">{{bandoGara.cig[0]}}</p>
                                    </div>
                                </div>
                                <div class="col-lg-8 col-md-8 col-sm-12">
                                    <div class="form-group">
                                        <label class="label-item">OGGETTO</label>
                                        <p class="font-bold">{{bandoGara.object}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="padding-top: 2%;">
                    <div class="col-lg-2 col-md-2 col-sm-12"
                        style="float: left; padding-top: 1%; padding-left: 3%; padding-bottom: 1%;"> <span class="span-progress-bar-header" style="color: grey;"> <span style="font-size:28px;"> {{requiredAttachments.length}} </span> RICHIESTI </span> </div>
                    <div class="col-lg-2 col-md-2 col-sm-12"
                        style="float: left; padding-top: 1%; padding-left: 3%; padding-bottom: 1%;"> <span
                            class="span-progress-bar-header" style="color: grey;"> <span
                                style="font-size:28px; color: #36A8DF !important;"> {{compliants}} </span> / {{requiredAttachments.length}} CARICATI </span>
                    </div>
                    <div class="col-lg-8 col-md-8 col-sm-12"
                        style="float: left; padding-top: 1%; padding-left: 3%; padding-bottom: 1%;"> <span
                            class="span-progress-bar-header" style="float: right; padding-right: 4%; color: grey;">
                            <span style="font-size:28px; color: #e74a3b !important;"> {{notCompliants}} </span> NON CONFORMI </span>
                    </div>
                    <div class="progress" style="height:0.5rem; width: 100%;">
                        <div class="pg-presence progress-bar bg-info" role="progressbar" aria-valuenow="0"
                            aria-valuemin="0" aria-valuemax="100"></div>
                        <div class="pg-check progress-bar bg-danger" role="progressbar" aria-valuenow="0"
                            aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>


            </div>
            <!-- End Header Section -->
            <!-- Main Section -->
            <div class="container-fluid" >
                <div class="col-lg-12 col-md-12 col-sm-12 mb-5 mt-3">
                    <div class="row mt-2">
                        <!-- Show list -->
                        <div ng-hide="showDocument" class="col-lg-12 col-md-12 col-sm-12">
                            <div class="d-flex justify-content">
                                <div class="col-lg-10 col-md-10 col-sm-10;" style="float: left; padding-top: 1%; padding-bottom:2%;">
                                    <span style="font-family: Ubuntu; font-size: 22px; color: #1D2A30; letter-spacing: 0; font-weight: bold;">
                                        Checklist Documenti Richiesti
                                    </span>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2" style="height: 5rem;">
                                    <button
                                        ng-click="openModalUploadDocument('uploadDocumentModalOverviewFornitore','fileselect2','filedrag2','imageUpload2')"
                                        class="btn button-primary-buyer m-4"
                                        style="height: 3rem; width: 15rem; mrgin-right: 2%;">
                                        <i class="fas fa-plus"></i>
                                        <span class="ml-1 text-size-14">AGGIUNGI DOCUMENTI</span>
                                    </button>
                                </div>
                            </div>
                            <div class="card mt-2 no-border">
                                <div class="row card-body background-color-application justify-content-center">
                                    <div class="col-lg-1 col-md-1 col-sm-1 text-size-14">
                                        CHECK
                                    </div>
                                    <div ng-click="sortCardsByColumnName('name')"
                                        class="col-lg-6 col-md-6 col-sm-6 text-size-14 no-select">
                                            DOCUMENTO
                                        <i ng-if="sort.name === 'desc'"
                                            class="fas fa-sort-down hoverable sort-chev"></i>
                                        <i ng-if="sort.name === 'asc'" class="fas fa-sort-up hoverable sort-chev"></i>
                                    </div>
                                    <div ng-click="sortCardsByColumnName('uploadedAt')"
                                        class="col-lg-2 col-md-2 col-sm-2 text-size-14 no-select">
                                        CARICATO IL
                                        <i ng-if="sort.uploadedAt === 'desc'"
                                            class="fas fa-sort-down hoverable sort-chev"></i>
                                        <i ng-if="sort.uploadedAt === 'asc'"
                                            class="fas fa-sort-up hoverable sort-chev"></i>
                                    </div>
                                    <div ng-click="sortCardsByColumnName('conformity')"
                                        class="col-lg-2 col-md-2 col-sm-2 text-size-14 no-select">
                                        CONFORMIT&Agrave;
                                        <i ng-if="sort.conformity === 'desc'"
                                            class="fas fa-sort-down hoverable sort-chev"></i>
                                        <i ng-if="sort.conformity === 'asc'"
                                            class="fas fa-sort-up hoverable sort-chev"></i>
                                    </div>
                                    <div class="col-lg-1 col-md-1 col-sm-1"></div>
                                </div>
                            </div>
                            <div class="card" ng-repeat="document in requiredAttachments">
                                <div ng-style="highlightCard(document)" class="card-body">
                                    <div class="row">
                                        <div ng-click="selectDocument(document, false)" class="text-center pointer my-auto col-lg-1 col-md-1 col-sm-1">
                                            <i ng-if="document.isPresent" class="ok-color my-auto ml-2 fa fa-check-circle pointer"></i>
                                            <i  ng-if="!document.isPresent" class="danger-color my-auto fas fa-exclamation-triangle ml-2"></i>
                                        </div>
                                        <div ng-click="selectDocument(document, false)" class="pointer my-auto  col-lg-6 col-md-6 col-sm-6">
                                            <div class="row flex-long-text">
                                                <i ng-if="document.isPresent" class="my-auto ml-2 mr-4 fas fa-file-pdf fa-2x"
                                                    style="color: red;"></i>
                                                <i ng-if="!document.isPresent" style="color: #CFD6DB" class="my-auto ml-2 mr-4 fa-2x fas fa-file"></i>
                                                <p ng-style="checkIfTagIsPresent(document)" class="my-auto  no-margin-bottom text-size-16 text-bold crop">
                                                    {{document.label}}</p>
                                            </div>
                                        </div>
                                        <div ng-click="selectDocument(document, false)" class="pointer my-auto col-lg-2 col-md-2 col-sm-2">
                                            <p ng-if="document.isPresent" class="my-auto  no-margin-bottom text-size-16 text-bold">
                                                {{document.uploadedOn.time | date: 'dd/MM/yyyy - HH:mm'}} </p>
                                            <p style="font-style: italic; color: #727888" ng-if="!document.isPresent" class="my-auto  no-margin-bottom text-size-16 text-bold">
                                                N/A </p>
                                        </div>
                                        <div class="my-auto col-lg-2 col-md-2 col-sm-2 text-size-14">
                                            <div ng-if="document.isPresent">
                                                <!--<div ng-if="document.conformity === 0"
                                                     class="my-auto  col-lg-10 col-md-10 col-sm-10 conformity-box conformity-box-green text-size-16">
                                                    <i class="mr-2 fas fa-check"></i>CONFORME</div>-->
                                                <div ng-if="document.conformity === 1"
                                                     class="my-auto col-lg-10 col-md-10 col-sm-10 conformity-box conformity-box-red text-size-14">
                                                    <i class="mr-2 fas fa-times"></i>NON CONFORME</div>
                                                <!--<div ng-if="document.conformity === 2"
                                                     class="my-auto col-lg-10 col-md-10 col-sm-10 conformity-box conformity-box-orange text-size-16">
                                                    <i class="mr-2 fas fa-exclamation"></i>NON CONTROLLATO</div>-->
                                            </div>
                                            <div ng-if="!document.isPresent">
                                                <p style="font-style: italic; color: #727888" class="my-auto  no-margin-bottom text-size-16 text-bold">
                                                    N/A </p>
                                            </div>
                                        </div>
                                        <div class=" justify-content-end text-primary row my-auto col-lg-1 col-md-1 col-sm-1">
                                            <i class="text-primary fa fa-ellipsis-h" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false" style="cursor: pointer;"></i>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                <p ng-click="deleteDocument(document)" class="text-primary dropdown-item no-margin-bottom" style="cursor: pointer;">
                                                    <i class="far fa-trash-alt fa-fw fa-lg pointer"></i>
                                                    <span class="ml-2">Elimina</span>
                                                </p>
                                                <p ng-click="openFeedbackModal(document)" class="text-primary dropdown-item no-margin-bottom" style="cursor: pointer;">
                                                    <i class="fa fa-exclamation-circle fa-fw fa-lg pointer"></i>
                                                    <span class="ml-2">Segnala</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Show Document -->
                        <div class="col-lg-12 col-md-12 col-sm-12 mb-5" ng-show="showDocument" id="page-requiredDoc-view">
                            <div class="row">
                                <div class="col-lg-5 col-md-5 col-sm-5">
                                    <div class="d-flex justify-content">
                                        <div class="col-lg-12 col-md-12 col-sm-12" style="float: left; padding-top: 1%; padding-bottom:2%;">
                                            <span style="font-family: Ubuntu; font-size: 22px; color: #1D2A30; letter-spacing: 0; font-weight: bold;">
                                                Checklist Documenti Richiesti
                                            </span>
                                        </div>
                                    </div>
                                    <div class="card mt-2 no-border">
                                        <div class="row card-body background-color-application justify-content-center">
                                            <div class="col-lg-2 col-md-2 col-sm-2 text-size-14">
                                                CHECK
                                            </div>
                                            <div ng-click="sortCardsByColumnName('name')"
                                                class="col-lg-6 col-md-6 col-sm-6 text-size-14 no-select">
                                                DOCUMENTO
                                                <i ng-if="sort.name === 'desc'"
                                                    class="fas fa-sort-down hoverable sort-chev"></i>
                                                <i ng-if="sort.name === 'asc'"
                                                    class="fas fa-sort-up hoverable sort-chev"></i>
                                            </div>
                                            <div ng-click="sortCardsByColumnName('conformity')"
                                                class="col-lg-3 col-md-3 col-sm-3 text-size-14">
                                                CONFORMIT&Agrave;
                                                <i ng-if="sort.conformity === 'desc'"
                                                    class="fas fa-sort-down hoverable sort-chev"></i>
                                                <i ng-if="sort.conformity === 'asc'"
                                                    class="fas fa-sort-up hoverable sort-chev"></i>
                                            </div>
                                            <div class="col-lg-1 col-md-1 col-sm-1"></div>
                                        </div>
                                    </div>
                                    <div class="card" ng-repeat="document in requiredAttachments">
                                        <div ng-style="highlightCard(document)"  class="card-body" >
                                            <div class="row">
                                                <div ng-click="selectDocument(document)" class="text-center pointer col-lg-2 col-md-2 col-sm-2">
                                                    <i ng-if="!document.isPresent"
                                                        class="danger-color my-auto ml-2 fas fa-exclamation-triangle pointer"
                                                        ></i>
                                                    <i ng-if="document.isPresent"
                                                        class="ok-color my-auto ml-2 fa fa-check-circle pointer"
                                                        ></i>
                                                </div>
                                                <div ng-click="selectDocument(document)" class="pointer  col-lg-6 col-md-6 col-sm-6">
                                                    <div class="row flex-long-text">
                                                        <i class="my-auto  ml-2 mr-2 fas fa-file-pdf fa-lg"
                                                            style="color: red;"></i>
                                                        <p ng-style="checkIfTagIsPresent(document)" class="my-auto no-margin-bottom text-size-16 text-bold crop">
                                                            {{document.label}}</p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3">
                                                    <!--<div ng-if="document.conformity === 0"
                                                        class="my-auto  col-lg-10 col-md-10 col-sm-10 conformity-box conformity-box-green text-size-12">
                                                        <i class="mr-2 fas fa-check"></i>CONFORME</div>-->
                                                    <div ng-if="document.conformity === 1"
                                                        class="my-auto col-lg-10 col-md-10 col-sm-10 conformity-box conformity-box-red text-size-12">
                                                        <i class="mr-2 fas fa-times"></i>NON CONFORME</div>
                                                    <!--<div ng-if="document.conformity === 2"
                                                        class="my-auto col-lg-10 col-md-10 col-sm-10 conformity-box conformity-box-orange text-size-12">
                                                        <i class="mr-2 fas fa-exclamation"></i>NON CONTROLLATO</div>-->
                                                </div>
                                                <div class="my-auto justify-content-end col-sm-1 col-lg-1 col-md-1 row icon-group">
                                                    <i class="text-primary fa fa-ellipsis-h" data-toggle="dropdown" aria-haspopup="true"
                                                       aria-expanded="false" style="cursor: pointer;"></i>
                                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                        <p ng-click="deleteDocument(document)" class="text-primary dropdown-item no-margin-bottom" style="cursor: pointer;">
                                                            <i class="far fa-trash-alt fa-fw fa-lg pointer"></i>
                                                            <span class="ml-2">Elimina</span>
                                                        </p>
                                                        <p ng-click="openFeedbackModal(document)" class="text-primary dropdown-item no-margin-bottom" style="cursor: pointer;">
                                                            <i class="fa fa-exclamation-circle fa-fw fa-lg pointer"></i>
                                                            <span class="ml-2">Segnala</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-7 col-md-7 col-sm-7">
                                    <div class="card">
                                        <div class="card-header card-header-document-viewer">
                                            <div class="row text-size-14">
                                                <!--<div class="col-lg-2 col-md-2 col-sm-12">
                                                    <div class="form-group document-viewer-br" style="height: 75%; margin-top: 5%;">
                                                        <label class="label-item"
                                                            style="padding-top: 7%; float: left;">DATA</label>
                                                        <div> <i *ngIf="document.fileName"
                                                                class="my-auto ml-3 fa fa-check-circle pointer ng-scope"
                                                                style="padding-top: 8%;"> </i>
                                                             <i *ngIf="!document.fileName"
                                                                class="my-auto ml-2 fas fa-exclamation-triangle pointer ng-scope"
                                                                style="padding-top: 8%;"> </i>
                                                        </div>
                                                    </div>
                                                </div>-->
                                                <!--<div class="col-lg-2 col-md-2 col-sm-12">
                                                    <div class="form-group document-viewer-br"
                                                        style="height: 75%; margin-top: 5%;">
                                                        <label class="label-item"
                                                            style="padding-top: 7%; float: left;">FIRMA</label>
                                                        <div> <i *ngIf="document.fileName"
                                                                class="my-auto ml-3 fa fa-check-circle pointer ng-scope"
                                                                style="padding-top: 8%;"> </i>
                                                        </div>
                                                    </div>
                                                </div>-->
                                                <!--<div class="col-lg-2 col-md-2 col-sm-12">
                                                    <div class="form-group document-viewer-br"
                                                        style="height: 75%; margin-top: 5%;">
                                                        <label class="label-item"
                                                            style="padding-top: 7%; float: left;">TIMBRO</label>
                                                        <div> <i *ngIf="document.fileName"
                                                                class="my-auto ml-3 fa fa-check-circle pointer ng-scope"
                                                                style="padding-top: 8%;"> </i>
                                                        </div>
                                                    </div>
                                                </div>-->
                                                <div class="my-auto col-lg-2 col-md-2 col-sm-12">
                                                    <div class="row form-group document-viewer-br">
                                                        <div class="col-md-8 col-lg-8 col-sm-8" >
                                                            CIG
                                                        </div>
                                                        <div class="col-md-4 col-lg-4 col-sm-4">
                                                            <span ng-show="documentSelectedForDetail.conformityDetail.cigConformity === 0" class="tooltip-custom">
                                                                <i   class="conformity-color my-auto fas fa-check-circle ng-scope"> </i>
                                                                <span class="tooltiptext">
                                                                    <div>
                                                                        Coerente
                                                                    </div>
                                                                </span>
                                                            </span>
                                                            <span ng-show="documentSelectedForDetail.conformityDetail.cigConformity === 1"  class="tooltip-custom">
                                                                <i  class="not-conformity-color my-auto  fas fa-times-circle ng-scope"> </i>
                                                                 <span class="tooltiptext">
                                                                    <div>
                                                                        Non Coerente
                                                                    </div>
                                                                </span>
                                                            </span >
                                                            <span ng-show="documentSelectedForDetail.conformityDetail.cigConformity === 2"  class="tooltip-custom">
                                                                <i  class="not-checked-conformity-color my-auto fas fa-exclamation-circle ng-scope"> </i>
                                                                <span class="tooltiptext">
                                                                    <div>
                                                                        Non Trovato
                                                                    </div>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="my-auto col-lg-3 col-md-3 col-sm-12">
                                                    <div class="row form-group">
                                                        <div class="col-md-8 col-lg-8 col-sm-8" >
                                                            NUMERO GARA
                                                        </div>
                                                        <div class="col-md-4 col-lg-4 col-sm-4">
                                                            <span ng-show="documentSelectedForDetail.conformityDetail.sapConformity === 0" class="tooltip-custom">
                                                                <i class="conformity-color my-auto fas fa-check-circle ng-scope"> </i>
                                                                <span class="tooltiptext">
                                                                    <div>
                                                                        Coerente
                                                                    </div>
                                                                </span>
                                                            </span>
                                                            <span ng-show="documentSelectedForDetail.conformityDetail.sapConformity === 1" class="tooltip-custom">
                                                                <i   class="not-conformity-color my-auto  fas fa-times-circle ng-scope"> </i>
                                                                 <span class="tooltiptext">
                                                                    <div>
                                                                        Non Coerente
                                                                    </div>
                                                                </span>
                                                            </span >
                                                            <span ng-show="documentSelectedForDetail.conformityDetail.sapConformity === 2"  class="tooltip-custom">
                                                                <i  class="not-checked-conformity-color my-auto fas fa-exclamation-circle ng-scope"> </i>
                                                                <span class="tooltiptext">
                                                                    <div>
                                                                        Non Trovato
                                                                    </div>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-7 col-md-7 col-sm-7">
                                                    <div class="form-group expand-document-button">
                                                        <a class="document-fullview" target="_blank" href="/documentDetail">
                                                            <i class="fas fa-expand-arrows-alt fa-2x"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <object class="document-container" data="" type="application/pdf"
                                                width="100%" style="height: 100vh">
                                                <embed class="document-container" src="" type="application/pdf"></embed>
                                            </object>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            <!-- Sezione Altri Documenti -->
            <div ng-hide="notRequiredAttachments.length === 0" class="container-fluid">
                <div class="col-lg-12 col-md-12 col-sm-12" ng-hide="showOptionalDocument">
                    <div class="d-flex justify-content">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <span style="font-family: Ubuntu; font-size: 22px; color: #1D2A30; letter-spacing: 0; font-weight: bold;">Altri Documenti</span>
                        </div>
                    </div>
                    <div class="card mt-2 no-border">
                        <div class="row card-body background-color-application justify-content-center">
                            <div class="col-lg-1 col-md-1 col-sm-1 text-size-14">

                            </div>
                            <div ng-click="sortCardsByColumnName('name')"
                                 class="col-lg-8 col-md-8 col-sm-8 text-size-14 no-select">
                                DOCUMENTO
                                <i ng-if="sort.name === 'desc'"
                                   class="fas fa-sort-down hoverable sort-chev"></i>
                                <i ng-if="sort.name === 'asc'" class="fas fa-sort-up hoverable sort-chev"></i>
                            </div>
                            <div ng-click="sortCardsByColumnName('uploadedAt')"
                                 class="col-lg-2 col-md-2 col-sm-2 text-size-14 no-select">
                                CARICATO IL
                                <i ng-if="sort.uploadedAt === 'desc'"
                                   class="fas fa-sort-down hoverable sort-chev"></i>
                                <i ng-if="sort.uploadedAt === 'asc'"
                                   class="fas fa-sort-up hoverable sort-chev"></i>
                            </div>
                            <div class="col-lg-1 col-md-1 col-sm-1"></div>
                        </div>
                    </div>
                    <div class="mb-5">
                        <div class="card" ng-repeat="document in notRequiredAttachments">
                            <div ng-style="highlightCard(document)" class="card-body">
                                <div class="row">
                                    <div ng-click="selectDocument(document, true)" class="pointer my-auto text-center col-lg-1 col-md-1 col-sm-1">
                                        <i class="my-auto ml-2 fas fa-file-pdf fa-2x"
                                           style="color: red;"></i>
                                    </div>
                                    <div ng-click="selectDocument(document, true)" class="pointer my-auto  col-lg-8 col-md-8 col-sm-8">
                                        <p class="my-auto no-margin-bottom text-size-16 text-bold crop">
                                            {{document.fileName}}
                                        </p>
                                    </div>
                                    <div class="my-auto col-lg-2 col-md-2 col-sm-2">
                                        <p class="my-auto  no-margin-bottom text-size-16 text-bold">
                                            {{document.uploadedOn.time | date: 'dd/MM/yyyy - HH:mm'}} </p>
                                    </div>
                                    <div class="justify-content-end text-primary row my-auto col-lg-1 col-md-1 col-sm-1">
                                        <i class="text-primary fa fa-ellipsis-h" data-toggle="dropdown" aria-haspopup="true"
                                           aria-expanded="false" style="cursor: pointer;"></i>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            <p ng-click="deleteDocument(document)" class="text-primary dropdown-item no-margin-bottom" style="cursor: pointer;">
                                                <i class="far fa-trash-alt fa-fw fa-lg pointer"></i>
                                                <span class="ml-2">Elimina</span>
                                            </p>
                                            <p ng-click="openFeedbackModal(document)" class="text-primary dropdown-item no-margin-bottom" style="cursor: pointer;">
                                                <i class="fa fa-exclamation-circle fa-fw fa-lg pointer"></i>
                                                <span class="ml-2">Segnala</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Show Document -->
                <div class="col-lg-12 col-md-12 col-sm-12 mb-5" ng-show="showOptionalDocument" id="page-notRequiredDoc-view">
                    <div class="row">
                        <div class="col-lg-5 col-md-5 col-sm-5">
                            <div class="d-flex justify-content-end">
                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    <span style="font-family: Ubuntu; font-size: 22px; color: #1D2A30; letter-spacing: 0; font-weight: bold;">Altri Documenti</span>
                                </div>
                            </div>
                            <div class="card mt-2 no-border">
                                <div class="row card-body background-color-application justify-content-center">
                                    <div class="col-lg-1 col-md-1 col-sm-1 text-size-14">
                                        CHECK
                                    </div>
                                    <div ng-click="sortCardsByColumnName('name')"
                                         class="col-lg-9 col-md-9 col-sm-9 text-size-14 no-select">
                                        DOCUMENTO
                                        <i ng-if="sort.name === 'desc'"
                                           class="fas fa-sort-down hoverable sort-chev"></i>
                                        <i ng-if="sort.name === 'asc'"
                                           class="fas fa-sort-up hoverable sort-chev"></i>
                                    </div>
                                    <div class="col-lg-2 col-md-2 col-sm-2"></div>
                                </div>
                            </div>
                            <div class="card" ng-repeat="document in notRequiredAttachments">
                                <div ng-style="highlightCard(document)" class="card-body" >
                                    <div class="row">
                                        <div ng-click="selectDocument(document, true)" class="pointer col-lg-1 col-md-1 col-sm-1">
                                            <i class="my-auto  ml-2 mr-2 fas fa-file-pdf fa-lg"
                                               style="color: red;"></i>
                                        </div>
                                        <div ng-click="selectDocument(document, true)" class="pointer col-lg-9 col-md-9 col-sm-9">
                                            <p class="my-auto no-margin-bottom text-size-16 text-bold crop">
                                                {{document.fileName}}
                                            </p>
                                        </div>
                                        <div class="my-auto justify-content-end my-auto col-sm-2 col-lg-2 col-md-2 row icon-group">
                                            <i class="my-auto text-primary fa fa-ellipsis-h" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false" style="cursor: pointer;"></i>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                <p ng-click="deleteDocument(document)" class="text-primary dropdown-item no-margin-bottom" style="cursor: pointer;">
                                                    <i class="far fa-trash-alt fa-fw fa-lg pointer"></i>
                                                    <span class="ml-2">Elimina</span>
                                                </p>
                                                <p ng-click="openFeedbackModal(document)" class="text-primary dropdown-item no-margin-bottom" style="cursor: pointer;">
                                                    <i class="fa fa-exclamation-circle fa-fw fa-lg pointer"></i>
                                                    <span class="ml-2">Segnala</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7 col-md-7 col-sm-7">
                            <div class="card">
                                <div class="card-header card-header-document-viewer">
                                    <div class="row text-size-14">
                                        <div class="col-lg-2 col-md-2 col-sm-12">
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12">
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12">
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12">
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12">
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12">
                                            <div class="form-group expand-document-button">
                                                <a class="document-fullview" target="_blank" href="/documentDetail">
                                                    <i class="fas fa-expand-arrows-alt fa-2x"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <object class="document-container" data="" type="application/pdf"
                                            width="100%" style="height: 100vh">
                                        <embed class="document-container" src="" type="application/pdf"></embed>
                                    </object>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- End of Main Section -->
        </div>
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>
        <jsp:include page="subviews/modal/uploadDocumentModalOverviewFornitore.jsp"></jsp:include>
        <jsp:include page="subviews/modal/sendFeedbackModalOverviewFornitore.jsp"></jsp:include>
        <jsp:include page="subviews/modal/editSupplierModal.jsp"></jsp:include>
    </div>

</body>
<jsp:include page="subviews/scripts.jsp"></jsp:include>
<script type="text/javascript" src="./webapp/AngularJS/controllers/overviewFornitoreController.js"></script>
