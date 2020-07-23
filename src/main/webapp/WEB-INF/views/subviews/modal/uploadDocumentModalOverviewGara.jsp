<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="snamApp"%>
<!-- Logout Modal-->
<div class="modal fade" id="uploadDocumentModalOverviewGara" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-lg modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="text-primary font-weight-bold modal-header">
                <div class="modal-title" id="exampleModalLabel">AGGIUNGI DOCUMENTI - GARA CIG</div>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"><i class="text-primary fas fa-times"></i></span>
                </button>
            </div>
            <div class="modal-body">
                <div class="mt-3">
                    <span class="text-medium-size-custom">Carica documenti*</span>
                </div>
                <div>
                    <div class="mt-3" id="filedrag3">
                        <img id="imageUpload3" src="webapp/img/uploadIcon.png" class="mt-1 mx-auto d-block" style="color:blue" />
                    </div>
                    <div class="row">
                        <div class="col-sm-2 col-md-2"></div>
                        <div class="my-auto break col-sm-3 col-md-3"></div>
                        <div class="text-center col-sm-2 col-md-2">Oppure</div>
                        <div class="my-auto break col-sm-3 col-md-3"></div>
                        <div class="col-sm-2 col-md-2"></div>
                    </div>
                    <div class="text-center mt-3">
                        <input type="file" id="fileselect3" style="display: none;"></input>
                        <button type="button" class="btn button-primary-buyer" onclick="document.getElementById('fileselect3').click();">
                            <i class="fas fa-upload"></i>
                            <span style="margin-left: 0.5em;"> Carica</span>
                        </button>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6 col-sm-12 mt-2" ng-repeat="file in listOfFiles track by $index ">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-11 col-md-11">
                                        <span>{{processName(file.name, 27, 27)}}</span>
                                    </div>
                                    <div class="my-auto col-sm-1 col-md-1">
                                        <i ng-click="removeFileFromListOfFile(file)" style="cursor: pointer" class="text-primary fas fa-times"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="col-md-12 row">
                    <div class="text-center col-md-6">
                        <button type="button" data-dismiss="modal" class="btn button-primary-buyer" >
                            ANNULLA
                        </button>
                    </div>
                    <div class="text-center col-md-6">
                        <button type="button" class="btn button-secondary-buyer" data-dismiss="modal" >
                            CARICA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
