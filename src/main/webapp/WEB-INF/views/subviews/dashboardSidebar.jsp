<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="snamApp"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!-- Sidebar -->
<ul ng-controller="sidebarController" class="sidebarClosed navbar-nav sidebar sidebar-dark accordion toggled" style="background-color: #002754 !important; height: 100vh" id="accordionSidebar">
    <!-- Nav Item - Dashboard -->
    <div class="ml-4 mt-3">
        <i ng-click="toggleSideBar()" style="color: white; cursor:pointer;" class="fas fa-arrow-left"></i>
    </div>
    <div id="sidebarDashboard" ng-class="verifyPageForSidebarLeftBorder('dashboard')" class="mt-3 mb-3">
        <div style="cursor: pointer" class=" ml-4 " ng-click="goToPageFromSidebar('/dashboard')">
            <i ng-style="verifyPageForSidebar('dashboard')"  class="fas fa-home"></i>
            <span ng-style="verifyPageForSidebar('dashboard')" class="ml-2" >HOME</span>
        </div>
    </div>
    <!-- Divider -->
    <!-- Nav Item - Dashboard -->
    <div id="sidebarDocuments" ng-class="verifyPageForSidebarLeftBorder('search')" class="mt-3 mb-3">
        <div style="cursor: pointer" class="ml-4 " ng-click="goToPageFromSidebar('/search')">
            <i ng-style="verifyPageForSidebar('search')" class="fas fa-file-alt"></i>
            <span ng-style="verifyPageForSidebar('search')" class="ml-2" >BANDI DI GARA</span>
        </div>
    </div>
    <!-- Divider -->
</ul>
<!-- End of Sidebar -->