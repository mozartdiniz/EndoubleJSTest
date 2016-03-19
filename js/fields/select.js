var Endouble = Endouble || {};
Endouble.Select = function () {

    'use strict';

    function Dropdown(formEl) {

        Endouble.Base.apply(this, arguments);

        this.type = 'dropdown';
        this.placeholder = formEl.getAttribute('data-placeholder');
        this.value = [];

        this.createElement = function () {

            var fragment = document.createDocumentFragment();

            fragment.appendChild(this.createButton());
            fragment.appendChild(this.createList());

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

            if (!this.value.length) {
                this.button.innerHTML = this.placeholder;
            } else if (this.value.length === 1) {
                this.button.innerHTML = this.value[0];
            } else {
                this.button.innerHTML = this.value.length + ' items';
            }

        };

        this.toggleCreateListItemChecked = function (e) {

            var el = e.target;
            var value = el.getAttribute('data-value');

            if (el.className === 'checked') {

                this.bind('remove', value);
                this.removeValue (value);
                el.className = '';

            } else {

                this.setValue (value);
                el.className = 'checked';
                this.bind('add');

            }

            this.placeholderBuilder ();
        };

        this.setValue = function(value) {
            if (this.allowAddNewItem(value)) {
                this.value.push(value);
            }
        };

        this.removeValue = function (value) {
            for (var i = 0, len = this.value.length; i < len; i++) {
                if (this.value[i] === value) {
                    this.value.splice(i, 1);
                }
            }
        };

        this.getValue = function () {
            return this.value;
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

        this.closeMenu = function () {
            this.ul.setAttribute('aria-expanded', 'false');
        };

        this.openMenu = function () {
            this.ul.setAttribute('aria-expanded', 'true');
        };

    }

    return Dropdown;

}();