<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="snamApp"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="en" ngApp>

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">



    <!-- <script src="http://code.jquery.com/jquery-1.11.2.js"></script> -->
    <!-- <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script> -->
    <script src="webapp/js/jquery.min.js"> </script>


    <!-- Bootstrap Libraries -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="webapp/js/bootstrap-notify.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <!-- AngularJS Libraries-->
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.2/angular.min.js"></script> --> 


    <link rel="stylesheet" href="webapp/css/font-awesome.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
        integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">


    <link rel="stylesheet" href="webapp/css/searchView.css">
    <!-- <script src="./controllers/searchViewController.js"></script> -->
    <jsp:include page="subviews/cssSheets.jsp"></jsp:include>


    <title>SNAM - IDM</title>

</head>

<body  ng-controller="commonController" style="position: fixed; width: 100%;" id="page-top" class="background-snam text-lato-snam" ng-app="snamApp"
    >

    <nav id="dashboardNavbar" ng-if="!sidebarIsClosed" ng-controller="navbarController" ng-if="!sidebarIsClosed" class="navbar navbar-expand navbar-light bg-white topbar navbar-background-snam shadow" >
        <jsp:include page="subviews/dashboardNavbar.jsp"></jsp:include>
    </nav>
    <jsp:include page="subviews/dashboardSidebar.jsp"></jsp:include>

    <div ng-controller="searchViewController" class="bodyContainer" style="background: #E6ECF2; height: 100%;">
        <h1 id="searchViewTitle" style="padding-left: 2%; padding-top: 2%; padding-bottom: 2%; font-family: Ubuntu;">
            Bandi di Gara </h1>

        <div class="buttonSelect" style="height: 10%; width: 12%; float: left; margin-left: 2%;">
            <!--  <button
                style="border: 1px solid #004B9C; border-radius: 17px;  margin-left: 2%; border: 1px solid #004B9C; border-radius: 17px; width: 80%; height: 35%; margin-left: 2%;">
                <span
                    style="font-family: Ubuntu; float: left; font-size: 12px;  padding-top: 2.5%; padding-left: 1%; color: #004AA2; letter-spacing: 0;">
                    TUTTE LE GARE </span>
                <i class="fas fa-sort-desc" style="margin-bottom: 5%; margin-left: 15%;"></i>
            </button> -->
        </div>




        <div id="modify-and-delete-button-div" style="display: none;" ng-show="checkIfSelectedBandoGara()" >
            <button class="modify-button" ng-show="checkLengthSelectedBandoGara()" ng-click="toggleModalModifyGara()"
                style="margin-right: 1%; height: 35px; width: 111px;"> <i class="fas fa-pen"
                    style="padding-top: 3%; padding-right: 7%; padding-bottom: 3%;"></i>Modifica
            </button>
            <button class="delete-button" style="margin-right: 1%; height: 35px; width: 111px;"
                ng-click="toggleModalDeleteGara('none', false)"> <i class="fas fa-trash"
                    style="padding-top: 3%; padding-right: 7%; padding-bottom: 3%;"></i> Elimina
            </button>
        </div>


        <!--<div class="modify-delete-button"> <i class="fas fa-trash" style="padding-left: 5%; padding-top: 7%; padding-right: 7%;"></i>  Elimina </div>
        <div class="modify-delete-button" style="margin-right: 3%;"> <i class="fas fa-pen" style="padding-left: 5%; padding-top: 7%; padding-right: 7%;"></i>  Modifica </div> -->

        <div class="divSearchList">

            <div class="cardList">
                <div class="tableContainer" style="width: 100%; float: left; padding-left: 2%; padding-right: 2%;">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" class="col-md-3 col-lg-3 col-sm-3"
                                    style="font-family: Ubuntu; font-size: 14px; color: #1D2A30; letter-spacing: 0.37px;">
                                    <div class="form-check" style="float: left;">
                                        <input class="form-check-input" type="checkbox" ng-click="selectAllCheckBoxes()"
                                            style="height: 14.5px; width: 15px;" id="cigHeaderCheckBox">
                                        CIG
                                    </div>
                                    <i class="fas fa-sort-desc hoverable" id="arrow-icon-cig"
                                        ng-click="sortCardsByColumnName('cig')"
                                        style="margin-left: 1%; margin-top: 0.5%; float: left;"></i>
                                    <!-- <div> 
                                          <i class="fas fa-sort-desc hoverable" id="arrow-icon-desc-cig" ng-click="sortCardsByColumnName('cig', 'asc')" style="margin-left: -4.5%; visibility: visible;"></i>
                                        </div> -->
                                </th>
                </div>
                <th scope="col" class="col-md-3 col-lg-3 col-sm-3"
                    style="font-family: Ubuntu; font-size: 14px; color: #1D2A30; letter-spacing: 0.37px;"> <span
                        style="float: left;">
                        OGGETTO </span> <i class="fas fa-sort-desc hoverable" id="arrow-icon-oggetto"
                        ng-click="sortCardsByColumnName('oggetto')"
                        style="margin-left: 1%; margin-top: 0.5%; float: left;"></i></th>
                <th scope="col" class="col-md-2 col-lg-2 col-sm-2"
                    style="font-family: Ubuntu; font-size: 14px; color: #1D2A30; letter-spacing: 0.37px;"> <span
                        style="float: left;">
                        SOCIETA' </span> <i class="fas fa-sort-desc hoverable" id="arrow-icon-societa"
                        ng-click="sortCardsByColumnName('societa')"
                        style="margin-left: 1%; margin-top: 0.5%; float: left;"></i></th>
                <th scope="col" class="col-md-2 col-lg-2 col-sm-2"
                    style="font-family: Ubuntu; font-size: 14px; color: #1D2A30; letter-spacing: 0.37px;"> <span
                        style="float: left;"> FINE
                        LAVORAZIONE </span> <i class="fas fa-sort-desc hoverable" id="arrow-icon-lavorazione"
                        ng-click="sortCardsByColumnName('lavorazione')"
                        style="margin-left: 2%; margin-top: 0.5%; float: left;"></i></th>
                <th scope="col" class="col-md-2 col-lg-2 col-sm-2"
                    style="font-family: Ubuntu; font-size: 14px; color: #1D2A30; letter-spacing: 0.37px;"> <span
                        style="float: left;">
                        FORNITORI </span> <i class="fas fa-sort-desc hoverable" id="arrow-icon-fornitori"
                        ng-click="sortCardsByColumnName('fornitori')"
                        style="margin-left: 1%; margin-top: 0.5%; float: left;"> </i> </th>
                </tr>
                </thead>
                <tbody>
                </tbody>
                </table>



                <div class="listContainer" style="overflow-y:scroll; height:550px; background-color: #E6ECF2;">
                    <div class="card" ng-repeat="item in listCards">
                        <div class="card-body" ng-attr-id="{{ 'bando-gara-' + item.cig }}">
                            <div class="row">
                                <div class="col-md-3">
                                    <input class="form-check-input" type="checkbox" value=""
                                        ng-click="selectBandoGara(item.cig)"
                                        style="height: 14.5px; width: 15px; margin-left: 1%;"
                                        ng-attr-id="{{ 'cig-body-checkbox-' + item.cig }}">
                                    <span class="cigSpan"
                                        style="margin-left: 10%; font-family: Ubuntu; font-size: 14px; font-weight: bold; color: #1D2A30; letter-spacing: 0; ">
                                        {{ item.cig }} </span>
                                </div>
                                <div class="col-md-3  col-lg-3 col-sm-3">
                                    <span class="cigSpan"
                                        style="font-family: Ubuntu;  font-size: 14px; color: #1D2A30; letter-spacing: 0.37; ">
                                        {{ item.oggetto }} </span>
                                </div>
                                <div class="col-md-2 col-lg-2 col-sm-2">
                                    <span class="cigSpan"
                                        style="font-family: Ubuntu; font-size: 14px; color: #1D2A30; letter-spacing: 0; ">
                                        {{ item.societa }} </span>
                                </div>
                                <div class="col-md-2 col-lg-2 col-sm-2">
                                    <span class="cigSpan"
                                        style="font-family: Ubuntu; font-size: 14px; color: #1D2A30; letter-spacing: 0; ">
                                        {{ item.lavorazione }} </span>
                                </div>
                                <div class="col-md-2 col-lg-2 col-sm-2">
                                    <span class="cigSpan"
                                        style=" margin-right: 35%; font-family: Ubuntu; font-size: 14px; color: #1D2A30; letter-spacing: 0; ">
                                        {{ item.fornitori }} </span>

                                    <div class="btn-group dropdown" ng-click="toggleDropdownMenu(item.cig)"
                                        style="float: right;">
                                        <button type="button" id="dropdownMenuButton" class="btn"
                                            data-toggle="dropdown"><i class='fa fa-rotate-90 fa-ellipsis-v'
                                                style="float: right; margin-right: 5%; margin-top: 3%;"></i></button>
                                        <div class="dropdown-menu-div">
                                            <ul class="dropdown-menu" ng-attr-id="{{ 'dropdown-menu-' + item.cig }}"
                                                style="float: left; margin-left: -380%;">
                                                <li><a class="dropdown-item hoverable"
                                                        ng-click="toggleModalModifyGara(item.cig)"> <span
                                                            style="color: #004AA2; margin-left: -7%;"> <i
                                                                class="fas fa-pen"
                                                                style="padding-top: 3%; padding-right: 12%; padding-bottom: 3%;">
                                                            </i> Modifica </span></a></li>
                                                <li><a class="dropdown-item hoverable"
                                                        ng-click="toggleModalDeleteGara(item.cig, false)"> <span
                                                            style="color: #004AA2; margin-left: -7%;"> <i
                                                                class="fas fa-trash"
                                                                style="padding-top: 3%; padding-right: 12%; padding-bottom: 3%;">
                                                            </i> Elimina </span> </a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- Modals -->

        <div class="modal" id="modal-modify-gara" aria-hidden="false" style="display: none;" style="z-index: -1;"
            ng-show="showModifyGaraModal">
            <div class="modal-dialog" role="document">
                <div class="modal-header" style="background-color: #FFFFFF; height: 5%;">
                    <span class="modal-header-text">
                        MODIFICA GARA
                    </span>
                </div>
                <div class="modal-content" style="padding-left: 5%; text-align: left;">
                    <label class="modify-modal-content-label" style="width: 50%; padding-top: 5%;"> Oggetto
                        Gara </label>
                    <input type="text" class="modify-modal-input-text" style="width: 78%; padding-left: 2%;">
                    <div class="modify-modal-first-layer-divs" style="display: flex; padding-top: 5%;">
                        <div class="modal-data-chiusura-gara" style="width: 38%;">
                            <label class="modify-modal-content-label"
                                style="width: 100%; float: left; margin-top: 10.5%;"> Data Chiusura Gara
                            </label>
                            <input type="text" class="modify-modal-input-text" style="width: 85%;">
                        </div>
                        <div class="modal-data-fine-lavorazione" style="width: 50%;">
                            <label class="modify-modal-content-label" style="width: 80%; margin-top: 8.5%;">
                                Data Fine
                                Lavorazione </label>
                            <input type="text" class="modify-modal-input-text" style="width: 80%;">
                        </div>
                    </div>
                    <div class="modify-modal-second-layer-divs" style="display: flex; padding-top: 5%;">
                        <div class="modal-cig" style="width: 40%; margin-bottom: 10%;">
                            <label class="modify-modal-content-label" style="width: 50%; margin-top: 7%;">
                                CIG </label>
                            <input type="text" id="modal-update-cig" class="modify-modal-input-text"
                                style="width: 86%; height: 42%; margin-bottom: 10%;">
                        </div>
                        <div class="modal-societa">
                            <label class="modify-modal-content-label" style="width: 50%; margin-top: 4%;">
                                Societa </label>
                            <input type="text" class="modify-modal-input-text"
                                style="width: 65%;  height: 28%; margin-bottom: 10%;">
                        </div>
                    </div>
                    <div class="modal-buttons">
                        <div class="cbutton">
                            <button class="cancel-button" ng-click="toggleModalModifyGara()" style="margin-left: 7%;">
                                <span class="cancel-button-text">
                                    ANNULLA </span> </button>
                            <button class="cancel-button-confirm" ng-click="modifyGara()"> <span
                                    class="cancel-button-confirm-text"
                                    style="padding-top: 5%; padding-left: 5.5%; padding-right: 3%;"> MODIFICA </span>
                            </button>
                        </div>
                        <div class="dbutton">

                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal" id="modal-delete-gara" aria-hidden="false" style="display: none;" style="z-index: -1;"
            ng-show="showDeleteGaraModal">
            <div class="modal-dialog" role="document" style="margin-top: 15%;">
                <div class="modal-content">
                    <div class="modal-span"
                        style="padding-top: 5%; padding-left: 5.5%; padding-right: 3%; margin-bottom: 10%;">
                        Sei sicuro di voler eliminare tutte le gare selezionate? Eliminerai anche i documenti caricati
                        per ciascun fornitore.
                    </div>
                    <div class="modal-buttons">
                        <div class="cbutton">
                            <button class="cancel-button" ng-click="toggleModalDeleteGara(null, 'true')"> <span
                                    class="cancel-button-text"> ANNULLA </span> </button>
                        </div>
                        <div class="dbutton">
                            <button class="cancel-button-confirm" ng-click="deleteGara()"> <span
                                    class="cancel-button-confirm-text"
                                    style="padding-top: 5%; padding-left: 5.5%; padding-right: 3%;"> ELIMINA </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>



</body>

<jsp:include page="subviews/scripts.jsp"></jsp:include> 
<script type="text/javascript" src="./webapp/AngularJS/controllers/searchViewController.js"></script> 

</html>