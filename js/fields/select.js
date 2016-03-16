var Endouble = Endouble || {};
Endouble.Select = function () {

    'use strict';

    function Dropdown(formEl) {

        Endouble.Base.apply(this, arguments);

        this.type = 'dropdown';
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
            li.addEventListener('click', this.listItemAction.bind(this));

            return li;

        };

        this.listItemAction = function (e) {

            this.setValue (e.target.getAttribute('data-value'));
            this.bind(formEl);
            e.target.className = 'checked';

        };

        this.setValue = function(value) {
            if (this.allowAddNewItem(value)) {
                this.value.push(value);
            }
        };

        this.getValue = function () {
            return this.value;
        };

        this.createButton = function () {

            this.button = document.createElement('button');

            this.button.innerHTML = 'Dropdown';
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

        this.toggleMenu = function () {

            this.closeExpandedMenus();

            if (this.ul.getAttribute('aria-expanded') === 'true') {
                this.closeMenu();
            } else {
                this.openMenu();
            }

        };

        this.closeMenu = function () {
            this.ul.setAttribute('aria-expanded', false);
        };

        this.openMenu = function () {
            this.ul.setAttribute('aria-expanded', true);
        };

    }

    return Dropdown;

}();