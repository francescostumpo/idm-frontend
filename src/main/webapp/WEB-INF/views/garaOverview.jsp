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

<body ng-controller="commonController" id="page-top" class="background-snam text-lato-snam" ng-app="snamApp">
    <div id="loading" style="background-color: white">
        <img id="loading-image" src="webapp/img/spinner-gif.gif" height="25%" />
    </div>
    <nav id="dashboardNavbar" ng-if="!sidebarIsClosed" ng-controller="navbarController" ng-if="!sidebarIsClosed"
        class="navbar navbar-expand navbar-light bg-white topbar navbar-background-snam shadow">
        <jsp:include page="subviews/dashboardNavbar.jsp"></jsp:include>
    </nav>
    <jsp:include page="subviews/dashboardSidebar.jsp"></jsp:include>


    <div id="wrapper" ng-controller="garaOverviewController">
        <div id="content-wrapper" class="d-flex flex-column">
            <!-- Header Section -->
            <div class="header-section">
                <div class="container-fluid">
                    <div class="col-lg-12 col-md-12 col-sm-12 mt-3">
                        <jsp:include page="subviews/breadcrumb.jsp"></jsp:include>
                        <div class="col-md-12 col-sm-12 col-lg-12 row">
                            <h3 class="font-bold">{{bandoGara.object}}</h3>
                            <div class="ml-2 my-auto col-lg-1 col-md-1 col-sm-1">
                                <i class="text-primary fa fa-ellipsis-h" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false" style="cursor: pointer;"></i>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <p class="text-primary dropdown-item no-margin-bottom" style="cursor: pointer;">
                                        <i class="far fa-edit fa-fw fa-lg pointer"></i>
                                        <span class="ml-2">Modifica</span>
                                    </p>
                                    <div class="dropdown-divider"></div>
                                    <p class="text-primary dropdown-item no-margin-bottom" style="cursor: pointer;">
                                        <i class="far fa-trash-alt fa-fw fa-lg pointer"></i>
                                        <span class="ml-2">Elimina</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 mb-2" style="padding-left: 0rem !important;">
                            <div class="row mt-4">
                                <div class="col-lg-4 col-md-4 col-sm-12">
                                    <div class="form-group">
                                        <label class="label-item">SOCIETA'</label>
                                        <p class="font-bold">{{bandoGara.company}}</p>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-12">
                                    <div class="form-group">
                                        <label class="label-item">NUMERO GARA</label>
                                        <p class="font-bold">{{bandoGara.sapNumber}}</p>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-12">
                                    <div class="form-group">
                                        <label class="label-item">CIG</label>
                                        <p class="font-bold">{{bandoGara.cig[0]}}</p>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-12">
                                    <div class="form-group">
                                        <label class="label-item">SCADENZA</label>
                                        <p class="font-bold">{{bandoGara.endDate | date: 'dd/MM/yyyy'}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Header Section -->
            <!-- Main Section -->
            <div class="container-fluid" style="background: #E6ECF2; height: 180vh;">
                <div class="col-lg-12 col-md-12 col-sm-12 mt-3">
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                        <li class="nav-item">
                            <p class="nav-link active" id="pills-supplier-tab" data-toggle="pill" role="tab"
                                aria-controls="pills-suppliers" aria-selected="true"
                                ng-click="makeVisibleTab('pills-supplier', 'pills-challenge')">Caricamenti Fornitori</p>
                        </li>
                        <li class="nav-item">
                            <p class="nav-link" id="pills-challenge-tab" data-toggle="pill" role="tab"
                                aria-controls="pills-challenge" aria-selected="false"
                                ng-click="makeVisibleTab('pills-challenge', 'pills-supplier')">Documentazione di gara
                            </p>
                        </li>
                    </ul>

                    <div class="tab-content mt-2" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-supplier" role="tabpanel"
                            aria-labelledby="pills-supplier-tab">
                            <div class="row mt-2">
                                <div class="my-auto  col-lg-10 col-md-10 col-sm-12">
                                    <p class="my-auto text-size-16 text-secondary ">{{suppliers.length}} FORNITORI
                                        CARICATI</p>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-12">
                                    <button
                                        ng-click="openModalUploadDocument('uploadDocumentModalNewFornitore','fileselect4','filedrag4','imageUpload4')"
                                        class="btn button-block button-primary-buyer">
                                        <i class="fa fa-plus"></i>
                                        <span class="ml-2">AGGIUNGI FORNITORE</span>
                                    </button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-3 col-sm-12 mt-3" ng-repeat="supplier in suppliers">
                                    <div class="card shadow">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-lg-11 col-md-11 col-sm-11">
                                                    <div id="circle"
                                                        style="width: 50px; height: 50px; float: left; margin-right: 5%; -webkit-border-radius: 25px; -moz-border-radius: 25px; border-radius: 25px; background: #DCF4F2;">
                                                        <div
                                                            style="text-align: center; margin-top: 0.7em;">
                                                            {{supplier.name.substring(0, 3).toUpperCase() }} 
                                                        </div>
                                                    </div> 
                                                    <div>
                                                        <p class="font-bold pointer"
                                                            ng-click="goToView('fornitoreOverview', supplier)"
                                                            style="margin-top: 4%;">{{supplier.name}}</p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-1 col-md-1 col-sm-1">
                                                    <i class="fa fa-ellipsis-v" data-toggle="dropdown"
                                                        aria-haspopup="true" aria-expanded="false"
                                                        style="cursor: pointer;"></i>
                                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                        <p class="text-primary dropdown-item no-margin-bottom"
                                                            style="cursor: pointer;">
                                                            <i class="far fa-edit fa-fw fa-lg pointer"></i>
                                                            <span class="ml-2">Modifica</span>
                                                        </p>
                                                        <div class="dropdown-divider"></div>
                                                        <p class="text-primary dropdown-item no-margin-bottom"
                                                            style="cursor: pointer;">
                                                            <i class="far fa-trash-alt fa-fw fa-lg pointer"></i>
                                                            <span class="ml-2">Elimina</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="break mt-3 mb-3"></div>
                                            <div class="row mb-3">
                                                <div class="col-lg-9 col-md-9 col-sm-9">6/8 documenti</div>
                                                <div class="danger-color text-center col-lg-3 col-md-3 col-sm-3">
                                                     <span>3 </span> 
                                                    <i class="mr-1 fas fa-exclamation-triangle" style="margin-left: 0.4em;"></i> 
                                                </div>
                                            </div>
                                            <div class="progress" style="height:.5rem;">
                                                <div class="progress-bar bg-info" style="width: 70%;" role="progressbar"
                                                    aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                                <div class="progress-bar bg-danger" style="width: 20%;"
                                                    role="progressbar" aria-valuenow="0" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="pills-challenge" role="tabpanel"
                            aria-labelledby="pills-challenge-tab">
                            <div class="row mt-2">
                                <!-- Show Lost -->
                                <div ng-hide="showDocument" class="col-lg-12 col-md-12 col-sm-12">
                                    <div class="d-flex justify-content-end">
                                        <button
                                            ng-click="openModalUploadDocument('uploadDocumentModalOverviewGara','fileselect3','filedrag3','imageUpload3')"
                                            class="btn button-primary-buyer">
                                            <i class="fa fa-plus"></i>
                                            <span class="ml-2">AGGIUNGI DOCUMENTO</span>
                                        </button>
                                    </div>
                                    <div class="card mt-2 no-border">
                                        <div class="card-header d-flex justify-content-center">
                                            <div class="col-lg-1 col-md-1 col-sm-1"></div>
                                            <div ng-click="sortCardsByColumnName('name')"
                                                class="col-lg-7 col-md-7 col-sm-7 text-size-14 no-select">
                                                DOCUMENTO
                                                <i ng-if="sort.name === 'desc'"
                                                    class="fas fa-sort-down hoverable sort-chev"></i>
                                                <i ng-if="sort.name === 'asc'"
                                                    class="fas fa-sort-up hoverable sort-chev"></i>
                                            </div>
                                            <div ng-click="sortCardsByColumnName('uploadedAt')"
                                                class="col-lg-3 col-md-3 col-sm-3 text-size-14 no-select">
                                                CARICATO IL
                                                <i ng-if="sort.uploadedAt === 'desc'"
                                                    class="fas fa-sort-down hoverable sort-chev"></i>
                                                <i ng-if="sort.uploadedAt === 'asc'"
                                                    class="fas fa-sort-up hoverable sort-chev"></i>
                                            </div>
                                            <div class="col-lg-1 col-md-1 col-sm-1"></div>
                                        </div>
                                    </div>
                                    <div class="card" ng-repeat="document in tenderAttachments">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="my-auto col-lg-1 col-md-1 col-sm-1">
                                                    <input ng-checked="checkDocument(document)"
                                                        ng-click="selectDocument(document)" type="checkbox"
                                                        class="ml-3 my-auto pointer">
                                                    <i class="ml-4 fa fa-check-circle" style="color: limegreen"></i>
                                                </div>
                                                <div class="col-lg-7 col-md-7 col-sm-7">
                                                    <div class="row flex-long-text">
                                                        <i class="my-auto  ml-2 mr-2 fas fa-file-pdf fa-2x"
                                                            style="color: red;"></i>
                                                        <p
                                                            class="my-auto  no-margin-bottom text-size-16 text-bold crop">
                                                            {{document.fileName}}</p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3">
                                                    <p class="my-auto no-margin-bottom text-size-16 text-bold">
                                                        {{ document.uploadedOn.time | date: 'dd/MM/yyyy - HH:mm'}} </p>
                                                </div>
                                                <div class="col-lg-1 col-md-1 col-sm-1 d-flex justify-content-center"><i
                                                        class="my-auto fa fa-ellipsis-h pointer"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Show Document -->
                                <div class="col-lg-12 col-md-12 col-sm-12 mb-5" ng-show="showDocument">
                                    <div class="row">
                                        <div class="col-lg-5 col-md-5 col-sm-5">
                                            <div class="d-flex justify-content-end">
                                                <button class="btn button-neutral-compare-advise m-1">
                                                    <i class="fas fa-sync fa-flip-horizontal"></i>
                                                    <span class="ml-1 text-size-12">SOSTITUISCI</span>
                                                </button>
                                                <button class="btn button-neutral-compare-advise m-1">
                                                    <i class="far fa-trash-alt fa-fw fa-lg pointer"></i>
                                                    <span class="ml-1 text-size-12">ELIMINA</span>
                                                </button>
                                            </div>
                                            <div class="card mt-2 no-border">
                                                <div class="card-header d-flex">
                                                    <div class="col-lg-2 col-md-2 col-sm-2"></div>
                                                    <div ng-click="sortCardsByColumnName('name')"
                                                        class="col-lg-9 col-md-9 col-sm-9 text-size-12 no-select">
                                                        DOCUMENTO
                                                        <i ng-if="sort.name === 'desc'"
                                                            class="fas fa-sort-down hoverable sort-chev"></i>
                                                        <i ng-if="sort.name === 'asc'"
                                                            class="fas fa-sort-up hoverable sort-chev"></i>
                                                    </div>
                                                    <div
                                                        class="col-lg-1 col-md-1 col-sm-1 d-flex justify-content-center">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card" ng-repeat="document in tenderAttachments">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-lg-2 col-md-2 col-sm-2">
                                                            <div class="row">
                                                                <input ng-checked="checkDocument(document)"
                                                                    ng-click="selectDocument(document)"
                                                                    type="checkbox"
                                                                    class="my-auto  col-lg-7 col-md-7 col-sm-12 pointer">
                                                                <i class="ml-2 fa fa-check-circle"
                                                                    style="color: limegreen"></i>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-9 col-md-9 col-sm-9">
                                                            <div class="row flex-long-text">
                                                                <i class="my-auto  ml-2 mr-2 fas fa-file-pdf fa-lg"
                                                                    style="color: red;"></i>
                                                                <p
                                                                    class="my-auto no-margin-bottom text-size-14 text-bold crop">
                                                                    {{document.fileName}}</p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="col-lg-1 col-md-1 col-sm-1 icon-group d-flex justify-content-center">
                                                            <i class="my-auto fa fa-ellipsis-h pointer"></i></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-7 col-md-7 col-sm-7">
                                            <div class="card">
                                                <div class="card-header card-header-document-viewer">
                                                    <div class="row text-size-14">
                                                        <div class="col-lg-2 col-md-2 col-sm-12">
                                                            <div class="form-group document-viewer-br">
                                                                <label class="label-item">CIG</label>
                                                                <p>{{bandoGara.cig[0]}}</p>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-3 col-md-3 col-sm-12">
                                                            <div class="form-group document-viewer-br">
                                                                <label class="label-item">DATA CARICAMENTO</label>
                                                                <p>{{selectedDocuments[0].uploadOn.time | date: 'dd/MM/yyyy' }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-md-6 col-sm-12">
                                                            <div class="form-group">
                                                                <label class="label-item">NOME FILE</label>
                                                                <p>{{selectedDocuments[0].fileName}}</p>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-1 col-md-1 col-sm-12">
                                                            <div class="form-group expand-document-button" style="margin-top: 20%;">
                                                                <a class="document-fullview" target="_blank" href="http://127.0.0.1:3030/documentDetail">
                                                                    <i class="fas fa-expand-arrows-alt fa-2x"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card-body">
                                                    <object class="document-container" data="" type="application/pdf"
                                                        width="100%" style="height: 150vh">
                                                        <embed class="document-container" src=""
                                                            type="application/pdf"></embed>
                                                    </object>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
        <jsp:include page="subviews/modal/uploadDocumentModalNewFornitore.jsp"></jsp:include>
        <jsp:include page="subviews/modal/uploadDocumentModalOverviewGara.jsp"></jsp:include>
    </div>

</body>
<jsp:include page="subviews/scripts.jsp"></jsp:include>
<script type="text/javascript" src="webapp/AngularJS/controllers/garaOverviewController.js"></script>

</html>