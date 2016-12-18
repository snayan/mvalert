# mvalert
a mini alert component,which has no dependencies.
## Supports

| *browser* | Chrome | Edge | Firefox | internet Explorer | Opera | Safari |
|  :--:  |  :--:  | :--: |  :--:   |        :--:       |  :--: |  :--:  |
| *version* | 8.0    | Yes  | 3.6 | 10 |  11.50 | 5.1 |

 
## Installation
Via [npm](https://www.npmjs.com/)

```
npm install mvalert --save
```

Via [bower](https://bower.io/)

```
bower install mvalert --save
```

##Usage

The `mvalert` component will return an object which containe two method `alert` and `confirm`,the same function as browser.

###alert(title,message,callback,options)

* `title` , the title of the popup window,can not be `null` and `undefined`
* `message`,the message will be shown in the popup window body,can be a string or basic html tag,can not be `null` and `undefined`
* `callback`,when click button in the popup window ,will invoke the `callback` with a paramter.
* `options`, configure the button text,`ok` button is `确定`,`cancel` button is `取消` in default.

###confirm(title,message,callback,options)
These params are the same as `alert`.

##Examples
more details see [example](https://github.com/snayan/mvalert/tree/master/examples).

###alert

```javascript
function $$(selector) {
    return document.querySelector(selector);
}
var mv = Object.create(MvAlert);
$$('#alert').addEventListener('click', function (e) {
    mv.alert('标题', '这里是提示消息，可以是html标签', function (isOk) {
        console.log(isOk);
    });
});
```

###confirm
 
```javascript
$$('#confirm').addEventListener('click', function (e) {
    mv.confirm('标题', '这里是提示消息，可以是html标签', function (isOk) {
        console.log(isOk);
    });
});
```
## Contributing

I welcome contributions of all kinds from anyone.

* [Bug reports](https://github.com/snayan/mvalert/issues) 
* [Feature requests](https://github.com/snayan/mvalert/issues)
* [Pull requests](https://github.com/snayan/mvalert/pulls)

## License
Licensed under the MIT License
