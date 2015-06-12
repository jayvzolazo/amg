'use strict';

(function(){
    var app = angular.module('AmgControllers', []);
    
    app.controller('HomeController', ['$scope', '$location', '$window',
    function($scope, $location, $window) {
        if (!$window.sessionStorage.getItem('session_id')) $location.path('/login');
    
        $scope.message = 'Welcome';
    }]);
})();