var assert = require('chai').assert;
var moment = require('moment');
var utilities = require('../utilities');

describe('utilities', givenUtilities);

function givenUtilities() {
    describe('#sayAt', function() {
        beforeEach(function() {
            testableBot._sayCallCount = 0;
        });

        it('should resolve true given valid params', function(done) {
            utilities.sayAt(testableBot, {}, moment().add(30, 'minute')).then(function(res) {
                assert.equal(res, true);
                done();
            });
        });

        it('should fail with current or past datetime', function(done) {
            utilities.sayAt(testableBot, {}, moment()).catch(function(err) {
                assert.equal(err.message, 'datetime must be in the future');
                done();
            });
        });

        it('should have called the say function after one second', function(done) {
            utilities.sayAt(testableBot, {}, moment().add(1, 'second')).then(function(res) {
                setTimeout(function() {
                    assert.equal(testableBot.getSayCallCount(), 1);
                    done();
                }, 1000);
            });
        });
    });
};

var testableBot = {
    _sayCallCount: 0,
    say: function(message, callback) {
        this._sayCallCount++;

        callback(undefined, undefined);
    },
    getSayCallCount: function() {
        return this._sayCallCount;
    }
};