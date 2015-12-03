(function () {
    var mainApplicationModuleName = "app";
    var app = angular.module(mainApplicationModuleName, ['ngRoute', 'ngResource', 'todoRoutes', 'todoServices', 'todoControllers']);
    // wait for web page to load then manually bootstrap angular
    angular.element(document).ready(function () {
        angular.bootstrap(document, [mainApplicationModuleName]);
    });
})(); // end of closure
