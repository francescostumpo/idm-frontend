snamApp.controller("dashboardController", ['$scope', '$http', '$location', '$rootScope', '$filter', function($scope, $http, $location,$rootScope, $filter) {
    console.log("[INFO] Hello World from dashboardController");

    mainController.startProgressIndicator('#loading')

    var url = mainController.getHost() + '/tender/getAllTenders';
    mainController.startProgressIndicator('#loading')

    $scope.recentTenders = []
    $scope.recentTenders_wip_0 = []
    $scope.recentTenders_wip_1 = []

    $scope.getRecentTenders = function(){
        mainController.startProgressIndicator('#loading')
        $http.get(url).then(function (response) {
            console.log('response from ', url, ' : ', response)
            if(response.data.status === 200){
                $scope.recentTenders = response.data.tenderList;
                $scope.recentTenders.forEach(tender => {
                    tender.endDate = $filter('date')(mainController.convertLocalDateToDate(tender.endDate), 'dd/MM/yyyy')
                    tender.fornitori = tender.suppliers.length
                })
                console.log('tender list : ', $scope.recentTenders)
                $scope.populateTenderListWip()
            }
            else{
                mainController.showNotification('bottom', 'right', response.data.message, '', 'danger')
            }
            mainController.stopProgressIndicator('#loading')
        })
    };

    $scope.populateTenderListWip = function(){
        for(var i = 0; i < $scope.recentTenders.length && i < 12; i++){
            if(i < 4){
                $scope.recentTenders_wip_0.push($scope.recentTenders[i]);
            }else if(i < 8 && i >=4){
                $scope.recentTenders_wip_1.push($scope.recentTenders[i]);
            }
        }
    }

    $scope.getRecentTenders();

    /*$scope.recentTenders = [
        {
            "cig" : "821367BD9",
            "supplier" : "Stogit",
            "description" : "Servizio di manutenzione e riparazione di compressori aria, sistemi di produzione azoto, gruppi elettrogeni emotopompe antincendio per i siti Stogit in ITALIA",
            "endDate" : "15/07/2020",
            "endWorkingDate" : "28/07/2020",
            "MAM" : "MAM019-023C"
         },
        {
            "cig" : "7924253471",
            "supplier" : "Stogit",
            "description" : "Fornitura di tubi senza saldatura",
            "endDate" : "24/07/2020",
            "endWorkingDate" : "04/07/2020",
            "MAM" : "MAM023-198A"
        },
        {
            "cig" : "8207265156",
            "supplier" : "Stogit",
            "description" : "Accordo quadro per la fornitura di automezzi ad uso aziendale",
            "endDate" : "30/07/2020",
            "endWorkingDate" : "24/08/2020",
            "MAM" : "MAM107-101F"
        }
    ]*/

    $scope.events = [
        {
            title  : 'SERVIZIO DI MANUTENZ...',
            start  : '2020-07-28',
            color : '#FF6C00'
        }
    ]

    $scope.showCalendarCard = true;

    $scope.toggleCalendarCard = function(){
        $scope.showCalendarCard = !$scope.showCalendarCard
    }

    $scope.initCalendar = function (language, contracts) {
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: [ 'interaction', 'dayGrid', 'timeGrid' , 'bootstrap'],
            initialView: 'dayGridMonth',
            minTime: '09:00:00',
            maxTime: '24:00:00',
            defaultDate: new Date(),
            aspectRatio: 3,
            fixedWeekCount: false,
            locale: 'it',
            headerToolbar: {
                start: 'prev,next today',
                center: 'title',
                end: 'dayGridMonth,timeGridWeek'
            },
            eventColor: '#FF6C00',
            eventTextColor: '#FFF',
            events: $scope.events
        });
        calendar.render();
    }

    $scope.initCalendar()
    mainController.stopProgressIndicator('#loading')

}]);