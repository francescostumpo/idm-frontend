snamApp.controller("overviewFornitoreController", ['$scope', '$http', '$location', '$rootScope', 'DTOptionsBuilder', function($scope, $http, $location,$rootScope, DTOptionsBuilder) {
    console.log("[INFO] Hello World from overviewFornitoreController");


    $scope.bandoGara = JSON.parse(sessionStorage.getItem("bandoGara"));
    $scope.fornitoreOverview = JSON.parse(sessionStorage.getItem("fornitoreOverview"));

    var urlDocument = mainController.getFrontendHost() + '/document.pdf';

    $scope.documents = [{
            id: "0001",
            name: "12.1 Documentazione di gara",
            uploadedAt: new Date('2020-06-23T15:18'),
            conformity: 0,
            presence: 0,
        },
        {
            id: "0002",
            name: "12.2 Patto etico di integrita'",
            uploadedAt: new Date('2020-06-23T15:16'),
            conformity: 0,
            presence: 0,
        },
        {
            id: "0003",
            name: "12.3 Modello 2",
            uploadedAt: new Date('2020-06-23T15:17'),
            conformity: 0,
            presence: 0,
        },
        {
            id: "0004",
            name: "12.5 Modello 3",
            uploadedAt: new Date('2020-06-23T15:19'),
            conformity: 1,
            presence: 0,
        },
        {
            id: "0005",
            name: "12.6 Modello 5",
            uploadedAt: new Date('2020-06-23T15:18'),
            conformity: 1,
            presence: 0,
        },
        {
            id: "0006",
            name: "12.9 White-List",
            uploadedAt: new Date('2020-06-23T15:19'),
            conformity: 2,
            presence: 1,
        },
        {
            id: "0007",
            name: "12.8 Situazioni di controllo",
            uploadedAt: new Date('2020-06-23T15:18'),
            conformity: 0,
            presence: 0,
        },
        {
            id: "0008",
            name: "MAM019-23C_Modello 10",
            uploadedAt: new Date('2020-06-23T15:18'),
            conformity: 0,
            presence: 0,
        },
        {
            id: "0009",
            name: "MAM019-23C_DUVRI_Cronoprogramma",
            uploadedAt: new Date('2020-06-23T15:18'),
            conformity: 0,
            presence: 0,
        },
        {
            id: "0010",
            name: "MAM019-23C_DUVRI_Misure Coordinamento",
            uploadedAt: new Date('2020-06-23T15:18'),
            conformity: 0,
            presence: 0,
        },
        {
            id: "0011",
            name: "MAM019-23C_Dichiarazione nominativi_RSPP",
            uploadedAt: new Date('2020-06-23T15:18'),
            conformity: 0,
            presence: 0,
        },
        {
            id: "0012",
            name: "MAM019-23C_DUVRI_Modulo Dati Committente-Fornitore",
            uploadedAt: new Date('2020-06-23T15:18'),
            conformity: 0,
            presence: 0,
        },
        {
            id: "0013",
            name: "MAM019-23C_DUVRI_Rischi Fornitore",
            uploadedAt: new Date('2020-06-23T15:18'),
            conformity: 0,
            presence: 0,
        },
        {
            id: "0014",
            name: "MAM019-23C_DUVRI_Rischi Specifici",
            uploadedAt: new Date('2020-06-23T15:18'),
            conformity: 0,
            presence: 0,
        },
        {
            id: "0015",
            name: "12.17 Dichiarazione modello 14",
            uploadedAt: new Date('2020-06-23T15:18'),
            conformity: 0,
            presence: 0,
        },
        {
            id: "0016",
            name: "12.19 Dichiarazione documenti art. 23.1",
            uploadedAt: new Date('2020-06-23T15:18'),
            conformity: 0,
            presence: 0,
        },
        {
          id: "0017",
          name: "12.6 Modello 5",
          uploadedAt: new Date('2020-06-23T15:18'),
          conformity: 0,
          presence: 0,
        },
        {
            id: "0018",
            name: "13.5 Allegato 1",
            uploadedAt: new Date('2020-06-23T15:18'),
            conformity: 0,
            presence: 0,
        },
        {
            id: "0019",
            name: "MAM019-023_Dichiarazione HSE",
            uploadedAt: new Date('2020-06-23T15:18'),
            conformity: 0,
            presence: 0,
        },
        {
            id: "0020",
            name: "12.4 Modello 20/2",
            uploadedAt: null,
            conformity: -1,
            presence: -1,
        },
        {
            id: "0020",
            name: "20.3 Modello 22",
            uploadedAt: null,
            conformity: -1,
            presence: -1,
        },
    ]


    $scope.sort = {
        name: '',
        uploadedAt: '',
        conformity: '',
    }
    $scope.showDocument = false;
    $scope.selectedDocuments = [];

    $scope.dtOptionsSearchView = DTOptionsBuilder.newOptions()
        .withDOM('t')

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

    $scope.sortCardsByColumnName = function(column){
        for (key in $scope.sort) {
            if (key != column){
                $scope.sort[key] = ''
            }
        }
        $scope.sort[column] = $scope.revertSortingOrder($scope.sort[column]);
        $scope.documents.sort((a, b) => $scope.customSort(a, b, column, $scope.sort[column]));
    }

    $scope.customSort = function(a, b, column, order) {
        if (a[column] > b[column]) {
            return order === 'asc'? 1: -1;
        } else if (a[column] < b[column]) {
            return order === 'asc'? -1: 1;
        } else {
            return 0;
        }
    }

    $scope.revertSortingOrder = function(sortOrder){
        if (sortOrder === 'asc') {
            return 'desc'
        } else {
            return 'asc'
        }
    }

    $scope.initProgressBar = function(documents){
        var required = documents.length - (documents.filter(d => d.conformity == 2).length);
        var percPresence =  Math.floor(documents.filter(d => d.conformity == 0).length / required* 100);
        var percCheck =  Math.floor(documents.filter(d => d.conformity == 2).length / required * 100);
        console.debug('percPresence', percPresence)
        console.debug('percCheck', percCheck)
        $(".pg-presence").css('width', percPresence + '%').attr('aria-valuenow', percPresence);
        $(".pg-check").css('width', percCheck + '%').attr('aria-valuenow', percCheck);
    }

    $scope.initProgressBar($scope.documents);


}]);
