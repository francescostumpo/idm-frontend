snamApp.controller("breadcrumbController", ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location,$rootScope) {
    console.log("[INFO] Hello World from breadcrumbController");

    var contextPath = mainController.getCookie('contextPath');
    $scope.goToView = function(pathname){
        location.href = pathname;
    }

    $scope.verifyActivity = function(pathname){
        if(window.location.pathname === pathname){
            return ['currentPage'];
        }else{
            return ['not-currentPage'];
        }
    }

    $scope.verifyActivePage = function(path){
        if(contextPath == path){
            return ['currentPage']
        }
    }
    
    $scope.verifyContextPath = function (path) {
        if(contextPath.includes(path)){
            return true;
        }else{
            return false;
        }
    }

    //For testing purposes - It must be done from bandiList page
    sessionStorage.setItem('garaDetail', 'Servizio di manutenzione e riparazione di compressori aria...')

    if(sessionStorage.getItem("garaDetail") != null){$scope.garaDetail = sessionStorage.getItem("garaDetail");}

}]);
