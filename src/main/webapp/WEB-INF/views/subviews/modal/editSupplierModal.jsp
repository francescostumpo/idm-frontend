<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="snamApp"%>
<!-- Logout Modal-->
<div class="modal fade" id="editSupplierModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-sm modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="text-primary font-weight-bold modal-header">
                <div class="modal-title" id="exampleModalLabel">MODIFICA FORNITORE</div>
                <span aria-hidden="true"><i data-dismiss="modal" class="text-primary fas fa-times pointer text-size-18"></i></span>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12 col-sm-12">
                        <div>
                            <span class="text-medium-size-custom">Fornitore</span>
                        </div>
                        <div class="text-primary mt-3">
                            <input  ng-model="supplierModified.name" ng-value="supplierSelected.name" type="text" class="text-primary form-control" placeholder="Nome fornitore">
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
                        <button ng-click="editSupplier()" type="button" class="btn button-secondary-buyer" data-dismiss="modal" >
                            MODIFICA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>