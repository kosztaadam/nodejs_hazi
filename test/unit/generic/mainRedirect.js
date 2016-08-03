/**
 * Created by Koszta Ádám on 2016. 05. 20..
 */

var expect = require('chai').expect;
var mainRedirectMW = require('../../../middleware/generic/mainRedirect');

describe('mainRedirect middleware ', function () {

    it('should return login', function (done) {

        var fakeUserModel = {
        };

        var req = {
          session : {
              userid : undefined
          }
        };

        var res = {
            url : '',
            redirect : function (to) {
                expect(to).to.eql('/login');
                done();
            }
        };

        mainRedirectMW({
            userModel: fakeUserModel
        })(req, res, function () {
            expect(true).to.eql(false);
            done();
        });
    });

    it('should return bets', function (done) {

        var fakeUserModel = {
        };

        var req = {
            session : {
                userid : '123'
            }
        };

        var res = {
            url : '',
            redirect : function (to) {
                expect(to).to.eql('/bets');
                done();
            }
        };

        mainRedirectMW({
            userModel: fakeUserModel
        })(req, res, function () {
            expect(true).to.eql(false);
            done();
        });
    });
});
