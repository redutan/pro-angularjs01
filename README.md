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