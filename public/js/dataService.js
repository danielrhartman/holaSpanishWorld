angular.module('dataService', []);

angular
    .module('HolaSpanishWorld')
    .service('data', ['$http', '$q', 'authentication', data]);

function data($http, $q, authentication) {

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

    var addLesson = function(lesson) {
        return $http.post('/api/lessons', lesson).then(function(response) {

        }, function(response){
            return $q.reject(response.data.error);
        })
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

    var getNextLesson = function(){
        return $http.get('/api/lessons/group/next').then(function(response) {
            return response.data;
        }, function(response) {
            return $q.reject(response);
        });
    };

    return {
        getUser: getUser,
        addLesson: addLesson,
        addCredit: addCredit,
        getNextLesson: getNextLesson
    };


}