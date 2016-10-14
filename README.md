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
