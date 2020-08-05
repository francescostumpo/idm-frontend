<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="snamApp"%>
<!-- Logout Modal-->
<div class="modal fade" id="eventModalTender" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="text-primary font-weight-bold modal-header">
                <div class="modal-title" id="eventModalTitle">{{selectedEventDate}}</div>
                <span aria-hidden="true"><i data-dismiss="modal" class="text-primary fas fa-times pointer text-size-18"></i></span>
            </div>
            <div class="modal-body" id="eventModalBody">
                <div class="">
                    <div class="col-sm-12 col-lg-12 col-md-12">
                        <div class="mt-2 text-size-18 font-weight-bold text-primary">
                            CIG {{selectedEventTender[2][0]}}
                        </div>
                        <div class="mt-2 text-size-16 font-weight-bold mt-2 text-secondary">
                            {{selectedEventTender[4]}}
                        </div>
                        <div class="mt-2 text-size-16 font-weight-bold mt-2" style="color: black;">
                            <span>
                                {{selectedEventTender[1]}}
                            </span>
                        </div>
                        <div class="mb-3 mt-3 break"></div>
                        <div class="text-secondary row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-size-16 font-weight-bold pointer custom-link-underline mb-1">Vedi</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>