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
		<li class="nav-item dropdown no-arrow mx-1">
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
	<a	class="nav-link dropdown-toggle"  id="messagesDropdown"
		role="button" data-toggle="dropdown" aria-haspopup="true"
		aria-expanded="false">
		<i style="color:white; cursor:pointer" class="fa fa-plus-circle fa-1point5"></i>
	</a>
	<div style="color:black; cursor:pointer;" class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"	aria-labelledby="messagesDropdown">
			<!--<h6 class="dropdown-header">Operations</h6>-->
		<a class="dropdown-item d-flex align-items-center"  data-toggle="modal" data-target="#uploadModal">
			<div>
				<div class="text-truncate"> <snamApp:out value="${currentDictionary.headerAnalyze }"></snamApp:out> </div>
			</div>
		</a>
		<a class="dropdown-item d-flex align-items-center"  data-toggle="modal" data-target="#uploadModalComplex">
			<div>
				<div class="text-truncate"><snamApp:out value="${currentDictionary.headerCompare }"></snamApp:out></div>
			</div>
		</a>
	</div>
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
			<span class="mr-2 d-none d-lg-inline"	style="color: white" id="userName">
				Mario
			</span>
			<i style="cursor:pointer; color: white" class="far fa-user-circle fa-1point5 fa-sm fa-fw mr-2" style="color:white;"></i>
		</a>
	</li>
</ul>