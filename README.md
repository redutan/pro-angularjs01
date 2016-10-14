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

지정 엘리먼트 내 로딩되지 않은 인라인 데이터 바인딩(`{{}}`) 미노출

## `ng-non-bindable`

인라인 데이터 바인딩 차단

```html
<div ng-non-bindable>
  AngularJS uses {{ and }} characters for templates
</div>
```

*출력*

`AngularJS uses {{ and }} characters for templates`
