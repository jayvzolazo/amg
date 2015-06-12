'use strict';

(function(){
    var app = angular.module('memberControllers', []);
    
    app.controller('membersController', function($scope, $http){
        $scope.members = '';
        
        $http({
            method : 'GET',
            url : 'sources/members.php'
        }).success(function(data){
            $scope.members = data;
        });
    });
    /*
    app.controller('singleChapterController',['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
        this.chapterId = $routeParams.chapterId;
        $scope.chapterData = '';
        
        $http({
            method : 'GET',
            url : 'sources/chapters.php',
            params : { id : this.chapterId }
        }).success(function(data) {
            $scope.chapterData = data;
        });
    }]);
    */
})();