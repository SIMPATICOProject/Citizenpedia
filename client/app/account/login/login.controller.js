'use strict';

// I leave this code here just in case
// ===================================
// class LoginController {
//   constructor(Auth, $state) {
//     this.user = {};
//     this.errors = {};
//     this.submitted = false;

//     this.Auth = Auth;
//     this.$state = $state;
//   }

//   login(form) {
//     this.submitted = true;

//     if (form.$valid) {
//       this.Auth.login({
//         email: this.user.email,
//         password: this.user.password
//       })
//       .then(() => {
//         // Logged in, redirect to home
//         this.$state.go('main');
//       })
//       .catch(err => {
//         this.errors.other = err.message;
//       });
//     }
//   }
// }


// angular.module('paizaqaApp')
//   .controller('LoginController', LoginController);


angular.module('paizaqaApp')
  .controller('LoginController', function($window) {
      $window.location.href = 'auth/aac';
  });

