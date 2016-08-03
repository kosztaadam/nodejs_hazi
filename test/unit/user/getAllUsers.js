/**
 * Created by Koszta Ádám on 2016. 05. 20..
 */

var expect = require('chai').expect;
var getAllUsersMW = require('../../../middleware/user/getAllUsers');

describe('getAllUsers middleware ', function () {

    it('should return users', function (done) {

        var req = {};
        var res = {
            tpl: {}
        };

        var fakeUserModel = {
            find: function (some, cb) {
                cb(undefined, ['bela', 'jozsi'])
            }
        };

        getAllUsersMW({
            userModel: fakeUserModel
        })(req, res, function (err) {
            expect(res.tpl.users).to.eql(['bela', 'jozsi']);
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('should return error', function (done) {
        var fakeUserModel = {
            find: function (some, cb) {
                cb('jakab', undefined)
            }
        };

        getAllUsersMW({
            userModel: fakeUserModel
        })({}, {}, function (err) {
            expect(err).to.eql('jakab');
            done();
        });
    });
});
