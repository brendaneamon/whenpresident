"use strict";

(function(){

  angular
  .module("candidates", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    "$urlRouterProvider",
    Router
  ])
  .factory("Candidate", [
    "$resource",
    Candidate
  ])
  .controller("candIndexCtrl", [
    "Candidate",
    candIndexCtrl
  ]);

  function Candidate($resource){
    var Candidate = $resource("/api/candidates/:name", {}, {
      update: { method: "PUT" }
    });
    Candidate.all = Candidate.query();
    return Candidate;
  }

  function candIndexCtrl (Candidate){
    var vm = this;
    vm.candidates = Candidate.all;
  }

  function Router($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/candidates-welcome.html"
    })
    .state("index", {
      url: "/candidates",
      templateUrl: "/assets/html/candidates-index.html",
      controller: "candIndexCtrl",
      controllerAs: "indexVM"
    });
    $urlRouterProvider.otherwise("/");
  }

})();
