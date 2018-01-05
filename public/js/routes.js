angular
    .module('HolaSpanishWorld')
    .config(function($stateProvider) {
        var dashboard = {
            name: 'dashboard',
            url: '/dashboard',
            templateUrl: './dashboard.html',
            data: {
                title: 'Dashboard - Tablero'
            }   
        }

        var lessons = {
            name: 'lessons',
            url: '/lessons',
            templateUrl: './lessons.html',
            data: {
                title: 'Lessons - Lecciones'
            }
        }

        var grammar = {
            name: 'grammar',
            url: '/grammar',
            templateUrl: './grammar.html',
            data: {
                title: 'Grammar - Gramática'
            }
        }
        
        var culture = {
            name: 'culture',
            url: '/culture',
            templateUrl: './culture.html',
            data: {
                title: 'Culture - Cultura'
            }
        }
/*
        var cultureTraditions = {
            name: 'culture.Traditions',
            parent: culture,
            url: '/culture/traditions',
            templateUrl: './culture/traditions.html',
        }
        
        var cultureUrban = {
            name: 'culture.Urban',
            parent: culture,
            url: '/culture/urban',
            templateUrl: './culture/urban.html',
        }
        
    $stateProvider.state(cultureTraditions);
    $stateProvider.state(cultureUrban);
    */
    $stateProvider.state(dashboard);
    $stateProvider.state(lessons);
    $stateProvider.state(grammar);
    $stateProvider.state(culture);
});
