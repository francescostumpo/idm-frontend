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

<div id="wrapper">
    <div id="content-wrapper" class="d-flex flex-column" >
        <div class="container-fluid">
            <div class="col-lg-12 col-md-12 col-sm-12 mt-3">
                <jsp:include page="subviews/breadcrumb.jsp"></jsp:include>
            </div>
        </div>
    </div>
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>
</div>

</body>
<jsp:include page="subviews/scripts.jsp"></jsp:include>
<script src="./webapp/AngularJS/controllers/"></script>

</html>
