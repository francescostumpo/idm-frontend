snamApp.controller("garaOverviewController", ['$scope', '$http', '$location', '$anchorScroll', '$rootScope', function($scope, $http, $location,$rootScope) {
    console.log("[INFO] Hello World from garaOverviewController");

    $scope.suppliers = [
        {name : 'IBM'},
        {name : 'Oracle'},
        {name : 'Accenture'},
        {name : 'NTT Data'},
        {name : 'HPE'},
        {name : 'Deloitte'}
    ]

    $scope.documentsSuppliers = [
        {name: "Lettera_invito_MAM19023C.pdf"},
        {name: "Condizioni Specifiche"},
        {name: "Condizioni Generali"}
    ];

    $scope.makeVisibleTab = function (itemToDisplay, itemToHide) {
        console.log('[INFO] makeVisibleTab intercepted')
        $('#'+itemToHide).hide();
        $('#'+itemToHide).removeClass('show');
        $('#'+itemToDisplay).fadeIn(100);
        $('#'+itemToDisplay).addClass('show')
    }
}]);
