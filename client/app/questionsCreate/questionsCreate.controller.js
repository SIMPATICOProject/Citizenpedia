'use strict';

angular.module('paizaqaApp')
  .controller('QuestionsCreateCtrl', function ($scope, $timeout,$http, $location, Auth, appConfig) {

    $timeout(function(){
      if(! Auth.isLoggedIn()){
        if(! Auth.isLoggedIn()){
          if ($location.$$search) {
            localStorage.setItem('tags', $location.$$search.tags);
            localStorage.setItem('text', $location.$$search.text);
          }
          $location.path('/login');
          $location.replace();
          return;
        }
      }
    },1000);

    $scope.submit = function() {

      $http.post(appConfig.path + '/api/questions', $scope.question).success(function(){
        $location.path('/');
      });
    };

    if ($location.$$search.tags) {
      // Received tags
      var tags = $location.$$search.tags;
      var arrayTags = tags.split(',');


      if (arrayTags) {
        $scope['question'] = {tags : arrayTags};
      }
    }

    // Categories
    $scope.options = [];
    var newOptions = [];

    $http.get(appConfig.path + '/api/categories', {}).success(function(categories) {
      for (var c = 0; c < categories.length; c++) {
        newOptions.push({"name" : categories[c].name, "value" :categories[c]._id});
        if(arrayTags){
          if (categories[c].name == arrayTags[0])
          {
            $scope['selectInit'] = categories[c].name;
            $scope['selectValue'] = categories[c]._id;
          }
        }
      }

      if(categories.length < 20){
        $scope.noMoreData = true;
      }
      $scope.busy = false;
    });

    $scope.options = newOptions;
    
    if ($location.$$search.text) {
      var originalText = $location.$$search.text;
      $scope['originalText'] = originalText;
    }

    $scope.profanity = false;
    
    if (appConfig.profanityFilter == true) {
      var profanityList = null;
      $http.get('profanity/'+appConfig.language+'.json').success(function(data) {
        profanityList = data;
      });

      if (typeof appConfig.secondlanguage !== 'undefined')
      {
        $http.get('profanity/'+appConfig.secondlanguage+'.json').success(function(data) {
          profanityList = profanityList.concat(data);
        });
      }
  
      $scope.profanityCheck = function(contentToCheck)
      {
        $scope.badWords = []; 
        if (contentToCheck != null)
        {
          $scope.profanity = false;
          var arrayToCheck = contentToCheck.split("\ ");
          for (var i=0; i<arrayToCheck.length; i++)
          {
            if (profanityList.includes(arrayToCheck[i]))
            {
              $scope.profanity = true;
              if (!$scope.badWords.includes(arrayToCheck[i]))
              {
                $scope.badWords.push (arrayToCheck[i]);
              }
             
            }
          }
      }
        
      }
    }
  });
