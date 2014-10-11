var ca_app = angular.module('ca_app', []);

ca_app.directive('navigationBar', function(){
    return {
        restrict: 'E',
        templateUrl: 'resources/templates/navbar.html'
    };
});

ca_app.directive('infoPanel', function(){
    return {
        restrict: 'E',
        templateUrl: 'resources/templates/info-bar.html'
    };
});

ca_app.directive('controlPanel', function(){
    return {
        restrict: 'E',
        templateUrl: 'resources/templates/control-panel.html'
    };
});

