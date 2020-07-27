snamApp.controller("garaOverviewController", ['$scope', '$http', '$location', '$anchorScroll', '$rootScope', function($scope, $http, $location,$rootScope) {
    console.log("[INFO] Hello World from garaOverviewController");


    $scope.bandoGara = JSON.parse(sessionStorage.getItem("bandoGara"));
    var urlDocumentContent = mainController.getFrontendHost() + '/api/documentContent';
    var urlDocumentPage = mainController.getFrontendHost() + '/documentDetail';

    $scope.showDocument = false;
    $scope.selectedDocuments = [];
    $scope.tempDocumentUrl = null;
    $scope.suppliers = []

    var urlGetSuppliersByTenderId = mainController.getFrontendHost() + "/api/tender/" + $scope.bandoGara.id + "/suppliers";
    $http.get(urlGetSuppliersByTenderId).then(function (res) {
        $scope.suppliers = res.data;
        console.debug($scope.suppliers)
    })

    $scope.tenderAttachments = $scope.bandoGara.tenderAttachments

    $scope.uploadTenderFile = function(){
        var fileBase64 = null;
        var reader = new FileReader();
        reader.readAsBinaryString($scope.listOfFiles[0]);
        reader.onload = function() {
            fileBase64 = reader.result;
            var base64String = window.btoa(fileBase64);
            var file = {}
            var files = []
            if (base64String !== null) {
                file.file = base64String;
                file.fileName = $scope.listOfFiles[0].name
                files.push(file)
            }
            var fileToBeUploaded = {};
            fileToBeUploaded.files = files;
            fileToBeUploaded.idTender = $scope.bandoGara.id;

            stompClientTenderFiles.send("/app/updateTenderFiles", {}, JSON.stringify(fileToBeUploaded));
            mainController.showNotification("bottom", "right", "Upload files in corso", '', 'info');
        }
    };
    

    $scope.createSupplier = function(){
        var fileBase64 = null;
        var reader = new FileReader();
        reader.readAsBinaryString($scope.listOfFiles[0]);
        reader.onload = function() {
            fileBase64 = reader.result;
            var base64String = window.btoa(fileBase64);
            var file = {}
            var files = []
            if (base64String !== null) {
                file.file = base64String
                file.fileName = $scope.listOfFiles[0].name
                files.push(file)
            }
            $scope.supplier.files = files
            $scope.supplier.idTender = $scope.bandoGara.id
            $scope.supplier.sapNumber = $scope.bandoGara.sapNumber
            stompClientSupplier.send("/app/createSupplier", {}, JSON.stringify($scope.supplier));
            mainController.showNotification("bottom", "right", "Creazione fornitore in corso", '', 'info');
        }
    }

    $scope.makeVisibleTab = function (itemToDisplay, itemToHide) {
        console.log('[INFO] makeVisibleTab intercepted')
        $('#'+itemToHide).hide();
        $('#'+itemToHide).removeClass('show');
        $('#'+itemToDisplay).fadeIn(100);
        $('#'+itemToDisplay).addClass('show')
    }

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
            var id = document._idAttachments;
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
        if(action === 'hide'){
            $scope.showDocument = false;
        }else{
            $scope.showDocument = true;
            $http.get(urlDocumentContent + "/" + document._idAttachments, {responseType: 'blob'}).then(function(res) {
                setTimeout(function(){
                    $scope.setDocument(res.data);
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
