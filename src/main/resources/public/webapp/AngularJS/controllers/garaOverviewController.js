snamApp.controller("garaOverviewController", ['$scope', '$http', '$location', '$anchorScroll', '$rootScope', function($scope, $http, $location,$rootScope) {
    console.log("[INFO] Hello World from garaOverviewController");


    $scope.bandoGara = JSON.parse(sessionStorage.getItem("bandoGara"));
    $scope.tenderAttachments = $scope.bandoGara.tenderAttachments
    var urlDocumentContent = mainController.getFrontendHost() + '/api/documentContent';
    var urlDocumentPage = mainController.getFrontendHost() + '/documentDetail';

    $scope.showDocument = false;
    $scope.selectedDocuments = [];
    $scope.tempDocumentUrl = null;
    $scope.suppliers = [];

    var urlGetSuppliersByTenderId = mainController.getFrontendHost() + "/api/tender/" + $scope.bandoGara.id + "/suppliers";
    $http.get(urlGetSuppliersByTenderId).then(function (res) {
        $scope.suppliers = res.data;
        console.debug($scope.suppliers)
        mainController.stopProgressIndicator('#loading')
    })

    $scope.getSuppliersByTenderId.getFromParent = function(){
        $scope.getSuppliers();
    };

    $scope.getSuppliers = function(){
        $http.get(urlGetSuppliersByTenderId).then(function (res) {
            $scope.suppliers = res.data;
            console.log($scope.suppliers);
        })
    };


    $scope.getSuppliers();

    $scope.getTenderAttachmentsByTenderId.getFromParent = function(){
        $scope.getTenderAttachments();
    };

    $scope.getTenderAttachments = function(){
        var url = mainController.getHost() + "/tender/getTenderById/" + $scope.bandoGara.id;
        $http.get(url).then(function(res){
            console.log(res.data);
            $scope.tenderAttachments = res.data.tenderAttachments;
        })
    };

    $scope.getTenderAttachments();

    $scope.retrieveProgressBarLength = function(supplier){
        console.log(supplier);
        var documentCheckList = [];
        for(var i = 0; i < supplier.attachments.length; i++) {
            var document = supplier.attachments[i];
            var tag = document.tag;
            var found = false
            for (var j = 0; j < $scope.bandoGara.requiredAttachments.length; j++) {
                var tagRequired = $scope.bandoGara.requiredAttachments[j];
                if (tag === tagRequired) {
                    documentCheckList.push(tagRequired);
                }
            }
        }
        supplier.compliantAttachments = documentCheckList.length;
        var progressBarCompliant = Math.floor(documentCheckList.length / $scope.bandoGara.requiredAttachments.length * 100);

        return {'width': progressBarCompliant + '%'};
    };



    $scope.uploadTenderFile = function(){
        for(var i = 0; i < $scope.listOfFiles.length; i++){
            var fileBase64 = null;
            var reader = new FileReader();
            $scope.fileName = $scope.listOfFiles[i].name
            reader.readAsBinaryString($scope.listOfFiles[i]);
            reader.onload = function() {
                fileBase64 = reader.result;
                var base64String = window.btoa(fileBase64);
                var file = {}
                var files = []
                if (base64String !== null) {
                    file.file = base64String;
                    file.fileName = $scope.fileName
                    files.push(file)
                }
                var fileToBeUploaded = {};
                fileToBeUploaded.cig = $scope.bandoGara.cig[0]
                fileToBeUploaded.files = files;
                fileToBeUploaded.idTender = $scope.bandoGara.id;
                stompClientFiles.send("/app/updateFiles", {}, JSON.stringify(fileToBeUploaded));
            }
        }
        mainController.showNotification("bottom", "right", "Caricamento file in corso", '', 'info');
    };

    $scope.deleteSupplier = function(supplier){
        var supplierId = supplier.id
        var url = mainController.getHost() + '/supplier/deleteSupplier/' + supplierId
        mainController.startProgressIndicator('#loading')
        $http.delete(url).then(function (response) {
            console.log('response from url ', url ,' : ', response)
            mainController.stopProgressIndicator('#loading')
            if(response.data.status === 200){
                if(response.data.exitStatus === 0){
                    $scope.getSuppliers()
                }
                else{
                    mainController.showNotification('bottom', 'right', response.data.message, '', 'warning')
                }
            }
            else{
                mainController.showNotification('bottom', 'right', response.data.message, '', 'danger')
            }
        })
    }

    $scope.openModalEditSupplier = function (supplier) {
        $scope.supplierModified = {}
        $scope.supplierSelected = supplier
        $('#editSupplierModal').modal()
    }


    $scope.editSupplier = function(){
        var url = mainController.getHost() + '/supplier/editSupplier'
        var newSupplier = {
            "id" : $scope.supplierSelected.id,
            "name" : $scope.supplierModified.name
        }
        $http.post(url, newSupplier).then(function(response){
            console.log('response from url ', url ,' : ', response )
            if(response.data.status === 200){
                $scope.getSuppliers()
            }
            else{
                mainController.showNotification("bottom", "right", response.data.message, '', 'danger');
            }
        })
    }

    $scope.missingDataForCreationNewSupplier = function(){
        if($scope.supplier === undefined || $scope.supplier.name === ""){
            return true
        }
        return false
    }


    $scope.openModalEditTender = function () {
        $('#datepickerModify').datepicker({
            locale: 'it-it',
            uiLibrary: 'bootstrap4',
            format: 'dd/mm/yyyy'
        });
        $scope.tenderModified = {}
        $scope.bandoSelected = $scope.bandoGara
        $('#editTenderModal').modal()
    }

    $scope.modifyBando = function(){
        console.log('Bando ', $scope.bandoGara, ' modified')
        var url = mainController.getHost() + '/tender/updateTenderFields'
        var input = {
            "object" : $scope.tenderModified.object,
            "description" : $scope.tenderModified.description,
            "endDate" : $scope.tenderModified.endDate,
            "cig": $scope.tenderModified.cig,
            "company" : $scope.tenderModified.company,
            "id" : $scope.bandoSelected.id,
            "sapNumber" : $scope.tenderModified.sapNumber
        }
        $http.post(url, input).then(function (response) {
            console.log('response from ', url, ' : ', response)
            if(response.data.status === 200){
                $scope.bandoGara = response.data.tender
                $scope.bandoGara.endDate = mainController.convertLocalDateToDate($scope.bandoGara.endDate)
                $scope.getSuppliers()
                //mainController.showNotification('bottom', 'right', response.data.message, '', 'info')
            }
            else{
                mainController.showNotification('bottom', 'right', response.data.message, '', 'danger')
            }
        })
    }

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

    $scope.deleteTender = function(){
        console.log('deleting tender ', $scope.bandoGara)
        var url = mainController.getHost() + '/tender/deleteTender/' + $scope.bandoGara.id
        $http.delete(url).then(function (response) {
            console.log('response from ', url ,' : ', response)
            if(response.data.status == 200){
                location.href = '/bandiList'
            }
            else{
                mainController.showNotification('bottom', 'right', response.data.message, '', 'danger')
            }
        })
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
            var id = document._idAttachment;
            if(id === $scope.selectedDocuments[i]._idAttachment){
                return true;
            }
        }
        return false;
    }

    $scope.highlightCard = function(document){
        for(var i = 0; i < $scope.selectedDocuments.length ; i++){
            if(document._idAttachment === $scope.selectedDocuments[i]._idAttachment){
                return {'background-color' : '#DCF4F2'}
            }
        }
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
        console.log('selected documents ' , $scope.selectedDocuments)
    }

    $scope.show = function(document, action) {
        if(action === 'hide'){
            $scope.showDocument = false;
        }else{
            $scope.showDocument = true;
            mainController.startProgressIndicator('#loading')
            $http.get(urlDocumentContent + "/" + document._idAttachment, {responseType: 'blob'}).then(function(res) {
                setTimeout(function(){
                    $scope.setDocument(res.data);
                    mainController.stopProgressIndicator('#loading')
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
