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

<body id="page-top" ng-controller="commonController" class="background-color-application text-lato-snam" ng-app="snamApp">

    <div id="loading" style="background-color: white">
        <img id="loading-image" src="webapp/img/spinner-gif.gif" height="25%" />
    </div>
    <nav id="dashboardNavbar" ng-if="!sidebarIsClosed" ng-controller="navbarController" ng-if="!sidebarIsClosed" class="navbar navbar-expand navbar-light bg-white topbar navbar-background-snam shadow" >
        <jsp:include page="subviews/dashboardNavbar.jsp"></jsp:include>
    </nav>
    <jsp:include page="subviews/dashboardSidebar.jsp"></jsp:include>

    <div id="wrapper" ng-controller="bandiListController">
        <div id="content-wrapper" class="d-flex flex-column" >
            <!-- Header section -->
            <div class="container-fluid">
                <div class="col-lg-12 col-md-12 col-sm-12 mt-3">
                    <jsp:include page="subviews/breadcrumb.jsp"></jsp:include>
                    <h3 class="font-bold">Bandi di Gara</h3>
                </div>
            </div>
            <!-- End of Header section -->

            <!-- Main Section -->
            <div class="container-fluid">
                <div class="col-lg-12 col-md-12 col-sm-12 mb-5 mt-3">

                    <div class="card mt-2 no-border">
                        <div class="row card-body background-color-application justify-content-center">
                            <div class="col-lg-1 col-md-1 col-sm-1 text-size-14">

                            </div>
                            <div ng-click="sortCardsByColumnName(bandiGaraList, 'cig')" class="col-lg-2 col-md-2 col-sm-2 text-size-14 no-select pointer">
                                N. GARA
                                <i ng-if="sort.cig === 'desc'" class="fas fa-sort-down hoverable sort-chev"></i>
                                <i ng-if="sort.cig === 'asc'" class="fas fa-sort-up hoverable sort-chev"></i>
                            </div>
                            <div ng-click="sortCardsByColumnName(bandiGaraList, 'object')" class="col-lg-3 col-md-3 col-sm-3 text-size-14 no-select pointer">
                                OGGETTO
                                <i ng-if="sort.object === 'desc'" class="fas fa-sort-down hoverable sort-chev"></i>
                                <i ng-if="sort.object === 'asc'" class="fas fa-sort-up hoverable sort-chev"></i>
                            </div>
                            <div ng-click="sortCardsByColumnName(bandiGaraList, 'company')" class="col-lg-2 col-md-2 col-sm-2 text-size-14 no-select pointer">
                                SOCIET&Agrave;
                                <i ng-if="sort.company === 'desc'" class="fas fa-sort-down hoverable sort-chev"></i>
                                <i ng-if="sort.company === 'asc'" class="fas fa-sort-up hoverable sort-chev"></i>
                            </div>
                            <div ng-click="sortCardsByColumnName(bandiGaraList, 'endDate')" class="col-lg-2 col-md-2 col-sm-2 text-size-14 no-select pointer">
                                SCADENZA
                                <i ng-if="sort.endDate === 'desc'" class="fas fa-sort-down hoverable sort-chev"></i>
                                <i ng-if="sort.endDate === 'asc'" class="fas fa-sort-up hoverable sort-chev"></i>
                            </div>
                            <div ng-click="sortCardsByColumnName(bandiGaraList, 'fornitori')" class="col-lg-1 col-md-1 col-sm-1 text-size-14 no-select pointer">
                                N. OFFERENTI
                                <i ng-if="sort.fornitori === 'desc'" class="fas fa-sort-down hoverable sort-chev"></i>
                                <i ng-if="sort.fornitori === 'asc'" class="fas fa-sort-up hoverable sort-chev"></i>
                            </div>
                            <div class="col-lg-1 col-md-1 col-sm-1 text-size-14">

                            </div>
                        </div>
                    </div>
                    <div class="card" ng-repeat="bandoGara in bandiGaraList">
                        <div ng-style="highlightCard(bandoGara)" class="card-body">
                            <div class="row">
                                <div class="text-center col-lg-1 col-md-1 col-sm-1 text-size-14">
                                    <input ng-click="selectBando(bandoGara)" style="cursor: pointer" type="checkbox"/>
                                </div>
                                <div ng-click="goToView('/garaOverview', bandoGara)"  class="col-lg-2 col-md-2 col-sm-2 text-size-14 pointer no-select ">
                                    {{bandoGara.sapNumber}}
                                </div>
                                <div ng-click="goToView('/garaOverview', bandoGara)" class="col-lg-3 col-md-3 col-sm-3 text-size-14 pointer no-select">
                                    {{bandoGara.object}}
                                </div>
                                <div ng-click="goToView('/garaOverview', bandoGara)" class="col-lg-2 col-md-2 col-sm-2 text-size-14 pointer no-select ">
                                    {{bandoGara.company}}
                                </div>
                                <div ng-click="goToView('/garaOverview', bandoGara)" class="col-lg-2 col-md-2 col-sm-2 text-size-14 pointer no-select ">
                                    {{bandoGara.endDate | date: 'dd/MM/yyyy'}}
                                </div>
                                <div ng-click="goToView('/garaOverview', bandoGara)" class="col-lg-1 col-md-1 col-sm-1 text-size-14 pointer no-select ">
                                    {{bandoGara.fornitori}}
                                </div>
                                <div class="text-center col-lg-1 col-md-1 col-sm-1 text-size-14 pointer">
                                    <i class="text-primary fas fa-ellipsis-h" aria-expanded="false" aria-haspopup="true" data-toggle="dropdown"></i>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <p ng-click="openModalEditTender(bandoGara)" class="text-primary dropdown-item no-margin-bottom" style="cursor: pointer;">
                                            <i class="far fa-edit fa-fw fa-lg pointer"></i><span class="ml-2">Modifica</span>
                                        </p>
                                        <div class="dropdown-divider"></div>
                                        <p ng-click="deleteTender(bandoGara)" class="text-primary dropdown-item no-margin-bottom" style="cursor: pointer;">
                                            <i class="far fa-trash-alt fa-fw fa-lg pointer"></i><span class="ml-2">Elimina</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a class="scroll-to-top rounded" href="#page-top">
                <i class="fas fa-angle-up"></i>
            </a>
        </div>
        <jsp:include page="subviews/modal/editTenderModal.jsp"></jsp:include>
    </div>
</body>
<jsp:include page="subviews/scripts.jsp"></jsp:include>
<script src="./webapp/AngularJS/controllers/bandiListController.js"></script>

</html>
