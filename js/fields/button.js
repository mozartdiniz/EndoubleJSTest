var Endouble = Endouble || {};
Endouble.Button = function () {

    'use strict';

    function Button(formEl) {

        var value = '',
            _action = function () {
        };

        this.el = null;

        this.readFormElInfo = function () {
            if (formEl) {
                this.setValue(formEl.innerHTML);
            }
        };

        this.createBaseHTML = function () {

            this.el = document.createElement('button');
            this.el.className = 'btn';
            this.el.type = 'button';
            this.el.id = formEl.id;

            this.el.addEventListener('click', this.triggerAction.bind(this));
        };

        this.setValue = function (buttonInnerHTML) {
            value = buttonInnerHTML;
        };

        this.triggerAction = function (e) {
            _action(e);
        };

        this.setAction = function (action) {
            _action = action;
        };

        this.appendEl = function () {

            var parent = formEl.parentNode;

            parent.insertBefore(this.el, formEl);
            parent.removeChild(formEl);

        };

        this.render = function () {
            this.createBaseHTML();
            this.readFormElInfo();

            return this;
        };

    }

    return Button;

}();