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

<body id="page-top" class="background-snam text-lato-snam" ng-app="snamApp">

<nav id="dashboardNavbar" ng-if="!sidebarIsClosed" class="navbar navbar-expand navbar-light bg-white topbar navbar-background-snam shadow" >
    <jsp:include page="subviews/dashboardNavbar.jsp"></jsp:include>
</nav>

<div id="wrapper" ng-controller="garaOverviewController">
    <div id="content-wrapper" class="d-flex flex-column" >
        <!-- Header Section -->
        <div class="header-section">
            <div class="container-fluid">
                <div class="col-lg-12 col-md-12 col-sm-12 mt-3">

                    <jsp:include page="subviews/breadcrumb.jsp"></jsp:include>
                    <h3 class="font-bold">{{bandoGara.oggetto}}</h3>
                    <div class="col-lg-6 col-md-6 col-sm-6 mb-2" style="padding-left: 0rem !important;">
                        <div class="row mt-4">
                            <div class="col-lg-3 col-md-3 col-sm-12">
                                <div class="form-group">
                                    <label class="label-item">SOCIETA'</label>
                                    <p class="font-bold">{{bandoGara.societa}}</p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-12">
                                <div class="form-group">
                                    <label class="label-item">CIG</label>
                                    <p class="font-bold">{{bandoGara.cig}}</p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-12">
                                <div class="form-group">
                                    <label class="label-item">CHIUSURA GARA</label>
                                    <p class="font-bold">{{bandoGara.chiusuraGara}}</p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-12">
                                <div class="form-group">
                                    <label class="label-item">FINE LAVORAZIONE</label>
                                    <p class="font-bold">{{bandoGara.lavorazione}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Header Section -->
        <!-- Main Section -->
        <div class="container-fluid">
            <div class="col-lg-12 col-md-12 col-sm-12 mt-3">
                <ul class="nav nav-pills" id="pills-tab" role="tablist">
                    <li class="nav-item">
                        <p class="nav-link active" id="pills-supplier-tab" data-toggle="pill"  role="tab" aria-controls="pills-suppliers" aria-selected="true" ng-click="makeVisibleTab('pills-supplier', 'pills-challenge')">Caricamenti Fornitori</p>
                    </li>
                    <li class="nav-item">
                        <p class="nav-link" id="pills-challenge-tab" data-toggle="pill"  role="tab" aria-controls="pills-challenge" aria-selected="false" ng-click="makeVisibleTab('pills-challenge', 'pills-supplier')">Documentazione di gara</p>
                    </li>
                </ul>

                <div class="tab-content mt-2" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-supplier" role="tabpanel" aria-labelledby="pills-supplier-tab">
                        <div class="row mt-2">
                            <div class="col-lg-10 col-md-10 col-sm-12">
                                <p class="label-item">{{suppliers.length}} FORNITORI CARICATI</p>
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-12">
                                <button class="btn button-block button-neutral-compare-advise">
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
                                            <div class="col-lg-2 col-md-2 col-sm-2">
                                                AZ
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-9">
                                                <p class="font-bold pointer" ng-click="goToView('fornitoreOverview', supplier)">{{supplier.name}}</p>
                                            </div>
                                            <div class="col-lg-1 col-md-1 col-sm-1">
                                                <i class="fa fa-ellipsis-v" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="cursor: pointer;"></i>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                    <p class="dropdown-item no-margin-bottom" style="cursor: pointer;">
                                                        <i class="fa fa-pencil-alt"></i><span class="ml-2">Modifica</span>
                                                    </p>
                                                    <div class="dropdown-divider"></div>
                                                    <p class="dropdown-item no-margin-bottom" style="cursor: pointer;">
                                                        <i class="fa fa-trash"></i><span class="ml-2">Elimina</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer" style="background-color: white; padding-bottom: 0">
                                        <div class="row mb-3">
                                            <div class="col-lg-10 col-md-10 col-sm-10">6/8 documenti</div>
                                            <div class="col-lg-2 col-md-2 col-sm-2">Alert</div>
                                        </div>

                                    </div>
                                    <div class="progress" style="height: 6px;">
                                        <div class="progress-bar" role="progressbar" style="width: 70%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-challenge" role="tabpanel" aria-labelledby="pills-challenge-tab">
                        <div class="row mt-2">
                            <div class="col-lg-5 col-md-5 col-sm-12">
                                <div class="d-flex justify-content-end">
                                    <button class="btn button-neutral-compare-advise">
                                        <i class="fa fa-plus"></i>
                                        <span class="ml-2">AGGIUNGI DOCUMENTO</span>
                                    </button>
                                </div>
                                <div class="card mt-2">
                                    <div class="card-header d-flex justify-content-center">
                                        DOCUMENTO
                                    </div>
                                </div>
                                <div class="card" ng-repeat="documentSupp in documentsSuppliers">
                                    <div class="card-body" >
                                        <div class="row">
                                            <div class="col-lg-2 col-md-2 col-sm-2"><input type="checkbox" class="pointer"><i class="ml-2 fa fa-check-circle pointer" style="color: green;"></i><i class="ml-2 fa fa-file-alt"></i> </div>
                                            <div class="col-lg-9 col-md-9 col-sm-9"><p class="no-margin-bottom">{{documentSupp.name}}</p></div>
                                            <div class="col-lg-1 col-md-1 col-sm-1"><i class="fa fa-ellipsis-h pointer"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-7 col-md-7 col-sm-12">
                                <div class="card">
                                    <div class="card-header">
                                        Seleziona un documento per visualizzare l'anteprima
                                    </div>
                                    <div class="card-body">
                                        PLACEHOLDER
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
</div>

</body>
<jsp:include page="subviews/scripts.jsp"></jsp:include>
<script type="text/javascript" src="webapp/AngularJS/controllers/garaOverviewController.js"></script>

</html>
