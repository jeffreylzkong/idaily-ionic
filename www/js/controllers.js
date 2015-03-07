angular.module('idaily.controllers', ['idaily.providers', 'ngSanitize'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $sce, truncate, configServices, newsContentService) {
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
  $scope.openWebModal = function(slide){
    $scope.currentNews.title = truncate(slide.title, '');
    $scope.currentNews.contentHtml = slide.contentText;
    newsContentService.fetch(slide.url, slide.contentText)
    .then(function(data){
      $scope.currentNews.contentHtml = $sce.trustAsHtml(truncate(data, '<a><br><p><div><img><h2><h3>'));
    });
    $scope.webModal.show();
  };

  $scope.closeWebModal = function(){
    $scope.currentNews.contentHtml = '';
    $scope.webModal.hide();
  };

  // iframe handling
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };


  // Image view modal
  $ionicModal.fromTemplateUrl('image-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.imgModal = modal;
  });

  $scope.openImgModal = function(slide) {
    $scope.imgUrl = slide.imgUrl;
    $scope.imgModal.show();
  };

  $scope.closeImgModal = function() {
    $scope.imgUrl = '';
    $scope.imgModal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.imgModal.remove();
    $scope.webModal.remove();
  });

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
  newsServices.google($scope.category.q, $scope.category.topic, $scope.category.ned)
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

