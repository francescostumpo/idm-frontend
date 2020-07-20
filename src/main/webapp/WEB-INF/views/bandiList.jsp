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

<body id="page-top" ng-controller="commonController" class="background-snam text-lato-snam" ng-app="snamApp">


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

            </div>
        </div>
        <!-- End of Header section -->

        <!-- Main Section -->
        <div class="container-fluid">
            <div class="col-lg-12 col-md-12 col-sm-12 mt-3">
                <div class="card mt-2 no-border">
                    <div class="card-header d-flex justify-content-center">
                        <div ng-click="sortCardsByColumnName('name')" class="col-lg-2 col-md-2 col-sm-2 text-size-14 no-select pointer">
                            CIG
                            <i ng-if="sort.name === 'desc'" class="fas fa-sort-down hoverable sort-chev"></i>
                            <i ng-if="sort.name === 'asc'" class="fas fa-sort-up hoverable sort-chev"></i>
                        </div>
                        <div ng-click="sortCardsByColumnName('uploadedAt')" class="col-lg-4 col-md-4 col-sm-4 text-size-14 no-select pointer">
                            OGGETTO
                            <i ng-if="sort.uploadedAt === 'desc'" class="fas fa-sort-down hoverable sort-chev"></i>
                            <i ng-if="sort.uploadedAt === 'asc'" class="fas fa-sort-up hoverable sort-chev"></i>
                        </div>
                        <div ng-click="sortCardsByColumnName('conformity')" class="col-lg-2 col-md-2 col-sm-2 text-size-14 no-select pointer">
                            SOCIETA'
                            <i ng-if="sort.conformity === 'desc'" class="fas fa-sort-down hoverable sort-chev"></i>
                            <i ng-if="sort.conformity === 'asc'" class="fas fa-sort-up hoverable sort-chev"></i>
                        </div>
                        <div ng-click="sortCardsByColumnName('conformity')" class="col-lg-2 col-md-2 col-sm-2 text-size-14 no-select pointer">
                            FINE LAVORAZIONE
                            <i ng-if="sort.conformity === 'desc'" class="fas fa-sort-down hoverable sort-chev"></i>
                            <i ng-if="sort.conformity === 'asc'" class="fas fa-sort-up hoverable sort-chev"></i>
                        </div>
                        <div ng-click="sortCardsByColumnName('conformity')" class="col-lg-1 col-md-1 col-sm-1 text-size-14 no-select pointer">
                            FORNITORI
                            <i ng-if="sort.conformity === 'desc'" class="fas fa-sort-down hoverable sort-chev"></i>
                            <i ng-if="sort.conformity === 'asc'" class="fas fa-sort-up hoverable sort-chev"></i>
                        </div>
                        <div class="col-lg-1 col-md-1 col-sm-1 text-size-14"></div>
                    </div>
                </div>
                <div class="card" ng-repeat="bandoGara in bandiGaraList">
                    <div class="card-body">
                        <div class="row" ng-click="goToView('/garaOverview', bandoGara)">
                            <div class="col-lg-2 col-md-2 col-sm-2 text-size-14 no-select pointer">
                                {{bandoGara.cig}}
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 text-size-14 no-select pointer">
                                {{bandoGara.oggetto}}
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-2 text-size-14 no-select pointer">
                                {{bandoGara.societa}}
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-2 text-size-14 no-select pointer">
                                {{bandoGara.lavorazione}}
                            </div>
                            <div class="col-lg-1 col-md-1 col-sm-1 text-size-14 no-select pointer">
                                {{bandoGara.fornitori}}
                            </div>
                            <div class="col-lg-1 col-md-1 col-sm-1 text-size-14"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>
    </div>
</div>
</body>
<jsp:include page="subviews/scripts.jsp"></jsp:include>
<script src="./webapp/AngularJS/controllers/bandiListController.js"></script>

</html>
