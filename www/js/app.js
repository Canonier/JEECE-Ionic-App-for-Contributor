angular.module('jeece-mission-app', ['ionic', 'jeece-mission-app.controllers', 'jeece-mission-app.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.directive('toggleClass', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                element.toggleClass(attrs.toggleClass);
            });
        }
    };
})

.directive('ng-click-outside', ['$document', function ($document) {
    return {
        link: function postLink(scope, element, attrs) {
            alert('yolo');
            var onClick = function (event) {
                var isChild = $(element).has(event.target).length > 0;
                var isSelf = element[0] == event.target;
                var isInside = isChild || isSelf;
                if (!isInside) {
                    scope.$apply(attrs.clickAnywhereButHere);
                }
            };
            scope.$watch(attrs.isActive, function(newValue, oldValue) {
                if (newValue !== oldValue && newValue === true) {
                    $document.bind('click', onClick);
                }
                else if (newValue !== oldValue && newValue === false) {
                    $document.unbind('click', onClick);
                }
            });
        }
    };
}])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html'
      }
    }
  })

  .state('app.missions', {
    url: '/missions',
    views: {
      'menuContent': {
        templateUrl: 'templates/missions.html',
        controller: 'missionsCtrl'
      }
    }
  })

  .state('app.news', {
    url: '/news',
    views: {
      'menuContent': {
        templateUrl: 'templates/news.html',
      }
    }
  })
;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/missions');
});
