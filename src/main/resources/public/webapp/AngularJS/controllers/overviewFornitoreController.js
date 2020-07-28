snamApp.controller("overviewFornitoreController", ['$scope', '$http', '$location', '$rootScope', '$timeout', function($scope, $http, $location,$rootScope, $timeout) {
    console.log("[INFO] Hello World from overviewFornitoreController");

    $scope.bandoGara = JSON.parse(sessionStorage.getItem("bandoGara"));
    $scope.fornitoreOverview = JSON.parse(sessionStorage.getItem("fornitoreOverview"));

    $scope.requiredAttachments = []

    for(var i = 0; i < $scope.bandoGara.requiredAttachments.length; i++){
        var tagRequired = {}
        tagRequired.uploadedOn = 'N/A'
        tagRequired.fileName = 'N/A'
        tagRequired._idAttachments = 'N/A'
        tagRequired.isPresent = false
        tagRequired.tag = $scope.bandoGara.requiredAttachments[i]
        $scope.requiredAttachments.push(tagRequired)
    }

    $scope.documents = $scope.fornitoreOverview.attachments;

    $scope.documentCheckList = []
    $scope.notRequiredDocuments = []

    for(var i = 0; i < $scope.documents.length; i++){
        var document = $scope.documents[i]
        var tag = document.tag
        var found = false
        for(var j = 0; j < $scope.requiredAttachments.length; j++){
            var tagRequired = $scope.requiredAttachments[j]
            if(tag === tagRequired.tag){
                tagRequired.uploadedOn = document.uploadedOn
                tagRequired.fileName = document.fileName
                tagRequired._idAttachments = document._idAttachments
                tagRequired.isPresent = true
                found = true
            }
        }
        if(!found){
            $scope.notRequiredDocuments.push(document)
        }
    }

    $scope.tempDocumentUrl = null;

    var urlDocumentContent = mainController.getFrontendHost() + '/api/documentContent';

    $scope.checkIfTagIsPresent = function(document){
        if(document.isPresent){
            return {'font-style': 'normal','color': 'black' }
        }
        else{
            return {'font-style': 'italic','color': '#727888' }
        }
    }

//    $scope.documents = [{
//            id: "5f1af6d8b8742101e4e78c7a",
//            name: "12.1 Documentazione di gara",
//            uploadedAt: new Date('2020-06-23T15:18'),
//            conformity: 0,
//            presence: 0,
//            notPlanned: false
//        },
//        {
//            id: "0002",
//            name: "12.2 Patto etico di integrita'",
//            uploadedAt: new Date('2020-06-23T15:16'),
//            conformity: 0,
//            presence: 0,
//            notPlanned: false
//        },
//        {
//            id: "0003",
//            name: "12.3 Modello 2",
//            uploadedAt: new Date('2020-06-23T15:17'),
//            conformity: 0,
//            presence: 0,
//            notPlanned: false
//        },
//        {
//            id: "0004",
//            name: "12.5 Modello 3",
//            uploadedAt: new Date('2020-06-23T15:19'),
//            conformity: 1,
//            presence: 0,
//            notPlanned: false
//        },
//        {
//            id: "0005",
//            name: "12.6 Modello 5",
//            uploadedAt: new Date('2020-06-23T15:18'),
//            conformity: 1,
//            presence: 0,
//            notPlanned: false
//        },
//        {
//            id: "0006",
//            name: "12.9 White-List",
//            uploadedAt: new Date('2020-06-23T15:19'),
//            conformity: 2,
//            presence: 1,
//            notPlanned: false
//        },
//        {
//            id: "0007",
//            name: "12.8 Situazioni di controllo",
//            uploadedAt: new Date('2020-06-23T15:18'),
//            conformity: 0,
//            presence: 0,
//            notPlanned: false
//        },
//        {
//            id: "0008",
//            name: "MAM019-23C_Modello 10",
//            uploadedAt: new Date('2020-06-23T15:18'),
//            conformity: 0,
//            presence: 0,
//            notPlanned: false
//        },
//        {
//            id: "0009",
//            name: "MAM019-23C_DUVRI_Cronoprogramma",
//            uploadedAt: new Date('2020-06-23T15:18'),
//            conformity: 0,
//            presence: 0,
//            notPlanned: false
//        },
//        {
//            id: "0010",
//            name: "MAM019-23C_DUVRI_Misure Coordinamento",
//            uploadedAt: new Date('2020-06-23T15:18'),
//            conformity: 0,
//            presence: 0,
//            notPlanned: false
//        },
//        {
//            id: "0011",
//            name: "MAM019-23C_Dichiarazione nominativi_RSPP",
//            uploadedAt: new Date('2020-06-23T15:18'),
//            conformity: 0,
//            presence: 0,
//            notPlanned: false
//        },
//        {
//            id: "0012",
//            name: "MAM019-23C_DUVRI_Modulo Dati Committente-Fornitore",
//            uploadedAt: new Date('2020-06-23T15:18'),
//            conformity: 0,
//            presence: 0,
//            notPlanned: false
//        },
//        {
//            id: "0013",
//            name: "MAM019-23C_DUVRI_Rischi Fornitore",
//            uploadedAt: new Date('2020-06-23T15:18'),
//            conformity: 0,
//            presence: 0,
//            notPlanned: false
//        },
//        {
//            id: "0014",
//            name: "MAM019-23C_DUVRI_Rischi Specifici",
//            uploadedAt: new Date('2020-06-23T15:18'),
//            conformity: 0,
//            presence: 0,
//            notPlanned: false
//        },
//        {
//            id: "0015",
//            name: "12.17 Dichiarazione modello 14",
//            uploadedAt: new Date('2020-06-23T15:18'),
//            conformity: 0,
//            presence: 0,
//            notPlanned: false
//        },
//        {
//            id: "0016",
//            name: "12.19 Dichiarazione documenti art. 23.1",
//            uploadedAt: new Date('2020-06-23T15:18'),
//            conformity: 0,
//            presence: 0,
//            notPlanned: false
//        },
//        {
//          id: "0017",
//          name: "12.6 Modello 5",
//          uploadedAt: new Date('2020-06-23T15:18'),
//          conformity: 0,
//          presence: 0,
//          notPlanned: false
//        },
//        {
//            id: "0018",
//            name: "13.5 Allegato 1",
//            uploadedAt: new Date('2020-06-23T15:18'),
//            conformity: 0,
//            presence: 0,
//            notPlanned: false
//        },
//        {
//            id: "0019",
//            name: "MAM019-023_Dichiarazione HSE",
//            uploadedAt: new Date('2020-06-23T15:18'),
//            conformity: 0,
//            presence: 0,
//            notPlanned: false
//        },
//        {
//            id: "0020",
//            name: "12.4 Modello 20/2",
//            uploadedAt: null,
//            conformity: -1,
//            presence: -1,
//            notPlanned: false
//        },
//        {
//            id: "0021",
//            name: "20.3 Modello 22",
//            uploadedAt: null,
//            conformity: -1,
//            presence: -1,
//            notPlanned: false
//        },
//        {
//            id: "00022",
//            name: "Verbale di sopralluogo",
//            uploadedAt: new Date('2020-06-23T15:18'),
//            conformity: 0,
//            presence: 0,
//            notPlanned: true
//        },
//        {
//            id: "00023",
//            name: "12.4 Patto etico di integrita'",
//            uploadedAt: new Date('2020-06-23T15:16'),
//            conformity: 0,
//            presence: 0,
//            notPlanned: true
//        },
//        {
//            id: "00024",
//            name: "12.4 Modello 2",
//            uploadedAt: new Date('2020-06-23T15:17'),
//            conformity: 0,
//            presence: 0,
//            notPlanned: true
//        },
//    ]


    console.log("$scope.documents: ", $scope.documents);


    $scope.showDocument = false;
    $scope.showOptionalDocument = false;

    console.log("$scope.showOptionalDocument: ", $scope.showOptionalDocument);


    $scope.selectedDocuments = [];

    $scope.setDocument = function(data) {
        var file = new File([data], 'document.pdf', { type: 'application/pdf' });
        if ($scope.tempDocumentUrl) {
            window.URL.revokeObjectURL($scope.tempDocumentUrl)
        }
        $scope.tempDocumentUrl = window.URL.createObjectURL(file);
        $("object.document-container").attr("data", $scope.tempDocumentUrl);
        $("embed.document-container").attr("src", $scope.tempDocumentUrl);
    }

    $scope.checkDocument = function (document) {
        for(i = 0;i < $scope.selectedDocuments.length; i++){
            var id = document.id;
            if(id === $scope.selectedDocuments[i]._idAttachments){
                return true;
            }
        }
        return false;
    }

    $scope.selectDocument = function (document) {

        var found = false;
        for(var i = 0; i < $scope.selectedDocuments.length; i++){
            var id = document._idAttachments;
            if(id === $scope.selectedDocuments[i]._idAttachments){
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
        console.log('showDocument called');
        if(action === 'hide'){
            $scope.showDocument = false;
        }else{
            $scope.showDocument = true;
            mainController.startProgressIndicator('#loading')
            $http.get(urlDocumentContent + "/" + document._idAttachments, {responseType: 'blob'}).then(function(res) {
                $scope.setDocument(res.data);
                mainController.stopProgressIndicator('#loading')
            });
        }
    }

    $scope.showOptionalDocumentFunction = function(document, action) {
        console.log('showOptionalDocument called');
        if(action === 'hide'){
            $scope.showOptionalDocument = false;
        }else{
            $scope.showOptionalDocument = true;
            mainController.startProgressIndicator('#loading')
            $http.get(urlDocumentContent + "/" + document._idAttachments, {responseType: 'blob'}).then(function(res) {
                setTimeout(function(){
                    $scope.setDocument(res);
                    mainController.stopProgressIndicator('#loading')
                }, 500)
            });
        }
    }

    $scope.initProgressBar = function(documents){
        var required = documents.length - (documents.filter(d => d.conformity == 2).length);
        var percPresence =  Math.floor(documents.filter(d => d.conformity == 0).length / required* 100);
        var percCheck =  Math.floor(documents.filter(d => d.conformity == 2).length / required * 100);
        $(".pg-presence").css('width', percPresence + '%').attr('aria-valuenow', percPresence);
        $(".pg-check").css('width', percCheck + '%').attr('aria-valuenow', percCheck);
    }

    $scope.initProgressBar($scope.documents);
    mainController.stopProgressIndicator('#loading')

}]);
