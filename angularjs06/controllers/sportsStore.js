/**
 * Created by myeongju.jung on 2016. 10. 12..
 */
angular.module("sportsStore")
    .controller("sportsStoreCtrl", function ($scope) {
        $scope.data = {
            products: [{
                "name": "Kayak",
                "description": "1인용 보트",
                "category": "수상스포츠",
                "price": 275,
                "id": "801411098d48e8d9"
            }, {
                "name": "Lifejacket",
                "description": "멋진 보호 장비",
                "category": "수상스포츠",
                "price": 48.95,
                "id": "b9ac2fe540e9eb03"
            }, {
                "name": "Soccer Ball",
                "description": "FIFA 인증 규격 및 무게",
                "category": "축구",
                "price": 19.5,
                "id": "4c0a7fc5439538c7"
            }, {
                "name": "Conrner Flags",
                "description": "코너 플래그",
                "category": "축구",
                "price": 34.95,
                "id": "43d078dbbf747802"
            }]
        };
    });