'use strict';

(function() {
    var app = angular.module('memberDirectives', []);
    
    app.directive('searchMember', function(){
        return {
            restrict : 'E',
            templateUrl : 'views/partials/search-member.html'
        };
    });
})();