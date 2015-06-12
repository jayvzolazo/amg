'use strict';

(function() {
    var app = angular.module('userControllers', []);
    
    app.controller('userController', ['$scope', '$http', '$window', '$location', 'userService',
    function($scope, $http, $window, $location, userService){
        
        if ($window.sessionStorage.getItem('session_id')) $location.path('/home');
        
        $scope.signIn = function(user) {
            userService.signIn(user).then(function(response) {
                if (response.status == 200) {
                    $window.sessionStorage.setItem("session_id", response);
                    $window.sessionStorage.setItem("token", response.data.token);
                    $window.sessionStorage.setItem("user", response.data.user);
                    
                    /*
                    $window.localStorage.setItem('session_id', response.data.session_id);
                    $window.localStorage.setItem('token', response.data.token);
                    $window.localStorage.setItem('user', response.data.user);
                    
                    userdata.session_id = $window.localStorage.getItem('session_id');
                    userdata.token = $window.localStorage.getItem('token');
                    userdata.user = $window.localStorage.getItem('user');
                    */
                    $location.path('/home');
                }
            });
        };
        
        $scope.signOut = function() {
            $window.localStorage.removeItem('session_id');
            $window.localStorage.removeItem('token');
            $window.localStorage.removeItem('user');
        }
    }]);
})();