# pro-angularjs1
프로앵귤러JS 책 예제 풀이

# 준비

node 설치 : `brew install node`

```bash
# 프로젝트폴더에서 (pakcage.json 존재)
npm install
# 6장 예제에서 필요함
mkdir deployd
cd deployd
dpd create sportsstore
dpd -p 5500 sportsstore/app.dpd dashboard
```

`npm install -g karma`

# Directive

## `ng-cloak`

문서가 처음 로드될 때 잠시 보일 수 있는 인라인 바인딩 표현식(`{{}}`)을 숨겨주는 CSS를 적용한다.

## `ng-non-bindable`

인라인 데이터 바인딩 차단

```html
<div ng-non-bindable>
  AngularJS uses {{ and }} characters for templates
</div>
```

*출력*

`AngularJS uses {{ and }} characters for templates`

## `ng-repeat`

내장변수

- `$index` : 행번(0 base)
- `$first` : 현재 항목이 첫번째이면 true
- `$middle` : 현재 항목이 처음이나 마지막이 아니면 true
- `$last` : 현재 항목이 마지막이면 true
- `$even` : 현재 항목이 짝수번째 이면 true
- `$odd` : 현재 항목이 홀수번째 이면 true

## `ng-include`

빈엘리먼트 (바로 `/>` 닫기 태그 호출)로 사용하면 정상작동 되지 않는다. 아래처럼 항상 열기태그 닫기태그를 따로 지정해야한다.
```html
<!-- 오류 -->
<ng-include src="'table.html'"/>
<!-- 정상 -->
<ng-include src="'table.html'"></ng-include>
```

속성

- `src` : 로드할 콘텐츠 Url
- `onload` : 로드 이벤트 표현식
- `autoscroll` : 해당 뷰포트 스크롤 여부

## `ng-include` VS `ng-switch`

-`ng-switch` : 작은부분
-`ng-include` : 큰부분

## `ng-hide`, `ng-show` VS `ng-if`

- `ng-hide`, `ng-show` : `display:none`
- `ng-if` : No Element

참고로 두 디렉티브는 transclusion을 사용하는데 같은 엘리먼트에 동시 지정하면 오류가 발생함
일반적으로 array 항목 별로 제어나 분기가 필요하면 filter를 사용하는 것이 낫다.

## 불리언 어트리뷰트 디렉티브

- `ng-checked`
- `ng-disabled`
- `ng-open` : details의 open 속성
- `ng-readonly`
- `ng-selected`

# `$scope`

`$scope.$apply(expression)` : 정의된 표현식을 해석해서 처리 (함수가능) - `eval`과 비슷?

- 데이터 모델로 업데이트 정보를 전달하는데 사용

# 유효성

## input

- `ng-change`
- `ng-minlength`
- `ng-maxlength`
- `ng-pattern` : type=email|url|number 이면 자동 설정되므로 설정하지 말아야 한다.
- `ng-requried`

## checkbox

- `ng-change` : 내용일 변할 때
- `ng-true-value` : 체크될 때 값
- `ng-false-value` : 체크 해제할 때 값

## select

- `ng-optoins` : option 적용
- `ng-model` : 선택한 값

*특이하게 grouping 기능이 있음*

참고 : https://docs.angularjs.org/api/ng/directive/ngOptions

# Controller And Scope

컨트롤러는 도메인 모델과 뷰를 연결해주는 역할

컨트롤러는 'Scope'를 통해 뷰에게 데이터와 로직을 제공한다.

*엄밀히 말하면 `$scope`는 서비스가 아니고 `rootScope` 라는 서비스에서 제공하는 객체다. 하지만 실제로도 `$scope`를 서비스처럼 사용하므로 서비스라고 해도 별 무리는 없다고 본다.*

## controller 간 통신

- `$broadcast (name, args)` : 현재 스코프에서 모든 자식 스코프로 이벤트를 아래로 전달
- `$emit(name, args)` : 현재 스코프에서 루프 스코프까지 이벤트를 위로 전달
- `$on('name', function (event, args) {...})` : 현재 스코프에서 특정 이벤트를 수신할 핸들러 등록

