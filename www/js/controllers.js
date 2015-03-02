angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
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

.controller('DailyCtrl', function($scope) {
  $scope.slideList = [
    {
      imgUrl: 'http://s.thestreet.com/files/tsc/v2008/photos/all-pics/traders/SpeedDesk-5-large.jpg',
      contentText: 'In a major report issued Monday that finds potential for growth in nearly every aspect of \u003cb\u003eApple\u0026#39;s\u003c/b\u003e operations, Morgan Stanley\u0026#39;s Katy Huberty estimates that the company\u0026#39;s total addressable market — the business \u003cb\u003eApple\u003c/b\u003e might capture if it had no \u003cb\u003e...\u003c/b\u003e'
    },
    {
      imgUrl: 'http://images.techhive.com/images/article/2015/02/mobile-payment-nfc-100570632-primary.idge.jpg',
      contentText: 'By some estimates, arch-rival \u003cb\u003eApple\u003c/b\u003e surpassed Samsung as the world\u0026#39;s top smartphone maker in the fourth quarter, with record sales of the big-screen iPhone 6 and 6 Plus. Samsung begins its fight-back on April 10 when the revamped Galaxy phones go on\u0026nbsp;...',
    },
    {
      imgUrl: 'http://cdn1.tnwcdn.com/wp-content/blogs.dir/1/files/2014/10/Apple-Watch-798x310.jpg',
      contentText: 'In January, Tim Cook said the \u003cb\u003eApple\u003c/b\u003e Watch would be shipping in April, but it was unclear which countries would be included in the initial launch. Cook\u0026#39;s statement suggests a wider initial roll-out than we\u0026#39;ve seen before for new product categories from \u003cb\u003e...\u003c/b\u003e'
    },
  ];
});

