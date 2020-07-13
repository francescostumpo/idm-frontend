var myApp = angular.module("myApp", ["angularjs-gauge"]);

myApp.controller("HomeCtrl", ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location,$rootScope) {
    console.log("[INFO] Hello World from HomeController");

    // For test reason only
    $scope.Role = "RMI";
    $scope.Country = "Egypt";
    $scope.Name = "Abdul";
    $scope.Surname = "Rahmani";
    
    // For test reason only
    $scope.availableKIs = [
        {"KI" : "FIN_12", "KI_Description" : "Financial KI", "Status" : "Not started"},
        {"KI" : "FIN_14", "KI_Description" : "Financial KI", "Status" : "Completed"}
    ]

    // For test reason only
    $scope.availableGORs = [
        {"GOR" : "GOR_5", "GOR_Description" : "GOR Description", "Status" : "Completed"},
        {"GOR" : "GOR_10", "GOR_Description" : "GOR_Description", "Status" : "In progress"}
    ]

    $scope.verifyStatus = function(object){
        if(object === "Completed"){
            return ['badge', 'bg-gradient-success'];
        }else if(object === "In progress"){
            return ['badge', 'bg-gradient-warning'];
        }else{
            return ['badge', 'bg-gradient-danger'];
        }
    }
}]);