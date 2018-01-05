angular
    .module('HolaSpanishWorld')
    .factory('user', ['$http', '$q', 'authentication', userService]);

function userService($http, $q, authentication) {

    var getUser = function() {
        return $http.get('/api/users', {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        }).then(function(response) {
            return response;
        }, function(response) {
            //console.log(JSON.stringify(response));
            return $q.reject(response.data.error);
        });
    };

    var addCredit = function(user){
        user.credits = user.credits + 1;
        return $http.put('/api/users', user, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        }).then(function(response) {

        }, function(response) {

        });
    };

    var getInstructors = function() {
        return $http.get('/api/users/instructors', {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        }).then(function(response) {
            return response.data;
        }, function(response) {

        });
    };

    return {
        getUser: getUser,
        addCredit: addCredit,
        getInstructors: getInstructors
    };
}