AngularJS에서는 서비스를 사용해 스코프 사이의 통신을 중개하는 게 관례다.

## 명시적 스코프 업데이트

- `$apply(expression)` : 스코프에 변경사항을 적용 (함수 등록 가능)
- `$watch(expression, handler)` : 표현식을 통해 참조한 값이 바뀔 때 이를 통보 받을 핸들러 등록
- `$watchCollection(object, handler)` : 지정한 객체내 속성이 바뀔 때 이를 통바 받을 핸들러 등록

# Filter

## Basic

- currency
- date
- json
- number
- uppercase
- lowercase

## Collection

- limitTo : 갯수만큼 가져온다. 음수이면 뒤에서부터 갯수만큼 가져온다.
  - `| limitTo:5`
- filter : Collection 내 항목의 속성에 맞는 것만 필터링
  - `| filter: {category: 'Fish'}`
- orderBy : 정렬
  - `| orderBy: 'price'`
  - `| orderBy: '-price'` : 내림차순
  - `| orderBy: [myCustomerSorter, '-price']` : 다중정렬

## 필터체인
`p in products | filter:selectItems | orderBy: [myCustomerSorter, '-price'] | limitTo:limitVal`

## 커스텀필터

### 일반

```javascript
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
```

### 컬렉션

```javascript
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
```

### 복합
```javascript
// 기존 필터 확장 (skip + limitTo 복합)
.filter('take', function ($filter) {
    return function (data, skipCount, takeCount) {
        var skippedData = $filter('skip')(data, skipCount);
        return $filter('limitTo')(skippedData, takeCount);
    }
});
```

# 커스텀 디렉티브

방식

- 링크함수 `return function (scope, element, attrs)`
- 컴파일함수 : `return { link: ..., restrict: ..., template: ..., link: ..., ...}`

속성으로 표현식을 받을려면 `scope.$eval` 을 사용하면된다.

샘플은 http://redutan.github.com/pro-angularjs01/angularjs15/directive.html 참고

# jqLite

## Dom 탐색

- `chidren()`
- `eq(index)`
- `find(tag)`
- `next()`
- `parent()`

## Element 수정

- `addClass(name)`
- `attr(name)`, `attr(name, value)`
- `css(name)`, `css(name, value)`
- `hasClass(name)`
- `prop(name)`, `prop(name, value)`
- `removeAttr(name)`
- `removeClass(name)`
- `text()`, `text(value)`
- `toggleClass(name)`
- `val()`, `val(value)`

*커스텀 디렉티브에서 jqLite 사용예시*
```javascript
return function (scope, element, attrs) {
    var items = element.find("li");
    for (var i = 0; i < items.length; i++) {
        items.eq(i).css("font-weight", "normal");
    }
}
```

### `prop`, `attr`의 차이는?

- attr : html 마크업 속성 : ex) `class`
- prop : html 객체 속성 : ex) `className`

## Element 생성, 제거

- `angular.element(html)`
- `after(elements)`
- `append(elements)`
- `clone()`
- `prepend(elements)`
- `remove()`
- `replaceWith(elements)`
- `wrap(elements)`

## 이벤트 처리

- `on(events, handler)`
- `off(events, handler)`
- `triggerHandler(event)` : jqLite 객체에서 엘리먼트에 등록된 특정 이벤트에 대한 핸들러를 모두 트리거 한다.

## 기타

- `data(key)`, `data(key, value)`
- `removeData(key)`
- `html()`
- `ready(handler)` : Dom이 완전히 로드될 때 호출할 핸들러 함수를 등록한다.

## jqLite를 통한 AngularJS 기능 접근

- `controller()`, `controller(name)` : 해당 엘리먼트의 관련 콘트롤러를 반환
- `injector()` : 현재 엘리먼트나 부모와 관련된 **주입기**를 반환
- `isolatedScope()` : 현재 엘리먼트와 관련된 **고립스코프*가 있다면 반환
- `scope()`
- `inheritedData(key)` : 제이쿼리의 `data(key)`와 같은 작업을 하지만 지정한 키와 일치하는 값을 찾기위해 엘리먼트 계층구조를 순회한다는 점이 다름.

