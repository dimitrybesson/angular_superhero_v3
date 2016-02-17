var app = angular.module("super", []);

app.controller("hero", ["$scope", "$http", function($scope, $http) {

  $scope.villains = [];

  $scope.villainName = "";
  $scope.superPower = "";

  $scope.getVillains = function() {
    $http({
      "method": "GET",
      "url": "/villain"
    }).then(function(res) {
      $scope.heroes = res.data;
    })
  }

  $scope.getVillains();

  $scope.submitVillain = function() {
    $http({
      "method": "POST",
      "url": "/villain",
      "data": {
        "villain": $scope.villainName,
        "powers": $scope.superPower
      }
    }).then(function() {
      //Reset the name and power to blank text

      $scope.getVillains();
      $scope.villainName = "";
      $scope.superPower = "";
    })

  }


  /////////////////////////////////////////////

  //The existing heroes in the app.
  $scope.heroes = [];

  //Set the inputs to be blank
  $scope.heroName = "";
  $scope.superPower = "";

  //Fetch all the heroes from the database
  $scope.getHeroes = function() {
    $http({
      "method": "GET",
      "url": "/hero"
    }).then(function(res) {
      $scope.heroes = res.data;
    })
  }

  //Call the function
  $scope.getHeroes();


  //Add the hero to the registry
  $scope.submitHero = function() {
    $http({
      "method": "POST",
      "url": "/hero",
      "data": {
        "hero": $scope.heroName,
        "powers": $scope.superPower
      }
    }).then(function() {
      //Reset the name and power to blank text

      $scope.getHeroes();
      $scope.heroName = "";
      $scope.superPower = "";
    })

  }

}]);
