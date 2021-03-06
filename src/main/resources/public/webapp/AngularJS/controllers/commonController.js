snamApp.controller("commonController", ['$scope', '$http', '$location', '$rootScope', '$timeout', function($scope, $http, $location,$rootScope, $timeout) {
    console.log("[INFO] Hello World from commontController");

    $scope.sideBarIsClosed = true;

    $scope.userNotifications = [];

    $scope.getAllTendersByDefault = {};
    $scope.getSuppliersByTenderId = {};
    $scope.getTenderAttachmentsByTenderId = {};
    $scope.requiredAttachmentsCommon = {};

    $scope.selectedDocuments = [];
    $scope.selectedDocument = undefined

    $scope.getNotificationForUser = function() {
        var url = mainController.getFrontendHost() + '/getUserNotification?userId=' + mainController.getUserId();
        $http.get(url).then(function (response) {
            console.log('response from url ', url, ' : ', response)
            if (response.data.status === 200) {
                $scope.userNotifications = response.data.userNotifications
            }
        })
    }

    $scope.getNotificationForUser()

    stompClientFiles.connect({}, function(frame){
        stompClientFiles.subscribe("/topic/pushNotification", function(message){
            console.log("Received message:" + message.body);
        });
        stompClientFiles.subscribe("/user/queue/errors", function(message) {

        });
        stompClientFiles.subscribe("/user/queue/reply/updateFiles", function(message) {
            console.log('message ', message)
            var response = JSON.parse(message.body)
            if(response.status === 200) {
                mainController.showNotification('bottom', 'right', response.message, '', 'success')
                if(response.updated === 'tender'){
                    $scope.getTenderAttachmentsByTenderId.getFromParent();
                    //var notification = $scope.createNotificationForUploadFile(response, 'uploadFileTender',response.creationStatus)
                    //$scope.sendNotification(url, notification)
                }
                else if(response.updated === 'supplier'){
                    $scope.requiredAttachmentsCommon.getFromParent();
                    //var notification = $scope.createNotificationForUploadFile(response, 'uploadFileSupplier',response.creationStatus)
                    //$scope.sendNotification(url, notification)
                }
            }
            else{
                mainController.showNotification('bottom', 'right', response.message, '', 'danger')
                //var notification = $scope.createNotificationForUploadFile({}, 'uploadFileSupplier',response.creationStatus)
                //$scope.sendNotification(url, notification)
            }
            $scope.getNotificationForUser()
        });
        stompClientFiles.subscribe("/user/queue/success", function(message) {
            console.log("Message " + message.body + ' ' + new Date());
        });
    }, function(error){
        console.log("STOMP protocol error: ", error);
    });


    stompClientSupplier.connect({}, function(frame){
        stompClientSupplier.subscribe("/topic/pushNotification", function(message){
            console.log("Received message:" + message.body);
        });
        stompClientSupplier.subscribe("/user/queue/errors", function(message) {

        });
        stompClientSupplier.subscribe("/user/queue/reply/supplier", function(message) {
            console.log('message ', message)
            var response = JSON.parse(message.body)
            if(response.status === 200) {
                var creationStatus = response.creationStatus
                if(creationStatus === 'SUPPLIER_CREATED'){
                    mainController.showNotification('bottom', 'right', response.message, '', 'success')
                }
                else if(creationStatus === 'SUPPLIER_CREATED_WITH_FILE_ERROR'){
                    mainController.showNotification('bottom', 'right', response.message, '', 'warning')
                }
                $scope.getSuppliersByTenderId.getFromParent()
                //var url = mainController.getFrontendHost() + '/createNotification'
                //var supplierNotification = $scope.createNotificationForSupplier(response.supplier, 'supplierCreation', creationStatus)
                //$scope.sendNotification(url, supplierNotification, $scope.getSuppliersByTenderId)
            }
            else{
                mainController.showNotification('bottom', 'right', response.message, '', 'danger')
                //var url = mainController.getFrontendHost() + '/createNotification'
                //var supplierNotification = $scope.createNotificationForSupplier({}, 'supplierCreation', 'SUPPLIER_NOT_CREATED')
                //$scope.sendNotification(url, supplierNotification, $scope.getSuppliersByTenderId)
            }
            $scope.getNotificationForUser()
        });
        stompClientSupplier.subscribe("/user/queue/success", function(message) {
            console.log("Message " + message.body + ' ' + new Date());
        });
    }, function(error){
        console.log("STOMP protocol error: ", error);
    });
  
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
                var creationStatus = response.creationStatus
                if(creationStatus === 'TENDER_ALREADY_EXIST'){
                    mainController.showNotification('bottom', 'right', response.message, '', 'warning')
                }
                else if(creationStatus === 'TENDER_CREATED'){
                    mainController.showNotification('bottom', 'right', response.message, '', 'success')
                }
                else if(creationStatus === 'TENDER_CREATED_WITH_MISSING_DATA'){
                    mainController.showNotification('bottom', 'right', response.message, '', 'warning')
                }
                $scope.getAllTendersByDefault.getFromParent()
                //var url = mainController.getFrontendHost() + '/createNotification'
                //var tenderNotification = $scope.createNotificationFromTender(response.tender, 'tenderCreation', creationStatus)
                //$scope.sendNotification(url, tenderNotification, $scope.getAllTendersByDefault)
            }
            else{
                mainController.showNotification('bottom', 'right', response.message, '', 'danger')
                //var tenderNotification = $scope.createNotificationFromTender({}, 'tenderCreation', 'TENDER_NOT_CREATED')
                //$scope.sendNotification(url, tenderNotification, $scope.getAllTendersByDefault)
            }
            $scope.getNotificationForUser()
        });
        stompClient.subscribe("/user/queue/success", function(message) {
            console.log("Message " + message.body + ' ' + new Date());
        });
    }, function(error){
        console.log("STOMP protocol error: ", error);
    });

    $scope.sendNotification = function(url, notification, parent){
        $http.post(url, notification).then(function (response) {
            console.log(' response from ', url, ' : ', response);
            if(response.data.status === 200){
                $scope.userNotifications.push(response.data.userNotification);
                if(parent !== undefined) {
                    parent.getFromParent()
                }
            }
        })
    }

    $scope.createNotificationForUploadFile = function(response, notificationType, creationStatus){
        var notification = {}
        notification.userId = mainController.getUserId()
        notification.idTender = response.idTender
        notification.idSupplier = response.idSupplier
        notification.notificationType = notificationType
        notification.tenderNumber = response.sapNumber
        notification.supplierName = response.supplierName
        notification.status = creationStatus
        return notification
    }

    $scope.createNotificationForSupplier = function(supplier, notificationType, statusCreation){
        var notification = {}
        notification.userId = mainController.getUserId()
        notification.tenderNumber = supplier.tenderSapNumber
        notification.idTender = supplier.idTender
        notification.notificationType = notificationType
        notification.status = statusCreation
        notification.idSupplier = supplier.id
        notification.supplierName = supplier.name
        return notification
    }

    $scope.createNotificationFromTender = function(tender, notificationType, statusCreation){
        var notification = {}
        notification.userId = mainController.getUserId()
        notification.tenderNumber = tender.sapNumber
        notification.idTender = tender.id
        notification.notificationType = notificationType
        notification.status = statusCreation
        return notification
    }

    $scope.checkIfIsSelected = function(element){
        if(element !== undefined && element !== ''){
            return {'color' : '#004B9C'}
        }
    }



    $scope.processName = function(name, length, subString){
        if(name != undefined) {
            if (name.length > length) {
                var nameProcessed = name.substring(0, subString) + '...';
                return nameProcessed
            }
        }
        return name
    }

    $scope.goToGaraOverview = function(tender){
        sessionStorage.setItem("bandoGara", JSON.stringify(tender));
        location.href = '/garaOverview'
    }

    $scope.sort = {
        name: '',
        uploadedAt: '',
        conformity: '',
        cig: '',
        object: '',
        company: '',
        endDate: '',
        fornitori: '',
        codiceGara: ''
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
        $scope.listOfFiles = [];
        $('#' + idModal).modal()
    }



    $scope.removeFileFromListOfFile = function(file){
        var newFiles = []
        for (var i = 0; i < $scope.listOfFiles.length; i++){
            if (file !== $scope.listOfFiles[i]){
                newFiles.push($scope.listOfFiles[i])
            }
        }
        $scope.listOfFiles = newFiles
    }

    $scope.addFilesToListOfFile = function (files){
        var newFiles = []
        for (var i = 0; i < $scope.listOfFiles.length; i++){
            var file = $scope.listOfFiles[i]
            newFiles.push(file)
        }
        for (var i = 0; i < files.length; i++){
            var file = files[i]
            var fileSize = file.size
            var fileSizeInMB = fileSize * (0.0000009537)
            if(fileSizeInMB > 16 && !file.name.includes('.zip')) {
                mainController.showNotification('bottom', 'right', 'Il file ' + file.name + ' supera la dimensione massima di 16 MB' , '', 'danger')
            }else{
                newFiles.push(files[i])
            }
        }
        $scope.listOfFiles = newFiles
    }

    $scope.listOfFiles = [];

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
            $scope.addFilesToListOfFile(files)
            if(e.target.id === 'fileselect2' || e.target.id === 'filedrag2' || e.target.id === 'fileselect2'
                || e.target.id === 'fileselect' || e.target.id === 'filedrag' || e.target.id === 'fileselect'
                || e.target.id === 'fileselect3' || e.target.id === 'filedrag3' || e.target.id === 'fileselect3'
                || e.target.id === 'fileselect4' || e.target.id === 'filedrag4' || e.target.id === 'fileselect4'
                || e.target.id === 'fileselect5' || e.target.id === 'filedrag5' || e.target.id === 'fileselect5'
                || e.target.id === 'fileselect6' || e.target.id === 'filedrag6' || e.target.id === 'fileselect6'){
                console.log('files = ', $scope.listOfFiles)
                $timeout(function () {
                    console.log('set contract selected')
                }, 200)
            }
        }
        // initialize
        function Init() {
            var fileselect4 = $id('fileselect4'),
                filedrag4 = $id('filedrag4')
            if(fileselect4 !== null && filedrag4 !== null) {
                fileselect4.addEventListener("change", FileSelectHandler, false);
                filedrag4.addEventListener("dragover", FileDragHover, false);
                filedrag4.addEventListener("dragleave", FileDragHover, false);
                filedrag4.addEventListener("drop", FileSelectHandler, false);
                filedrag4.style.display = "block";
            }

            var fileselect2 = $id('fileselect2'),
                filedrag2 = $id('filedrag2')
            if(fileselect2 !== null && filedrag2 !== null) {
                fileselect2.addEventListener("change", FileSelectHandler, false);
                filedrag2.addEventListener("dragover", FileDragHover, false);
                filedrag2.addEventListener("dragleave", FileDragHover, false);
                filedrag2.addEventListener("drop", FileSelectHandler, false);
                filedrag2.style.display = "block";
            }

            var fileselect3 = $id('fileselect3'),
                filedrag3 = $id('filedrag3')
            if(fileselect3 !== null && filedrag3 !== null) {
                fileselect3.addEventListener("change", FileSelectHandler, false);
                filedrag3.addEventListener("dragover", FileDragHover, false);
                filedrag3.addEventListener("dragleave", FileDragHover, false);
                filedrag3.addEventListener("drop", FileSelectHandler, false);
                filedrag3.style.display = "block";
            }

            var fileselect = $id('fileselect'),
                filedrag = $id('filedrag')
            if(fileselect !== null && filedrag !== null) {
                fileselect.addEventListener("change", FileSelectHandler, false);
                filedrag.addEventListener("dragover", FileDragHover, false);
                filedrag.addEventListener("dragleave", FileDragHover, false);
                filedrag.addEventListener("drop", FileSelectHandler, false);
                filedrag.style.display = "block";
            }

            var fileselect5 = $id('fileselect5'),
                filedrag5 = $id('filedrag5')
            if(fileselect5 !== null && filedrag5 !== null) {
                fileselect5.addEventListener("change", FileSelectHandler, false);
                filedrag5.addEventListener("dragover", FileDragHover, false);
                filedrag5.addEventListener("dragleave", FileDragHover, false);
                filedrag5.addEventListener("drop", FileSelectHandler, false);
                filedrag5.style.display = "block";
            }

            var fileselect6 = $id('fileselect6'),
                filedrag6 = $id('filedrag6')
            if(fileselect6 !== null && filedrag5 !== null) {
                fileselect6.addEventListener("change", FileSelectHandler, false);
                filedrag6.addEventListener("dragover", FileDragHover, false);
                filedrag6.addEventListener("dragleave", FileDragHover, false);
                filedrag6.addEventListener("drop", FileSelectHandler, false);
                filedrag6.style.display = "block";
            }

        }
        if (window.File && window.FileList && window.FileReader) {
            Init();
        }
    })();

}]);
