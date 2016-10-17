/**
 * Created by myeongju.jung on 2016. 10. 17..
 */
angular.module('customServices', [])
    // 싱글턴 서비스 객체
    .service('logService', function () {
        return {
            messageCount: 0,
            log: function (msg) {
                console.log('Debug: ' + (this.messageCount++) + ' ' + msg);
            }
        }
    });