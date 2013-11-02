// Rprtr

'use strict';

var rprtr = angular.module('rprtr',[])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
    $routeProvider.when('/declarations', {templateUrl: 'partials/declarations.html', controller: 'DeclarationsCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);


rprtr.controller('GlobalCtrl', ['$scope', '$http', function($scope, $http) {

  // Setting as a scope variable that can be updated in the view
  $scope.styleUrl = 'data/myspace.json';

  // Function to get the styles data
  // This should really go in a factory
  $scope.getStyles = function(styleUrl) {
    $scope.loading = true;
    $http.get(styleUrl).success(function(res) {
      $scope.styles = res;
      $scope.loading = false;
    });
  };

  // Getting initial styles data
  // This function can later be called from the view, if needed.
  $scope.getStyles($scope.styleUrl);

}]);

rprtr.controller('HomeCtrl', ['$scope', function($scope) {

  

}]);

rprtr.controller('DeclarationsCtrl', ['$scope', '$http', function($scope, $http) {

  // This belongs in a factory
  $scope.getDeclarations = function(rules) {

    $scope.declarations = [];
    $scope.fontSizes = [];
    $scope.widths = [];
    $scope.colors = [];
    $scope.backgroundColors = [];

    for(var i = 0; i < rules.length; i++){
      var declarations = rules[i].declarations;
      for(var j in declarations){
        //console.log(declarations[j].property + ': ' + declarations[j].value);
        $scope.declarations.push(declarations[j].property + ': ' + declarations[j].value);
        if(declarations[j].property == 'font-size') $scope.fontSizes.push(declarations[j].value);
        if(declarations[j].property == 'width') $scope.widths.push(declarations[j].value);
        if(declarations[j].property == 'color') $scope.colors.push(declarations[j].value);
        if(declarations[j].property == 'background-color') $scope.backgroundColors.push(declarations[j].value);
      };
    };

  };

  $scope.getDeclarations($scope.styles.stylesheet.rules);

}]);