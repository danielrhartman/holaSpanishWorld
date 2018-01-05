angular
    .module('HolaSpanishWorld')
    .controller('LoginController', LoginController);

function LoginController($uibModalInstance, authentication) {
    var vm = this;
    
    vm.success = false;
    vm.login = true;
    vm.credentials = {
        name: '',
        email: '',
        password: ''
    };

    vm.submit = function(){
        if(vm.login){
            vm.onLoginSubmit();
        } else {
            vm.onRegistrationSubmit();
        }
    }

    vm.onRegistrationSubmit = function(){
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

    vm.onLoginSubmit = function() {
        authentication
        .login({
            email: vm.credentials.email,
            password: vm.credentials.password
        })
        .then(function(response) {
            vm.credentials.password = '';
            $uibModalInstance.close();
        }, function(response) {
            vm.credentials.password = '';
            alert(JSON.stringify(response.message));
        });
    };

    vm.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }

};
