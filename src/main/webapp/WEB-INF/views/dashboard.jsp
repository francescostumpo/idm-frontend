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

    <div ng-controller="dashboardController" id="wrapper">
        <div style="margin: 1.5rem" id="content-wrapper" class="d-flex flex-column" >
            <div class="container-fluid">
                <div class="col-lg-12 col-md-12 col-sm-12 mt-3">
                    <jsp:include page="subviews/breadcrumb.jsp"></jsp:include>
                </div>
                <div class="d-sm-flex align-items-center justify-content-between mb-3">
                    <div style="font-size: 28px" class="mb-0">Ciao Luca, ecco le tua gare recenti</div>
                    <a style="cursor:pointer;font-weight: bold; text-decoration: underline" class="text-primary d-sm-inline-block">Vedi tutte</a>
                </div>
               <div class="row">
                   <div class="col-md-4" ng-repeat="tender in recentTenders">
                       <div class="card">
                           <div class="card-body">
                               <div style="font-size: 12px" class="font-weight-bold text-primary">
                                   CIG {{tender.cig}}
                               </div>
                               <div style="font-size: 16px" class="font-weight-bold mt-2 text-secondary">
                                   {{tender.supplier}}
                               </div>
                               <div class="font-weight-bold mt-2" style="color: black; height: 150px; font-size: 16px">
                                   {{tender.description}}
                               </div>
                               <div class="break"></div>
                               <div class="mt-2 text-secondary row no-gutters align-items-center">
                                   <div class="col mr-2">
                                       <div style="font-size: 14px" class="text-xs mb-1">Chiusura gara</div>
                                       <div style="font-size: 16px" class=" mb-0 font-weight-bold">{{tender.endDate}}</div>
                                   </div>
                                   <div class="col-auto">
                                       <div style="font-size: 14px" class="text-xs mb-1">Fine lavorazione</div>
                                       <div style="font-size: 16px" class=" mb-0 font-weight-bold">{{tender.endWorkingDate}}</div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>

                <!-- Calendar -->
                <div class="d-sm-flex align-items-center justify-content-between mt-5 mb-3">
                    <div style="font-size: 28px" class="mb-0">Prossime scadenze</div>
                    <a ng-show="showCalendarCard" ng-click="toggleCalendarCard()" style="cursor:pointer;font-weight: bold;" class="text-primary d-sm-inline-block">Comprimi calendario</a>
                    <a ng-show="!showCalendarCard" ng-click="toggleCalendarCard()" style="cursor:pointer;font-weight: bold;" class="text-primary d-sm-inline-block">Espandi calendario</a>
                </div>
                <div  ng-show="showCalendarCard" class="card">
                    <div class="card-body">
                        <div id="calendar" class="calendar"></div>
                        <div class="mt-3 ml-3 row">
                            <div class="row">
                                <i style="color: #36A8DF" class="mr-1 ml-2 fas fa-circle fa-2x"></i>
                                <div style="font-size: 16px" class="font-weight-bold my-auto">Chiusura gara</div>
                            </div>
                            <div class="row ml-4">
                                <i style="color: #FF6C00" class="mr-1 ml-2 fas fa-circle fa-2x"></i>
                                <div style="font-size: 16px" class="font-weight-bold my-auto">Fine lavorazione</div>
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

<script type="text/javascript" src="./webapp/AngularJS/controllers/dashboardController.js"></script>

</html>
