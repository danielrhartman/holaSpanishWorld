angular
    .module('HolaSpanishWorld')
    .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success'
});

angular
    .module('HolaSpanishWorld')
    .constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    guest: 'guest'
});
