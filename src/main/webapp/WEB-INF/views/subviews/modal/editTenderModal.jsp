<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="snamApp"%>
<!-- Logout Modal-->
<div class="modal fade" id="editTenderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-lg modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="text-primary font-weight-bold modal-header">
                <div class="modal-title" id="exampleModalLabel">MODIFICA GARA {{bandoSelected.cig}}</div>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"><i class="text-primary fas fa-times"></i></span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-8 col-sm-8">
                        <div>
                            <span class="text-medium-size-custom">Oggetto gara*</span>
                        </div>
                        <div class="text-primary mt-3">
                            <input  ng-model="tenderModified.object" ng-value="bandoSelected.object" type="text" class="text-primary form-control" placeholder="Scrivi l'oggetto della gara">
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div>
                            <span class="text-medium-size-custom">CIG*</span>
                        </div>
                        <div class="text-primary mt-3">
                            <input ng-model="tenderModified.cig" ng-value="bandoSelected.cig" type="text" class="text-primary form-control" placeholder="000000000">
                        </div>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-md-4 col-sm-4">
                        <div>
                            <span class="text-medium-size-custom">Società*</span>
                        </div>
                        <div class="text-primary mt-3">
                            <input  ng-model="tenderModified.sapNumber" ng-value="bandoSelected.sapNumber" type="text" class="text-primary form-control" placeholder="Numero SAP">
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div>
                            <span class="text-medium-size-custom">Società*</span>
                        </div>
                        <div class="text-primary mt-3">
                            <input  ng-model="tenderModified.company" ng-value="bandoSelected.company" type="text" class="text-primary form-control" placeholder="Nome società">
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div>
                            <span class="text-medium-size-custom">Scadenza</span>
                        </div>
                        <div class="text-primary mt-3">
                            <div class="input-group">
                                <input  ng-model="tenderModified.endDate" ng-value="bandoSelected.endDate | date: 'dd/MM/yyyy'" id="datepickerModify" class="form-control" />
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
                        <button ng-click="modifyBando()" type="button" class="btn button-secondary-buyer" data-dismiss="modal" >
                            MODIFICA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


