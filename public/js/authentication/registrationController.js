angular
    .module('HolaSpanishWorld')
    .controller('RegistrationController', RegistrationController);

function RegistrationController($uibModalInstance, authentication) {
    var vm = this;

    vm.success = false;

    vm.credentials = {
        name: "",
        email: "",
        password: ""
    };

    vm.onSubmit = function() {
        authentication
            .register(vm.credentials)
            .then(function(response) {
                vm.registrationErrorMessage = '';
                vm.success = true;
            }, function(response) {
                vm.registrationErrorMessage = response;
                vm.credentials.password = "";
            });
    };


    vm.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }
 }
