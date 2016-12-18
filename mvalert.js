/*
 a mini alert component
 more see https://github.com/snayan/mvalert
 */
;(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD (+ global for extensions)
        define(function () {
            return (global.MvAlert = factory());
        });
    } else if (typeof exports === "object") {
        // CommonJS
        module.exports = factory();
    } else {
        // Browser
        global.MvAlert = factory();
    }
}(this, function () {

    //private variable
    var pre_id = 'mvalert';
    var callback = Function.prototype;//empty function
    var $div, $back;

    //options config
    var options = {
        ok: '确定',
        cancel: '取消',
        id: null
    };

    //alert function
    function alert(title, msg, callback, options) {
        if (typeof callback != 'function') {
            options = callback;
        }
        init(title, msg, callback, options);
        createBackdrop();
        createPopup('alert', title, msg);
        return popup();
    }

    //confirm function
    function confirm(title, msg, callback, options) {
        if (typeof callback != 'function') {
            options = callback;
        }
        init(title, msg, callback, options);
        createBackdrop();
        createPopup('confirm', title, msg);
        return popup();
    }

    //init options
    function init(title, msg, cb, opts) {
        if (title == null || msg == null) {
            console.error('title or msg can not be null or undefined');
            throw new Error('title or msg can not be null or undefined');
        }
        if (typeof cb === 'function') {
            callback = cb;
        }
        options.id = pre_id + timeStamp();
        if (opts) {
            if (opts.ok && typeof opts.ok === 'string') {
                options.ok = opts.ok;
            }
            if (opts.cancel && typeof opts.cancel === 'string') {
                options.cancel = opts.cancel;
            }
            if (opts.id && typeof  opts.id === 'string') {
                options.id = opts.id;
            }
        }
        var id = options.id;
        var first = id.slice(0, 1);
        id = id.slice(1);
        first = first === '#' ? '' : first;
        options.id = first + id;
        if ($div != null || $back != null) {
            close();
        }
    }

    //create popup div
    function createPopup(type, title, msg) {
        var div = document.createElement('div');
        var header = document.createElement('h3');
        var body = document.createElement('div');
        var cbody = document.createElement('div');
        var bbody = document.createElement('div');
        var tbody = document.createElement('div');
        var span = document.createElement('span');
        var okBtn = document.createElement('button');
        var cancelBtn = document.createElement('button');
        div.classList.add('mvalert-modal');
        div.classList.add(type);
        div.setAttribute('id', options.id);
        header.innerText = title;
        header.classList.add('mvalert-modal-header');
        body.classList.add('mvalert-modal-body');
        cbody.classList.add('mvalert-modal-body-content');
        tbody.innerHTML = msg;
        tbody.classList.add('mvalert-modal-body-msg');
        span.classList.add('mvalert-modal-body-img');
        cbody.appendChild(span);
        cbody.appendChild(tbody);
        bbody.classList.add('mvalert-modal-body-button');
        okBtn.innerText = options.ok;
        okBtn.classList.add('ok');
        cancelBtn.innerText = options.cancel;
        cancelBtn.classList.add('cancel');
        if (type === 'confirm') {
            bbody.appendChild(cancelBtn);
        }
        bbody.appendChild(okBtn);
        body.appendChild(cbody);
        body.appendChild(bbody);
        div.appendChild(header);
        div.appendChild(body);
        document.body.appendChild(div);
        $div = div;
    }

    //create backdrop div
    function createBackdrop() {
        var div = document.createElement('div');
        div.classList.add('mvalert-backdrop');
        document.body.appendChild(div);
        $back = div;
    }

    //handler click event
    function clickHandler(e) {
        e.stopPropagation();
        if (e.target.tagName.toUpperCase() !== 'BUTTON') {
            return false;
        }
        callback.call(this, !e.target.classList.contains('cancel'));
        close();
    }

    //pop up
    function popup() {
        // var $div = $$('#' + options.id);
        // var $back = $$('.mvalert-backdrop');

        setTimeout(function () {
            $back.classList.add('mvalert-in');
            $div.classList.add('mvalert-in');
            $div.focus();
        }, 150);

        $div.addEventListener('click', clickHandler, false);

    }

    //close popup
    function close() {
        $div.removeEventListener('click', clickHandler, false);
        $div.classList.remove('mvalert-in');
        $back.classList.remove('mvalert-in');
        $div.remove();
        $back.remove();
    }

    //timestamp
    function timeStamp() {
        return +Date.now();
    }

    //get element by selector
    function $$(selector) {
        if (!document.querySelector) {
            console.warn('please upgrade your brower');
            throw new Error('brower version sot supported,please upgrade your brower');
        }
        return document.querySelector(selector);

    }

    //return object
    return {
        alert: alert,
        confirm: confirm
    };

}));
