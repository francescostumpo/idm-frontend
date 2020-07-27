
snamApp.controller("documentDetailController", ['$scope', '$http', '$location', '$rootScope', 'DTOptionsBuilder', '$timeout', function ($scope, $http, $location, $rootScope, DTOptionsBuilder, $timeout) {
    
    console.log("[INFO] Hello World from documentDetailController");

    $scope.bandoGara = JSON.parse(sessionStorage.getItem("bandoGara"));
    $scope.fornitoreOverview = JSON.parse(sessionStorage.getItem("fornitoreOverview"));

    var urlDocument = mainController.getFrontendHost() + '/document.pdf'; 
    console.log("urlDocument: ", urlDocument); 


    $scope.setDocument = function(data) {
        // When receiving a byte array
        //var file = new File([data], 'my_document.pdf', { type: 'application/pdf' });
        //var urlDocument = window.URL.createObjectURL(file);

        $("object.document-container").attr("data", urlDocument);
        $("embed.document-container").attr("src", urlDocument);
        $("a.document-fullview").attr("href", urlDocument);
    }


    $scope.setDocument(); 




}]);

