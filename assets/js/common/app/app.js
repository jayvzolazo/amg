'use strict';

var host = 'http://localhost/amg/';

(function(){
    var app = angular.module('amg', [
        'ngRoute',
        'userControllers',
        'AmgControllers',
        'AmgDirectives',
        'AmgFilters',
        'memberDirectives',
        'memberControllers',
        'chapterDirectives',
        'chapterControllers',
        'app.services'
    ]);
    
    app.config(['$routeProvider', function($routeProvider) {
        var route = $routeProvider;
        
        route.when('/login', {
            templateUrl : 'views/login.html',
            controller : 'userController'
        });
        
        route.when('/home', {
            templateUrl : 'views/home.html',
            controller  : 'HomeController'
        });
        
        route.when('/chapters', {
            templateUrl : 'views/chapters-list.html',
            controller : 'ChapterController'
        });
        
        route.when('/chapter/:chapterId/:name/members', {
            templateUrl : 'views/chapter.html',
            controller : 'singleChapterController'
        });
        
        route.when('/members', {
            templateUrl : 'views/members.html',
            controller : 'membersController'
        });
        
        route.otherwise({redirectTo : '/login'});
    }]);
})();