# 고급 커스텀 디렉티브

**컴파일방식**

## 링크함수 VS 컴파일함수

엄밀히 말해 compile 정의 속성에서 지정한 컴파일 함수는 DOM을 수정하는 데만 사용하고,
링크함수는 와처를 생성하거나 이벤트 핸들러를 설정하는 작업에만 사용해야한다.

> 하지만 필자는 개인적으로 프로젝트를 진행할 때 링크 함수에 모든 기능을 집어 넣는 편이다.

*필자의 내용은 동의하기 힘듬. 그냥 그 위대로 각 상황별로 분기해서 사용하는 것이 좋다고 판단*


## 디렉티브 정의객체 속성

- `compile` : 컴파일 함수 지정
- `controller` : 디렉티브를 위한 컨트롤러 함수 생성
- `link` : 디렉티브를 위한 링크 함수 (실제 구현체)
- `replace` : 템플릿 콘텐츠를 적용될 엘리먼트를 대처할지 여부
- `require` : 컨트롤러에 대한 의존성 선언
- `restrict` : 디렉티브 적용 방식 (**EA**CM)
    - `E` : 엘리먼트
    - `A` : 속성
    - `C` : 클래스
    - `M` : 주석
 - `scope` : 디렉티브를 위한 스코프 또는 고립 스코프 생성
- `template` : 뷰템플릿(html)
- `templateUrl` : 뷰템플릿Url(html링크)
- `transclude` : 디렉티브를 사용해 임의의 콘텐츠를 감쌀지 여부

## 고립스코프

```javascript
.directive('scopeDemo', function () {
  return {
    template: function () {
      return angular.element(document.querySelector("#scopeTemplate")).html();
    },
    scope: {} // 고립스코프
  }
})
```

### 고립스코프에서 속성 값을 통한 단방향 바인딩

```javascript
<script type="text/ng-template" id="scopeTemplate">
  <div class="panel-body">
    <p>Data Value: {{local}}</p>
  </div>
</script>
...
.directive('scopeDemo', function () {
  return {
    template: function () {
      return angular.element(document.querySelector("#scopeTemplate")).html();
    },
    scope: {
      local: "@nameprop"  // 디렉티브의 속성 nameprop -> 디렉티브 내 스코프 속성 local로 단방향 바인딩
    }
  }
})
...
<div class="panel-body" scope-demo nameprop="{{data.name}}"></div>
```

**주의사항*

> 고립스코프에 대한 단방향 바인딩은 항상 **문자열 값**으로 평가된다. 만일 배열에 접근해야 한다면 수정할 생각이 없더라도 양방향 바인딩을 사용해야한다.

## 고립스코프에서 양방향 바인딩

```javascript
<script type="text/ng-template" id="scopeTemplate">
  <div class="panel-body">
    <p>Data Value: <input ng-model="local"/></p>
  </div>
</script>
...
.directive('scopeDemo', function () {
  return {
    template: function () {
      return angular.element(document.querySelector("#scopeTemplate")).html();
    },
    scope: {
      local: "=nameprop"  // 디렉티브의 속성 nameprop -> 디렉티브 내 스코프 속성 local로 단방향 바인딩
    }
  }
})
...
<div class="panel-body" scope-demo nameprop="data.name"></div>
```

## 고립스코프에서 함수 바인딩

```javascript
<script type="text/ng-template" id="scopeTemplate">
  <div class="panel-body">
    <p>Name: {{local}}, City: {{cityFn({nameVal: local})}}</p>
  </div>
</script>
...
.directive('scopeDemo', function () {
  return {
    template: function () {
      return angular.element(document.querySelector("#scopeTemplate")).html();
    },
    scope: {
      local: "=nameprop",
      cityFn: "&city"   // 함수포인터
    }
  }
})
...
<div class="panel-body" scope-demo nameprop="data.name" city="getCity(nameVal)"></div>
```

## 트랜스클루전(transclude)

참조를 통해서 문서 영역의 일부를 다른 문서에 삽입하는 것

