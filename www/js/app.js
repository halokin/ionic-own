// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('tabs', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })
    
    .state('tabs.home', {
        url: '/home',
        views: {
            'home-tab' : {
                templateUrl: 'templates/home.html'
            }
        }
    })
    
    .state('tabs.detail', {
        url: '/list/:aId',
        views: {
            'list-tab' : {
                templateUrl: 'templates/detail.html', 
                controller: 'ListController'
            }
        }
    })
    
    .state('tabs.list', {
        url: '/list',
        views: {
            'list-tab' : {
                templateUrl: 'templates/list.html', 
                controller: 'ListController'
            }
        }
    })
    
    .state('tabs.calendar', {
        url: '/calendar',
        views: {
            'calendar-tab' : {
                templateUrl: 'templates/calendar.html', 
                controller: 'CalendarController'
            }
        }
    })
    
    
    $urlRouterProvider.otherwise('/tab/home');
})






.controller('CalendarController', ['$scope', '$http', '$state', function ($scope, $http, $state)
        {
            $http.get('js/data.json').success(function (data) {
                $scope.calendar = data.calendar;
                
                $scope.onItemDelete = function(dayIndex, item){
                    $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item), 1);
                }
                
                $scope.doRefresh = function() {
                                $http.get('js/data.json').success(function (data) {
                                  $scope.calendar = data.calendar;
                                    $scope.$broadcast('scroll.refreshComplete');
                                });
                }
                
                $scope.toggleStar = function(item) {
                    item.star = !item.star;
                }
                
                

            });
}])





.controller('ListController', ['$scope', '$http', '$state', function ($scope, $http, $state)
        {
            $http.get('js/data.json').success(function (data) {
                $scope.artists = data.artists;
                $scope.whichartist=$state.params.aId;
                $scope.data = { showDelete: false, showReorder: false};
                
                $scope.onItemDelete = function(item){
                    $scope.artists.splice($scope.artists.indexOf(item), 1);
                }
                
                $scope.doRefresh = function() {
                                $http.get('js/data.json').success(function (data) {
                                  $scope.artists = data;
                                    $scope.$broadcast('scroll.refreshComplete');
                                });
                }
                
                $scope.toggleStar = function(item) {
                    item.star = !item.star;
                }
                
                
                $scope.moveItem = function(item, fromIndex, toIndex){
                    $scope.artists.splice(fromIndex, 1);
                    $scope.artists.splice(toIndex, 0, item);
                    
                };

            });
}]);
/*.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('tab.chats', {
            url: '/chats',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/tab-chats.html',
                    controller: 'ChatsCtrl'
                }
            }
        })
        .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

});*/