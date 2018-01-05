angular.module('authenticationService', []);

angular
    .module('authenticationService')
    .service('authentication', ['$http', '$window', '$q', '$rootScope', 'AUTH_EVENTS', authentication]);


function authentication($http, $window, $q, $rootScope, AUTH_EVENTS) {

    var register = function(user) {
        return $http.post('/api/register', user).then(function(response) {
            login({email: user.email, password: user.password});
        }, function(response) {
            return $q.reject(response.data.error);
        });
    };

    var login = function(user) {
        return $http.post('/api/login', user).then(function(response) {
            saveToken(response.data.token);
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        }, function(response) {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            return $q.reject(response.data);
        });
    };

    var saveToken = function(token) {
        $window.localStorage['auth-token'] = token;
    };

    var getToken = function() {
        return $window.localStorage['auth-token'];
    };

    var isLoggedIn = function() {
        var token = getToken();
        var payload;
        if(token){
            payload = getPayload(token);
            
            return payload.exp > Date.now() / 1000;
        }else{
            return false;
        }
    };

    var currentUser = function() {
        if(isLoggedIn()) {
            var token = getToken();
            var payload = getPayload(token);
            return {
                email: payload.email,
                name: payload.name,
                credits: payload.credits,
                type: payload.type
            };
        }
    };

    var getPayload = function(token) {
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return payload;
    }

    var logout = function() {
        $window.localStorage.removeItem('auth-token');
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    };

    return {
        register: register,
        login: login,
        saveToken: saveToken,
        getToken: getToken,
        isLoggedIn: isLoggedIn,
        currentUser: currentUser,
        logout: logout
    };
}