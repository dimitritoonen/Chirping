define(['jquery', 'knockout', './router', 'services/auth-service', 'bootstrap', 'app/app.config',
  'knockout-projections', 'knockout-validation', 'app/ko-validation-config', 'qtip2'],
  function ($, ko, router, auth) {
    
  var viewModel = {
    route: router.currentRoute,
    auth: auth
  };

  $.ajaxSetup({
    contentType: 'application/json; charset=utf-8'
  });
  
  // Components can be packaged as AMD modules, such as the following:

  // pages
  ko.components.register('user-bar', { require: 'pages/user-bar/user-bar' });
  ko.components.register('intro-page', { require: 'pages/intro-page/intro-page' });
  ko.components.register('login-page', { require: 'pages/login-page/login-page' });
  ko.components.register('registration-page', { require: 'pages/registration-page/registration-page' });

  // components
  ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
  ko.components.register('wizard-step1', { require: 'components/registration-page/wizard-step1/wizard-step1' });
  ko.components.register('wizard-step2', { require: 'components/registration-page/wizard-step2/wizard-step2' });
  ko.components.register('wizard-step3', { require: 'components/registration-page/wizard-step3/wizard-step3' });
  ko.components.register('profile-image-upload', { require: 'components/registration-page/profile-image-upload/profile-image-upload' });

  // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]
  

  // Start the application
  ko.applyBindings(viewModel);
});
