# angular-height-auto-resizer

## Informations
height-auto-resizer directive keep element's height to 100% - [DEMO](https://plnkr.co/edit/A4zXeNPpOfGmEwOFy202?p=preview)

## Installation
### Bower install
```
$ bower install https://github.com/k4rm3l0/angular-height-auto-resizer.git --save
```
### Manual install
Import **autoheightresizer.js** file to app **index.html**

## How to use?
Inject autoheightresizer into app dipendences        
  
```js
angular.module('DemoApp', ['autoheightresizer']);
```

### Directive
  
```
<div height-auto-resizer bottom-offset="50"><div>
```