/*globals angular */
angular.module('ng-flipclock', []).directive('flipClock', ['$parse', function ($parse) {
    'use strict';

    return {
        restrict: 'E',
        scope: {
            autoStart: '@',
            countdown: '@',
            callbacks: '@',
            classes: '@',
            clockFace: '@',
            defaultClockFace: '@',
            defaultLanguage: '@',
            countdownTo: '@',
            clock: '=',
            destroyCallback: '&',
            createCallback: '&',
            initCallback: '&',
            intervalCallback: '&',
            startCallback: '&',
            stopCallback: '&',
            resetCallback: '&'
        },
        controller: ['$scope', function ($scope) {
            $scope.parse = function (value) {
                if (value === undefined) {
                    return undefined;
                } else {
                    if (value == 'true' || value == 'false') {
                        return JSON.parse(value);
                    } else {
                        return value;
                    }
                }
            };
        }],
        link: function (scope, element, attr, controller) {
            var toDate,
                currentDate = new Date(),
                toDateSeconds;

            if (scope.countdownTo instanceof Date) {
                toDate = scope.countdownTo;
            } else {
                toDate = new Date(scope.countdownTo);
            }
            toDateSeconds = Math.floor((toDate - currentDate) / 1000);
            if (toDateSeconds <= 0) {
                toDateSeconds = 0;
            }

            scope.clock = element.FlipClock({
                autoStart: false,
                clockFace: scope.parse(scope.clockFace),
                defaultClockFace: scope.parse(scope.defaultClockFace),
                defaultLanguage: scope.parse(scope.defaultLanguage),
                classes: scope.parse(scope.classes),
                callbacks: {
                    destroy: scope.destroyCallback,
                    create: scope.createCallback,
                    init: scope.initCallback,
                    interval: scope.intervalCallback,
                    start: scope.startCallback,
                    stop: scope.stopCallback,
                    reset: scope.resetCallback
                }
            });

            scope.clock.setTime(toDateSeconds);
            if (scope.countdown) {
                scope.clock.setCountdown(true);
            }
            if (scope.autoStart === undefined || scope.autoStart === true) {
                if (toDateSeconds !== 0) {
                    scope.clock.start();
                }
            }
        }
    };
}]);