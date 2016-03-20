var Endouble = Endouble || {};
Endouble.Base = function () {

    'use strict';

    function Base(formEl) {

        Endouble.fieldsList = Endouble.fieldsList || {};

        var values = [],
            action = null,
            bind_el = formEl.getAttribute('data-bind-element');

        this.type = 'base_element';
        this.id = formEl.id;
        this.el = null;

        Endouble.fieldsList[this.id] = this;

        //Prevent repeating the code through methods
        this.readValues = function (callback) {
            for (var i = 0, len = values.length; i < len; i++) {
                callback(values[i], i);
            }
        };

        //This method prevent repeat values inside each component.
        var allowAddNewItem = function (options) {

            this.readValues(function (valueItem) {
                if (valueItem.value === options.value && valueItem.origin === options.origin) {
                    return false;
                }
            });

            return true;

        }.bind(this);

        /*
         * Add value expects a object as a parameter with the following values:
         *
         * origin: The Id of a component which set this value
         * value: The value itself
         *
         * */
        var addValue = function (options) {

            if (allowAddNewItem(options)) {
                values.push(options);
            }

        };

        /**
         *
         * As a addValue, expects a object with the component which want remove the value
         * and the value itself.
         *
         */
        var removeValue = function (options) {

            values = values.filter(function (item) {
                return !(item.value === options.value && item.origin === options.origin);
            });

        };

        this.createBaseHTML = function () {

            this.el = document.createElement('div');
            this.el.className = this.type;
            this.el.id = this.id;

        };

        this.createElement = function () {
            return document.createElement('input');
        };

        //Simply returns the component value list
        this.getValue = function () {
            return values;
        };

        this.triggerAction = function (e) {
            (this.action) ? this.action(e) : false;
        };

        this.setAction = function (instanceAction) {
            var action = instanceAction;
        };

        this.addValue = function (options) {

            var field = this.getFieldFromFormFieldList(bind_el);

            if (!options.origin) {
                options.origin = this.id;
            }

            addValue(options);

            if (field) {
                field.addValue({
                    origin: this.id,
                    value: options.value
                });
            }

            this.addToInterface();

        };

        this.removeValue = function (options) {

            var field = this.getFieldFromFormFieldList(bind_el || options.origin);

            removeValue(options);

            this.removeFromInterface(options.value);

            if (bind_el && !options.origin) {

                if (!options.origin) {
                    options.origin = this.id;
                }

                field.removeValue(options);

            } else if (!bind_el && options.origin) {
                field.removeValue(options);
            }

        };

        this.getFieldFromFormFieldList = function (fieldId) {

            return Endouble.fieldsList[fieldId];

        };

        this.appendEl = function () {

            var parent = formEl.parentNode;

            if (parent) {
                parent.insertBefore(this.el, formEl);
                parent.removeChild(formEl);
            }

        };

        this.addToInterface = function () {

            var elValue = '';

            //Prevent update interface before render interface
            if (this.el) {

                this.readValues(function (valueItem) {
                    elValue = elValue + this.createValueItemRender(valueItem) + ' ';
                }.bind(this));

                if (elValue.trim()) {
                    this.el.firstChild.value = elValue.trim();
                }

            }

        };

        this.removeFromInterface = function (value) {
            if (this.el) {
                this.el.firstChild.value = this.el.firstChild.value.replace(value, '').trim();
            }
        };

        this.createValueItemRender = function (valueItem) {
            return valueItem.value;
        };

        this.render = function () {

            this.createBaseHTML();
            this.el.appendChild(this.createElement());
            this.addToInterface();
            this.appendEl();

            return this;
        };

    }

    return Base;

}();