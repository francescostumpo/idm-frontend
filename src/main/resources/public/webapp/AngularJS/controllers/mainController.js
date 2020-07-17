var snamApp = angular.module("snamApp", ["angularjs-gauge", "checklist-model", "ngSanitize", "datatables"]);

type = ['primary', 'info', 'success', 'warning', 'danger'];

var colorPalette = [
			'#9deeb2',
    	    '#fdd186',
    	    '#e6d6ff',
    	    '#ffd0d3',
    	    '#ff9b7c',
    	    '#bbad9d',
    	    
    	    '#dbf8e3',
    	    '#fef2de',
    	    '#f8f3ff',
    	    '#fff2f3',
    	    '#ffe3db',
    	    '#f7abbd',
    	    
    	    '#8fd9a2',
    	    '#fdd591',
    	    '#e8d9ff',
    	    '#ffd4d7',
    	    '#ffa487',
    	    '#aa9e8f',
    	    
    	    '#fb4b53',
    	    '#ee538b',
    	    '#a66efa',
    	    '#408bfc',
    	    '#1191e6',
    	    '#009c98',
    	    '#24a148',
    	    '#ff767c',
    	    '#fa75a6',
    	    '#bb8eff',
    	    '#6ea6ff',
    	    '#30b0ff',
    	    '#00bab6',
    	    '#3dbb61',
    	    '#ffa4a9',
    	    '#ffa0c2',
    	    '#d0b0ff',
    	    '#97c1ff',
    	    '#6ccaff',
    	    '#20d5d2',
    	    '#56d679',
    	    '#fff0f1',
    	    '#fff0f6',
    	    '#f7f1ff',
    	    '#edf4ff',
    	    '#e3f6ff',
    	    '#dbfbfb',
    	    '#dafbe4',
    	    '#f8f3ff',
    	    '#20d5d2',
    	    '#fff2f3',
    	    '#9deeb2',
    	    '#ffe3db',
    	    '#dbf8e3'
]

sessionStorage.setItem("palette", JSON.stringify(colorPalette)); 

mainController = {

	checkBudgetContractForGestore: function(spentBudget, budget, startDate,endDate){
		var budgetErased = ((spentBudget / budget) * 100).toFixed(1)
		var today = new Date().getTime();
		var status = ( (( today - startDate) / (endDate - startDate)) * 100).toFixed(1)
		if(budgetErased < status){
			return "rgba(0, 62, 123, 1)"
		}
		else{
			return "#FF6C00"
		}
	},

	convertStringToDate: function(stringDate) {
		var from = stringDate.split("-")
		var date = new Date(from[2], from[1] - 1, from[0])
		var dateInMillis  = date.getTime()
		return dateInMillis
	},

	checkStatusContractForGestore: function(spentBudget, budget, startDate,endDate) {
		var budgetErased = ((spentBudget / budget) * 100).toFixed(1)
		var today = new Date();
		var status = ( (( today - startDate) / (endDate - startDate)) * 100).toFixed(1)
		if(budgetErased < status){
			return  "rgba(24, 153, 208, 1)"
		}
		else{
			return 	"#FF9547"
		}
	},

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
    },
       
    startProgressIndicator: function (id){
    	$(id).show();
    },
    
    stopProgressIndicator: function(id){
        setTimeout(function(){$(id).hide()}, 150);
    },

    sendTest: function(scope){
        console.log(scope.availableTemplates);
    },
    
    uploadFile: function($http, url, formData,config){
    	mainController.showNotification('bottom', 'right', sessionStorage.getItem('processNotification'), 0, "fa fa-exclamation-circle");
    	mainController.startProgressIndicator('#loading_1')
    	sessionStorage.setItem('uploadContractForWichComponent','analyze')
    	$http.post(url, formData, config).then(function(response){
    		console.log('response is ', response.data);
    		sessionStorage.setItem('contractId', JSON.parse(response.data).contractId);
    		//mainController.stopProgressIndicator('#loading_1');
    		//location.href = '/analyze';
    	});
    	
    	mainController.stopProgressIndicator('#loading_1')
    },

    sendDownloadRequest : function($http, url, data, config){
        //window.location.href = url;
        $http.post(url, data, config).then(function(response){
            console.log(response);
            debugger;
            var file = new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            //return response.data;
            mainController.downloadFile(file);
        }).catch(function(Exception){
            console.log(Exception)
        })
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

    verifyResidualValue: function(value){
            
        if (value < 25){ return 'negligible';}
            else if (value >= 25 && value < 45){ return 'low';}
            else if (value >= 45 && value < 60){ return 'medium';}
            else if (value >= 60 && value < 70){ return 'high';}
            else{return 'very-high';}
    },

    test : function(){
        console.log("Test function");
    },

    getColorHighlight : function(entity){
        var palette = JSON.parse(sessionStorage.getItem('palette'));
        for(i=0; i < palette.palette.length; i++){
            if(entity === palette.palette[i].entity){
                return palette.palette[i].color;
            }
        }
    },
    uploadFileCompare: function($http, url, firstContractForm, secondContractForm, config){
        var firstContractId = -1;
        var secondContractId = -1;
        sessionStorage.setItem('firstContractId',-1)
        sessionStorage.setItem('secondContractId',-1)
        //mainController.startProgressIndicator('#loading'); 
        console.log('in uploadFileCompare, firstContractForm is: ', firstContractForm); 
        console.log('in uploadFileCompare, secondContractForm is: ', secondContractForm);
		mainController.showNotification('bottom', 'right', sessionStorage.getItem('processNotification'), 0, "fa fa-exclamation-circle");
        $http.post(url, firstContractForm, config).then(function(response) {
            if(response.status === 200){
                console.log('in uploadFileCompare, response from first upload is: ', response); 
                firstContractId = JSON.parse(response.data).contractId; 
                //mainController.goToCompare(firstContractId,secondContractId,JSON.parse(response.data).message);
            } 
            else {
                //mainController.goToCompare(-2,-2, JSON.parse(response.data).message);
            }
        }).catch(function(Exception){
            mainController.goToCompare(-2,-2, JSON.parse(response.data).message);
        });
        console.log('first call started...')
        sessionStorage.setItem('uploadContractForWichComponent','compare')
        $http.post(url, secondContractForm, config).then(function(res) {
            if(res.status === 200){
                console.log('in uploadFileCompare, response from second upload is: ', res); 
                secondContractId = JSON.parse(res.data).contractId; 
                //mainController.goToCompare(firstContractId,secondContractId,JSON.parse(res.data).message);
            } 
        }).catch(function(Exception){
            //mainController.goToCompare(-2,-2, JSON.parse(res.data).message);
        });
        console.log('second call started...')   
     	mainController.stopProgressIndicator('#loading_1'); 
    },
    
    goToCompare: function(firstContractId, secondContractId, message){
    	console.log('mainController.goToCompare...')
        console.log('firstContractId in session: ', firstContractId); 
        console.log('secondContractId in session: ', secondContractId); 
	    if(firstContractId !== -1 && secondContractId !== -1){
	    	mainController.showNotification('bottom', 'right', message, 2, "icon-check-2");
	     	mainController.stopProgressIndicator('#loading_1'); 
	     	sessionStorage.setItem('firstContractId', firstContractId); 
	     	sessionStorage.setItem('secondContractId', secondContractId); 
	    	location.href = '/compare';
    	}
	    else if(firstContractId === -2 && secondContractId === -2){
	    	console.log('exception during loading contract')
	    	mainController.showNotification('bottom', 'right', message, 4, "fas fa-times");
	     	mainController.stopProgressIndicator('#loading_1'); 
	    }
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
