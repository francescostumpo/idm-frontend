snamApp.controller("overviewFornitoreController", ['$scope', '$http', '$location', '$rootScope', '$timeout', function($scope, $http, $location,$rootScope, $timeout) {
    console.log("[INFO] Hello World from overviewFornitoreController");

    $scope.bandoGara = JSON.parse(sessionStorage.getItem("bandoGara"));
    $scope.fornitoreOverview = JSON.parse(sessionStorage.getItem("fornitoreOverview"));

    $scope.labelsAssociatedToTag = [
        { tag : "M_01_ETICO", label : "Patto Etico e d'Integrita'"},
        { tag : "M_02_ESCLUSIONE", label : "Autocertificazione assenza motivi di esclusione"},
        { tag : "M_03_RESPONSABILITA", label : "Dichiarazione responsabilita' amministrativa e anticorruzione"},
        { tag : "M_05_CONSENSO", label : "Dichiarazione di consenso privacy"},
        { tag : "M_06_ISCRIZIONE_CAMERA", label : "Dichiarazione iscrizione camera di commercio"},
        { tag : "M_07_AUTOCERT_445", label : "Autocertificazione ex DPR n 445/2000"},
        { tag : "M_09_DICHIARAZIONE_445", label : "Dichiarazione sostitutiva ex DPR n 445/2000 familiari conviventi"},
        { tag : "M_11_BID_BOND", label : "Testo di garanzia bancaria bid bond"},
        { tag : "M_12_SOPRALLUOGO", label : "Verbale di sopralluogo"},
        { tag : "D_12_01_VISIONE", label : "Presa visione documenti gara"},
        { tag : "D_12_07_COMUNICAZIONI", label : "Luogo comunicazioni"},
        { tag : "D_12_08_CONTROLLO", label : "Dichiarazione relative alle situazioni di controllo"},
        { tag : "C_12_10_VERSAMENTO", label : "Versamento anticorruzione/contributo ANAC"},
        { tag : "C_12_13_DURC", label : "Durc"},
        { tag : "D_12_09_WHITE_LIST", label : "White list"},
        { tag : "D_12_14_ASSICURAZIONE", label : "Impegno presentazione assicurazione"},
        { tag : "D_12_15_CAR", label : "Impegno presentazione polizza CAR"},
        { tag : "D_12_21_COMMERCIALE", label : "NO segreto tecnico o commerciale"},
        { tag : "D_12_23_CONFINAMENTO", label : "Rispetto prescrizioni di sicurezza in caso di inquinamento o confinamento"},
        { tag : "D_12_16_MODELLO_15", label : "Impegno a presentare modello 15/1 o modello 15/2"},
        { tag : "D_12_17_MODELLO_14", label : "Impegno a presentare modello 14"},
        { tag : "D_12_19_DOCUMENTI_23_1", label : "Dichiarazione di trasmettere al Committente i documenti indicati all'art. 23.1 della RdO"},
        { tag : "D_12_11_01_HS", label : "Requisiti HS (salute e sicurezza)"},
        { tag : "D_12_11_02_SALUTE", label : "Salute e sicurezza"},
        { tag : "D_12_11_03_RSPP", label : "RSPP-ASPP"},
        { tag : "D_12_11_04_COSTI", label : "Costi sicurezza"},
        { tag : "D_12_11_05_OBBLIGHI", label : "Obblighi sicurezza"},
        { tag : "D_12_11_06_DSSC", label : "DSSC"},
        { tag : "D_12_11_07_DSS", label : "DSS"},
        { tag : "D_12_11_08_DPI", label : "DPI"},
        { tag : "D_12_11_09_MEZZI", label : "Mezzi e attrezzature"},
        { tag : "D_12_11_10_ADDETTI", label : "Numero di addetti"},
        { tag : "D_12_18_01_SICILIA", label : "Protocollo di legalita' - Regione Siciliana"},
        { tag : "D_12_18_02_CALTANISETTA", label : "Protocollo di legalita' - Provincia di Caltanisetta"},
        { tag : "D_12_18_03_PEDEMONTANA", label : "Protocollo di legalita' - Pedemontana veneta"}
    ];

    $scope.requiredAttachments = [];
    $scope.notCompliants = 0;
    $scope.compliants = 0;
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
    $scope.notRequiredAttachments = [];

    $scope.getRequiredAttachments = function() {
        $scope.requiredAttachments = []
        $scope.documentCheckList = []
        $scope.notRequiredAttachments = []
        if($scope.bandoGara.requiredAttachments) {
            for (var i = 0; i < $scope.bandoGara.requiredAttachments.length; i++) {
                var tagRequired = {}
                tagRequired.uploadedOn = 'N/A'
                tagRequired.fileName = 'N/A'
                tagRequired._idAttachment = 'N/A'
                tagRequired.isPresent = false
                tagRequired.compliant = true
                tagRequired.conformity = {}
                tagRequired.tag = $scope.bandoGara.requiredAttachments[i]
                tagRequired.label = $scope.getLabelAssociatedToTag(tagRequired.tag);
                $scope.requiredAttachments.push(tagRequired)
                if(null != tagRequired.compliant && undefined != tagRequired.compliant && tagRequired.compliant === false){
                    $scope.notCompliants++;
                }
            }
        }

        $scope.documents = $scope.fornitoreOverview.attachments;
        for (var i = 0; i < $scope.documents.length; i++) {
            var document = $scope.documents[i]
            var tag = document.tag
            var found = false
            for (var j = 0; j < $scope.requiredAttachments.length; j++) {
                var tagRequired = $scope.requiredAttachments[j]
                if (tag === tagRequired.tag) {
                    tagRequired.uploadedOn = document.uploadedOn
                    tagRequired.fileName = document.fileName
                    tagRequired._idAttachment = document._idAttachment
                    tagRequired.isPresent = true
                    found = true
                    tagRequired.compliant = true
                    tagRequired.conformity = $scope.checkConformityForDocument(document.conformity)
                    tagRequired.label = $scope.getLabelAssociatedToTag(tag);
                    $scope.compliants++

                }
            }
            if (!found) {
                $scope.notRequiredAttachments.push(document)
            }
        }
    }

    $scope.checkConformityForDocument = function(conformity){
        var tagConformity = true
        if(conformity.tagConformity.conformity === false){
            tagConformity = false
        }
        if(tagConformity && !conformity.exceptionConformity && conformity.cigConformity === 0 && conformity.sapConformity === 0){
            return 0
        }
        if(!tagConformity || conformity.exceptionConformity || conformity.cigConformity === 1 || conformity.sapConformity === 1){
            return 1
        }
        return 2
    }

    $scope.getLabelAssociatedToTag = function(tag){
        for(var i=0; i< $scope.labelsAssociatedToTag.length; i++){
            if(tag === $scope.labelsAssociatedToTag[i].tag){
                return $scope.labelsAssociatedToTag[i].label;
            }
        }
    }

    $scope.documents = $scope.fornitoreOverview.attachments;




    $scope.getRequiredAttachments()
    console.log('$scope.notRequiredAttachments', $scope.notRequiredAttachments);
    console.log('$scope.requiredAttachments', $scope.requiredAttachments);

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

    $scope.openModalEditSupplier = function () {
        $scope.supplierModified = {}
        $scope.supplierSelected = $scope.fornitoreOverview
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
                $scope.fornitoreOverview = response.data.supplier
            }
            else{
                mainController.showNotification("bottom", "right", response.data.message, '', 'danger');
            }
        })
    }

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
        var fileToBeUploaded = {};
        fileToBeUploaded.files = [];
        console.log('updateAttachmentsForSupplier -- INIT -- ');
        var promises = []
        for (var i = 0; i < $scope.listOfFiles.length;i++){
            var filePromise = new Promise(resolve =>{
                var fileBase64 = null;
                var filename = $scope.listOfFiles[i].name
                var reader = new FileReader();
                reader.readAsBinaryString($scope.listOfFiles[i]);
                reader.onload = function() {
                    fileBase64 = reader.result;
                    var base64String = window.btoa(fileBase64);
                    if (base64String !== null) {
                        fileToBeUploaded.files.push({
                            file: base64String,
                            fileName: filename
                        });
                    }
                    resolve()
                }
            })
            promises.push(filePromise)
        }
        Promise.all(promises).then(() => {
            fileToBeUploaded.cig = $scope.bandoGara.cig[0]
            fileToBeUploaded.idTender = $scope.bandoGara.id
            fileToBeUploaded.idSupplier = $scope.fornitoreOverview.id;
            stompClientFiles.send("/app/updateFiles", {}, JSON.stringify(fileToBeUploaded));
            mainController.showNotification("bottom", "right", "Caricamento file in corso", '', 'info');
        });
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
            var id = document._idAttachment;
            if(id === $scope.selectedDocuments[i]._idAttachment){
                return true;
            }
        }
        return false;
    }

    $scope.selectDocument = function (document, optional) {
        var found = false;
        for(var i = 0; i < $scope.selectedDocuments.length; i++){
            var id = document._idAttachment;
            if(id === $scope.selectedDocuments[i]._idAttachment){
                found = true;
                $scope.selectedDocuments.splice(i, 1)
            }
        }
        if (!found && $scope.selectedDocuments.length == 0) {
            $scope.selectedDocuments.push(document);
            if(optional != true){
                $scope.show(document, 'show');
                location.href = '#page-requiredDoc-view';
            }else{
                $scope.showOptionalDocumentFunction(document, 'show');
                location.href = '#page-notRequiredDoc-view';
            }
        }else if(!found && !$scope.selectedDocuments.length == 0){
            $scope.selectedDocuments = [];
            $scope.selectedDocuments.push(document);
            if(optional != true){
                $scope.show(document, 'show');
                location.href = '#page-requiredDoc-view';
            }else{
                $scope.showOptionalDocumentFunction(document, 'show');
                location.href = '#page-notRequiredDoc-view';
            }
        }else if(found && $scope.selectedDocuments.length == 0){
            if(optional != true){
                $scope.show(document, 'hide');
                location.href = '#page-requiredDoc-view';
            }else{
                $scope.showOptionalDocumentFunction(document, 'hide');
                location.href = '#page-notRequiredDoc-view';
            }
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
                    $scope.setDocument(res.data);
                    mainController.stopProgressIndicator('#loading')
                }, 500)
            });
        }
    }

    $scope.initProgressBar = function(documents){
        var required = $scope.requiredAttachments.length;
        //var percPresence =  Math.floor(documents.filter(d => d.compliant == 0).length / required* 100);
        //var percCheck =  Math.floor(documents.filter(d => d.compliant == 2).length / required * 100);
        var percPresence = Math.floor(documents.filter(d => d.isPresent === true).length /required * 100);
        var percCheck =  Math.floor(documents.filter(d => d.compliant === false).length / required * 100);
        $(".pg-presence").css('width', percPresence + '%').attr('aria-valuenow', percPresence);
        $(".pg-check").css('width', percCheck + '%').attr('aria-valuenow', percCheck);
    }

    $scope.initProgressBar($scope.requiredAttachments);
    mainController.stopProgressIndicator('#loading');

}]);
