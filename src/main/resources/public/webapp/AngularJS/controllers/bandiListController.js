snamApp.controller("bandiListController", ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location,$rootScope) {
    console.log("[INFO] Hello World from bandiListController");

    var url = mainController.getHost() + '/tender/getAllTenders';
    mainController.startProgressIndicator('#loading')

    $scope.getAllTendersByDefault.getFromParent = function(){
        $scope.getAllTenders();
    };

    $scope.getAllTenders = function(){
        mainController.startProgressIndicator('#loading')
        $http.get(url).then(function (response) {
            console.log('response from ', url, ' : ', response)
            if(response.data.status === 200){
                $scope.bandiGaraList = response.data.tenderList;
                $scope.bandiGaraList.forEach(tender => {
                    tender.endDate = mainController.convertLocalDateToDate(tender.endDate)
                    tender.fornitori = tender.suppliers.length
                })
                console.log('tender list : ', $scope.bandiGaraList)
            }
            else{
                mainController.showNotification('bottom', 'right', response.data.message, '', 'danger')
            }
            mainController.stopProgressIndicator('#loading')
        })
    };

    $scope.getAllTenders();

    $scope.bandiSelected = [];

    $scope.openModalEditTender = function (bando) {
        $('#datepickerModify').datepicker({
            locale: 'it-it',
            uiLibrary: 'bootstrap4',
            format: 'dd/mm/yyyy'
        });
        $scope.tenderModified = {}
        $scope.bandoSelected = bando
        $('#editTenderModal').modal()
    }

    $scope.deleteTenders = function(){
        console.log('deleting all tenders selected : ', $scope.bandiSelected)
        for(var i = 0; i < $scope.bandiSelected.length; i++){
            $scope.deleteTender($scope.bandiSelected[i])
        }
    }

    $scope.deleteTender = function(tender){
        console.log('deleting bando ', tender)
        var url = mainController.getHost() + '/tender/deleteTender/' + tender.id
        mainController.startProgressIndicator('#loading')
        $http.delete(url).then(function (response) {
            console.log('response from ', url ,' : ', response)
            if(response.data.status == 200){
                $scope.getAllTenders();
            }
            else{
                mainController.showNotification('bottom', 'right', response.data.message, '', 'danger')
            }
            mainController.stopProgressIndicator('#loading')
        })
    }

    $scope.modifyBando = function(){
        console.log('Bando ' , $scope.bandoSelected, ' modified')
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
                $scope.getAllTenders()
                //mainController.showNotification('bottom', 'right', response.data.message, '', 'info')
            }
            else{
                mainController.showNotification('bottom', 'right', response.data.message, '', 'danger')
            }
        })
    }

    $scope.selectBando = function(bando){
        if(!$scope.bandiSelected.includes(bando)){
            $scope.bandiSelected.push(bando)
        }
        else{
            var tmp = [];
            var k = 0;
            for(var i=0;i<$scope.bandiSelected.length;i++){
                if(bando.cig !== $scope.bandiSelected[i].cig){
                    tmp[k] = $scope.bandiSelected[i];
                    k++;
                }
            }
            $scope.bandiSelected = tmp;
        }
        console.log($scope.bandiSelected)
    }

    $scope.highlightCard = function(bando){
        for(var i = 0; i < $scope.bandiSelected.length ; i++){
            if(bando.cig === $scope.bandiSelected[i].cig){
                return {'background-color' : '#DCF4F2'}
            }
        }
    }

    $scope.goToView = function (path, bandoGara) {
        sessionStorage.setItem('bandoGara', JSON.stringify(bandoGara));
        sessionStorage.setItem('bandoGaraOggetto', bandoGara.object)
        location.href = path;
    }

}]);

