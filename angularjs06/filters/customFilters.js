/**
 * Created by myeongju.jung on 2016. 10. 12..
 */
angular.module("customFilters", [])
    .filter("unique", function () {
        return function (data, propertyName) {
            if (!angular.isArray(data) || !angular.isString(propertyName)) {
                return data;
            }
            var results = [];
            var keys = {};
            for (var i = 0; i < data.length; i++) {
                var val = data[i][propertyName];
                if (angular.isUndefined(keys[val])) {
                    keys[val] = true;
                    results.push(val);
                }
            }
            return results;
        }
    })
    .filter("range", function ($filter) {
        return function (data, page, size) {
            if (!angular.isArray(data) || !angular.isNumber(page) || !angular.isNumber(size)) {
                return data;
            }
            var startIndex = (page - 1) * size;
            if (data.length < startIndex) {
                return [];
            }
            return $filter("limitTo")(data.splice(startIndex), size);
        }
    })
    .filter("pageCount", function () {
        return function (data, size) {
            var result = [];
            if (!angular.isArray(data)) {
                return data;
            }
            for (var i = 0; i < Math.ceil(data.length / size); i++) {
                result.push(i);
            }
            return result;
        }
    });