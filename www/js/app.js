// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('idaily', ['ionic', 'idaily.controllers', 'idaily.providers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.filter('rawHtml', ['$sce', function($sce){
    return function(val) {
          return $sce.trustAsHtml(val);
            };
}])

.directive('newsIframe', function($compile) {
  return {
    replace: true,
    link: function(scope, element) {
      var iframe = angular.element('<iframe data-tap-disabled="true" ng-src="{{trustSrc(currentNews.url)}}"></iframe>');
      $compile(iframe)(scope);
      element.append(iframe);
    }
  };
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/main.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.daily', {
    url: "/daily/:menuId",
    views: {
      'menuContent': {
        templateUrl: "templates/daily.html",
        controller: 'DailyCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/daily/0');
});
