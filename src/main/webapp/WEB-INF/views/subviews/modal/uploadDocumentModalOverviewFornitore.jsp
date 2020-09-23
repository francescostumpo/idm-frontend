<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="snamApp"%>
<!-- Logout Modal-->
<div class="modal fade" id="uploadDocumentModalOverviewFornitore" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-lg modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="text-primary font-weight-bold modal-header">
                <div class="modal-title" id="exampleModalLabel">AGGIUNGI DOCUMENTI</div>
                <span aria-hidden="true"><i data-dismiss="modal" class="text-primary fas fa-times pointer text-size-18"></i></span>
            </div>
            <div class="modal-body">
                <div class="mt-3">
                    <span class="text-medium-size-custom" style="padding-left: 12%;">Carica documenti*</span>
                </div>
                <div>
                    <div class="mt-3" id="filedrag2" style="display: block; width: 75%; height: 250px; text-align: center; margin-left: 12%;">
                        <div style="height: 20%; padding-top: 3%;"> <span style="margin-top: 5px; margin-bottom: 5%; color: grey; font-weight: 400;">  <b> Trascina qui </b> il documento </span> </div> 
                       <!--  <img id="imageUpload2" src="webapp/img/uploadIcon.png" class="mt-1 mx-auto d-block" style="color:blue" /> --> 
                        <div class="row" style="margin-top: 6.5%; margin-bottom: 8%;">
                            <div class="col-sm-2 col-md-2"></div>
                            <div class="my-auto break col-sm-3 col-md-3"></div>
                            <div class="text-center col-sm-2 col-md-2"> <span style="font-weight: lighter; color: grey;"> oppure </span> </div>
                            <div class="my-auto break col-sm-3 col-md-3"></div>
                            <div class="col-sm-2 col-md-2"></div>
                        </div>
                        <div class="text-center mt-3">
                            <input type="file" id="fileselect2" style="display: none;"></input>
                            <button type="button" class="btn button-primary-buyer" onclick="document.getElementById('fileselect2').click();">
                                <i class="fas fa-upload"></i>
                                <span style="margin-left: 0.5em;"> Carica documento </span>
                            </button>
                        </div>
                    </div>

                </div>
                <div class="row mt-3">
                    <div class="col-md-6 col-sm-12 mt-2" ng-repeat="file in listOfFiles track by $index">
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
            <div class="modal-footer" style="height: 100px;">
                <div class="col-md-12 row">
                    <div class="text-center col-md-6">
                        <button type="button" data-dismiss="modal" class="btn button-primary-buyer" >
                            ANNULLA
                        </button>
                    </div>
                    <div class="text-center col-md-6">
                        <button ng-click="updateAttachmentsForSupplier()" type="button" class="btn button-secondary-buyer" data-dismiss="modal" >
                            CARICA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


