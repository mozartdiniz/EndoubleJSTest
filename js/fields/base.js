var Endouble = Endouble || {};
Endouble.Base = function () {

    'use strict';

    function Base(formEl) {

        this.el = null;
        this.type = 'base_element';
        this.value = null;
        this.action = null;

        this.createBaseHTML = function () {

            this.el = document.createElement('div');
            this.el.className = this.type;
            this.el.id = formEl.id;

        };

        this.createElement = function () {
            return document.createElement('input');
        };

        this.setValue = function (value) {
            this.value = value;
        };

        this.getValue = function () {
            return this.value;
        };

        this.triggerAction = function (e) {
            (this.action) ? this.action(e) : false;
        };

        this.setAction = function (action) {
            this.action = action;
        };

        this.bind = function () {

            var bindElement = formEl.getAttribute('data-bind-element');
            var field = this.getFieldFromFormFieldList(bindElement);

            if (field) {
                field.setValue(this.getValue());
            }

        };

        this.getFieldFromFormFieldList = function (fieldId) {

            return Endouble.fieldsList[fieldId];

        };

        this.appendEl = function () {

            var parent = formEl.parentNode;

            parent.insertBefore(this.el, formEl);
            parent.removeChild(formEl);

        };

        this.allowAddNewItem = function (value) {

            for (var i = 0, len = this.value.length; i < len; i++) {
                if (this.value[i] === value) {
                    return false;
                }
            }

            return true;

        };

        this.render = function () {

            this.createBaseHTML();
            this.el.appendChild(this.createElement());
            this.appendEl();

            return this;
        };

    }

    return Base;

}();