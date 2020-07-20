snamApp.controller("commonController", ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location,$rootScope) {
    console.log("[INFO] Hello World from commontController");

    $scope.sideBarIsClosed = true

    var url = mainController.getHost() + '/fruits/list'

    $http.get(url).then(function (response) {
        console.log('response : ' , response)
    })

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

}]);