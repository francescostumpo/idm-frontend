snamApp.controller("overviewFornitoreController", ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location,$rootScope) {
    console.log("[INFO] Hello World from overviewFornitoreController");

    const urlDocument = mainController.getHost() + '/document.pdf'
    $http.get(urlDocument).then(function(res) {
        $scope.setDocument(res);
    });


    $scope.setDocument = function(data) {
        // When receiving a byte array
        //var file = new File([data], 'my_document.pdf', { type: 'application/pdf' });
        //var urlDocument = window.URL.createObjectURL(file);
        const urlDocument = mainController.getHost() + '/document.pdf'
        $("object.document-container").attr("data", urlDocument);
        $("embed.document-container").attr("src", urlDocument);
    }
}]);