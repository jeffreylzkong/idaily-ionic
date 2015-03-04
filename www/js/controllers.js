angular.module('idaily.controllers', ['idaily.providers', 'ngSanitize'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $sce, configServices) {
  // sidemenu items
  $scope.sideMenus = configServices.sideMenu;
  $scope.currentMenu = {id: 0};

  // Web view modal
  $ionicModal.fromTemplateUrl('templates/webview.html', {
    scope: $scope,
  }).then(function(modal){
    $scope.webModal = modal;
  });

  // Trigger web view show
  $scope.currentNews = {};
  $scope.showWebModal = function(slide){
    $scope.currentNews.title = slide.title;
    $scope.currentNews.url = decodeURIComponent(slide.url);
    $scope.webModal.show();
  };

  $scope.hideWebModal = function(){
    $scope.currentNews.url = 'about:blank';
    $scope.webModal.hide();
  };

  // iframe handling
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('DailyCtrl', function($scope, $state, configServices, newsServices, $ionicPopup, $ionicGesture, $ionicSlideBoxDelegate) {
  $scope.currentMenu.id = parseInt($state.params.menuId, 10);
  $scope.category = configServices.sideMenu[$scope.currentMenu.id];
  // fetch news data
  newsServices.google($scope.category.topic, $scope.category.ned)
  .then(function(slideList){
    $scope.slideList = slideList;
     $ionicSlideBoxDelegate.update();
  });

  // Event handlers
  $scope.showTopic = function(direction){
    var mextMenuId = 0;
    if (direction === 'next') {
      nextMenuId = ($scope.currentMenu.id + 1) < configServices.sideMenu.length ? $scope.currentMenu.id + 1 : 0;
    } else if (direction === 'previous') {
      nextMenuId = ($scope.currentMenu.id - 1) > 0 ? $scope.currentMenu.id - 1 : configServices.sideMenu.length - 1;
    }
    $state.go('app.daily', {menuId: nextMenuId});
  };

  $scope.slideHasChanged = function(index) {
    //console.log(index);
  };
});

