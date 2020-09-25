<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="snamApp"%>
<!-- Logout Modal-->
<div class="modal fade" id="sendFeedbackModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-md modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="text-primary font-weight-bold modal-header">
                <div class="modal-title" id="exampleModalLabel" style="background: #FFFFFF;">
                    SEGNALA </div>
                <span aria-hidden="true"><i data-dismiss="modal"
                        class="text-primary fas fa-times pointer text-size-18"></i></span>
            </div>
            <div class="modal-body" style="padding-left: 1%;">
                <div class="row">
                    <div class="col-md-12 col-sm-12" style="padding-left: 7.5%; padding-right: 7.5%;">
                        <div style="font-family: Ubuntu; font-size: 12px; color: #727888; letter-spacing: 0.67px;"> NOME
                            DOCUMENTO </div>
                        <div>
                            <span class="text-medium-size-custom"
                                style="font-family: Ubuntu; font-weight: bold; font-size: 16px; color: #1D2A30; letter-spacing: 0.89px;">
                                {{ documentSelectedInModal.label ? documentSelectedInModal.label : documentSelectedInModal.fileName }} </span>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-12 col-sm-12" style="padding-left: 7.5%; padding-right: 7.5%;">
                        <div
                            style="font-family: Ubuntu; font-weight: bold; font-size: 16px; color: #1D2A30; letter-spacing: 0.89px; margin-bottom: 2%;">
                            TAG DOCUMENTO </div>
                        <div
                            style="font-family: Ubuntu; font-size: 14px; color: #727888; text-align: justify; letter-spacing: 0.49px; line-height: 18px; margin-bottom: 7%;">
                            <span> Di seguito i tag che abbiamo associato al documento. Puoi eliminare, modificare e
                                aggiungere i tag quando ritieni opportuno, selezionandoli dalla lista. </span>
                        </div>
                        <div ng-repeat="item in selectedTags"
                            style="font-family: Ubuntu; font-size: 16px; font-weight: bold; color: #1D2A30; letter-spacing: 0.89px; margin-bottom: 2%;">
                            <span> {{ item }} </span>
                            <i class="fas fa-times-circle" ng-click="deleteFromSelectedTags(item)"
                                style="float: right; margin-top: 1%;"></i>
                        </div>

                        <div class="dropdown" style="margin-top: 7%; float: left; width: 85%;">
                            <div class="col-lg-2 col-md-2 col-sm-2" data-toggle="dropdown"
                                style="height: 3rem; margin-left: -2%;">
                                <button class="btn button-primary-buyer" style="height: 2.5rem; width: 24rem;">
                                    <span id="span-select-tag"
                                        style="float: left; color: #727888; width: 300px; overflow: scroll; "> Scegli un
                                        tag esistente </span>
                                    <i class="fas fa-angle-down" style="float: right; margin-top: 1%;"></i>
                                </button>
                            </div>
                            <div class="dropdown-menu" style="width: 98%; overflow: scroll; max-height: 150px;"
                                aria-labelledby="dropdownMenuLink">
                                <p ng-repeat="item in labelsAssociatedToTag"
                                    ng-click="changeButtonPlaceholder(item.label)"
                                    class="text-primary dropdown-item no-margin-bottom" style="cursor: pointer;">
                                    <span class="ml-2"> {{ item.label }} </span>
                                </p>
                            </div>
                        </div>
                        <div style="float: left; margin-top: 9.5%; float: right;">
                            <i class="fas fa-plus-circle hoverable" ng-click="addToSelectedTags()"
                                style="float: left; width: 10%;"> </i>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="button-conformita" style="margin-bottom: 2%; text-align: center;">
                    <button id="button-doc-conforme" ng-click="toggleButtonConforme()"
                        class="btn button-primary-buyer col-md-5"
                        style="font-family: Ubuntu; font-size: 14px; border: 1px solid #004AA2; letter-spacing: 0.32px; text-align: center;">
                        DOC CONFORME
                    </button>
                    <button id="button-doc-non-conforme" ng-click="toggleButtonConforme()"
                        class="btn button-primary-buyer col-md-5"
                        style="font-family: Ubuntu; font-size: 14px;  border: 1px solid #004AA2; letter-spacing: 0.32px; text-align: center;">
                        DOC NON CONFORME
                    </button>
                </div>
                <div class="button-doc-richiesta" style="margin-bottom: 2%; text-align: center;">
                    <button id="button-doc-richiesto" ng-click="toggleButtonRichiesto()"
                        class="btn button-primary-buyer col-md-5"
                        style="font-family: Ubuntu; font-size: 14px; border: 1px solid #004AA2; letter-spacing: 0.32px; text-align: center;">
                        DOC RICHIESTO
                    </button>
                    <button id="button-doc-non-richiesto" ng-click="toggleButtonRichiesto()"
                        class="btn button-primary-buyer col-md-5"
                        style="font-family: Ubuntu; font-size: 14px; border: 1px solid #004AA2; letter-spacing: 0.32px; text-align: center;">
                        DOC NON RICHIESTO
                    </button>
                </div>
                <div class="row" style="padding-top: 3%; padding-left: 7.5%; padding-right: 7.5%; ">
                    <div class="col-md-12 col-sm-12">
                        <div class="text-primary mt-3">
                            <textarea id="comment-box" class="text-primary form-control"
                                style="height: 150px; float: left;"></textarea>
                        </div>
                    </div>
                </div>
                <div
                    style="font-family: Ubuntu; font-size: 12px; color: #727888; padding-left: 7.5%; padding-right: 7.5%; text-align: justify; letter-spacing: 0.42px; line-height: 14px; margin-top: 2.5%;">
                    <span> Il team raccogliera' il tuo feedback per esaminarlo ed elaborare successive modifiche.
                    </span>
                </div>
            </div>
            <div class="modal-footer">
                <div class="col-md-12 row">
                    <div class="text-center col-md-6">
                        <button type="button" data-dismiss="modal" class="btn button-primary-buyer"
                            style="float: left; border: 2px solid #004B9C; width: 65%; border-radius: 4px; border-radius: 4px;">
                            <span
                                style="font-family: Ubuntu; font-size: 16px; color: #004B9C; letter-spacing: 0.43px; text-align: center;">
                                ANNULLA </span>
                        </button>
                    </div>
                    <div class="text-center col-md-6">
                        <button ng-click="sendFeedback()" type="button" class="btn button-secondary-buyer"
                            style="background: #004B9C; width: 65%; border-radius: 4px; border-radius: 4px;"
                            data-dismiss="modal">
                            <span
                                style="font-family: Ubuntu; font-weight: bold; font-size: 16px; color: #FFFFFF; letter-spacing: 0.43px; text-align: center;">
                                INVIA </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>