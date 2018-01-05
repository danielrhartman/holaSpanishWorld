angular.module('resourceService', []);

angular
    .module('HolaSpanishWorld')
    .service('resources', ['$http', '$q', resources]);

function resources($http, $q, authentication) {

    var getResourcesByType = function(type) {
        return $http.get('/api/resources/type/' + type)
            .then(function(response) {
                return response;
            }, function(response) {
                //console.log(JSON.stringify(response));
                return $q.reject(response.data);
            });
    };


    var getResources = function(count) {
        return $http.get('/api/resources/' + count)
            .then(function(response) {
                return response;
            }, function(response) {
                //console.log(JSON.stringify(response));
                return $q.reject(response.data);
            });
    };

    return {
        getResources: getResources,
        getResourcesByType: getResourcesByType
    };


}