디렉티브 구현에 있어서 트랜스클루전은 임의의 콘텐츠를 감싼 래퍼 역할을 하는 디렉티브를 구현할 때 매우 유용하다

## 디렉티브 내 컨트롤러

디렉티브 간 연동(통신)이 필요할 시 사용하는 **required** 접두어

- `` : 두 디렉티브가 같은 엘리먼트에 적용된다고 가정한다.
- `^` : 디렉티브가 적용된 엘리먼트의 부모 엘리먼트에서 다른 디렉티브를 찾는다.
- `?` : 디렉티브를 찾을 수 없더라도 에러를 보고하지 않는다. - 이 접두어는 주의해야함

## ngModel 컨트롤러

**기본속성**

- `$render` : 데이터 바인딩 값이 변할 때 UI 호출. 주로 커스텀 디렉티브에서 오버라이드 한다.
- `$setViewValue(value)` : 데이터 바인딩 값을 업데이트 한다.
- `$viewValue` : 디렉티브를 통해 표시할 포매팅된 값을 반환
- `$modelValue` : 스코프로부터 포매팅되지 않은 값을 반환
- `$formatters` : `$modelValue` -> `$viewValue`로 포매팅하는 함수 배열

**유효성 검증 속성**

- `$setPristine()` : 컨트롤러 검증 유효성을 초기로 되돌려서 유효성 검증이 안되게 함
- `$isEmpty()` : 빈 문자열, null, undefined 값을 찾기 위해 사용
- `$parsers` : 유효성체크 함수 배열
- `$pristine` : 사용자가 컨트롤을 수정하지 않은 경우 true
- `$dirty` : 사용자가 컨트롤을 수정한 경우 true. `$pristine != $dirty`
- `$setValidity(name, valid)` : name의 유효성여부 설정
- `$valid` : 모델이 유효한가?
- `$invalid` : 모델이 유효하지 않은가?. `$valid != $invalid`

# Service

서비스는 애플리케이션에서 재사용하려는 기능을 캡슐화하려고 한다. 이는 MVC 패턴에 부합되지 않을 때 사용한다.
서비스는 주로 횡단 관심사를 구현하는 데 사용한다.

> **횡단관심사**
> - 하나 이상의 컴포넌트에 의해 영향을 받거나 하나 이상의 콤포넌트에 영향을 주는 공통 기능.
> - 전형적인 예로 로깅, 보안, 네트워킹
> - 이들 기능은 모델에 속하지 않으며, 컨트롤러나 뷰에도 속하지 않는다.

**사용이유**

서비스는 애플리케이션 전반에서 **재사용**할 수 있게 기능을 패키징한다.
모듈은 여러 애플리케이션에서 기능을 재사용하기 쉽게끔 기능을 패키징한다.

**시점**

서비스는 기능이 다른 MVC 컴포넌트에 집어넣기에 적합하지 않으며, 횡단 관심사에 해당할 때 구현한다.
모듈은 여러 애플리케이션에서 기능을 재사용하고 싶을 때 구현한다.

## Module

**맴버**

- `name` : 모듈의 이름
- `animation(name, factory)` : 애니메이션 기능 지원
- `config(callback)` : 로드 시점에 모듈을 설정하는 데 사용할 함수 등록
- `constant(key, value)` : 상수 반환 서비스
- `controller(name, constructor)` : 컨트롤러 생성
- `directive(name, factory)` : 디렉티브 생성
- `factory(name, provider)` : 서비스 생성
- `filter(name, factory)` : 필터 생성
- `provicer(name, type)` : 프로바이더 기반 서비스 생성
- `run(callback)` : 모든 모듈을 로드 및 설정할 수 호출할 함수를 등록. after `config`
- `service(name, constructor)` : 서비스 생성
- `value(name, value)` : 값 반환 서비스

## `Module.factory`

- 객체 정의를 통한 생성
- 싱글턴

## `Module.service`

생성자 정의를 통한 생성

## `Module.provider`

- 프로바이더를 통해 설정 가능한 서비스 생성
- 서비스에 사용할 수 있는 기능 추가 가능

