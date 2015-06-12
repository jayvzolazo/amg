'use strict';

(function(){
    var app = angular.module('AmgFilters', []);
    
    app.filter('capitalize', function(){
        return function(input, all){
            return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }) : '';
        };
    });
    
    app.filter('cleanlink', function(){
        return function(input, all){
            return (!!input) ? input.replace(/ /g, '-') : '';
        };
    });
})();