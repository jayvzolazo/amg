'use strict';

(function() {
    var app = angular.module('chapterDirectives', []);
    
    app.directive('searchChapter', function(){
        return {
            restrict : 'E',
            templateUrl : 'views/partials/search-chapter.html'
        };
    });
    
    app.directive('addChapters', function() {
        function addChapterController($scope, $http){
            this.addChapter = function(chapter){
                //chapter.createdOn = Date.now();
                //console.log(chapter);
                
                $http({
                    method : 'POST',
                    url : 'sources/chapters.php',
                    data : chapter
                }).success(function(data){
                    
                    $http({
                        method : 'GET',
                        url : 'sources/chapters.php'
                    }).success(function(data){
                        $scope.chapters = data;
                    });
                    
                    $scope.chapter.name = '';
                });
            };
            
            this.resetForm = function(scope, element, attrs){
                scope.$watch(attrs.focusMe, function(){
                    element[0].focus();
                });
            };
        }
        
        return {
            restrict : 'E',
            templateUrl : 'views/partials/add-chapters.html',
            controller : addChapterController,
            controllerAs : 'addChapterCtrl'
        };
    });
})();