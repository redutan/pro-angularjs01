/**
 * Created by myeongju.jung on 2016. 10. 17..
 */
angular.module('customServices', [])
    .provider('logService', function () {
        var counter = true;
        var debug = true;
        return {
            messageCounterEnabled: function (setting) {
                // 인자가 없을 경우 조회함수
                if (angular.isUndefined(setting)) {
                    return counter;
                }
                // 인자가 있을 경우 설정함수
                counter = setting;
                return this;    // this = ?

            },
            debugEnabled: function (setting) {
                if (angular.isUndefined(setting)) {
                    return debug;
                }
                debug = setting;
                return this;
            },
            $get: function () {
                return {
                    messageCount: 0,
                    log: function (msg) {
                        if (debug) {
                            console.log('(LOG' + (counter ? ' + ' + this.messageCount++ : '' ) + ') ' + msg);
                        }
                    }
                };
            }
        };
    });