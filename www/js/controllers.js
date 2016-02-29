angular.module('jeece-mission-app.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $stateParams, $state, $ionicGesture, $ionicSideMenuDelegate) {
  // Si on chope la var "data" dans le stateParams on le fou dans le scope "data".
  $scope.data = angular.fromJson($stateParams.data);

  // Ce que l'API devra nous fournir
  $scope.missions = [
    { "name" : "PAREX01", "id" : "1", "profiles" : [
      {"id": "1", "img" : "http://lorempixel.com/200/200/people/1", "show":"true"},
      {"id": "5", "img" : "http://lorempixel.com/200/200/people/2", "show":"false"}
    ], "progress" : {"theory" : "10", "lab" : "39"}, "phase" : { "total":"10", "current":"2", "currentName":"Integration HTML/CSS/JS.", "list":[] } },

    { "name" : "GUILL01", "id" : "2", "profiles" : [
      {"id": "6", "img" : "http://lorempixel.com/200/200/people/3"},
      {"id": "2", "img" : "http://lorempixel.com/200/200/people/4"},
      {"id": "9", "img" : "http://lorempixel.com/200/200/people/1"}
    ], "progress" : {"theory" : "58", "lab" : "7"}, "phase" : { "total":"12", "current":"7", "currentName":"Traduction des paragraphes 5 à 7." } },

    { "name" : "PAREX02", "id" : "3", "profiles" : [
      {"id": "3", "img" : "http://lorempixel.com/200/200/people/5"}
    ], "progress" : {"theory" : "29", "lab" : "90"}, "phase" : { "total":"3", "current":"1", "currentName":"Phase d'analyse" } },

    { "name" : "AUGUS03", "id" : "4", "profiles" : [
      {"id": "5", "img" : "http://lorempixel.com/200/200/people/6"},
      {"id": "6", "img" : "http://lorempixel.com/200/200/people/1"},
      {"id": "2", "img" : "http://lorempixel.com/200/200/people/3"},
      {"id": "9", "img" : "http://lorempixel.com/200/200/people/7"}
    ], "progress" : {"theory" : "100", "lab" : "70"}, "phase" : { "total":"9", "current":"3", "currentName":"Réalisation du prototype de la partie laser" } },

    { "name" : "PASTE01", "id" : "5", "profiles" : [
      {"id": "5", "img" : "http://lorempixel.com/200/200/people/9"},
      {"id": "2", "img" : "http://lorempixel.com/200/200/people/4"}
    ], "progress" : {"theory" : "100", "lab" : "100"}, "phase" : { "total":"9", "current":"9", "currentName":"Test" } }
  ];

  // quand on swipe l'element, ca passe a la page suivante avec l'id en parametre
  $scope.showMission = function(missionId){
    $scope.mission = $scope.missions[missionId - 1];
    $state.go('app.mission', {"id":missionId-1});
  };

  $scope.showHide = function(item){
    console.log(item);
  };

  $scope.myClass = false;
  $scope.toggleClass = function(){
    $scope.myClass = !$scope.myClass;
  };

  $scope.resetClass = function(){
    alert('coucou');
    angular.element.find('.show');
  };


});
