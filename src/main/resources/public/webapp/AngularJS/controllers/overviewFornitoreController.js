snamApp.controller("overviewFornitoreController", ['$scope', '$http', '$location', '$rootScope', '$timeout', function($scope, $http, $location,$rootScope, $timeout) {
    console.log("[INFO] Hello World from overviewFornitoreController");

    $scope.bandoGara = JSON.parse(sessionStorage.getItem("bandoGara"));
    $scope.fornitoreOverview = JSON.parse(sessionStorage.getItem("fornitoreOverview"));

    $scope.labelsAssociatedToTag = [
        {tag : "D_12_11_01_RSPP", label : "Nominativo del RSPP"},
        {tag : "D_12_11_02_RESPONSABILE_LAVORI",	label : "Nominativi del Responsabile/Direttore dei Lavori e del Coordinatore"},
        {tag : "D_12_11_03_RSPP",	label : "Nominativi del RSPP e del ASPP"},
        {tag : "D_12_11_04_PROVVEDIMENTI_SOSPENSIONE",	label : "Dichiarazione relativa ai provvedimenti di sospensione o interdettivi"},
        {tag : "D_12_11_05_SOGGETTO_FORMAZIONE",	label : "Impegno a fornire il nominativo del soggetto di cui all’art. 97 del D.Lgs. 81/08"},
        {tag : "D_12_11_06_ASPP",	label : "Impegno a nominare un Addetto del Servizio di Prevenzione e Protezione (ASPP)"},
        {tag : "D_12_11_07_ANTINCENDIO",	label : "impegno a nominare gli Addetti Antincendio e Pronto Soccorso"},
        {tag : "D_12_11_08_DPI",	label : "Dichiarazione relativa ai DPI"},
        {tag : "D_12_11_09_MEZZI",	label : "Dichiarazione sull'adeguatezza dei mezzi impiegati"},
        {tag : "D_12_11_10_ATMOSFERE_ESPLOSIVE",	label : "Dichiarazione sull'adeguatezza dei mezzi impiegati in caso di 'atmosfere esplosive'"},
        {tag : "D_12_11_11_PIANO_SICUREZZA",	label : "Accettazione del 'Piano di Sicurezza e Coordinamento'"},
        {tag : "D_12_11_12_POS",	label : "Impegno a redigere il POS"},
        {tag : "D_12_11_13_SICUREZZA_SUBAPPALTATORI",	label : "Impegno a richiedere la documentazione a subappaltatori/subcontraenti"},
        {tag : "D_12_11_14_ONERI",	label : "Dichiarazione relativa alle imprese esecutrici e agli oneri della sicurezza"},
        {tag : "D_12_11_15_COSTI_SICUREZZA",	label : "Idoneita' dei costi indicati nel Piano di Sicurezza e di Coordinamento"},
        {tag : "D_12_11_16_DSS",	label : "Impegno a redigere e aggiornare il DSS"},
        {tag : "D_12_11_17_DSSC",	label : "Impegno a sottoscrivere e rispettare il DSSC"},
        {tag : "D_12_11_18_OBBLIGHI_SICUREZZA",	label : "Dichiarazione relativa alle disposizioni in materia di salute e sicurezza"},
        {tag : "D_12_11_19_SICUREZZA_INQUINAMENTO",	label : "Dichiarazione sulla sicurezza relativa ad ambienti sospetti di inquinamento o confinati"},
        {tag : "D_12_11_20_DOCUMENTAZIONE_624_1996",	label : "Impegno a fornire la documentazione prevista dal D.Lgs.624/1996"},
        {tag : "D_12_11_21_RADIAZIONI",	label : "Impegno a rispettare i documenti relativi a 'Attivita' in aree EX e radiazioni ionizzanti'"},
        {tag : "D_12_11_22_IDONEITA_DIRETTORE_SORVEGLIANTI",	label : "Dichiarazione sull'idoneita' di 'Direttore Responsabile' e 'Sorveglianti' "},
        {tag : "D_12_11_23_SICUREZZA_105_2015",	label : "Legge Seveso"},
        {tag : "D_12_11_24_PERICOLI_INCIDENTI",	label : "Dichiarazione relativa ai pericoli di incidenti rilevanti e alla security"},
        {tag : "D_12_11_25_ DOCUMENTAZIONE_SICUREZZA",	label : "Dichiarazione sulla prevenzione degli incidenti, sui rischi e sulle norme di comportamento, sul PEI e sul DSSC"},
        {tag : "D_12_11_26_SUPERVISIONE_COLLAUDO",	label : "Impegno a fornire la congrua documentazione in in occasione di visite di supervisione/collaudo"},
        {tag : "D_12_11_27_NOMINA_FIGURE",	label : "Lettere di nomina e attestati dei corsi di formazione previsti."},
        {tag : "D_12_11_28_DVR_POS",	label : "Impegno ad redigere/aggiornare D.V.R. e/o POS"},
        {tag : "D_12_11_29_DUVRI",	label : "Dichiarazione riguardante il DUVRI"},
        {tag : "D_12_11_30_TABELLA_RISCHI",	label : "Dichiarazione di presa visione della Tabella rischi specifici, misure di prevenzione e di emergenza"},
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
        { tag : "D_12_18_03_PEDEMONTANA", label : "Protocollo di legalita' - Pedemontana veneta"},
        { tag : "D_13_01_PROGRAMMA_LAVORI", label : "Programma lavori"},
        { tag : "D_13_02_DESCRIZIONE_ATTIVITA", label : "Descrizione attivita'"},
        { tag : "D_13_03_VARIANTI", label : "Varianti formulate dall'offerente"},

        { tag : "D_13_04_01_REQUISITI_PARTECIPAZIONE", label : "Dichiarazione possesso dei requisiti di partecipazione"},
        { tag : "D_13_04_02_MEZZI", label : "Dichiarazione dei mezzi e attrezzature"},
        { tag : "D_13_04_03_FIRMA_LEGALE_RAPPRESENTANTE", label : "Dichiarazione firma legale rappresentante"},
        { tag : "D_13_05_NOMINATIVI_FUNZIONI", label : "Nominativi funzioni di interesse"},
        { tag : "D_13_07_01_ATTIVITA_SUBAPPALTO", label : "Attivita' subappalto"},
        { tag : "D_13_07_02_IMPORTO_SUBAPPALTO", label : "Importo subappalto"},
        { tag : "D_13_08_ESCLUSIONE_COOPERAZIONE", label : "Nominativi, prestazioni e assenza motivi esclusione in caso di cooperazione"},
        { tag : "M_22_COSTI_CHIUSI", label : "Dichiarazione Costo della manodopera e oneri di sicurezza aziendale - Contratti chiusi"},
        { tag : "M_10_IDONEITA_TECNICA", label : "Autocertificazione idoneita' tecnica"},
        { tag : "M_21_PROVENIENZA_PRODOTTI", label : "Dichiarazione provenienza prodotti"},

        { tag : "M_23_COSTI_APERTI", label : "Dichiarazione Costo della manodopera e oneri di sicurezza aziendale - Contratti aperti"},
        { tag : "M_24_CONFERMA_COSTI", label : "Dichiarazione di conferma/integrazione costi già dichiariati"},
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
                $scope.compliants = 0
                $scope.notCompliants = 0
                $scope.fornitoreOverview = response.data.supplier
                sessionStorage.setItem('fornitoreOverview', JSON.stringify($scope.fornitoreOverview))
                $scope.getRequiredAttachments()
            }
            mainController.stopProgressIndicator('#loading')
        })
    }
    $scope.notRequiredAttachments = [];

    $scope.initProgressBar = function(documents){
        var required = $scope.requiredAttachments.length;
        var percConform = Math.floor(documents.filter(d => d.conformity === 0 || d.conformity === 2).length /required * 100);
        var percNotConform =  Math.floor(documents.filter(d =>  d.conformity === 1).length / required * 100);
        $(".pg-presence").css('width', percConform + '%').attr('aria-valuenow', percConform);
        $(".pg-check").css('width', percNotConform + '%').attr('aria-valuenow', percNotConform);
    }

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
                tagRequired.conformityDetail = {}
                tagRequired.conformity = -1
                tagRequired.tag = $scope.bandoGara.requiredAttachments[i]
                tagRequired.label = $scope.getLabelAssociatedToTag(tagRequired.tag);
                $scope.requiredAttachments.push(tagRequired)
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
                    tagRequired.conformityDetail = document.conformity
                    tagRequired.conformity = $scope.checkConformityForDocument(document.conformity)
                    tagRequired.label = $scope.getLabelAssociatedToTag(tag);
                    $scope.compliants++
                }
            }
            if (!found) {
                $scope.notRequiredAttachments.push(document)
            }
        }
        $scope.initProgressBar($scope.requiredAttachments)
    }

    $scope.checkConformityForDocument = function(conformity){
        if(conformity !== undefined) {
            var tagConformity = true
            if(conformity.tagConformity !== undefined) {
                if (conformity.tagConformity.conformity === false) {
                    tagConformity = false
                }
                if (tagConformity && !conformity.exceptionConformity && conformity.cigConformity === 0 && conformity.sapConformity === 0) {
                    return 0
                }
                if (!tagConformity || conformity.exceptionConformity || conformity.cigConformity === 1 || conformity.sapConformity === 1) {
                    $scope.notCompliants++
                    return 1
                }
                return 2
            }
            return -1
        }
        return -1
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
        console.log('openModalEditSupplier -- init --')
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
            fileToBeUploaded.tenderNumber = $scope.bandoGara.sapNumber
            stompClientFiles.send("/app/updateFiles", {}, JSON.stringify(fileToBeUploaded));
            mainController.showNotification("bottom", "right", "Caricamento file in corso", '', 'info');
        });
    }

    console.log("$scope.documents: ", $scope.documents);


    $scope.showDocument = false;
    $scope.showOptionalDocument = false;

    console.log("$scope.showOptionalDocument: ", $scope.showOptionalDocument);


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
        if(document._idAttachment != undefined && document._idAttachment != null && document._idAttachment !== "N/A") {
            var found = false;
            for (var i = 0; i < $scope.selectedDocuments.length; i++) {
                var id = document._idAttachment;
                if (id === $scope.selectedDocuments[i]._idAttachment) {
                    found = true;
                    $scope.selectedDocuments.splice(i, 1)
                }
            }
            if (!found && $scope.selectedDocuments.length == 0) {
                $scope.selectedDocuments.push(document);
                if (optional != true) {
                    $scope.show(document, 'show');
                    location.href = '#page-requiredDoc-view';
                } else {
                    $scope.showOptionalDocumentFunction(document, 'show');
                    location.href = '#page-notRequiredDoc-view';
                }
            } else if (!found && !$scope.selectedDocuments.length == 0) {
                $scope.selectedDocuments = [];
                $scope.selectedDocuments.push(document);
                if (optional != true) {
                    $scope.show(document, 'show');
                    location.href = '#page-requiredDoc-view';
                } else {
                    $scope.showOptionalDocumentFunction(document, 'show');
                    location.href = '#page-notRequiredDoc-view';
                }
            } else if (found && $scope.selectedDocuments.length == 0) {
                if (optional != true) {
                    $scope.show(document, 'hide');
                    location.href = '#page-requiredDoc-view';
                } else {
                    $scope.showOptionalDocumentFunction(document, 'hide');
                    location.href = '#page-notRequiredDoc-view';
                }
            }
        }
    }

    $scope.documentSelectedForDetail = {}

    $scope.show = function(document, action) {
        console.log('showDocument called');
        if(action === 'hide'){
            $scope.showDocument = false;
        }else{
            $scope.showDocument = true;
            $scope.documentSelectedForDetail = document
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



    mainController.stopProgressIndicator('#loading');

}]);
