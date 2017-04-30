describe('Tables Controller', function() {

  beforeEach(module('usCensusApp.tables'));

  describe('Loading TablesController', function(){
    var controller;
    var scope;

    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller("TablesController", {$scope: scope});
    }));

    it('should exit', inject(function() {
      expect(controller).toBeDefined();
    }));
  });
});
