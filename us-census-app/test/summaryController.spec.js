describe('Summary Controller', function() {

  beforeEach(module('usCensusApp.summary'));

  describe('Loading SummaryController', function(){
    var controller;
    var scope;

    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller("SummaryController", {$scope: scope});
    }));

    it('should exit', inject(function() {
      expect(controller).toBeDefined();
    }));
  });
});
