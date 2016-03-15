var Endouble = Endouble || {};
Endouble.Select = function () {

    'use strict';

    function Dropdown(formEl) {

        this.el = null;
        this.type = 'dropdown';

        this.createBaseHTML = function () {

            this.el = document.createElement('div');
            this.el.className = 'dropdown';
            this.el.id = formEl.id;

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

            return li;

        };

        this.buttonText = function () {


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

        this.appendEl = function () {

            var parent = formEl.parentNode;

            parent.insertBefore(this.el, formEl);
            parent.removeChild(formEl);

        };

        this.render = function () {

            this.createBaseHTML();
            this.el.appendChild(this.createButton());
            this.el.appendChild(this.createList());
            this.appendEl();

            return this;

        }

    }

    return Dropdown;

}();