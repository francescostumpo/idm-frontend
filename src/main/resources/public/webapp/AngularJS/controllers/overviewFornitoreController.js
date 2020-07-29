snamApp.controller("overviewFornitoreController", ['$scope', '$http', '$location', '$rootScope', '$timeout', function($scope, $http, $location,$rootScope, $timeout) {
    console.log("[INFO] Hello World from overviewFornitoreController");

    $scope.bandoGara = JSON.parse(sessionStorage.getItem("bandoGara"));
    $scope.fornitoreOverview = JSON.parse(sessionStorage.getItem("fornitoreOverview"));

    $scope.requiredAttachments = []

    $scope.requiredAttachmentsCommon.getFromParent = function(){
        var url = mainController.getHost() + '/supplier/getSupplierById/' + $scope.fornitoreOverview.id
        mainController.startProgressIndicator('#loading')
        $http.get(url).then(function (response) {
            console.log('response from url ', url ,' : ', response)
            if(response.data.status === 200){
                $scope.fornitoreOverview = response.data.supplier
                sessionStorage.setItem('fornitoreOverview', JSON.stringify($scope.fornitoreOverview))
                $scope.getRequiredAttachments()
            }
            mainController.stopProgressIndicator('#loading')
        })
    }

    $scope.getRequiredAttachments = function(){
        $scope.requiredAttachments = []
        for(var i = 0; i < $scope.bandoGara.requiredAttachments.length; i++){
            var tagRequired = {}
            tagRequired.uploadedOn = 'N/A'
            tagRequired.fileName = 'N/A'
            tagRequired._idAttachment = 'N/A'
            tagRequired.isPresent = false
            tagRequired.tag = $scope.bandoGara.requiredAttachments[i]
            $scope.requiredAttachments.push(tagRequired)
        }
        $scope.documents = $scope.fornitoreOverview.attachments;
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
                    tagRequired._idAttachment = document._idAttachment
                    tagRequired.isPresent = true
                    found = true
                }
            }
            if(!found){
                $scope.notRequiredDocuments.push(document)
            }
        }
    }

    $scope.getRequiredAttachments()

    $scope.countRequiredAttachmentsUploaded = function() {
        var count = 0
        for (var j = 0; j < $scope.requiredAttachments.length; j++) {
            if($scope.requiredAttachments[j].isPresent){
                count++
            }
        }
        return count
    }
    $scope.tempDocumentUrl = null;

    $scope.deleteDocument = function (document) {
        var idSupplier = $scope.fornitoreOverview.id
        console.log('document ', document, ' - id ', idSupplier)
        var url = mainController.getHost() + '/supplier/deleteAttachment/' + document._idAttachment + '/' + idSupplier
        $http.delete(url).then(function (response) {
            console.log('response from url ', url , ' : ', response)
            if(response.data.status === 200){
                if(response.data.exitStatus === 1) {
                    mainController.showNotification("bottom", "right", response.data.message, '', 'warning');
                }
                else{
                    $scope.requiredAttachmentsCommon.getFromParent()
                }
            }
            else{
                mainController.showNotification("bottom", "right", response.data.message, '', 'danger');
            }
        })
    }

    var urlDocumentContent = mainController.getFrontendHost() + '/api/documentContent';

    $scope.checkIfTagIsPresent = function(document){
        if(document.isPresent){
            return {'font-style': 'normal','color': 'black' }
        }
        else{
            return {'font-style': 'italic','color': '#727888' }
        }
    }

    $scope.updateAttachmentsForSupplier = function(){
        for(var i = 0; i < $scope.listOfFiles.length; i++){
            var file = $scope.listOfFiles[0]
            var fileBase64 = null;
            var reader = new FileReader();
            reader.readAsBinaryString(file);
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
                fileToBeUploaded.cig = $scope.bandoGara.cig[0]
                fileToBeUploaded.files = files;
                fileToBeUploaded.idTender = $scope.bandoGara.id
                fileToBeUploaded.idSupplier = $scope.fornitoreOverview.id;
                stompClientFiles.send("/app/updateFiles", {}, JSON.stringify(fileToBeUploaded));
                mainController.showNotification("bottom", "right", "Caricamento file in corso", '', 'info');
            }
        }
    }

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
            if(id === $scope.selectedDocuments[i]._idAttachment){
                return true;
            }
        }
        return false;
    }

    $scope.selectDocument = function (document) {

        var found = false;
        for(var i = 0; i < $scope.selectedDocuments.length; i++){
            var id = document._idAttachment;
            if(id === $scope.selectedDocuments[i]._idAttachment){
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
            $http.get(urlDocumentContent + "/" + document._idAttachment, {responseType: 'blob'}).then(function(res) {
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
            $http.get(urlDocumentContent + "/" + document._idAttachment, {responseType: 'blob'}).then(function(res) {
                setTimeout(function(){
                    $scope.setDocument(res);
                    mainController.stopProgressIndicator('#loading')
                }, 500)
            });
        }
    }

    $scope.initProgressBar = function(){
        var required = $scope.requiredAttachments.length;
        var tagRequiredUploaded =  $scope.countRequiredAttachmentsUploaded();
        var percentageUploaded = (tagRequiredUploaded * 100) / required
        var percentageCheck =  0;
        $(".pg-presence").css('width', percentageUploaded + '%').attr('aria-valuenow', percentageUploaded);
        $(".pg-check").css('width', percentageCheck + '%').attr('aria-valuenow', percentageCheck);
    }

    $scope.initProgressBar();
    mainController.stopProgressIndicator('#loading')

}]);
