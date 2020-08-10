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
    <nav id="dashboardNavbar" ng-if="!sidebarIsClosed" ng-controller="navbarController" ng-if="!sidebarIsClosed"
        class="navbar navbar-expand navbar-light bg-white topbar navbar-background-snam shadow">
        <jsp:include page="subviews/dashboardNavbar.jsp"></jsp:include>
    </nav>
    <jsp:include page="subviews/dashboardSidebar.jsp"></jsp:include>


    <div ng-controller="dashboardController" class="mb-5" id="wrapper">
        <div id="content-wrapper" class="mt-3 d-flex flex-column" style="background-color: #E6ECF2;">
            <div class="container-fluid">
                <!--<div class="col-lg-12 col-md-12 col-sm-12 mt-3">
                    <jsp:include page="subviews/breadcrumb.jsp"></jsp:include>
                </div>-->
                <div class="col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div class="d-sm-flex align-items-center justify-content-between mb-3">
                        <div class="text-size-28 mb-0">Ciao Claudia, ecco le tua gare recenti</div>
                        <a ng-click="goToViewNavigation('/bandiList')"
                            style="cursor:pointer;font-weight: bold; text-decoration: underline"
                            class="text-primary d-sm-inline-block">Vedi tutte</a>
                    </div>
                    <div class="mb-5" ng-show="recentTenders.length === 0">
                        <div class="card">
                            <div class="text-center card-body">
                                <span>Nessuna gara recente</span>
                            </div>
                        </div>
                    </div>
                    <div id="carouselExampleIndicators_recent_tenders" class="carousel slide col-xl-12 col-md-12" data-ride="carousel"  data-interval="10000000">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <div class="row">
                                    <div class="col-md-3 col-sm-12 col-lg-3" ng-repeat="tender in recentTenders_wip_0">
                                        <div class="card shadow">
                                            <div class="card-body">
                                                <div class="text-size-18 font-weight-bold text-primary">
                                                    {{tender.sapNumber}}
                                                </div>
                                                <div class="text-size-16 font-weight-bold mt-2 text-secondary">
                                                    {{tender.company}}
                                                </div>
                                                <div class="font-weight-bold mt-2" style="color: black; min-height: 80px; font-size: 16px">
                                                    <span style="font-weight: 400;">
                                                        {{processName(tender.object,120, 120)}}
                                                    </span>
                                                </div>
                                                <div class="break"></div>
                                                <div class="mt-2 text-secondary row no-gutters align-items-center">
                                                    <div class="col mr-2">
                                                        <div style="font-size: 14px" class="text-xs mb-1">Società</div>
                                                        <div style="font-size: 16px" class=" mb-0 font-weight-bold">{{tender.company}}
                                                        </div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <div style="font-size: 14px" class="text-xs mb-1">Scadenza</div>
                                                        <div style="font-size: 16px" class=" mb-0 font-weight-bold">
                                                            {{tender.endDate}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div ng-if="recentTenders_wip_1.length > 0" class="carousel-item">
                                <div class="row">
                                    <div class="col-md-3 col-sm-12 col-lg-3" ng-repeat="tender in recentTenders_wip_1">
                                        <div class="card shadow">
                                            <div class="card-body">
                                                <div style="font-size: 18px" class="font-weight-bold text-primary">
                                                    {{tender.sapNumber}}
                                                </div>
                                                <div style="font-size: 16px" class="font-weight-bold mt-2 text-secondary">
                                                    {{tender.company}}
                                                </div>
                                                <div class="font-weight-bold mt-2"
                                                     style="color: black; min-height: 80px; font-size: 16px">
                                                    <span style="font-weight: 400;">
                                                        {{processName(tender.object,120, 120)}}
                                                    </span>
                                                </div>
                                                <div class="break"></div>
                                                <div class="mt-2 text-secondary row no-gutters align-items-center">
                                                    <div class="col mr-2">
                                                        <div style="font-size: 14px" class="text-xs mb-1">Società</div>
                                                        <div style="font-size: 16px" class=" mb-0 font-weight-bold">{{tender.company}}
                                                        </div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <div style="font-size: 14px" class="text-xs mb-1">Scadenza</div>
                                                        <div style="font-size: 16px" class=" mb-0 font-weight-bold">
                                                            {{tender.endDate}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div ng-if="recentTenders.length > 4">
                            <a class="circular-div carousel-control-prev my-auto" style="color: black" href="#carouselExampleIndicators_recent_tenders" role="button" data-slide="prev">
                                <span class="fas fa-chevron-left" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="circular-div carousel-control-next my-auto" style="color: black" href="#carouselExampleIndicators_recent_tenders" role="button" data-slide="next">
                                <span class="fas fa-chevron-right" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                        <ol ng-show="recentTenders.length > 0" class="carousel-indicators">
                            <li data-target="#carouselExampleIndicators_recent_tenders" data-slide-to="0" class="dot active"></li>
                            <li ng-show="recentTenders_wip_1.length > 0" data-target="#carouselExampleIndicators_recent_tenders" data-slide-to="1" class="dot"></li>
                        </ol>
                    </div>

                    <!-- Calendar -->
                    <div class="card">
                        <div style="background-color: white" class="d-sm-flex align-items-center justify-content-between mt-1 card-header">
                            <div style="font-size: 28px" class="mb-0">
                                Prossime scadenze
                            </div>
                            <span ng-show="!showCalendarCard" class="text-bold text-alert-color">
                                {{firstEndDate.endDateMoment}} - Gara in scadenza
                            </span>
                            <span ng-show="showCalendarCard" ng-click="toggleCalendarCard()"
                                style="cursor:pointer;font-weight: bold;" class="text-primary d-sm-inline-block">
                                <i class="fas fa-chevron-up text-size-18"></i>
                            </span>
                            <span ng-show="!showCalendarCard" ng-click="toggleCalendarCard()"
                                style="cursor:pointer;font-weight: bold;" class="text-primary d-sm-inline-block">
                                <i class="fas fa-chevron-down text-size-18"></i>
                            </span>
                        </div>
                        <div ng-show="showCalendarCard" class="col-lg-12 col-sm-12 col-md-12 row">
                            <div  class="col-md-5 col-lg-5 col-sm-12">
                                <div class="card-body">
                                    <div id="calendar" class="calendar"></div>
                                    <div class="break mt-3 mb-3"></div>
                                    <div class="mt-3 ml-3 row">
                                        <div class="row ml-4">
                                            <i style="color: #FF6C00" class="my-auto mr-2 fas fa-circle text-size-16"></i>
                                            <div style="font-size: 16px" class="font-weight-bold my-auto">Scadenza</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class=" col-md-7 col-lg-7 col-sm-12">
                                <div style="max-height: 80vh" class="scrollable mt-4 card-body">
                                    <!-- today event -->
                                    <div ng-show="!thereIsAEndDateToday" class="mb-4">
                                        <div class="text-bold text-size-18 text-primary">
                                            {{momentTodayAsString}}
                                        </div>
                                        <div class="mt-3 card-events-dashboard-today card shadow">
                                            <div class="text-secondary card-body">
                                                Nessuna scadenza prevista per oggi
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mb-4" ng-repeat="tenderEvent in events">
                                        <div class="text-size-18">
                                            {{tenderEvent.endDateMoment}}
                                        </div>
                                        <div class="mt-3 card-events-dashboard-alert card shadow">
                                            <div class="card-body">
                                                <div class="text-alert-color">
                                                    <span class="text-size-18 text-bold">{{tenderEvent.extendedProps.length}}</span><span class="ml-1 text-size-16 text-bold">Gara in scadenza</span>
                                                </div>
                                                <div ng-repeat="tender in tenderEvent.extendedProps">
                                                    <div class="text-secondary text-size-14 text-bold mt-2">
                                                        {{tender.sapNumber}}
                                                    </div>
                                                    <div class="mt-2 text-size-16 text-bold">
                                                        {{tender.object}}
                                                    </div>
                                                    <div class="break mt-3 mb-3"></div>
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
            <a class="scroll-to-top rounded" href="#page-top">
                <i class="fas fa-angle-up"></i>
            </a>
        </div>
        <jsp:include page="subviews/modal/eventModal.jsp"></jsp:include>
    </div>

</body>

<jsp:include page="subviews/scripts.jsp"></jsp:include>
<script type="text/javascript" src="./webapp/AngularJS/controllers/dashboardController.js"></script>


</html>