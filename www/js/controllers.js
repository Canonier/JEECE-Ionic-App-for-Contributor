angular.module('jeece-mission-app.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $stateParams, $state, $ionicGesture, $ionicSideMenuDelegate, $http, passFromController) {
  // Si on chope la var "data" dans le stateParams on le fou dans le scope "data".
  $scope.data = angular.fromJson($stateParams.data);

  $http({
    method: 'GET',
    url: 'http://dev.jeece.fr:6009/api/missions'
  }).then(function(response) {
    $scope.missions = response.data;
  }, function(response) {
    alert("problem de get lors du GET")
  });
  

  // quand on swipe l'element, ca passe a la page suivante avec l'id en parametre
  $scope.showMission = function(missionId){
    $state.go('app.mission', {"id":missionId-1});
    passFromController.setProperty($scope.missions[missionId - 1].ref);
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


})

.controller('missionsCtrl', function($scope, $stateParams, $state, $ionicGesture, $ionicSideMenuDelegate, $timeout, $ionicPopup, $http, passFromController){

  //On récupère la mission actuelle et la phase de courrante de la mission
  $http({
    method: 'GET',
    url: 'http://dev.jeece.fr:6009/api/missions/'+passFromController.getProperty()
  }).then(function(response) {
    $scope.mission = response.data[0];
    var i=0;
    console.log($scope.mission.phases.length);
    while(i<$scope.mission.phases.length && $scope.mission.phases[i].finished==true){
      i++;
    }
    if(i<$scope.mission.phases.length)$scope.currentPhase=$scope.mission.phases[i];
  }, function(response) {
    alert("problem de get lors du GET")
  });

  //Pseudo Popups

  $scope.toggleCard = function(intervenantId){ //affichage des 3 liens (profile, tel, mail) de chaque intervenant
    var myEl = angular.element(document.getElementById(intervenantId));
    var links = angular.element(document.getElementById("links"+intervenantId));

    if(links.css("display")=="none"){ //quand les liens sont invisibles, on met un timeout après le changement de classe pour un effet visuel sympa
    myEl.toggleClass("profileButton-full");
    $timeout(function() {links.css("display","inline");links.css("animation-name","appear");links.css("animation-duration",".5s");}, 500);
    } 
    else {//de même pour les faire disparaitre mais inversé
    links.css("animation-name","disappear");links.css("animation-duration",".5s");
    $timeout(function(){myEl.toggleClass("profileButton-full");links.css("display","none");}, 500);
    }
  };

  $scope.toggleDescription = function(){
    var myEl = angular.element(document.getElementById("description"));
    myEl.toggleClass("description-full");
  };

  $scope.showProfile = function(intervenantId){
    $scope.intervenant=$scope.intervenants[intervenantId-1];
    $scope.closeCard(intervenantId);
    $state.go('app.profile', {"id":intervenantId-1});
  };

  //Montrer toutes les phases
  $scope.showPhases = function(){
    var list = angular.element(document.getElementById("phaselist"));
    var btn = angular.element(document.getElementById("btnPhases"));
    if (list.css("display")=='none') 
    {
      list.css("display","block");
      btn.text("Masquer les phases");
    }
    else 
    {
      list.css("display","none");
      btn.text("Afficher toutes les phases");
    }
  };

  $scope.showPhaseDescription = function(phaseID){
    var description;var title;
    if(typeof $scope.mission.phases[phaseID-1] == 'undefined'){
      title = "Undefined phase"
      description="Description not available, sorry!";
    }else{title = $scope.mission.phases[phaseID-1].name;
      description = $scope.mission.phases[phaseID-1].description;}
      var alertPopup = $ionicPopup.alert({
     title: title,
     template: description
   });
  };
  
})



.controller('skillsCtrl',function($scope,$http,$stateParams, $state, $ionicGesture, $ionicSideMenuDelegate, passFromController){
  $http({
    method: 'GET',
    url: 'http://dev.jeece.fr:6009/api/skills'
  }).then(function(response) {
    console.log(response.data);
    $scope.skills=response.data;
  });
})

.controller('offersCtrl', function($scope, $stateParams, $state, $ionicGesture, $ionicSideMenuDelegate, $http, passFromController){
  $http({
    method: 'GET',
    url: 'http://dev.jeece.fr:6009/api/missions'
  }).then(function(response) {
    console.log(response.data);
    $scope.missionsList=response.data;
  });
})

;