*설정예시*
```javascript
.config(function (logServiceProvider) {
  logServiceProvider.debugEnabled(true).messageCounterEnabled(false);
})
```

# 내장 서비스

## `$interval`, `$timeout` 의 인자들

- `fn` : 실행을 지연할 함수
- `delay` : 함수 실행 시점까지의 지연시간 밀리초
- `count` : 지연/실행 주기를 반복할 횟수(`$interval` 전용) 기본값은 0이며, 0 값은 무한반복
- `invokeApply` : true(기본값)로 설정하면 `fn`이 `scope.$apply` 메서드 내에서 실행된다.

## `$location`

*Url*

`http://mydomain.com/app.html#/cities/london?select=hodels#north`

*변경가능부분*

`/cities/london?select=hodels#north`

*경로(path)*

`cities/london`

*검색어(search)*

`select=hodel`

*해시(hash)*

`north`

### `$location` 메서드

- `absUrl()` : 현재 문서의 전체 URL을 반환한다.
- `has()`, `hash(target)` : 해시를 조회하거나 설정한다.
- `host()` : URL(mydomain.com)의 호스트네임 컴포넌트를 반환한다.
- `path()`, `path(target)` : URL의 경로 컴포넌트를 가져오거나 설정한다.
- `port()` : 포트번호를 반환한다.
- `protocol()` : URL의 프로토콜 콤포넌트(http)를 반환한다.
- `replace()` : 가장 최신 히스토리 항목으로 대처한다.
- `search()`, `search(term, params)` : 검색어를 가져오거나 설정한다.
- `url()`, `url(target` : 경로, 쿼리문자열, 해시를 한꺼번에 가져오거나 설정한다.

### `$location` 이벤트

- `$locationChangeStart` : URL이 변경되기 전에 호출된다. `Event` 객체를 가지고 `preventDefault` 메서드를 호출하면 URL이 변경되는 것을 막을 수 있다.
- `$locationChangeSuccess` : URL이 변경된 후 호출된다.

## 표현식 함수

### `$parse`

단순한 표현식만 evaluate 가능

`$parse` 서비스를 주입받아야함

```javascript
// scope.expr = 'price | currency';
var expressionFn = $parse(scope.expr);
var result = expressionFn(scope);
```

### `$interpolate`

보간식(`{{}}`) 내 표현식과 일반문자열을 같이 표현 가능

`$parse` 서비스를 주입받아야함

보간설정도 바꿀 수 있음 by `$interpolateProvider`

- `startSymbol(symbol)` : `{{` 를 대처하는 시작문자 설정
- `endSymbol(symbol)` : `}}` 를 대처하는 종료문자 설정

```javascript
var interpolationFn =
    $interpolate('The total is: {{amount | currency}} (including tax)');
...
element.text(interpolationFn(scope));
```

### `$compile`

위 `$interpolate` 에다가 html 내 디렉티브까지 표현 가능

```javascript
// 내용에 html, 디렉티브, 보간식 이 모두 포함되어 있다.
var content = '<ul><li ng-repeat="city in cities">{{city}}</li></ul>';
var listElem = angular.element(content);
// 컴파일 함수를 선언, $compile(listElem)(scope) 로 선언과 동시 실행 가능
var compileFn = $compile(listElem);
// 컴파일함수를 실행하고 나면 listElem 이 표현 후 형태로 변경됨
compileFn(scope);
element.append(listElem);
```

# Ajax

## `$http` 제공 메서드

- `get(url, config)`
- `post(url, data, config)`
- `delete(url, config)`
- `put(url, data, config)`
- `head(url, config)`
- `jsonp(url, config)`

## `$http` 프로미스

- `success(fn)`
- `error(fn)`
- `then(successFn, errorFn)`

**then 메서드에서 넘기는 객체 속성**

- `data` : 데이터
- `status` : http 상태코드
- `headers` : 응답헤더
- `config` : 설정 객체

## `$http` config

- `data` : 전송 body
- `headers` : 요청 헤더
- `method` : http 메서드
- `params` : 전송 query파라메터
- `timeout`
- `transformRequest` : 요청 전 조작
- `transformResponse` : 응답 후 조작
- `url` : 요청주소
- `withCredentials` : 인증포함
- `xsrfHeaderNamexsrf`, `CookieName`

