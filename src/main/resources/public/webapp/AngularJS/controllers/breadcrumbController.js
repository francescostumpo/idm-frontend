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

    $scope.bandoGara = JSON.parse(sessionStorage.getItem('bandoGara'))
    $scope.bandoGaraOggetto = $scope.bandoGara.object
    //if(sessionStorage.getItem("bandoGaraOggetto") != null){$scope.bandoGaraOggetto = sessionStorage.getItem("bandoGaraOggetto");}
    if(sessionStorage.getItem("fornitoreOverviewName") != null){$scope.fornitoreOverviewName = sessionStorage.getItem("fornitoreOverviewName");}

}]);
