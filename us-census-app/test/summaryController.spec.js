describe('Summary Controller', function() {

  beforeEach(module('usCensusApp.summary'));
  beforeEach(module('usCensusApp.config'));

  describe('Loading SummaryController', function(){
    var controller;
    var scope, httpBackend;

    beforeEach(inject(function($controller, $httpBackend, $rootScope, API_URL) {
      httpBackend = $httpBackend;
      scope = $rootScope.$new();

      httpBackend.when(
        "GET",
        API_URL + "tables/census_learn_sql/summary?average=age&column=education&limit=10&offset=0"
      ).respond(
        {
          rows: [
            {
              education: "High school graduate",
              count: 48407,
              "avg(`age`)": 45.0408412006528
            } , {
              education: "Children",
              count: 47422,
              "avg(`age`)":6.985808274640462
            } , {
              education: "Some college but no degree",
              count: 27820,
              "avg(`age`)": 40.02893601725378
            }
          ]
        }
      );

      httpBackend.when(
        "GET",
        API_URL + "tables/census_learn_sql/summary?column=education&limit=10&offset=0"
      ).respond(
        {
          rows: [
            {
              education: "High school graduate",
              count: 48407
            } , {
              education: "Children",
              count: 47422
            } , {
              education: "Some college but no degree",
              count: 27820
            }
          ]
        }
      );

      controller = $controller("SummaryController", {$scope: scope});
    }));

    it('should exit', inject(function() {
      expect(controller).toBeDefined();
    }));

    it("should summary with column and average", function () {

      scope.table = 'census_learn_sql',
      scope.column = 'education',
      scope.average = 'age'

      scope.submit.apply();
      httpBackend.flush();
      expect(scope.rows).toEqual([
        {
          education: "High school graduate",
          count: 48407,
          "avg(`age`)": 45.0408412006528
        } , {
          education: "Children",
          count: 47422,
          "avg(`age`)":6.985808274640462
        } , {
          education: "Some college but no degree",
          count: 27820,
          "avg(`age`)": 40.02893601725378
        }
      ]);
    });

    it("should summary with column only", function () {

      scope.table = 'census_learn_sql',
      scope.column = 'education'

      scope.submit.apply();
      httpBackend.flush();
      expect(scope.rows).toEqual([
        {
          education: "High school graduate",
          count: 48407
        } , {
          education: "Children",
          count: 47422
        } , {
          education: "Some college but no degree",
          count: 27820
        }
      ]);
    });
  });
});