## `$httpProvider` 속성

- `defaults.headers.common` : 모든 요청의 기본 헤더 정의
- `defaults.headers.post` : POST 요청 기본 헤더 정의
- `defaults.headers.put` : PUT 요청 기본 헤더 정의
- `defaults.transformResponse` : 모든 응답에 적용할 변형함수 배열
- `defaults.transformRequest` : 모든 요청에 적용할 변형함수 배열
- `interceoptors` : 인터셉터 팩토리 함수 배열
- `withCredentials` : 모든 요청 인증 설정

## `$q` 메서드 (프로미스)

- `all(promises)` : 지정한 배열 내 모든 프로미스가 해결되거나 이 중 하나다로 거부된 경우 해결된 프로미스를 반환
- `defer()` : 지연 객체 생성.
- `reject(reason)` : 항상 거부되는 프로미스 반환
- `when(value)` : 항상 해결되는 프로미스를 사용해 값을 감싼다.

### 지연객체에서 정의하는 맴버. `defer()`를 통해서 생성

- `resolve(result)` : 지연활동이 지정한 값을 가지고 완료됐음을 알린다.
- `reject(reason)` : 지연활동이 실패했거나 지정한 이유로 인해 완료되지 못했음을 알린다.
- `notify(result)` : 지연활동으로부터 중간 결과를 제공한다.
- `promise` : 다른 메서드로부터 알림을 수신할 수 있는 프로미스 객체를 반환한다.

## 인터셉터 속성

- `request`
- `requestError`
- `response`
- `responseError`

# REST

`$resource` 서비스 설정

```javascript
$scope.productsResource = $resource(baseUrl + ":id", {id: "@id"});
```
= `http://localhost:5500/products/:id`

**`$resource` 기본행동**

| 메서드 | HttpMethod | URL | 설명 |
|-------|-----------|-----|------|
| `delete(params, product)` | DELETE | `/products/<id>` | 지정한 객체 제거 |
| `get(id)` | GET | `/products/<id>` | 1건 조회 |
| `query()` | GET | `/products` | 모든 목록 조회 |
| `remove(params, product)` | DELETE | `/products/<id>` | 지정한 객체 제거 |
| `save(product)` | POST | `/products/<id>` | 지정한 객체 수정 |

## 조회

```javascript
$scope.listProducts = function () {
    $scope.products = $scope.productsResource.query();
};
```
**최초 호출 시에는 빈배열을 생성하고 요청이 완료되면 내용이 채워진다.**

### `$promise`를 이용하여 직접반응

```javascript
$scope.listProducts = function () {
    $scope.products = $scope.productsResource.query();
    $scope.products.$promise.then(function (data) {
        // 추가 작업 수행
    });
};
```

## 수정

**`$resource` 지원하는 메서드**

`$delete()` : 서버에서 객체를 삭제 = `$remove()`
`$get()` : 서버로부터 객체를 가져와 갱신. 커밋하지 않은 로컬 변경 사항을 모두 제거한다.
`$remove()` : 서버에서 객체를 삭제 = `$delete()`
`$save()` : 객체를 서버에 저장

```javascript
$scope.updateProduct = function (product) {
    product.$save();
    $scope.displayMode = 'list';
};
```

```javascript
$scope.cancelEdit = function () {
    if ($scope.currentProduct && $scope.currentProduct.$get) {
        $scope.currentProduct.$get();
    }
    $scope.currentProduct = {};
    $scope.displayMode = 'list';
};
```
*취소를 호출해서 서버에서 다시 데이터를 가져옴 - 즉, 변경사항을 휘발시키고 서버 기준으로 초기화*

```javascript
$scope.deleteProduct = function (product) {
    product.$delete().then(function () {
        $scope.products.splice($scope.products.indexOf(product), 1);
    })
    $scope.displayMode = 'list';
};
```
## 새 객체 생성

```javascript
$scope.createProduct = function (product) {
    new $scope.productsResource(product).$save().then(function (newProduct) {
        $scope.products.push(newProduct);
        $scope.displayMode = 'list';
    });
};
```

