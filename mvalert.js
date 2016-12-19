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
    var _cb, _$div, _$back;

    //default options config
    var options = {
        ok: '确定',//ok button text
        cancel: '取消',//cancel button text
        id: null,//popup window id
        icon: null//icon class name
    };


    //alert function
    function alert(title, msg, opts, cb) {
        return main(title, msg, opts, cb, 'alert');
    }

    //confirm function
    function confirm(title, msg, opts, cb) {
        return main(title, msg, opts, cb, 'confirm')
    }

    //main function
    function main(title, msg, opts, cb, type) {
        if (title == null || msg == null) {
            throw new Error('title or msg can not be null or undefined');
        }
        if (typeof opts == 'function') {
            cb = opts;
            opts = {};
        }
        opts || (opts = {});
        cb && typeof cb == 'function' || (cb = Function.prototype);
        initOpts(opts);
        createBackdrop();
        createPopup(type, title, msg, opts);
        return popup(cb);
    }

    //init options
    function initOpts(opts) {
        options.id = 'mvalert' + Date.now();
        opts.ok || (opts.ok = options.ok);
        opts.cancel || (opts.cancel = options.cancel);
        opts.id || (opts.id = options.id);
        opts.icon || (opts.icon = options.icon);

        var id = options.id;
        var first = id.slice(0, 1);
        id = id.slice(1);
        first = first === '#' ? '' : first;
        options.id = first + id;
        if (_$div != null || _$back != null) {
            close();
        }
    }

    //create popup div
    function createPopup(type, title, msg, opts) {
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
        // div.classList.add(type);
        div.setAttribute('id', opts.id);
        header.innerText = title;
        header.classList.add('mvalert-modal-header');
        body.classList.add('mvalert-modal-body');
        cbody.classList.add('mvalert-modal-body-content');
        tbody.innerHTML = msg;
        tbody.classList.add('mvalert-modal-body-msg');
        if (opts.icon) {
            span.classList.add('mvalert-modal-body-img');
            span.classList.add(opts.icon);
            // span.innerText = '!';
            cbody.appendChild(span);
        }
        cbody.appendChild(tbody);
        bbody.classList.add('mvalert-modal-body-button');
        okBtn.innerText = opts.ok;
        okBtn.classList.add('ok');
        cancelBtn.innerText = opts.cancel;
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
        _$div = div;
    }

    //create backdrop div
    function createBackdrop() {
        var div = document.createElement('div');
        div.classList.add('mvalert-backdrop');
        document.body.appendChild(div);
        _$back = div;
    }

    //handler click event
    function clickHandler(e) {
        e.stopPropagation();
        if (e.target.tagName.toUpperCase() !== 'BUTTON') {
            return false;
        }
        _cb.call(this, !e.target.classList.contains('cancel'));
        close();
    }

    //pop up
    function popup(cb) {
        _cb = cb;
        setTimeout(function () {
            _$back.classList.add('mvalert-in');
            _$div.classList.add('mvalert-in');
            _$div.focus();
        }, 150);

        _$div.addEventListener('click', clickHandler, false);

    }

    //close popup
    function close() {
        _$div.removeEventListener('click', clickHandler, false);
        _$div.classList.remove('mvalert-in');
        _$back.classList.remove('mvalert-in');
        _$div.remove();
        _$back.remove();
    }

    //return object
    return {
        alert: alert,
        confirm: confirm
    };

}));
