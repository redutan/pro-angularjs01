/**
 * Created by myeongju.jung on 2016. 10. 17..
 */
angular.module('customDirectives', ['customServices'])
    .directive('triButton', function (logService) {
        return {
            scope: {
                counter: '=counter'
            },
            link: function (scope, element, attrs) {
                element.on('click', function (event) {
                    logService.log('Button click: ' + event.target.innerText);
                    // scope.$apply 를 무조건 이용해야 하는 거 같음
                    scope.$apply(function () {
                        scope.counter++;
                    })
                });
            }
        }
    });