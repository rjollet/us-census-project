describe('Columns Controller', function() {

  beforeEach(module('usCensusApp.columns'));

  describe('Loading ColumnsController', function(){
    var controller;
    var scope;

    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller("ColumnsController", {$scope: scope});
    }));

    it('should exit', inject(function() {
      expect(controller).toBeDefined();
    }));
  });
});
