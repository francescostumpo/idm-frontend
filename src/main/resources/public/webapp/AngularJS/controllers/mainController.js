var snamApp = angular.module("snamApp", ["angularjs-gauge", "checklist-model", "ngSanitize", "datatables"]);

type = ['primary', 'info', 'success', 'warning', 'danger'];


mainController = {

	convertStringToDate: function(stringDate) {
		var from = stringDate.split("-")
		var date = new Date(from[2], from[1] - 1, from[0])
		var dateInMillis  = date.getTime()
		return dateInMillis
	},

	showNotification: function(from, align, message, color, icon, type) {
		$.notify({
			icon: icon,
			message: message
		}, {
			element:'body',
			position: null,
			allow_dismiss: true,
			type: type,
			timer: 25000,
			url_target: '_blank',
			placement: {
				from: from,
				align: align
			},
			animate: {
				enter: "animated fadeInUp",
				exit: "animated fadeOut"
			},
			icon_type: 'class',
			template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
				'<button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i style="font-size: 18px" class="text-primary fas fa-times"></i></button>' +
				'<span data-notify="icon"></span> ' +
				'<span class="ml-2" style="font-size: 18px" data-notify="title">{1}</span> ' +
				'<span style="font-size: 18px" data-notify="message">{2}</span>' +
				'<div class="progress" data-notify="progressbar">' +
				'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
				'</div>' +
				'<a href="{3}" target="{4}" data-notify="url"></a>' +
				'</div>'
		});
	},


	/*
	showNotification : function(from, align, message, color, icon) {
        $.notify({
            icon: icon,
            message: message
            }, {
            type: type[color],
            timer: 100,
            placement: {
                from: 'bottom',
                align: align
            }
        });
    },*/
       
    startProgressIndicator: function (id){
    	$(id).show();
    },
    
    stopProgressIndicator: function(id){
        setTimeout(function(){$(id).hide()}, 150);
    },

    downloadFile: function(file){
        var url = window.URL || window.webkitURL;
        var element = document.createElement('a');
        element.setAttribute('href', url.createObjectURL(file));
        element.setAttribute('download', "Template.xlsx");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    },

    test : function(){
        console.log("Test function");
    },

	getEmailUser: function(){
		return this.getCookie('emailEncrypted')
	},

	getLanguage: function(){
		return this.getCookie('applicationLanguageSettings')
	},

	addUserAndLanguageToJSON: function(json){
		json.emailEncrypted = this.getEmailUser()
		json.language = this.getLanguage()
	},

	getHost: function(){
		var location = window.location.hostname;
		var host = ""
		if(location.includes("localhost")){
			host = "http://localhost:8080"
		}
		else if(location.includes("dev")){
			host = "https://snam-ai4cm-backend-dev.eu-de.mybluemix.net";
		}
		else{
			host = "https://snam-ai4cm-backend.eu-de.mybluemix.net";
		}
		return host
	},
    
    getFrontendHost: function(){
    	var baseUrl = location.protocol + "//" + location.host;
    	return baseUrl;
    },
    
    getColorPalette: function(key){
    	return colorPalette[key]
    },
    
    getColor : function(filterFound, key, id, origin){
    	if(origin === 'card'){
    		$("#ps_"+id).css("background-color", colorPalette[key])
			$("#p_"+id).css("background-color", colorPalette[key])
			return;
    	}
    	else if(origin === 'sidenav'){
    		$("#checkFollower_"+id).css("background-color", colorPalette[key])
   			return;
   		}else if(origin === null){
   			$("#checkFollower_"+id).css("background-color", colorPalette[key])
   			return;
  		}else if(origin === 'dehighlight'){
  			$("#checkFollower_"+id).css("background-color", 'transparent')
 			return;
 		}
    },
    
    getCookie: function(cname){
    	var name = cname + "=";
    	var decodedCookie = decodeURIComponent(document.cookie);
	  	var ca = decodedCookie.split(';');
	  	for(var i = 0; i <ca.length; i++) {
	  		var c = ca[i];
	  	    while (c.charAt(0) == ' ') {
	  	      c = c.substring(1);
	  	    }
	  	    if (c.indexOf(name) == 0) {
	  	      return c.substring(name.length, c.length);
	  	    }
	  	}
	  	return "";
    },

	getBase64: function (file){

	},

	sendMessage: function(file) {
		var fileBase64 = null;
		var reader = new FileReader();
		//reader.readAsDataURL(file);
		reader.readAsBinaryString(file);
		console.log('File name ',file.name)
		reader.onload = function() {
			fileBase64 = reader.result;
			var base64String = window.btoa(fileBase64);
			if (base64String !== null){
				var json = {
					"fileBase64": base64String,
					"fileName": file.name,
					"currentUser": sessionStorage.getItem('currentUser'),
					"bearerToken" : mainController.getCookie("bearerToken"),
					"language": mainController.getLanguage()
				};
				sessionStorage.setItem("contractInLoading", "true")
				//stompClient.send("/app/pushNotification", {}, JSON.stringify(json));
				return;
			};
			reader.onerror = function (error){
				console.log('Error: ', error);
				return null;
			};
		}
	}

}

snamApp.config(['$httpProvider', function ($httpProvider) {
	//console.log('token : ' + mainController.getCookie('bearerToken'))
	//$httpProvider.interceptors.push('authInterceptor')
	$httpProvider.defaults.headers.common['Content-MD5'] = mainController.getCookie('bearerToken')
	//$httpProvider.defaults.headers.common['Content-Type'] = "text/plain"
}]);

jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "customtime-pre": function ( a ) {
        return mainController.convertStringToDate(a)
    },

    "customtime-asc": function ( a, b ) {
        return a - b;
    },

    "customtime-desc": function ( a, b ) {
        return b - a;
    }
} );