## Action 설정

`$get, $save, $query, $remove, $delete` 과 같이 `$`가 달린 메서드를 액션이라고 부른다.

```javascript
$scope.productsResource = $resource(baseUrl + ":id", {id: "@id"}),
    { create: {method: 'POST'}, save: {method: 'PUT'}});
```
*Action 설정 수정*

**Action 설정 속성**

- `method`
- `params`
- `url`
- `isArray` : 응답이 배열이라고 지정한다. 기본값은 false

`transformRequest, transformResponse, cache, timeout, withCredentials, responseType, interceptor`
속성들 사용 가능

```javascript
$scope.createProduct = function (product) {
    // $save -> $create
    new $scope.productsResource(product).$create().then(function (newProduct) {
        $scope.products.push(newProduct);
        $scope.displayMode = 'list';
    });
};
```
*커스텀 속성 사용예시*

# 기타 내장 서비스

- `$anchorScroll` : 지정한 앵커로 브라우저 창을 스크롤한다.
- `$animate` : 콘텐츠 화면전환(transition)에 애니메이션을 적용한다.
- `$compile` : HTML 코드 조각을 처리해 콘텐츠를 생성하는 데 사용할 수 있는 함수를 생성한다.
- `$controller` : 컨트롤러를 인스턴스화 하는 `$injector` 서비스를 감싼 래퍼
- `$document` : DOM `window.document` 객체가 들어있는 jqLite 객체 제공
- `$exceptionHandler` : 애플리케이션 예외를 처리한다.
- `$filter` : 필터를 접근할 수 있게 해준다.
- `$http` : Ajax 요청을 생성하고 관리한다.
- `$injector` : AngularJS 컴포넌트 인스턴스를 생성한다.
- `$interpolate` : 바인딩 표현식이 들어 있는 문자열을 처리해 콘텐츠를 생성하는 데 사용할 수 있는 함수를 생성
- `$interval` : `window.setInterval` 함수를 감싼 고급 래퍼
- `$location` : 브라우저 `location` 객체를 감싼 래퍼
- `$log` : 전역 `console` 객체를 감싼 래퍼
- `$parse` : 표현식을 처리해 콘텐츠를 생성하는 데 사용할 수 있는 함수를 생성
- `$provide` : Module에서 노출하는 메소드를 대부분 구현
- `$q` : 지연 객체/프로미스를 제공한다.
- `$resource` : RESTful API 지원 및 연동
- `$rootElement` : DOM 내 루트엘리먼트에 접근하게 해준다.
- `$rootScope` : 스코프 계층 최상단에 접근하게 해준다.
- `$route` : 브라우저의 URL 경로를 기반으로 뷰 콘텐츠 변경 기능 지원
- `$routeParams` : URL 라우트에 대한 정보를 제공
- `$sanitize` : 위험한 HTML 문자를 안전한 문자로 대체한다
- `$sce` : HTML 문자열에서 위험한 엘리먼트 및 어트리뷰트를 제거해서 보여주기 적합한 콘텐츠만 남긴다.
- `$swipe` : 스와이프 제스처를 인식한다.
- `$timeout` : `window.setTimeout` 함수를 감싼 고급 래퍼
- `$window` : DOM `window` 객체에 대한 참조를 제공한다.

# 22. 뷰를 위한 서비스

## URL 라우팅

**어플리케이션 내 아무곳에서나 애플리케이션 콘텐츠를 제어할 수 있게끔 컨트롤러부터 뷰 선택 로직을 분리해야한다.**

*기존 코드 기존 `$scope.displayMode` 와 같은 전역 변수를 제거해야함*

ngRoute 모듈이 요구됨

**`$route` 서비스에서 정의하는 메서드 및 속성

- `current` : 활성 라우트에 대한 정보를 제공하는 객체 `$scope`, `$template` 속성도 들어있다.
- `reload()` : URL이 변하지 않았더라도 뷰를 재로드 한다.
- `routes` : `$routeProvider`를 통해 정의된 라우트 컬렉션을 반환한다.

