snamApp.controller("sidebarController", ['$scope','$http','$location','$rootScope',	function($scope, $http, $location, $rootScope) {
    console.log("[INFO] Hello World from sidebarController");


    $scope.verifyPageForSidebar = function(label){
        var location = window.location.href;
        if(location.includes(label)){
            return{'color' : 'white', 'font-size': '16px'};
        }
        else{
            return{'color': '#727888', 'font-size': '16px'};
        }
    }

    $scope.goToPageFromSidebar = function(label){
        location.href = label;
    }

    $scope.verifyPageForSidebarLeftBorder = function(label){
        var location = window.location.href;
        if(location.includes(label)){
            return 'border-left-white';
        }
    }

}]);