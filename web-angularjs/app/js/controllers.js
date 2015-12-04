'use strict';

/* Controllers */

var apiHost='http://localhost:8080';

var corpdeskControllers = angular.module('corpdeskControllers', []);

/*
    USERS
 */
corpdeskControllers.controller('UserListCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        var ctrl = this;

        $http({
            method: 'GET',
            url: apiHost + '/user'
        }).success(function (data) {
            ctrl.users = data;
        });

        $http({
            method: 'GET',
            url: apiHost + '/group'
        }).success(function (data) {
            ctrl.groups = data;
        });

        ctrl.addUser=function(group){
            $location.path("/user/")
        };


        ctrl.editUser=function(user){
            $location.path("/user/"+user.id)
        };

        ctrl.deleteUser=function(user){
            $http({
                method: 'DELETE',
                url: apiHost + '/user',
                params: {userId: user.id}
            }).success(function (data) {
                var index = ctrl.users.indexOf(user);
                if (index > -1) {
                    ctrl.users.splice(index, 1);
                }
            });
        };

        ctrl.addGroup=function(group){
            $location.path("/group/")
        };

        ctrl.editGroup=function(group){
            $location.path("/group/"+group.id)
        };

        ctrl.deleteGroup=function(group){
            $http({
                method: 'DELETE',
                url: apiHost + '/group',
                params: {groupId: group.id}
            }).success(function (data) {
                var index = ctrl.groups.indexOf(group);
                if (index > -1) {
                    ctrl.groups.splice(index, 1);
                }
            });
        };
  }]);

corpdeskControllers.controller('UserEditCtrl', ['$scope', '$http', '$routeParams', '$location',
    function($scope, $http, $routeParams, $location) {
        var ctrl = this;
        ctrl.userId=$routeParams.id
        $scope.user={};

        if (ctrl.userId) {
            $http({
                method: 'GET',
                url: apiHost + '/user',
                params: {userId: ctrl.userId}
            }).success(function (data) {
                $scope.user = data[0];

                $http({
                    method: 'GET',
                    url: apiHost + '/group'
                }).success(function (data) {
                    ctrl.groups = data;
                    ctrl.groups.forEach(function (elem) {
                        for (var i = 0; i < $scope.user.groups.length; i++) {
                            if (elem.id === $scope.user.groups[i].id) {
                                elem.isChecked = true;
                            }
                        }
                    });
                });

            });
        }


        $scope.saveUser=function() {

            if (ctrl.userId) {
                $scope.user.groups = [];
                if (ctrl.groups) {

                    ctrl.groups.forEach(function (elem) {
                        if (elem.isChecked) {
                            var group = {};
                            group.id = elem.id;
                            group.name = elem.name;
                            $scope.user.groups.push(group);
                        }
                    });
                }
            }

            var methodName=ctrl.userId? 'PUT':'POST';

            if (!ctrl.userId && ctrl.initPassword!=ctrl.confirmPassword){
                alert("Passwords not identical!");
                return;
            }
            $scope.user.password=ctrl.initPassword;

            $http({
                method: methodName,
                url: apiHost + '/user',
                data: $scope.user
            }).success(function (data) {
                $scope.user = data;
                if (!ctrl.userId){
                    $location.path("/users")
                }
            });
        };
    }]);


corpdeskControllers.controller('GroupEditCtrl', ['$scope', '$http', '$routeParams', '$location',
    function($scope, $http, $routeParams, $location) {
        var ctrl = this;
        ctrl.groupId=$routeParams.id


        if (ctrl.groupId) {
            $http({
                method: 'GET',
                url: apiHost + '/group',
                params: {groupId: ctrl.groupId}
            }).success(function (data) {
                $scope.group = data[0];
            });
        }


        $scope.saveGroup=function() {
            $http({
                method: 'POST',
                url: apiHost + '/group',
                data: $scope.group
            }).success(function (data) {
                $scope.group = data;
                if (!ctrl.groupId){
                    $location.path("/users")
                }
            });
        };
    }]);


corpdeskControllers.controller('PasswordCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {
        var ctrl = this;
        ctrl.data={};

        $scope.changePassword=function() {
            if (ctrl.initPassword!=ctrl.confirmPassword){
                alert("Passwords not identical!");
                return;
            }

            ctrl.data.newPassword=ctrl.initPassword;
            ctrl.data.login = $rootScope.loginContext.user;
            $http({
                method: 'POST',
                url: apiHost + '/user/changepassword',
                data: ctrl.data
            }).success(function (data) {
                return;
            });
        };
    }]);












/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
    console.log("Blog Controller reporting for duty.");
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
    console.log("Page Controller reporting for duty.");

    // Activates the Carousel
    $('.carousel').carousel({
        interval: 5000
    });

    // Activates Tooltips for Social Links
    $('.tooltip-social').tooltip({
        selector: "a[data-toggle=tooltip]"
    })
});