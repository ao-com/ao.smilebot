var assert = require('chai').assert;
var moment = require('moment');
var standups = require('../auto_messages/standups');

describe('auto_messages/standups', givenStandups);

const MONDAY_DAY_OF_WEEK = 1;
const TUESDAY_DAY_OF_WEEK = 2;

function givenStandups() {
    describe('#getNextDateForStandup', function() {
        it('should return current day when given morning time', function() {
            var currentTime = moment('2016-06-13T03:00:00.000');
            var standupTime = moment('2016-06-13T09:00:00.000');

            var result = standups.getNextDateForStandup(currentTime, standupTime);

            assert.equal(MONDAY_DAY_OF_WEEK, result.day());
        });
        
        it('should return next day when given past standup time', function() {
            var currentTime = moment('2016-06-13T23:00:00.000');
            var standupTime = moment('2016-06-13T09:00:00.000');

            var result = standups.getNextDateForStandup(currentTime, standupTime);

            assert.equal(TUESDAY_DAY_OF_WEEK, result.day());
        });
        
        it('should return monday when standup time has passed and current day is friday', function() {
            var currentTime = moment('2016-06-17T23:00:00.000');
            var standupTime = moment('2016-06-17T09:00:00.000');

            var result = standups.getNextDateForStandup(currentTime, standupTime);

            assert.equal(MONDAY_DAY_OF_WEEK, result.day());
        });

        it('should return monday when standup time has passed and current day is saturday', function() {
            var currentTime = moment('2016-06-18T23:00:00.000');
            var standupTime = moment('2016-06-18T09:00:00.000');

            var result = standups.getNextDateForStandup(currentTime, standupTime);

            assert.equal(MONDAY_DAY_OF_WEEK, result.day());
        });

        it('should return monday when standup time has passed and current day is sunday', function() {
            var currentTime = moment('2016-06-19T01:00:00.000');
            var standupTime = moment('2016-06-19T09:00:00.000');

            var result = standups.getNextDateForStandup(currentTime, standupTime);

            assert.equal(MONDAY_DAY_OF_WEEK, result.day());
        });
    });
};