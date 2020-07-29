snamApp.controller("dashboardController", ['$scope', '$http', '$location', '$rootScope', '$filter', '$timeout', function($scope, $http, $location,$rootScope, $filter, $timeout) {
    console.log("[INFO] Hello World from dashboardController");

    mainController.startProgressIndicator('#loading')

    var url = mainController.getHost() + '/tender/getAllTenders';
    mainController.startProgressIndicator('#loading')

    $scope.recentTenders = []
    $scope.recentTenders_wip_0 = []
    $scope.recentTenders_wip_1 = []

    $scope.getAllTendersByDefault.getFromParent = function(){
        $scope.recentTenders = []
        $scope.recentTenders_wip_0 = []
        $scope.recentTenders_wip_1 = []
        $scope.getRecentTenders();
    };

    $scope.getRecentTenders = function(){
        mainController.startProgressIndicator('#loading')
        $http.get(url).then(function (response) {
            console.log('response from ', url, ' : ', response)
            if(response.data.status === 200){
                $scope.recentTenders = response.data.tenderList;
                $scope.createEventsFromTender()
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

    $scope.events = []

    $scope.createEventsFromTender = function() {
        for (var i = 0; i < $scope.recentTenders.length; i++) {
            var event = {}
            var tender = $scope.recentTenders[i]
            event.title = $scope.processName(tender.object, 17, 17)
            event.color = '#FF6C00'
            event.start = mainController.convertDateToStringForEvents(tender.endDate)
            event.extendedProps = tender
            $scope.events.push(event)
        }
        $scope.initCalendar()
    }

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


    $scope.showCalendarCard = true;

    $scope.toggleCalendarCard = function(){
        $scope.showCalendarCard = !$scope.showCalendarCard
    }

    $scope.selectedEventTender = {}

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
        calendar.on("eventClick", function(info) {
            $timeout(function() {
                $scope.eventTitle = info.event.title;
                $scope.selectedEventTender = Object.values(info.event.extendedProps);
                console.log('$scope.selectedEventContracts', $scope.selectedEventTender)
                moment.locale('it')
                let endDate = $scope.selectedEventTender[5]
                let endDateString = mainController.convertDateToStringForEvents(endDate)
                let momentDate = moment(endDateString, "YYYY-MM-DD");
                let date = momentDate.format("DD MMMM, YYYY");
                $scope.selectedEventDate = date.toUpperCase();
                $('#eventModalTender').modal()
            }, 200)
        })
    }


}]);