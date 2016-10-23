angular.module('exampleApp', ['increment', 'ngResource', 'ngRoute'])
    .constant('baseUrl', 'http://localhost:5500/products/')
    .constant('baseUri', '/22_view')
    // resource 서비스
    .factory('productsResource', function ($resource, baseUrl) {
        return $resource(baseUrl + ':id', {id: '@id'},
            {create: {method: 'POST'}, save: {method: 'PUT'}});
    })
    .config(function ($routeProvider, $locationProvider, baseUri) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        // 보수적 라우트 파라미터
        $routeProvider.when('/edit/:id', {
            templateUrl: baseUri + '/editorView.html',
            // 호출하는 상위 콘트롤러인 defaultCtrl를 상속하므로 해당 컨트롤러의 $scope에 접근할 수 있다.
            controller: 'editCtrl'
        });

        // 열설적 라우트 파라미터 (:data*) - 사용안함
        $routeProvider.when('/edit/:id/:data*', {
            templateUrl: baseUri +  '/editorView.html'
        });

        $routeProvider.when('/create', {
            templateUrl: baseUri + '/editorView.html',
            controller: 'editCtrl'
        });

        // templateUrl 은 항상 앞에 / 문자를 사용해야한다. 절대경로를 사용하지 않을 경우 문제가 생길 가능성이 생긴다.
        // ng-view에 자동으로 바인딩 된다.
        $routeProvider.otherwise({
            templateUrl: baseUri + '/tableView.html',
            controller: 'tableCtrl',
            // tableCtrl에 의존성 주입할 속성들
            resolve: {
                data: function (productsResource) {
                    return productsResource.query();
                }
            }
        });
    })
    .controller('defaultCtrl', function ($scope, $http, $resource, $location, productsResource, baseUrl) {

        $scope.data = {};

        $scope.createProduct = function (product) {
            new productsResource(product).$create().then(function (newProduct) {
                $scope.data.products.push(newProduct);
                $location.path('/list');
            });
        };

        $scope.deleteProduct = function (product) {
            product.$delete().then(function () {
                $scope.data.products.splice($scope.data.products.indexOf(product), 1);
            })
            $location.path('/list');
        };
    })
    .controller('tableCtrl', function ($scope, $location, $route, data) {
        $scope.data.products = data;

        $scope.refreshProducts = function () {
            $route.reload();
        }
    })
    .controller('editCtrl', function ($scope, $routeParams, $location) {

        $scope.currentProduct = null;

        // 라우트 파라미터 접근
        if ($location.path().indexOf('/edit/') == 0) {
            var id = $routeParams['id'];
            for (var i = 0; i < $scope.data.products.length; i++) {
                $scope.currentProduct = $scope.data.products[i];
                break;
            }
        }

        $scope.cancelEdit = function () {
            $location.path('/list');
        };

        $scope.updateProduct = function (product) {
            product.$save();
            $location.path('/list');
        };

        $scope.saveEdit = function (product) {
            if (angular.isDefined(product.id)) {
                $scope.updateProduct(product);
            } else {
                $scope.createProduct(product);
            }
            $scope.currentProduct = {};
        };
    });