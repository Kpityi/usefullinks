(function (window, angular) {
  "use strict";
  

  // Application module
  angular
    .module("app", ["ui.router"])

    // Application config
    .config([
      "$stateProvider",
      "$urlRouterProvider",
      function ($stateProvider, $urlRouterProvider,) {
        $stateProvider
          .state("home", {
            url: "/",
            templateUrl: "./html/home.html",
            controller: "homeController",
          })
          .state("links", {
            url: "/links",
            templateUrl: "./html/links.html",
            controller: "linksController",
          });

        $urlRouterProvider.otherwise("/");
      },
    ])

    // Application run
    .run([
      "$rootScope",
      function ($rootScope) {
        console.log("Run...");
        $rootScope.appLanguage = document.documentElement.lang || "hu";
      },
    ])
    
    // Navigation controller
    .controller("navController", [
      '$scope', 
      '$rootScope',
      function($scope, $rootScope) {
        $scope.changeLanguage = function changeLanguage(event) {
          console.log(event.target.closest('li').id);
          $rootScope.appLanguage = event.target.closest('li').id
          document.documentElement.lang = $rootScope.appLanguage;
          let languageImageContainer = document.querySelector(".dropdown-toggle");
          let img = document.createElement("img");
          let languageFlag = `./img/${$rootScope.appLanguage}.png`;
          img.src = languageFlag;
          img.style = "width: 40px";
          languageImageContainer.innerHTML = "";
          languageImageContainer.append(img);
 
        };
      }
    ])

    // Home controller
    .controller("homeController", [
      "$scope",
      function ($scope) {
        console.log("Home controller...");
      },
    ])

    //Links controller
    .controller("linksController", [
      "$scope",
      "$rootScope",
      function ($scope, $rootScope) {
        console.log("Links controller...");
        // $scope.currentLanguage= $rootScope.appLanguage
        console.log($rootScope.appLanguage)
        fetch('./db/links.json')
        .then(response => response.json())
        .then(data => {
          $scope.links = data[2].data;
          console.log($scope.links)
          $scope.$applyAsync();
        })
        .catch(function(error) {
          console.log(error);
        })        
      },
    ]);
})(window, angular);
