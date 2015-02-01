define(['knockout', 'crossroads', 'hasher', 'services/auth-service'], function (ko, crossroads, hasher, auth) {

  // This module configures crossroads.js, a routing library. If you prefer, you
  // can use any other routing library (or none at all) as Knockout is designed to
  // compose cleanly with external libraries.
  //
  // You *don't* have to follow the pattern established here (each route entry
  // specifies a 'page', which is a Knockout component) - there's nothing built into
  // Knockout that requires or even knows about this technique. It's just one of
  // many possible ways of setting up client-side routes.

  return new Router({
    routes: [
        { url: '', params: { page: 'workspace-page' } },
        { url: 'Workspace', params: { page: 'workspace-page' } },
        { url: 'Intro', params: { page: 'intro-page' } },
        { url: 'ActivateAccount{?query}', params: { page: 'intro-page', component: 'activate-account' } },
        { url: 'ChangePassword{?query}', params: { page: 'intro-page', component: 'change-password' } }
    ]
  });

  function Router(config) {

    var currentRoute = this.currentRoute = ko.observable({});

    ko.utils.arrayForEach(config.routes, function (route) {
      crossroads.addRoute(route.url, function (requestParams) {
        currentRoute(ko.utils.extend(requestParams, route.params));
      });

      // check if the user is authenticated and redirect if not
      crossroads.routed.add(AuthenticateUser);
    });

    activateCrossroads();
  }

  function activateCrossroads() {
    function parseHash(newHash, oldHash) {
      crossroads.parse(newHash);
    }

    crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;

    // to ensure that the generated codes maintain it's special characters when parsed from the querystring by CrossroadsJS
    hasher.raw = true;

    hasher.initialized.add(parseHash);
    hasher.changed.add(parseHash);
    hasher.init();
  }

  function AuthenticateUser(request, data) {
    
    var environment = '/*@echo NODE_ENV*/';

    auth.IsUserAuthenticated().done(function (result) {
      if (environment !== 'development' && result === false) {
        window.location.replace('#intro');
      }
    });
  }
});