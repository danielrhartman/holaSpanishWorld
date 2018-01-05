angular
    .module('HolaSpanishWorld')
    .controller('MainController', MainController);

function MainController($rootScope, $state, $uibModal, $anchorScroll, authentication, lesson, user, AUTH_EVENTS) {
    var vm = this;
    vm.showHeader = true;
    vm.user = null;
    vm.nextLesson = null;

    vm.state = null;
    vm.page = ' ';

    headerImages = [
        'cocoa-452911_1920.jpg',
        'machu-picchu-1569324_1280.jpg',
        'scarlet-macaw-1290913_1280.jpg',
        'colombia-1558499_1920.jpg',
        'mexico-1355036_1920.jpg',
        'colours-1353407_1920.jpg',
        'mochilas-1247666_1920.jpg'
    ];

    vm.headerImage = './assets/images/main/'
        + headerImages[Math.floor(Math.random() * 7)];

    $state.go('dashboard');

    $rootScope.$on('$stateChangeSuccess',
        function(evt, toState, toParams, fromState, fromParams) {
            if(!toState.parent){
                vm.state = toState;
            }
    });

    
    lesson.getNextLesson().then(function(response) {
        //console.log(response);
        start = moment(response.start);
        if(start.isAfter(moment())){
            vm.nextLesson = response;
            vm.nextLesson.fromNow = start.fromNow();
        }
    }, function(response) {
        //console.log("error getting next lesson: " + JSON.stringify(response));
    });

    vm.refreshUser = function() {
        user.getUser().then(function(response) {
            vm.user = response.data;
        }, function(response) {
            //console.log("get user failed: " + JSON.stringify(response));
        });
    }

    vm.refreshUser();

    vm.logout = function() {
        authentication.logout();
    }

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
        vm.refreshUser();
        vm.showHeader = false;
    });

    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
        vm.user = null;
        vm.showHeader = true;
    });

    vm.openLoginModal = function() {
        var registrationModal = $uibModal.open({
            templateUrl: './login.html',
            controller: 'LoginController',
            controllerAs: 'login',
        });
    };

    vm.addCredit = function(){
        user.addCredit(vm.user).then(function(response) {
        }, function(response) {
            console.log('add credit returned bad');
            //TODO error handling
        });
    };

};
