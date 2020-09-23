snamApp.controller("navbarController", ['$scope', '$http', '$location', '$rootScope', '$timeout', function($scope, $http, $location,$rootScope, $timeout) {
    console.log("[INFO] Hello World from navbarController");

    $scope.userId = mainController.getUserName()

    $scope.missingDataForCreationNewTender = function() {
        if($scope.tender === undefined || $scope.tender.endDate === ""){
            return true
        }
        if($scope.creatingTender.uploadOneFile){
            return !$scope.rdoAndLetterIsSelected
        }
        else{
            return !$scope.rdoIsSelected || !$scope.letterIsSelected
        }
    }

    $scope.deselectFile = function(tag) {
        $scope.file = null;
        if(tag === 'fileRdo'){
            $scope.rdoIsSelected = false
            $scope.fileRdo = null
            $scope.rdoSelectedName = ""
        }
        else if(tag === 'fileRdoAndLetter'){
            $scope.fileRdoAndLetter = null
            $scope.rdoAndLetterIsSelected = false
            $scope.rdoAndLetterSelectedName = ""
        }
        else{
            $scope.letterIsSelected = false
            $scope.fileLetter = null
            $scope.letterSelectedName = ""
        }
    };

    $scope.creatingTender = {
        "uploadOneFile" : false
    }

    $scope.createTender = function(){
        if($scope.creatingTender.uploadOneFile){
            $scope.createTenderWithOneFile()
        }
        else{
            $scope.createTenderWithTwoFiles()
        }
    }

    $scope.createTenderWithOneFile = function() {
        var fileBase64 = null;
        var reader = new FileReader();
        reader.readAsBinaryString($scope.fileRdoAndLetter);
        reader.onload = function() {
            fileBase64 = reader.result;
            var base64String = window.btoa(fileBase64);
            if (base64String !== null) {
                $scope.tender.file = base64String;
                $scope.tender.fileName = $scope.rdoAndLetterSelectedName;
            }
            $scope.tender.uploadOneFile = $scope.creatingTender.uploadOneFile
            stompClient.send("/app/createTender", {}, JSON.stringify($scope.tender));
            mainController.showNotification("bottom", "right", "Creazione gara in corso", '', 'info')
        }
    }

    $scope.createTenderWithTwoFiles = function(){
        console.log('createTender -- INIT -- tender : ', $scope.tender);
        var fileBase64Rdo = null;
        var readerRdo = new FileReader();
        readerRdo.readAsBinaryString($scope.fileRdo);
        readerRdo.onload = function() {
            fileBase64Rdo = readerRdo.result;
            var base64String = window.btoa(fileBase64Rdo);
            if (base64String !== null) {
                $scope.tender.fileRdo = base64String;
                $scope.tender.fileNameRdo = $scope.rdoSelectedName;
            }
            var fileBase64Letter = null;
            var readerLetter = new FileReader();
            readerLetter.readAsBinaryString($scope.fileLetter);
            readerLetter.onload = function() {
                fileBase64Letter = readerLetter.result;
                var base64String = window.btoa(fileBase64Letter);
                if (base64String !== null) {
                    $scope.tender.fileLetter = base64String;
                    $scope.tender.fileNameLetter = $scope.letterSelectedName;
                }
                $scope.tender.uploadOneFile = $scope.creatingTender.uploadOneFile
                stompClient.send("/app/createTender", {}, JSON.stringify($scope.tender));
                mainController.showNotification("bottom", "right", "Creazione gara in corso", '', 'info')
            }
        }
    };

    $scope.deleteNotification = function (notification) {
        console.log('eliminating notification ', notification)
        var endPoint = mainController.getFrontendHost() + '/deleteNotification?'
        var params = 'idNotification=' + notification.id + "&" + 'idUser=' + mainController.getUserId()
        var url = endPoint + params
        $http.delete(url).then(function (response) {
            console.log('response from ', url ,' : ', response)
            if(response.data.status === 200) {
                $scope.getNotificationForUser()
            }
            else{
                mainController.showNotification('bottom', 'right', response.data.message, '', 'danger')
            }
        })
    };

    $scope.deleteAllNotificationsForUser = function(){
        console.log('eliminating all notifications')
        var endPoint = mainController.getFrontendHost() + '/deleteAllNotificationsForUser?'
        var params = 'idUser=' + mainController.getUserId()
        var url = endPoint + params
        $http.delete(url).then(function (response) {
            console.log('response from ', url ,' : ', response)
            if(response.data.status === 200) {
                $scope.getNotificationForUser()
            }
            else{
                mainController.showNotification('bottom', 'right', response.message, '', 'danger')
            }
        })
    }

    $scope.openModalCreateTender = function () {
        $('#datepicker2').datepicker({
            locale: 'it-it',
            uiLibrary: 'bootstrap4',
            format: 'dd/mm/yyyy'
        });
        $scope.creatingTender = {
            "uploadOneFile" : false
        }

        $('#createTenderModal').modal()
    }

    $scope.fileRdo = null;
    $scope.fileLetter = null
    $scope.fileToUpload = null;
    $scope.fileRdoAndLetter = null

    $scope.rdoIsSelected = false;
    $scope.rdoSelectedName = "";

    $scope.letterIsSelected = false;
    $scope.letterSelectedName = "";

    $scope.rdoAndLetterIsSelected = false;
    $scope.rdoAndLetterSelectedName = "";

    (function() {
        // getElementById
        function $id(id) {
            return document.getElementById(id);
        }

        function FileDragHover(e) {
            e.stopPropagation();
            e.preventDefault();
            e.target.className = (e.type == "dragover" ? "hover" : "");
        }

        function processName(name){
            if(name.length > 20){
                var firstSubstring = name.substring(0, 24);
                var secondSubstring = name.substring(name.length - 8, name.length);
                name = firstSubstring + '...' + secondSubstring;
            }
            return name;
        }
        // file selection
        function FileSelectHandler(e) {
            // cancel event and hover styling
            FileDragHover(e);
            console.log(e.target.id)
            // fetch FileList object
            var files = e.target.files || e.dataTransfer.files;
            $scope.file = files[0]
            if(e.target.id === "filedrag" || e.target.id === "imageUpload" || e.target.id === "fileselect"){
                var name = processName($scope.file.name);
                console.log('file = ', $scope.file)
                $('#fileToUpload').html(name);
                $timeout(function () {
                    $scope.fileRdo = files[0];
                    $scope.rdoIsSelected = true;
                    $scope.rdoSelectedName = $scope.file.name
                    console.log('set rdo selected')
                }, 200)
            }

            if(e.target.id === "filedrag5" || e.target.id === "imageUpload5" || e.target.id === "fileselect5"){
                var name = processName($scope.file.name);
                console.log('file = ', $scope.file)
                $('#fileToUpload').html(name);
                $timeout(function () {
                    $scope.fileLetter = files[0]
                    $scope.letterIsSelected = true;
                    $scope.letterSelectedName = $scope.file.name
                    console.log('set letter selected')
                }, 200)
            }

            if(e.target.id === "filedrag6" || e.target.id === "imageUpload6" || e.target.id === "fileselect6"){
                var name = processName($scope.file.name);
                console.log('file = ', $scope.file)
                $('#fileToUpload').html(name);
                $timeout(function () {
                    $scope.fileRdoAndLetter = files[0];
                    $scope.rdoAndLetterIsSelected = true;
                    $scope.rdoAndLetterSelectedName = $scope.file.name
                    console.log('set rdo and letter selected')
                }, 200)
            }

        }
        // initialize
        function Init() {
            var fileselect = $id("fileselect"),
                filedrag = $id("filedrag"),
                fileselect5 = $id("fileselect5"),
                filedrag5 = $id("filedrag5"),
                fileselect6 = $id("fileselect6"),
                filedrag6 = $id("filedrag6")

            fileselect.addEventListener("change", FileSelectHandler, false);

            filedrag.addEventListener("dragover", FileDragHover, false);
            filedrag.addEventListener("dragleave", FileDragHover, false);
            filedrag.addEventListener("drop", FileSelectHandler, false);
            filedrag.style.display = "block";

            fileselect5.addEventListener("change", FileSelectHandler, false);

            filedrag5.addEventListener("dragover", FileDragHover, false);
            filedrag5.addEventListener("dragleave", FileDragHover, false);
            filedrag5.addEventListener("drop", FileSelectHandler, false);
            filedrag5.style.display = "block";

            fileselect6.addEventListener("change", FileSelectHandler, false);

            filedrag6.addEventListener("dragover", FileDragHover, false);
            filedrag6.addEventListener("dragleave", FileDragHover, false);
            filedrag6.addEventListener("drop", FileSelectHandler, false);
            filedrag6.style.display = "block";
        }

        if (window.File && window.FileList && window.FileReader) {
            Init();
        }
    })();

}]);