**`$route` 서비스에서 정의하는 이벤트

- `$routeChangestart` : 라우트가 변경되기 전
- `$routeChangeSuccess` : 라우트가 변경된 후
- `$routeUpdate` : 라우트가 갱신될 때. `reloadOnSearch` 설정 속성과 밀접한 연관
- `$routeChangeError` : 라우트를 변경할 수 없을 때

*라우트 파라미터를 가져오는 예제*

```javascript
$scope.$on('$routeChangeSuccess', function () {
    if ($location.path().indexOf('/edit/') != 0) {
        var id = $routeParams['id'];
        for (var i = 0; i < $scope.products.length; i++) {
            $scope.currentProduct = $scope.products[i];
            break;
        }
    }
});
```

## 라우트 설정

**라우트 설정 옵션**

- `controller` : 라우트에 표시하는 뷰와 관련한 컨트롤러의 이름을 지정 - 라우트와 컨트롤러 연계
- `controllerAs` : 컨트롤러 별칭(Alias)
- `template` : 뷰 콘텐츠
- `templateUrl` : 뷰 콘텐츠 URL
- `resolve` : 컨트롤러에 필요한 의존성Set 지정 - 라우트와 의존성 추가
- `redirectTo`
- `reloadOnSearch` : true(기본값)로 설정하면 `$location` `search` 및 `hash` 메서드에서 반환값이 바뀔 때만 라우트가 재로드된다.
- `caseInsensitiveMatch` : true(기본값)로 설정하면 대소문자 구분하지 않고 라우팅을 수행한다.

# 주입

## Decorator

```javascript
$provide.decorator('$log', function ($delegate) {
    $delegate.originalLog = $delegate.log;
    $delegate.log = function (message) {
        $delegate.originalLog('Decorated: ' + message);
    }
    // 꼭 변환된 원본을 반환해야한다.
    return $delegate;
});
```

## Inject

**`$injector` 서비스가 정의하는 메서드**

- `annotate(fn)` : 지정한 함수에 대한 인자를 가져온다. 서비스에 해당하지 않는 함수도 포함한다.
- `get(name)` : 지정한 서비스명에 대한 서비스 객체를 가져온다.
- `has(name)` : 지정한 이름과 관련해 서비스가 존재하는지 여부를 반환한다.
- `invode(fn, self, locals)` : this에 지정한 값과 비서비스 인자 값을 사용해 지정 함수를 호출한다.

> `$inject` 서비스는 AngularJS 라이브러리의 핵심 서비스로, 이 서비스를 직접 활용해야 하는 경우는 거의 없다.
하지만 이 서비스를 이해하고 나면 AngularJS가 어떻게 동작하고, AngularJS를 어떻게 커스터마이징해야 하는지 이해하는 데 도움이 된다.

*의존성 인자 가져오기*

```javascript
var logClick = function ($log, $exceptionHandler, message) {
...
var deps = $injector.annotate(logClick);
for (var i = 0; i < deps.length; i++) {
    console.log('Dependency: ' + deps[i]);
}
/* 출력결과
Dependency: $log
Dependency: $exceptionHandler
Dependency: message
*/
```

*의존성 인자를 바탕으로 주입 후 실행하기*

```javascript
var logClick = function ($log, $exceptionHandler, message) {
...
// logClick 메서드 호출
$scope.handleClick = function () {
    var deps = $injector.annotate(logClick);
    var args = [];
    for (var i = 0; i < deps.length; i++) {
        if ($injector.has(deps[i])) {
            // 서비스 의존성 인자 가져오기
            args.push($injector.get(deps[i]));
        } else if (deps[i] == 'message') {
            args.push('Button Clicked');
        }
    }
    // apply는 js 기본 제공 함수임.
    logClick.apply(null, args);
};
```

*좀 더 간단한 `$injector.invoke` 로 실행하기

```javascript
var logClick = function ($log, $exceptionHandler, message) {
...
// logClick 메서드 호출
$scope.handleClick = function () {
   var localVars = {message: 'Button Clicked' };
   $injector.invoke(logClick, null, localVars);
};
```




