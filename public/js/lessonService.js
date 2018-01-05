angular
    .module('HolaSpanishWorld')
    .service('lesson', ['$http', '$q', 'authentication', lessonService]);

function lessonService($http, $q, authentication) {

    var addLesson = function(lesson) {
        return $http.post('/api/lessons', lesson).then(function(response) {

        }, function(response){
            return $q.reject(response.data.error);
        })
    };

    var getNextLesson = function(){
        return $http.get('/api/lessons/group/next').then(function(response) {
            return response.data;
        }, function(response) {
            return $q.reject(response);
        });
    };

    var getUserPrivateLessons = function() {
        return $http.get('/api/lessons/private/user/', {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()  
            }
        }).then(function(response) {
            return response.data;
        }, function(response) {
            return [];
        });
    };

    var getOpenPrivateLessons = function() {
        return $http.get('/api/lessons/private/', {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        }).then(function(response) {
            return response.data;
        }, function(response) {
            return [];
        });
    };

    return {
        getUserPrivateLessons: getUserPrivateLessons,
        addLesson: addLesson,
        getNextLesson: getNextLesson,
        getOpenPrivateLessons: getOpenPrivateLessons
    };
}
