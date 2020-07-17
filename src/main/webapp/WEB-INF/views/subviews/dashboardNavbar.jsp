<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="snamApp"%>
<!-- Sidebar Toggle (Topbar) -->

<button id="sidebarToggleTop" ng-click="toggleSideBar()" class="btn btn-link rounded-circle mr-3">
	<i class="fa fa-bars"></i>
</button>
<div id="homepage" class="d-md-none mr-3">
	<img class="navbar-brand" src="webapp/img/snam-logo.png" height="10%"
		width="10%" style="cursor: pointer;" ></img>
</div>

	<div class="d-none d-md-block">
		<img class="navbar-brand" src="webapp/img/snam-logo.png"
			width="5%" style="cursor: pointer;" ng-click="goToViewNavigation('/dashboard')"></img>
		<a class=""	style="cursor: pointer; color: white; letter-spacing: 0.2px; font-weight: bold; font-size: 18px"	>
			INTELLIGENT DOCUMENT MANAGEMENT
		</a>
	</div>

	<ul class="navbar-nav ml-auto">
		<button ng-click="openModalCreateTender()" style="width: 70%; cursor: pointer" type="button" class="my-auto btn button-primary-buyer" >
			<i class="fas fa-plus"></i>
			<span>Nuova gara</span>
		</button>
		<li class="nav-item dropdown ml-4 no-arrow mx-1">
			<a class="nav-link dropdown-toggle"  id="alertsDropdown"
			role="button" data-toggle="dropdown" aria-haspopup="true"
			aria-expanded="false"> <i style="color:white;cursor:pointer;" class="fas fa-bell fa-1point5 "></i> <!--  Counter - Alerts -->
				<div>
					<span class="badge badge-danger badge-counter">1</span>
				</div>
			</a>
			<div style="width: 450px!important;"
				class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
				<h6 class="dropdown-header" style="font-size:16px; color: #004B9C; background-color: white !important; border: 1px solid #CFD6DB !important;">NOTIFICHE</h6>
				<div>
					<div class="card">
						<div class="card-body">
							Nessuna notifica
						</div>
					</div>
				</div>
			</div>
		</li>
	<li class="nav-item dropdown no-arrow mx-1">

</li>

	<div class="topbar-divider d-none d-sm-block"></div>
	<li class="nav-item dropdown no-arrow">
		<div
			class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
			aria-labelledby="userDropdown">
			<!--<a style="cursor:pointer;" class="dropdown-item" href="/settings"> <i
				class="text-primary fas fa-cogs fa-sm fa-fw mr-2 "></i> <snamApp:out value="${currentDictionary.settingsTitle}"></snamApp:out>
			</a>
			<div class="dropdown-divider"></div>-->
			<a style="cursor:pointer;" class="dropdown-item">
				<i	class="text-primary fas fa-sign-out-alt fa-sm fa-fw mr-2 "></i>
				Logout
			</a>
		</div>
		<a
				class="nav-link dropdown-toggle"  id="userDropdown"
				role="button" data-toggle="dropdown" aria-haspopup="true"
				aria-expanded="false">
			<i style="cursor:pointer; color: white" class="far fa-user-circle fa-1point5 fa-sm fa-fw mr-2" style="color:white;"></i>
			<span class="mr-2 d-none d-lg-inline"	style="color: white" id="userName">
				Luca Santamaria
			</span>
		</a>
	</li>
</ul>

<jsp:include page="modal/createTendersModal.jsp"></jsp:include>

<!--
<div class="modal fade" id="createTenderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-lg modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="text-primary font-weight-bold modal-header">
				<div class="modal-title" id="exampleModalLabel">CREA NUOVA GARA</div>
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
							<input type="text" class="text-primary form-control" placeholder="Scrivi l'oggetto della gara">
						</div>
					</div>
					<div class="col-md-4 col-sm-4">
						<div>
							<span class="text-medium-size-custom">CIG*</span>
						</div>
						<div class="text-primary mt-3">
							<input type="text" class="text-primary form-control" placeholder="000000000">
						</div>
					</div>
				</div>
				<div class="row mt-4">
					<div class="col-md-4 col-sm-4">
						<div>
							<span class="text-medium-size-custom">Società*</span>
						</div>
						<div class="text-primary mt-3">
							<input type="text" class="text-primary form-control" placeholder="Nome società">
						</div>
					</div>
					<div class="col-md-4 col-sm-4">
						<div>
							<span class="text-medium-size-custom">Data chiusura gara*</span>
						</div>
						<div class="text-primary mt-3">
							<div class="input-group">
								<input id="datepicker1" class="form-control" />
							</div>
						</div>
					</div>
					<div class="col-md-4 col-sm-4">
						<div>
							<span class="text-medium-size-custom">Data fine lavorazione*</span>
						</div>
						<div class="text-primary mt-3">
							<div class="input-group">
								<input id="datepicker2" class="form-control" />
							</div>
						</div>
					</div>
				</div>
				<div ng-show="!contractIsSelected">
					<div class="mt-5">
						<span class="text-medium-size-custom">Carica documenti*</span>
					</div>
					<div class="mt-3" id="filedrag">
						<img id="imageUpload" src="webapp/img/uploadIcon.png" class="mt-1 mx-auto d-block" style="color:blue" />
					</div>
					<div class="row">
						<div class="col-sm-2 col-md-2"></div>
						<div class="my-auto break col-sm-3 col-md-3"></div>
						<div class="text-center col-sm-2 col-md-2">Oppure</div>
						<div class="my-auto break col-sm-3 col-md-3"></div>
						<div class="col-sm-2 col-md-2"></div>
					</div>
					<div class="text-center mt-3">
						<input type="file" id="fileselect" style="display: none;"></input>
						<button type="button" class="btn button-primary-buyer" onclick="document.getElementById('fileselect').click();">
							<i class="fas fa-upload"></i>
							<span style="margin-left: 0.5em;"> Carica</span>
						</button>
					</div>
				</div>
				<div ng-show="contractIsSelected">
					<div class="col-sm-6 col-md-6">
						<div class="card">
							<div class="card-body">
								<div class="row">
									<div class="col-sm-11 col-md-11">
										<span>{{file.name}}</span>
									</div>
									<div class="col-auto">
										<i class="text-primary fas fa-times"></i>
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
							PROCEDI
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>-->
