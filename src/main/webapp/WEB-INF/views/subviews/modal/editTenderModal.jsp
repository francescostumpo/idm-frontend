<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="snamApp"%>
<!-- Logout Modal-->
<div class="modal fade" id="editTenderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="text-primary font-weight-bold modal-header">
                <div class="modal-title" id="exampleModalLabel">MODIFICA GARA {{bandoSelected.cig}}</div>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"><i class="text-primary fas fa-times"></i></span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row mt-3 mb-3">
                    <div class="col-md-12 col-sm-12">
                        <div>
                            <span class="text-medium-size-custom">Data fine lavorazione*</span>
                        </div>
                        <div class="text-primary mt-3">
                            <div class="input-group">
                                <input id="datepickerModify" class="form-control" />
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


