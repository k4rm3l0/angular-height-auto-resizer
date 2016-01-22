# angular-height-auto-resizer

## Informations
height-auto-resizer directive keep element's height to 100%

## Installation
### Bower install
```
$ bower install https://github.com/k4rm3l0/angular-height-auto-resizer.git --save
```
### Manual install
Importare nella **index.html** dell'app il file **autoheightresizer.js**

## How to use?
Inserire signViewer nelle dipendenze dell'app          
  
```js
angular.module('DemoApp', ['autoheightresizer']);
```

### Directive
  
```
<div height-auto-resizer bottom-offset="50"><div>
```