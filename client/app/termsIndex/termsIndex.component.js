'use strict';

angular.module('paizaqaApp')
  .controller('TermsIndexComponent', function ($scope, $http, $location, Auth, query, appConfig) {
    var keyword = $location.search().keyword;
    if(keyword){
      query = _.merge(query, {$text: {$search: keyword}});
    }
    $scope.busy = true;
    $scope.noMoreData = true;

    $http.get(appConfig.path + '/api/terms', {params: {query: query}}).success(function(terms) {
      $scope.terms = terms;
      if($scope.terms.length < 20){
        $scope.noMoreData = true;
      }
      $scope.busy = false;
    });
    $scope.nextPage = function(){
      if($scope.busy){ return; }
      $scope.busy = true;
      var lastId = $scope.terms[$scope.terms.length-1]._id;
      var pageQuery = _.merge(query, {_id: {$lt: lastId}});
      $http.get(appConfig.path + '/api/terms', {params: {query: pageQuery}}).success(function(terms){
        $scope.terms = $scope.terms.concat(terms);
        $scope.busy = false;
        if(terms.length === 0){
          $scope.noMoreData = true;
        }
      });
    };
  })
  .filter('split', function() {
      return function(input, splitChar, splitIndex) {
          // do some bounds checking here to ensure it has that index
          return input.split(splitChar)[splitIndex];
      }
  });
