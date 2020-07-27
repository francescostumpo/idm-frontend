snamApp.controller("commonController", ['$scope', '$http', '$location', '$rootScope', '$timeout', function($scope, $http, $location,$rootScope, $timeout) {
    console.log("[INFO] Hello World from commontController");

    $scope.sideBarIsClosed = true

    $scope.userNotifications = []

    var url = mainController.getFrontendHost() + '/getUserNotification?userId=RIDP86Z'
    $http.get(url).then(function (response) {
        console.log('response from url ', url ,' : ', response)
        if(response.data.status === 200){
            $scope.userNotifications = response.data.userNotifications
            /*$scope.userNotifications.forEach(notification => {
                notification.creationDate = mainController.convertLocalDateToDate(notification.creationDate)
            })*/
        }
    })

    stompClient.connect({}, function(frame){
        stompClient.subscribe("/topic/pushNotification", function(message){
            console.log("Received message:" + message.body);
        });
        stompClient.subscribe("/user/queue/errors", function(message) {

        });
        stompClient.subscribe("/user/queue/reply", function(message) {
            console.log('message ', message)
            var response = JSON.parse(message.body)
            if(response.status === 200){
                mainController.showNotification('bottom', 'right', response.message, '', 'info')
                var url = mainController.getFrontendHost() + '/createNotification'
                var tenderNotification = $scope.createNotificationFromTender(response.tender, 'tenderCreation')
                $http.post(url, tenderNotification).then(function (response) {
                    console.log(' responde from ', url, ' : ', response)
                    if(response.data.status === 200){
                        $scope.userNotifications.push(response.data.userNotification)
                    }
                })
            }
            else{
                mainController.showNotification('bottom', 'right', response.message, '', 'danger')
            }
        });
        stompClient.subscribe("/user/queue/success", function(message) {
            console.log("Message " + message.body + ' ' + new Date());
        });
    }, function(error){
        console.log("STOMP protocol error: ", error);
    });

    $scope.createNotificationFromTender = function(tender, notificationType){
        var notification = {}
        notification.userId = 'RIDP86Z'
        notification.cig = tender.cig[0]
        notification.idTender = tender.id
        notification.notificationType = notificationType
        return notification
    }

    $scope.processName = function(name, length, subString){
        if(name.length > length){
            var nameProcessed = name.substring(0, subString) + '...';
            return nameProcessed
        }
        return name
    }

    $scope.sort = {
        name: '',
        uploadedAt: '',
        conformity: '',
        cig: '',
        object: '',
        company: '',
        endDate: '',
        fornitori: ''
    }

    $scope.sortCardsByColumnName = function(cards, column){
        for (key in $scope.sort) {
            if (key != column){
                $scope.sort[key] = ''
            }
        }
        $scope.sort[column] = $scope.revertSortingOrder($scope.sort[column]);
        cards.sort((a, b) => $scope.customSort(a, b, column, $scope.sort[column]));
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

    $scope.goToViewNavigation = function(destination){
        location.href = destination;
    }

    $("#content-wrapper").click(function () {
        console.log('click on content-wrapper')
        if(!$scope.sideBarIsClosed){
            $scope.toggleSideBar()
        }
    });

    $scope.toggleSideBar = function(){
        console.log('toggle sidebar')
        if($scope.sideBarIsClosed){
            $('#accordionSidebar').addClass('sidebarOverlay')
            $('#accordionSidebar').removeClass('sidebarClosed')
            $('#content-wrapper').addClass('opacity0punto2')
            $scope.sideBarIsClosed = false;
        }
        else{
            $('#accordionSidebar').addClass('sidebarClosed')
            $('#accordionSidebar').removeClass('sidebarOverlay')
            $('#content-wrapper').removeClass('opacity0punto2')
            $scope.sideBarIsClosed = true;
        }
    }

    $scope.openModalUploadDocument = function(idModal, idFileSelect, idFileDrag, idImageUpload){
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
            // file selection
            function FileSelectHandler(e) {
                // cancel event and hover styling
                FileDragHover(e);
                console.log(e.target.id)
                // fetch FileList object
                var files = e.target.files || e.dataTransfer.files;
                var file = files[0];
                if(e.target.id === idFileDrag || e.target.id === idImageUpload || e.target.id === idFileSelect){
                    console.log('file = ', file)
                    $timeout(function () {
                        $scope.listOfFiles.push(file)
                        console.log('set contract selected')
                    }, 200)
                }
            }
            // initialize
            function Init() {
                var fileselect = $id(idFileSelect),
                    filedrag = $id(idFileDrag)
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
        $scope.listOfFiles = [];
        $('#' + idModal).modal()
    }

    $scope.removeFileFromListOfFile = function(file){
        var tmp = []
        for(var i = 0 ; i < $scope.listOfFiles.length; i++){
            var fileName = $scope.listOfFiles[i].name
            var size = $scope.listOfFiles[i].size
            if(file.name !== fileName || file.size !== size){
                tmp.push($scope.listOfFiles[i])
            }
        }
        $scope.listOfFiles = tmp
    }

    $scope.listOfFiles = [];

}]);