describe('Columns Controller', function() {

  beforeEach(module('usCensusApp.columns'));

  describe('Loading ColumnsController', function(){
    var createController;
    var scope, httpBackend;

    beforeEach(inject(function($controller, $rootScope, $httpBackend) {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;

      httpBackend.when(
        "GET",
        "http://localhost:9292/api/v0.1/tables/census_learn_sql"
      ).respond(
        {
          table: "census_learn_sql",
          columns: [
            "age",
            "class of worker",
            "industry code",
            "occupation code"
          ]
        }
      );

      httpBackend.when(
        "GET",
        "http://localhost:9292/api/v0.1/tables/not_valid_table"
      ).respond( 404,
        {
          errors: ["the table: not_valid_table does not exist"]
        }
      );

      createController = function (routeParams) {
        return $controller("ColumnsController", {$scope: scope, $routeParams: routeParams});
      }
    }));

    it('should exit', inject(function() {
      expect(createController({table: 'census_learn_sql'})).toBeDefined();
    }));

    it("should find columns for a valid table", function () {
      createController({table: 'census_learn_sql'});
      httpBackend.flush();
      expect(scope.columns).toEqual([
        "age",
        "class of worker",
        "industry code",
        "occupation code"
      ]);
    });

    it("should et error for non valid table", function () {
      createController({table: 'not_valid_table'});
      httpBackend.flush();
      expect(scope.errors).toEqual(["the table: not_valid_table does not exist"]);
    });
  });
});
