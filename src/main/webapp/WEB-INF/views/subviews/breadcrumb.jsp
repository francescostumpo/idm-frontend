<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="snamApp"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!--<div id="breadcrumb" ng-controller="breadcrumbController" ng-cloak>
    <ol id="b_1" class="breadcrumb">
        <li class="breadcrumb-item" ng-class="verifyActivity('/icrOverview')" aria-current="page" ng-click="goToView('/icrOverview')">Region List</li>
        <eniApp:if test="${fn:contains(contextPath, 'countryList')}"><li class="breadcrumb-item" ng-class="verifyActivity('/icrOverview/countryList')" ng-click="goToView('/icrOverview/countryList')">{{regionNav}}</li></eniApp:if>
        <eniApp:if test="${fn:contains(contextPath, 'countryOverview')}"><li class="breadcrumb-item" ng-class="verifyActivity('/icrOverview/countryList/countryOverview')" ng-click="goToView('/icrOverview/countryList/countryOverview')">{{countryNav}}</li></eniApp:if>
        <eniApp:if test="${fn:contains(contextPath, 'kiList')}"><li class="breadcrumb-item" ng-class="verifyActivity('/icrOverview/countryList/countryOverview/kiList')" ng-click="goToView('/icrOverview/countryList/countryOverview/kiList')">KI List</li></eniApp:if>
        <eniApp:if test="${fn:contains(contextPath, 'kiHistory')}"><li class="breadcrumb-item" ng-class="verifyActivity('/icrOverview/countryList/countryOverview/kiList/kiHistory')" ng-click="goToView('/icrOverview/countryList/countryOverview/kiList/kiHistory')">KI History</li></eniApp:if>
        <eniApp:if test="${fn:contains(contextPath, 'gorHighlights')}"><li class="breadcrumb-item" ng-class="verifyActivity('/icrOverview/countryList/countryOverview/gorHighlights')" ng-click="goToView('/icrOverview/countryList/countryOverview/gorHighlights')">GOR Highlights</li></eniApp:if>
        <eniApp:if test="${fn:contains(contextPath, 'kiMDList')}"><li class="breadcrumb-item" ng-class="verifyActivity('/icrOverview/countryList/countryOverview/kiMDList')" ng-click="goToView('/icrOverview/countryList/countryOverview/kiMDList')">KI Managing Director</li></eniApp:if>
        <eniApp:if test="${fn:contains(contextPath, 'kiCentralSDList')}"><li class="breadcrumb-item" ng-class="verifyActivity('/icrOverview/countryList/countryOverview/kiCentralSDList')" ng-click="goToView('/icrOverview/countryList/countryOverview/kiCentralSDList')">KI Specialized Department</li></eniApp:if>
        <eniApp:if test="${fn:contains(contextPath, 'kiMDList/questionnaireView')}"><li class="breadcrumb-item" ng-class="verifyActivity('/icrOverview/countryList/countryOverview/kiMDList/questionnaireView')" ng-click="goToView('/icrOverview/countryList/countryOverview/kiMDList/questionnaireView')">Questionnaire View</li></eniApp:if>
        <eniApp:if test="${fn:contains(contextPath, 'kiCentralSDList/questionnaireView')}"><li class="breadcrumb-item" ng-class="verifyActivity('/icrOverview/countryList/countryOverview/kiCentralSDList/questionnaireView')" ng-click="goToView('/icrOverview/countryList/countryOverview/kiCentralSDList/questionnaireView')">Questionnaire View</li></eniApp:if>
        <eniApp:if test="${fn:contains(contextPath, 'countryOverview/questionnaireList')}"><li class="breadcrumb-item" ng-class="verifyActivity('/icrOverview/countryList/countryOverview/questionnaireList')" ng-click="goToView('/icrOverview/countryList/countryOverview/questionnaireList')">Questionnaire List</li></eniApp:if>
        <eniApp:if test="${fn:contains(contextPath, 'countryOverview/questionnaireList/questionnaireView')}"><li class="breadcrumb-item" ng-class="verifyActivity('/icrOverview/countryList/countryOverview/questionnaireList/questionnaireView')" ng-click="goToView('/icrOverview/countryList/countryOverview/questionnaireList/questionnaireView')">Questionnaire View</li></eniApp:if>
    </ol>
</div>-->

<nav aria-label="breadcrumb" ng-controller="breadcrumbController">
    <ol class="breadcrumb">
        <li class="breadcrumb-item pointer-hover" ng-if="verifyContextPath('/dashboard')" ng-class="verifyActivePage('/dashboard')"  ng-click="goToView('/dashboard')">Dashboard</li>
        <li class="breadcrumb-item pointer-hover" ng-if="verifyContextPath('/dashboard/bandiList')" ng-class="verifyActivePage('/dashboard/bandiList')" ng-click="goToView('/bandiList')">Bandi di Gara</li>
        <li class="breadcrumb-item pointer-hover" ng-if="verifyContextPath('/dashboard/bandiList/garaOverview')" ng-class="verifyActivePage('/dashboard/bandiList/garaOverview')" ng-click="goToView('/garaOverview')">{{garaDetail}}</li>
    </ol>
</nav>
