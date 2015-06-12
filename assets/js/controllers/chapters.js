'use strict';

(function(){
    var app = angular.module('chapterControllers', []);
    
    app.controller('ChapterController', function($scope, $http){
        $scope.chapters = '';
        
        $http({
            method : 'GET',
            url : 'sources/chapters.php'
        }).success(function(data){
            $scope.chapters = data;
        });
    });
    
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
    
})();