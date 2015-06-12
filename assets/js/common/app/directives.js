'use strict';

(function(){
    var app = angular.module('AmgDirectives', []);
    
    app.directive('navBar', ['$location', '$window', function($location, $window) {
        function navControl($location){
            this.isActive = function(viewLocation) {
                return viewLocation === $location.path();
            };
        }
        
        return {
            restrict : 'E',
            templateUrl : 'views/partials/nav-bar.html',
            controller : navControl,
            controllerAs : 'navCtrl'
        };
    }]);
    
    app.directive('focusMe', function() {
        return {
            link : function(scope, element, attrs) {
                scope.$watch(attrs.focusMe, function(){
                    element[0].focus();
                });
            }
        };
    });
})();