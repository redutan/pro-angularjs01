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

`$scope.$apply(expression)` : 정의된 표현식을 해석해서 처리 - `eval`과 비슷?

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

## controlelr 간 통신

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


