angular.module('idaily.providers', [])

.factory('configServices', function(){
  var sideMenuItems = [{
    href: '#/app/daily/h/us',
    label: 'Headlines',
  },{
    href: '#/app/daily/t/us',
    label: 'Technology',
  }, {
    href: '#/app/daily/e/us',
    label: 'Entertainment',
  }, {
    href: '#/app/daily/m/us',
    label: 'Health',
  }, {
    href: '#/app/daily/h/cn',
    label: '中文头条',
  }, {
    href: '#/app/daily/h/hk',
    label: '香港头条',
  }, {
    href: '#/app/daily/e/hk',
    label: '香港娱乐',
  }];

  return {
    sideMenu: sideMenuItems
  };
})

.factory('newsServices', function($q, $http){
  var googleNews = function(topic, ned){
    /* Topic=h:
     * h - specifies the top headlines topic
     * w - specifies the world topic
     * b - specifies the business topic
     * n - specifies the nation topic
     * t - specifies the science and technology topic
     * el - specifies the elections topic
     * p - specifies the politics topic
     * e - specifies the entertainment topic
     * s - specifies the sports topic
     * m - specifies the health topic
   ned=us:
     ned tells the News Search system which edition of news to pull results from. For example, ned=us specifies the US edition.

     To find the ned for other editions, review the links on the Languages and Regions page of Google News help. Each of these links ends with a ned id specific to a country or region.
    */
    var queue = $q.defer();
    topic = topic ? '&topic='+topic : '&topic=h';
    ned = ned ? '&ned='+ned : '';
    var url = 'https://ajax.googleapis.com/ajax/services/search/news?v=1.0&rsz=8'+topic+ned+'&callback=JSON_CALLBACK';
    $http({
      method: 'JSONP',
      url: url
    })
      .success(function(data, status, headers, config){
        var slideList = [];
        angular.forEach(data.responseData.results, function(result){
          slideList.push({
            imgUrl: result.image ? result.image.url : '',
            contentText: result.content
          });
        });
        return queue.resolve(slideList);
      })
      .error(function(data, status, headers, config){
         return deferred.error(data, status);
      });
    return queue.promise;
  };
  return {
    google: googleNews,
  };
});

