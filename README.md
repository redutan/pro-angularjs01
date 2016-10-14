# pro-angularjs1
pro angularjs example

```bash
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

# 불리언 어트리뷰트 디렉티브

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

# options

- `ng-optoins` : option 적용

*특이하게 grouping 기능이 있음*

참고 : https://docs.angularjs.org/api/ng/directive/ngOptions

