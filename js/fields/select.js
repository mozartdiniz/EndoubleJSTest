var Endouble = Endouble || {};
Endouble.Select = function () {

    'use strict';

    function Dropdown(formEl) {

        Endouble.Base.apply(this, arguments);

        var multiple   = formEl.multiple,
            countDownId = null;

        this.type = 'dropdown';
        this.placeholder = formEl.getAttribute('data-placeholder');
        this.value = [];

        this.createElement = function () {

            var fragment = document.createDocumentFragment();

            fragment.appendChild(this.createButton());
            fragment.appendChild(this.createList());

            document.addEventListener('click', this.closeExpandedMenus.bind(this));

            return fragment;

        };

        this.createList = function () {

            var options = formEl.options;

            this.ul = document.createElement('ul');

            this.ul.className = 'dropdown-menu';

            this.ul.setAttribute('aria-expanded', false);

            for (var i = 0, len = options.length; i < len; i++) {
                this.ul.appendChild(this.createListItem(options[i]));
            }

            return this.ul;

        };

        this.createListItem = function (option) {

            var li = document.createElement('li');

            li.setAttribute('data-value', option.value);
            li.innerHTML = option.innerHTML;
            li.addEventListener('click', this.toggleCreateListItemChecked.bind(this));

            return li;

        };

        this.placeholderBuilder = function () {

            var values = this.getValue();

            if (!values.length) {
                this.button.innerHTML = this.placeholder;
            } else if (values.length === 1) {
                this.button.innerHTML = values[0].value;
            } else {
                this.button.innerHTML = values.length + ' items';
            }

        };

        this.toggleCreateListItemChecked = function (e) {

            e.stopPropagation();

            var el = e.target;
            var value = el.getAttribute('data-value');

            if (el.className === 'checked') {

                this.removeValue ({
                    value: value
                });

            } else {

                if (!multiple) {
                    this.closeMenu();
                }

                this.checkMultipleBeforeAdd({
                    value: value
                });

            }

        };

        this.checkMultipleBeforeAdd = function (options) {

            var values = this.getValue();

            if (!multiple && values.length) {

                this.removeValue({
                    value: values[0].value
                });
            }

            this.addValue (options);

        };

        this.addToInterface = function () {

            this.placeholderBuilder ();

            this.readValues(function (valueItem) {
                this.createValueItemRender(valueItem);
            }.bind(this));

        };

        this.createValueItemRender = function (options) {
            var el = document.querySelector('[data-value="' + options.value + '"]');
            el.className = 'checked';
        };

        this.removeFromInterface = function (value) {

            this.placeholderBuilder ();

            var el = document.querySelector('[data-value="' + value + '"]');
            el.className = '';
        };

        this.createButton = function () {

            this.button = document.createElement('button');

            this.button.innerHTML = this.placeholder;
            this.button.className = 'btn';
            this.button.type = 'button';

            this.button.addEventListener('click', this.toggleMenu.bind(this));

            return this.button;

        };

        this.closeExpandedMenus = function () {

            var fieldList = Endouble.fieldsList;

            for (var dropdown in fieldList) {
                if (fieldList[dropdown].type === 'dropdown') {
                    fieldList[dropdown].closeMenu();
                }
            }

        };

        this.toggleMenu = function (e) {

            e.stopPropagation();

            if (this.ul.getAttribute('aria-expanded') === 'true') {
                this.closeMenu();
            } else {
                this.closeExpandedMenus();
                this.openMenu();
            }

        };

        this.cleatCountDown = function () {
            clearTimeout(countDownId);
        };

        this.toggleCountDown = function () {

            countDownId = setTimeout(function () {
                this.closeMenu();
            }.bind(this), 300);
        };

        this.closeMenu = function () {
            this.ul.setAttribute('aria-expanded', 'false');
        };

        this.openMenu = function () {
            this.ul.setAttribute('aria-expanded', 'true');
        };

    }

    return Dropdown;

}();