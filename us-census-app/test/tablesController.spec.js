describe('Tables Controller', function() {

  beforeEach(module('usCensusApp.tables'));

  describe('Loading TablesController', function(){
    var controller;
    var scope, httpBackend;

    beforeEach(inject(function($controller, $rootScope, $httpBackend) {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      httpBackend.when("GET", "http://localhost:9292/api/v0.1/tables").respond({tables:["census_learn_sql"]});
      controller = $controller("TablesController", {$scope: scope});
    }));

    it('should exit', inject(function() {
      expect(controller).toBeDefined();
    }));

    it("should find tables", function () {
      httpBackend.flush();
      expect(scope.tables).toEqual(['census_learn_sql']);
    });
  });
});
