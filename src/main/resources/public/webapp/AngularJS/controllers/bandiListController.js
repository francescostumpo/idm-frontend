snamApp.controller("bandiListController", ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location,$rootScope) {
    console.log("[INFO] Hello World from bandiListController");

    $scope.bandiGaraList = [
        {
            "cig": "5100001260",
            "societa": "Acme Inc.",
            "oggetto": "Fornitura di componenti hardware",
            "lavorazione": new Date("2020-06-23T15:18"),
            "chiusuraGara": new Date("2020-06-23T15:18"),
            "fornitori": 12
        },
        {
            "cig": "5100001259",
            "societa": "Stogit",
            "oggetto": "Fornitura di tubi senza saldatura",
            "lavorazione": new Date("2020-08-15T15:18"),
            "chiusuraGara": new Date("2020-08-15T15:18"),
            "fornitori": 15
        },
        {
            "cig": "5100001263",
            "societa": "G. House Medicals",
            "oggetto": "Fornitura di materiali di primo soccorso",
            "lavorazione": new Date("2020-06-23T15:18"),
            "chiusuraGara": new Date("2020-06-23T15:18"),
            "fornitori": 8
        },
        {
            "cig": "5100001262",
            "societa": "Frostfire Electronics",
            "oggetto": "Fornitura di componenti elettronici",
            "lavorazione": new Date("2020-06-14T15:18"),
            "chiusuraGara": new Date("2020-06-14T15:18"),
            "fornitori": 18
        },
        {
            "cig": "5100001265",
            "societa": "Stark Inc.",
            "oggetto": "Fornitura di materiali di sicurezza",
            "lavorazione": new Date("2021-06-25T15:18"),
            "chiusuraGara": new Date("2021-06-25T15:18"),
            "fornitori": 11
        },
        {
            "cig": "5100001261",
            "societa": "Wiza and Sons",
            "oggetto": "Fornitura di telecamere di sicurezza",
            "lavorazione": new Date("2020-06-23T15:18"),
            "chiusuraGara": new Date("2020-06-23T15:18"),
            "fornitori": 15
        },
        {
            "cig": "5100001266",
            "societa": "Stark Inc.",
            "oggetto": "Fornitura di materiali di sicurezza",
            "lavorazione": new Date("2020-11-10T15:18"),
            "chiusuraGara": new Date("2020-11-10T15:18"),
            "fornitori": 11
        },
        {
            "cig": "5100001267",
            "societa": "Stark Inc.",
            "oggetto": "Fornitura di materiali di sicurezza",
            "lavorazione": new Date("2020-10-11T15:18"),
            "chiusuraGara": new Date("2020-10-11T15:18"),
            "fornitori": 11
        },
        {
            "cig": "5100001268",
            "societa": "Stark Inc.",
            "oggetto": "Fornitura di materiali di sicurezza",
            "lavorazione": new Date("2020-06-22T15:18"),
            "chiusuraGara": new Date("2020-06-22T15:18"),
            "fornitori": 11
        },
        {
            "cig": "5100001269",
            "societa": "Stark Inc.",
            "oggetto": "Fornitura di materiali di sicurezza",
            "lavorazione": new Date("2020-07-17T15:18"),
            "chiusuraGara": new Date("2020-07-17T15:18"),
            "fornitori": 11
        },
        {
            "cig": "5100001270",
            "societa": "Stark Inc.",
            "oggetto": "Fornitura di materiali di sicurezza",
            "lavorazione": new Date("2020-05-23T15:18"),
            "chiusuraGara": new Date("2020-05-23T15:18"),
            "fornitori": 11
        },
        {
            "cig": "5100001271",
            "societa": "Stark Inc.",
            "oggetto": "Fornitura di materiali di sicurezza",
            "lavorazione": new Date("2020-06-24T15:18"),
            "chiusuraGara": new Date("2020-06-24T15:18"),
            "fornitori": 11
        }
    ]

    $scope.bandiSelected = [];

    $scope.openModalEditTender = function (bando) {
        $('#datepickerModify').datepicker({
            locale: 'it-it',
            uiLibrary: 'bootstrap4',
            format: 'dd/mm/yyyy'
        });
        $scope.bandoSelected = bando

        $('#editTenderModal').modal()
    }

    $scope.modifyBando = function(){
        console.log('Bando ' , $scope.bandoSelected, ' modified')
        mainController.showNotification('bottom', 'right', 'Modifica effetuata con successo', '', 'far fa-check-square', 'info')
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
        sessionStorage.setItem('bandoGaraOggetto', bandoGara.oggetto)
        location.href = path;
    }

}]);

