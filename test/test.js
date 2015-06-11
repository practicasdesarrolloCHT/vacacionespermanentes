

describe("MainCtrl", function() {

    var scope, controller;

    beforeEach(function(){
        module('flapper-news');

    });

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('MainCtrl', { $scope: scope });
    }));

    it("fills the foos", function() {
        expect(scope.test).toEqual("Viajes");
    });
});



//var assert = require("assert")
//describe('Array', function(){
//  describe('#indexOf()', function(){
//      it('should return -1 when the value is not present', function(){
//            assert.equal(-1, [1,2,3].indexOf(5));
//	          assert.equal(-1, [1,2,3].indexOf(0));
//		      })
//		        })
//			})
