angular
    .module('HolaSpanishWorld')
    .controller('CultureController', CultureController);

function CultureController(resources, $uibModal){
    var vm = this;
    
    vm.resources = [];
    getResources();

    function getResources(){
        resources.getResources().then(function(response) {
            //console.log(JSON.stringify(response));
            vm.resources = response.data;
        }, function(response) {
            vm.resources = [];
            console.log(JSON.stringify(response));
        });
    };

   
    vm.tab = 'Destinations';
    vm.tabs = [
        'Destinations',
        'Gastronomy',
        'Traditions',
        'Nature',
        'Urban'
    ];

    vm.tabTranslations = {
        Destinations: 'Destinos',
        Gastronomy: 'Gastronomía',
        Traditions: 'Tradiciones',
        Nature: 'Naturaleza',
        Urban: 'Urbano'
    };

    vm.tabStyle = {
        'width': (100/vm.tabs.length) + '%'
    };

    vm.resources = [];
    getResources('Destinations');

    vm.tabClick = function(tab){
        getResources(tab.tab);
        vm.tab = tab.tab;
    }


    function getResources(type) {
        resources.getResourcesByType(type).then(function(response) {
            //console.log(JSON.stringify(response));
            vm.resources = response.data;
        }, function(response) {
            vm.resources = [];
            console.log(JSON.stringify(response));
        });
    };

    vm.openResourceModal = function(resource) {
        var resourceModal = $uibModal.open({
            templateUrl: './cultureResource.html',
            controller: function($uibModalInstance, data) {
                var vm = this;

                vm.resource = resource;
                vm.close = function(){
                    $uibModalInstance.close();
                }
            },
            controllerAs: 'cultureResource',
            resolve: {
                data: {
                    resource: resource,
                }
            },
            windowClass: 'resource-modal'
        });
    };
    


    vm.latestResource = getLatestResource();

    function getLatestResource() {
        resources.getResources(1).then(function(response) {
            //console.log(JSON.stringify(response));
            vm.latestResource = response.data[0];
        }, function(response) {
            vm.latestResource = '';
            console.log(JSON.stringify(response));
        });
    };


}
