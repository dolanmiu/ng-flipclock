/*globals angular */
angular.module('ng-flipclock', []).directive('flipClock', ['$parse', function ($parse) {
    'use strict';

    return {
        restrict: 'E',
        //replace: true,
        scope: {
            autostart: '@',
            countdown: '@',
            callbacks: '@',
            classes: '@',
            clockFace: '@',
            defaultclockface: '@',
            defaultlanguage: '@',
            time: '@',
            clock: '='
        },
        //template: '<div></div>',
        link: function (scope, element, attr) {

            var optionKeys = [
              'autostart', //(boolean) If this is set to false, the clock will not auto start. The default value is true.
              'countdown', //(boolean) If this is set to true, the clock will count down instead of up. The default value is false.
              'callbacks', //(object) An object of callback functions that are triggered at various times. For more information, view the callback documentation.
              'classes', //(object) This is an object of CSS classes to use to append to DOM objects
              'clockFace', // (string) This is the name of the clock that is used to build the clock display. The default value is HourlyCounter.
              'defaultclockface', //(string) This is the default clock face to use if the defined clock face does not exist. The default value is HourlyCounter.
              'defaultlanguage' //(string) This is the default langauge to use. The default value is english.
            ],
                options = {
                    callbacks: {}
                },
                methods = [
            'start', //This method will start the clock just call the .start() method on an FlipClock object.
            'stop', // This method will stop the clock just call the .stop() method on an FlipClock object.
            'setTime', //This method will set the clock time after it has been instantiated just call the .setTime() method on an FlipClock object.
            'getTime' //To get the clock time after it has been instantiated just call the .getTime() method on an FlipClock object.
          ];

            scope.clock = element.FlipClock(options);

            /*//bind methods to the scope
            methods.forEach(function (method) {
                scope[method] = function () {
                    clock[method].apply(clock, arguments);
                }
            });*/
        }
    }
  }]);