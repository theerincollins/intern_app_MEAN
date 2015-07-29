var angularApp = angular.module('brew_pdx_app', []);

angularApp.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
  console.log("Hello from the angular side of things");

  var refresh = function() {
    $http.get('/breweries').success(function(response) {
      console.log("Getting data i requested");
      $scope.breweries = response;
      $scope.brew = "";
    });
  };

  refresh();

  $scope.addBrewery = function() {
    $http.post('/breweries', $scope.brew).success(function(response) {
      console.log(response);
      refresh();
    });
  };

  $scope.deleteBrewery = function(id) {
    $http.delete('/breweries/' + id).success(function(response) {
      refresh();
    });
  };

  $scope.editBrewery = function(id) {
    $http.get('/breweries/' + id).success(function(response) {
      $scope.brewery = response;
      console.log($scope.brewery + "is hitting from $scope ")
    });
  };

  $scope.updateBrewery = function() {
    console.log($scope.brew)
    $http.put('/breweries/' + $scope.brewery._id, $scope.brewery).success(function(response) {
      refresh();
    })
  }

}]);
