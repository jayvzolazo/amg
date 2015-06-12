'use strict';

(function(){
    var app = angular.module('app.services', []);
    
    app.factory('userService', ['$http', '$window', function($http, $window){
        return {
            signIn : function(user) {
                return $http({
                    method : 'POST',
                    url : host + 'api/members/login',
                    headers: { 'Content-type': 'application/json' },
                    data : user
                }).catch(function(error) {
                    console.log(error);
                });
            }
        };
    }]);
})();