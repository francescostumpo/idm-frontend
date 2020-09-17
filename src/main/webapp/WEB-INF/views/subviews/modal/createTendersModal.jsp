<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="snamApp"%>
<!-- Logout Modal-->
<div class="modal fade" id="createTenderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-lg modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="text-primary font-weight-bold modal-header">
                <div class="modal-title" id="exampleModalLabel">CREA NUOVA GARA</div>
                <span aria-hidden="true"><i data-dismiss="modal" class="text-primary fas fa-times pointer text-size-18"></i></span>
            </div>
            <div class="modal-body">
                <!--<div class="row">
                    <div class="col-md-8 col-sm-8">
                        <div>
                            <span class="text-medium-size-custom">Oggetto gara*</span>
                        </div>
                        <div class="text-primary mt-3">
                            <input type="text" class="text-primary form-control" ng-model="tender.object" placeholder="Scrivi l'oggetto della gara">
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div>
                            <span class="text-medium-size-custom">CIG*</span>
                        </div>
                        <div class="text-primary mt-3">
                            <input type="text" class="text-primary form-control" ng-model="tender.cig" placeholder="000000000">
                        </div>
                    </div>
                </div>-->
                <div class="row">
                    <!--<div class="col-md-4 col-sm-4">
                        <div>
                            <span class="text-medium-size-custom">Numero SAP*</span>
                        </div>
                        <div class="text-primary mt-3">
                            <input type="text" class="text-primary form-control" ng-model="tender.sapNumber" placeholder="Numero SAP">
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div>
                            <span class="text-medium-size-custom">Società*</span>
                        </div>
                        <div class="text-primary mt-3">
                            <input type="text" class="text-primary form-control" ng-model="tender.supplier" placeholder="Nome società">
                        </div>
                    </div>-->
                    <div class="col-md-6 col-sm-6">
                        <div>
                            <span class="text-medium-size-custom">Scadenza*</span>
                        </div>
                        <div class="text-primary mt-3">
                            <div class="input-group">
                                <input id="datepicker2" ng-model="tender.endDate" class="form-control" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-6"></div>
                </div>
                <div class="mt-4">
                    <span class="text-medium-size-custom">Carica documenti*</span>
                </div>
                <div class="mt-3 row no-gutters col-md-12 col-lg-12 col-sm-12">
                    <div class="text-center col-md-6 col-sm-6 col-lg-6">
                        <span class="text-bold">RDO</span>
                    </div>
                    <div class="text-center col-md-6 col-sm-6 col-lg-6">
                        <span class="text-bold">Lettera d'invito</span>
                    </div>
                </div>
                <div class="row no-gutters col-md-12 col-lg-12 col-sm-12">
                    <div class="col-md-49">
                        <div ng-show="!rdoIsSelected">
                            <div class="mt-3" id="filedrag">
                                <img id="imageUpload" src="webapp/img/uploadIcon.png" class="mt-1 mx-auto d-block" style="color:blue" />
                            </div>
                            <div class="row">
                                <div class="col-sm-1 col-md-1"></div>
                                <div class="my-auto break col-sm-3 col-md-3"></div>
                                <div class="text-center col-sm-4 col-md-4">Oppure</div>
                                <div class="my-auto break col-sm-3 col-md-3"></div>
                                <div class="col-sm-1 col-md-1"></div>
                            </div>
                            <div class="text-center mt-3">
                                <input type="file" id="fileselect" style="display: none;"></input>
                                <button type="button" class="btn button-primary-buyer" onclick="document.getElementById('fileselect').click();">
                                    <i class="fas fa-upload"></i>
                                    <span style="margin-left: 0.5em;">Carica</span>
                                </button>
                            </div>
                        </div>
                        <div class="mt-3" ng-show="rdoIsSelected">
                            <div  class="col-sm-12 col-md-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-11 col-md-11">
                                                <span>{{fileRdo.name}}</span>
                                            </div>
                                            <div class="col-sm-1 col-md-1">
                                                <i ng-click="deselectFile('fileRdo')" style="cursor: pointer" class="text-primary fas fa-times"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-unopercento"></div>
                    <div class="col-md-49">
                        <div ng-show="!letterIsSelected">
                            <div class="mt-3" id="filedrag5">
                                <img id="imageUpload5" src="webapp/img/uploadIcon.png" class="mt-1 mx-auto d-block" style="color:blue" />
                            </div>
                            <div class="row">
                                <div class="col-sm-1 col-md-1"></div>
                                <div class="my-auto break col-sm-3 col-md-3"></div>
                                <div class="text-center col-sm-4 col-md-4">Oppure</div>
                                <div class="my-auto break col-sm-3 col-md-3"></div>
                                <div class="col-sm-1 col-md-1"></div>
                            </div>
                            <div class="text-center mt-3">
                                <input type="file" id="fileselect5" style="display: none;"></input>
                                <button type="button" class="btn button-primary-buyer" onclick="document.getElementById('fileselect5').click();">
                                    <i class="fas fa-upload"></i>
                                    <span style="margin-left: 0.5em;"> Carica</span>
                                </button>
                            </div>
                        </div>
                        <div class="mt-3" ng-show="letterIsSelected">
                            <div  class="col-sm-12 col-md-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-11 col-md-11">
                                                <span>{{fileLetter.name}}</span>
                                            </div>
                                            <div class="col-sm-1 col-md-1">
                                                <i ng-click="deselectFile('fileLetter')" style="cursor: pointer" class="text-primary fas fa-times"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="col-md-12 row">
                    <div class="text-center col-md-49">
                        <button type="button" data-dismiss="modal" class="btn button-primary-buyer" >
                            ANNULLA
                        </button>
                    </div>
                    <div class="col-md-unopercento"></div>
                    <div class="text-center col-md-49">
                        <button ng-click="createTender()" type="button" class="btn button-secondary-buyer" data-dismiss="modal" >
                            PROCEDI
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


