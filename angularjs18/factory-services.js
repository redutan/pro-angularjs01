/**
 * Created by myeongju.jung on 2016. 10. 17..
 */
angular.module('customServices', [])
    // 싱글턴 서비스 객체
    .factory('logService', function () {
        var messageCount = 0;
        return {
            log: function (msg) {
                console.log('(LOG + ' + messageCount++ + ') ' + msg);
            }
        }
    });