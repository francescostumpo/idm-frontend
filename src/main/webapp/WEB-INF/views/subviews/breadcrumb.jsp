<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="snamApp"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>


<nav aria-label="breadcrumb" ng-controller="breadcrumbController">
    <ol class="breadcrumb">
        <li class="breadcrumb-item pointer-hover" ng-if="verifyContextPath('/dashboard')" ng-class="verifyActivePage('/dashboard')"  ng-click="goToView('/dashboard')">Home</li>
        <li class="breadcrumb-item pointer-hover" ng-if="verifyContextPath('/dashboard/bandiList')" ng-class="verifyActivePage('/dashboard/bandiList')" ng-click="goToView('/bandiList')">Bandi di Gara</li>
        <li class="breadcrumb-item pointer-hover" ng-if="verifyContextPath('/dashboard/bandiList/garaOverview')" ng-class="verifyActivePage('/dashboard/bandiList/garaOverview')" ng-click="goToView('/garaOverview')">{{bandoGaraOggetto}}</li>
        <li class="breadcrumb-item pointer-hover" ng-if="verifyContextPath('/dashboard/bandiList/garaOverview/fornitoreOverview')" ng-class="verifyActivePage('/dashboard/bandiList/garaOverview/fornitoreOverview')" ng-click="goToView('/fornitoreOverview')">{{fornitoreOverviewName}}</li>
    </ol>
</nav>
