snamApp.controller("navbarController", ['$scope', '$http', '$location', '$rootScope', '$timeout', function($scope, $http, $location,$rootScope, $timeout) {
    console.log("[INFO] Hello World from navbarController");

    $scope.userId = mainController.getUserName()

    $scope.deselectFile = function(file) {
        var newFiles = []
        for (var i = 0; i < $scope.files.length; i++){
            if (file !== $scope.files[i]){
                newFiles.push($scope.files[i])
            }
        }
        $scope.files = newFiles
    };

    $scope.addFiles = function (files){
        var newFiles = []
        for (var i = 0; i < $scope.files.length; i++){
            newFiles.push($scope.files[i])
        }
        for (var i = 0; i < files.length; i++){
            newFiles.push(files[i])
        }
        $scope.files = newFiles
    }

    $scope.createTender = function(){
        $scope.tender.files = []
        console.log('createTender -- INIT -- tender : ', $scope.tender);
        var promises = []
        for (var i = 0; i < $Scope.files.length;i++){
            var filePromise = new Promise(resolve =>{
                var fileBase64 = null;
                var reader = new FileReader();
                reader.readAsBinaryString($scope.files[i]);
                reader.onload = function() {
                    fileBase64 = reader.result;
                    var base64String = window.btoa(fileBase64);
                    if (base64String !== null) {
                        $scope.tender.files.push({
                            file: base64String,
                            fileName: file[i].name
                        });
                    }
                    resolve()
                }
            })
            promises.push(filePromise)
        }
        Promise.all(promises).then(() => {
            stompClient.send("/app/createTender", {}, JSON.stringify($scope.tender));
            mainController.showNotification("bottom", "right", "Creazione gara in corso", '', 'info')
        });
    };

    $scope.openModalCreateTender = function () {
        $('#datepicker2').datepicker({
            locale: 'it-it',
            uiLibrary: 'bootstrap4',
            format: 'dd/mm/yyyy'
        });

        $('#createTenderModal').modal()
    }

    $scope.files = [];

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
            $scope.addFiles(files)

            if(e.target.id === "filedrag" || e.target.id === "imageUpload" || e.target.id === "fileselect"){
                console.log('files = ', $scope.files)
                $timeout(function () {
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
