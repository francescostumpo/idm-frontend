snamApp.controller("garaOverviewController", ['$scope', '$http', '$location', '$anchorScroll', '$rootScope', function($scope, $http, $location,$rootScope) {
    console.log("[INFO] Hello World from garaOverviewController");


    $scope.bandoGara = JSON.parse(sessionStorage.getItem("bandoGara"));
    var urlDocument = mainController.getFrontendHost() + '/document.pdf';
    $scope.showDocument = false;
    $scope.selectedDocuments = [];

    $scope.suppliers = [
        {name : 'IBM'},
        {name : 'Oracle'},
        {name : 'Accenture'},
        {name : 'NTT Data'},
        {name : 'HPE'},
        {name : 'Deloitte'}
    ]

    $scope.documentsSuppliers = [
        {id: "0001", name: "Lettera_invito_MAM19023C.pdf", uploadedAt: new Date('2020-06-23T15:18')},
        {id: "0002", name: "Condizioni Specifiche", uploadedAt: new Date('2020-06-23T15:20')},
        {id: "0003", name: "Condizioni Generali", uploadedAt: new Date('2020-06-23T15:21')}
    ];

    $scope.makeVisibleTab = function (itemToDisplay, itemToHide) {
        console.log('[INFO] makeVisibleTab intercepted')
        $('#'+itemToHide).hide();
        $('#'+itemToHide).removeClass('show');
        $('#'+itemToDisplay).fadeIn(100);
        $('#'+itemToDisplay).addClass('show')
    }

    $scope.setDocument = function(data) {
        // When receiving a byte array
        //var file = new File([data], 'my_document.pdf', { type: 'application/pdf' });
        //var urlDocument = window.URL.createObjectURL(file);

        $("object.document-container").attr("data", urlDocument);
        $("embed.document-container").attr("src", urlDocument);
        $("a.document-fullview").attr("href", urlDocument);
    }

    $scope.checkDocument = function (document) {
        for(i = 0;i < $scope.selectedDocuments.length; i++){
            var id = document.id;
            if(id === $scope.selectedDocuments[i].id){
                return true;
            }
        }
        return false;
    }

    $scope.selectDocument = function (document) {
        var found = false;
        for(var i = 0; i < $scope.selectedDocuments.length; i++){
            var id = document.id;
            if(id === $scope.selectedDocuments[i].id){
                found = true;
                $scope.selectedDocuments.splice(i, 1)
            }
        }
        if (!found && $scope.selectedDocuments.length == 0) {
            $scope.selectedDocuments.push(document)
            $scope.show(document, 'show');
        }else if(!found && !$scope.selectedDocuments.length == 0){
            $scope.selectedDocuments = [];
            $scope.selectedDocuments.push(document);
            $scope.show(document, 'show');
        }else if(found && $scope.selectedDocuments.length == 0){
            $scope.show(document, 'hide');
        }
    }

    $scope.show = function(document, action) {
        if(action === 'hide'){
            $scope.showDocument = false;
        }else{
            $scope.showDocument = true;
            $http.get(urlDocument).then(function(res) {
                setTimeout(function(){
                    $scope.setDocument(res);
                }, 500)
            });
        }
    }

    $scope.goToView = function (path, fornitoreOverview) {
        sessionStorage.setItem('fornitoreOverview', JSON.stringify(fornitoreOverview));
        sessionStorage.setItem('fornitoreOverviewName', fornitoreOverview.name);
        location.href = path;
    }
}]);
