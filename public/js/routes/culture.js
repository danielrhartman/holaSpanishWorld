angular
    .module('HolaSpanishWorld')
    .config(function($stateProvider) {

        var gastronomy = {
            name: 'culture.Gastronomy',
            parent: 'culture',
            url: '/gastronomy',
            templateUrl: './culture/gastronomy.html',
        }

        var traditions = {
            name: 'culture.Traditions',
            parent: 'culture',
            url: '/traditions',
            templateUrl: './culture/traditions.html',
        }
 
        var destinations = {
            name: 'culture.Destinations',
            parent: 'culture',
            url: '/destinations',
            templateUrl: './culture/destinations.html',
        }
        
        var nature = {
            name: 'culture.Nature',
            parent: 'culture',
            url: '/nature',
            templateUrl: './culture/nature.html',
        }

        var urban = {
            name: 'culture.Urban',
            parent: 'culture',
            url: '/culture/urban',
            templateUrl: './culture/urban.html',
        }

        $stateProvider.state(gastronomy);
        $stateProvider.state(traditions);
        $stateProvider.state(destinations);
        $stateProvider.state(nature);
        $stateProvider.state(urban);

});
