describe('Tables Controller', function() {

  beforeEach(module('usCensusApp.tables'));
  beforeEach(module('usCensusApp.config'));

  describe('Loading TablesController', function(){
    var controller;
    var scope, httpBackend;

    beforeEach(inject(function($controller, $rootScope, $httpBackend, API_URL) {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      httpBackend.when("GET", API_URL + "tables").respond({tables:["census_learn_sql"]});
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
