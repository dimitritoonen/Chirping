﻿define(['knockout', 'viewport', 'services/webapi-service'], function (ko, viewport, webapi) {
  
  function AddActivityModel() {

    var self = this;
    
    self.categories = ko.observableArray([]);
    self.shouldShowMobile = ko.observable(viewport.is.smallerThan('sm'));

    self.disposables = [];
    self.disposables.push(viewport.currentViewpoint.subscribe(function (value) {
      self.shouldShowMobile(viewport.is.smallerThan('sm'));

      if (viewport.is.largerThan('ms')) {
        console.log('larger');
      }
    }));
    
    // fields
    self.category = ko.observable();
    self.description = ko.observable().extend({ required: true });
    self.location = ko.observable().extend({ required: true });
    self.date = ko.observable().extend({ required: true });
    self.time = ko.observable().extend({ required: true });
    self.participants = ko.observable(8);
    self.chainaccept = ko.observable(false);
    
    if (self.categories().length === 0) {
      webapi.Get('api/category').done(function (result) {
        self.categories(result);

        // set the default value
        self.category(result[0]);
      });
    }

    var validationGroup = ko.validatedObservable({
      category: self.category,
      description: self.description,
      location: self.location,
      date: self.date,
      time: self.time,
      participants: self.participants,
      chainaccept: self.chainaccept
    });
    
    // add the activity to the back-end
    self.addActivity = function () {

      var result = ko.validation.group(self, { deep: true });

      if (!self.isValid()) {
        result.showAllMessages(true);
        return;
      }

      if (validationGroup.isValid) {

        // build the data for the post
        var data = {
          Category: self.category(),
          Date: self.date().format('YYYY-MM-DD') + ' ' + self.time().format('HH:mm'),
          Location: self.location(),
          Content: self.description(),
          ProfileId: 42,
          MaxParticipants: self.participants(),
          ChainAccept: self.chainaccept()
        };

        return webapi.Post('api/activity', data);
      }
    };

    // resets the model to it's initial state
    self.reset = function () {
      self.category(undefined);

      self.description(undefined);
      self.description.isModified(false);

      self.location(undefined);
      self.location.isModified(false);

      self.date(undefined);
      self.date.isModified(false);

      self.time(undefined);
      self.time.isModified(false);

      self.participants(8);
      self.chainaccept(false);
    }
  }

  AddActivityModel.prototype.dispose = function () {
    ko.utils.arrayForEach(this.disposables, function (item) {
      item.dispose();
    });
  }

  return new AddActivityModel();

})