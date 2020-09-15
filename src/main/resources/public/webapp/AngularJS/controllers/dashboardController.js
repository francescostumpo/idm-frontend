snamApp.controller("dashboardController", ['$scope', '$http', '$location', '$rootScope', '$filter', '$timeout', function($scope, $http, $location,$rootScope, $filter, $timeout) {
    console.log("[INFO] Hello World from dashboardController");

    mainController.startProgressIndicator('#loading')

    var url = mainController.getHost() + '/tender/getAllTenders';
    mainController.startProgressIndicator('#loading')

    $scope.recentTenders = []
    $scope.recentTenders_wip_0 = []
    $scope.recentTenders_wip_1 = []

    $scope.calendarIsInitialized = false

    $scope.getAllTendersByDefault.getFromParent = function(){
        $scope.recentTenders = []
        $scope.recentTenders_wip_0 = []
        $scope.recentTenders_wip_1 = []
        $scope.events = []
        $scope.thereIsAEndDateToday = false
        $scope.getRecentTenders()
    };

    $scope.getRecentTenders = function(){
        mainController.startProgressIndicator('#loading')

        $http.get(url).then(function (response) {
            console.log('response from ', url, ' : ', response)
            if(response.data.status === 200){
                $scope.recentTenders = response.data.tenderList;
                $scope.createEventsFromTender()
                $scope.recentTenders.forEach(tender => {
                    moment.locale('it')
                    let endDate = mainController.convertLocalDateToDate(tender.endDate)
                    tender.endDate = endDate
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

    $scope.formatDate = function(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }

    $scope.events = []
    $scope.thereIsAEndDateToday = false
    $scope.today = new Date()
    $scope.todayFormatted = $scope.formatDate($scope.today)
    moment.locale('it')
    let momentToday = moment($scope.todayFormatted, "YYYY-MM-DD");
    $scope.momentTodayAsString = momentToday.format("DD MMMM, YYYY");

    $scope.createEventsFromTender = function() {
        var groupByDate = $scope.recentTenders.reduce((r, a) => {
            a.endDateAsString = mainController.convertDateToStringForEvents(a.endDate)
            r[a.endDateAsString] = [...r[a.endDateAsString] || [], a];
            return r;
        }, {});

        for (date in groupByDate) {
            var event = {}
            event.title = ''//$scope.processName(tender.object, 17, 17)
            event.color = 'white'
            event.start = date
            event.allDay = true
            event.extendedProps = groupByDate[date]
            event.id = event.extendedProps[0].id
            moment.locale('it')
            let endDate = event.extendedProps[0].endDateAsString
            if(endDate === $scope.todayFormatted){
                $scope.thereIsAEndDateToday = true
            }
            event.endDateMoment = endDate
            $scope.events.push(event)
        }
        $scope.events.sort(function(event1, event2)  {
            var difference = event1.start.toString().localeCompare(event2.start)
            return difference
        })
        $scope.firstEndDate = $scope.events[0]
        if(!$scope.calendarIsInitialized) {
            $scope.initCalendar()
            $scope.calendarIsInitialized = true
        }
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
            aspectRatio: 1.5,
            height : 600,
            fixedWeekCount: false,
            locale: 'it',
            headerToolbar: {
                start: 'prev,next today',
                center: 'title',
                end: 'dayGridMonth,timeGridWeek'
            },
            eventColor: '#FF6C00',
            eventTextColor: '#FFF',
            events: $scope.events,
            eventRender : function (event) {
                var element = event.el.childNodes[0]
                var node = document.createElement('i')
                node.className = 'text-alert-color fas fa-circle'
                element.appendChild(node)
            }
        });
        calendar.render();
        calendar.on("eventClick", function(info) {
            $timeout(function() {
                var eventId = info.event.id
                $scope.eventTitle = info.event.title;
                $scope.selectedEventTender = Object.values(info.event.extendedProps);
                console.log('$scope.selectedEventContracts', $scope.selectedEventTender)
                moment.locale('it')
                var idCardEvent = '#event_' + eventId;
                location.href = idCardEvent
                //$(idCardEvent).removeClass('highlightCardEvent')
                $(idCardEvent).addClass('highlightCardEvent2')
                setTimeout(function () {
                    $(idCardEvent).removeClass('highlightCardEvent2')
                }, 2500)
            }, 100)
        })
    }

}]);