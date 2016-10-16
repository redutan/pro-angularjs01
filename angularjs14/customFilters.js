/**
 * Created by myeongju.jung on 2016. 10. 16..
 */
angular.module('exampleApp')
    // 일반 필터
    .filter('labelCase', function () {
        return function (value, reverse) {
            if (!angular.isString(value)) {
                return value;
            }
            var intermediate = reverse ? value.toUpperCase() : value.toLowerCase();
            return (reverse ? intermediate[0].toLowerCase() : intermediate[0].toUpperCase()) + intermediate.substr(1);
        }
    })
    // 커스텀 컬랙션 필터
    .filter('skip', function () {
        return function (data, count) {
            if (!angular.isArray(data) || !angular.isNumber(count)) {
                return data;
            }
            if (count > data.length || count < 1) {
                return data;
            } else {
                return data.slice(count);
            }
        }
    })
    // 기존 필터 확장 (skip + limitTo 복합)
    .filter('take', function ($filter) {
        return function (data, skipCount, takeCount) {
            var skippedData = $filter('skip')(data, skipCount);
            return $filter('limitTo')(skippedData, takeCount);
        }
    });