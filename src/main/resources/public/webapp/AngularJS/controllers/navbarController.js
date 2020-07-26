snamApp.controller("navbarController", ['$scope', '$http', '$location', '$rootScope', '$timeout', function($scope, $http, $location,$rootScope, $timeout) {
    console.log("[INFO] Hello World from navbarController");

    $scope.deselectFile = function() {
        $scope.file = null;
        $scope.contractIsSelected = false;
        $scope.contractSelectedName = "";
    };

    $scope.createTender = function(){
        console.log('createTender -- INIT -- tender : ', $scope.tender);
        var fileBase64 = null;
        var reader = new FileReader();
        reader.readAsBinaryString($scope.file);
        reader.onload = function() {
            fileBase64 = reader.result;
            var base64String = window.btoa(fileBase64);
            if (base64String !== null) {
                $scope.tender.file = base64String;
                $scope.tender.fileName = $scope.contractSelectedName;
            }
            stompClient.send("/app/createTender", {}, JSON.stringify($scope.tender));
            mainController.showNotification("bottom", "right", "Creazione gara in corso. Riceverai una notifica quando il processo sarà terminato", '', 'info')
        }
    };

    $scope.openModalCreateTender = function () {
        $('#datepicker2').datepicker({
            locale: 'it-it',
            uiLibrary: 'bootstrap4',
            format: 'dd/mm/yyyy'
        });

        $('#createTenderModal').modal()
    }

    $scope.file = null;
    $scope.fileToUpload = null;

    $scope.contractIsSelected = false;
    $scope.contractSelectedName = "";

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
            $scope.file = files[0];

            if(e.target.id === "filedrag" || e.target.id === "imageUpload" || e.target.id === "fileselect"){
                var name = processName($scope.file.name);
                console.log('file = ', $scope.file)
                $('#fileToUpload').html(name);
                $timeout(function () {
                    $scope.contractIsSelected = true;
                    $scope.contractSelectedName = $scope.file.name
                    console.log('set contract selected')
                }, 200)

            }
        }
        // initialize
        function Init() {
            var fileselect = $id("fileselect"),
                filedrag = $id("filedrag")

            fileselect.addEventListener("change", FileSelectHandler, false);

            filedrag.addEventListener("dragover", FileDragHover, false);
            filedrag.addEventListener("dragleave", FileDragHover, false);
            filedrag.addEventListener("drop", FileSelectHandler, false);
            filedrag.style.display = "block";

        }

        if (window.File && window.FileList && window.FileReader) {
            Init();
        }
    })();

}]);
