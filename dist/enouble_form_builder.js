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

}();;var Endouble = Endouble || {};
Endouble.Tags = function () {

    'use strict';

    function Tags(formEl) {

        Endouble.Base.apply(this, arguments);

        var tagContainer = document.createElement('div');

        this.type = 'tags';
        this.value = [];

        this.createElement = function () {

            tagContainer.className = 'tags';

            return tagContainer;
        };

        this.type = 'tags';

        this.addToInterface = function () {

            if (this.el) {
                this.readValues(function (valueItem) {
                    if (this.allowAddTag(valueItem.value)) {
                        this.el.firstChild.appendChild(this.createValueItemRender(valueItem));
                    }
                }.bind(this));
            }

        };

        this.createValueItemRender = function (valueItem) {

            var id = 'tag-' + this.normalizeId(valueItem.value);
            var container = document.createElement('div');
            var closeButton = document.createElement('div');

            container.className = 'tag';
            container.id = id;
            container.innerHTML = valueItem.value;
            container.setAttribute('data-value', valueItem.value);
            container.setAttribute('data-origin', valueItem.origin);

            closeButton.className = 'tag-close';

            closeButton.addEventListener('click', this.removeTag.bind(this));

            container.appendChild(closeButton);

            return container;
        };

        this.allowAddTag = function (valueItem) {

            return !(this.el.querySelector('#tag-' + this.normalizeId(valueItem)));

        };

        this.removeTag = function (e) {
            this.removeValue({
                value: e.target.parentElement.getAttribute('data-value'),
                origin: e.target.parentElement.getAttribute('data-origin')
            });
        };

        this.normalizeId = function (id) {
            return id.replace(/[!@#$%^& *]/g, "");
        };

        this.removeFromInterface = function (value) {
            var tag = this.el.querySelector('#tag-' + this.normalizeId(value));

            if (tag) {
                tag.parentElement.removeChild(tag);
            }
        };

    }

    return Tags;

}();;var Endouble = Endouble || {};
Endouble.Text = function () {

    'use strict';

    function Text(formEl) {

        Endouble.Base.apply(this, arguments);

        this.type = 'text';
        this.value = [];
        this.placeholder = formEl.getAttribute('placeholder');

        this.createElement = function () {

            var el = document.createElement('input');
            el.type = 'text';

            //If it is not a IE9 browser, the polyfill is not necessary
            if (!Endouble.platforms.isIE9) {
                el.setAttribute('placeholder', this.placeholder);
            } else {
                el.value = this.placeholder;
                el.style.color = 'gray';
                el.addEventListener('blur', this.addFakePlaceholder.bind(this));
                el.addEventListener('focus', this.removeFakePlaceholder.bind(this));
            }

            return el;
        };

        //This method is used as a polyfill because IE9 does not support placeholder
        this.addFakePlaceholder = function (e) {

            var el = e.target;

            if (!el.value.trim()) {
                el.value = this.placeholder;
                el.style.color = 'gray';
            }

        };

        //This method is used as a polyfill because IE9 does not support placeholder
        this.removeFakePlaceholder = function (e) {

            var el = e.target;

            if (el.value === this.placeholder) {
                el.value = '';
                el.style.color = 'inherit';
            }

        }

    }

    return Text;

}();;var Endouble = Endouble || {};
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
            this.button.addEventListener('click', this.buttonFoceFocus.bind(this));

            return this.button;

        };

        this.buttonFoceFocus = function () {
            this.button.focus();
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

}();;var Endouble = Endouble || {};
Endouble.Button = function () {

    'use strict';

    function Button(formEl) {

        Endouble.Base.apply(this, arguments);

        this.type = 'button';

        this.createElement = function () {

            var button = document.createElement('button');

            button.className = 'btn';
            button.type = 'button';
            button.innerHTML = formEl.innerHTML;

            this.addValue({
                value: formEl.innerHTML
            });

            button.addEventListener('click', function (e) {
                this.triggerAction(e);
            }.bind(this));

            return button;
        };

        this.addToInterface = function () {

            var elValue = '';

            //Prevent update interface before render interface
            if (this.el && this.el.firstChild) {

                this.el.firstChild.innerHTML = '';

                this.readValues (function (valueItem) {
                    elValue = elValue + this.createValueItemRender(valueItem) + ' ';
                }.bind(this));

                this.el.firstChild.innerHTML = elValue.trim();
            }

        };


    }

    return Button;

}();;var Endouble = Endouble || {};
Endouble.fieldsList = Endouble.fieldsList || {};

Endouble.Form = (function () {

    'use strict';

    Endouble.fieldsList = Endouble.fieldsList || {};

    //Initialize dropdowns
    var dropDowns = function () {

        var drops = document.querySelectorAll('select.dropdown');

        for(var i = 0, l = drops.length; i<l; i++) {

            var dropDownEl = new Endouble.Select(drops[i]).render();
            Endouble.fieldsList[dropDownEl.el.id || 'd' + i] = dropDownEl;

        }
    };

    var buttons = function () {

        var buttons = document.querySelectorAll('button.btn');

        for(var i = 0, l = buttons.length; i<l; i++) {

            var buttonEl = new Endouble.Button(buttons[i]).render();
            Endouble.fieldsList[buttonEl.el.id || 'b' + i] = buttonEl;

        }

    };

    var tags = function () {

        var tagsContainers = document.querySelectorAll('div.tags');

        for(var i = 0, l = tagsContainers.length; i<l; i++) {

            var tagEl = new Endouble.Tags(tagsContainers[i]).render();
            Endouble.fieldsList[tagEl.el.id || 't' + i] = tagEl;

        }

    };

    var texts = function () {

        var tagsContainers = document.querySelectorAll('input[type="text"]');

        for(var i = 0, l = tagsContainers.length; i<l; i++) {

            var tagEl = new Endouble.Text(tagsContainers[i]).render();
            Endouble.fieldsList[tagEl.el.id || 't' + i] = tagEl;

        }

    };

    var detectPlaForm = function () {

        var isIE = (navigator.userAgent.match(/MSIE 9.0/)) ? true : false;

        Endouble.platforms = {
            isIE9: isIE
        };

        if (isIE) {
            document.body.className = 'isIE';
        }

    };

    var renderComponents = function () {

        detectPlaForm();
        buttons();
        dropDowns();
        tags();
        texts();

    };

    document.addEventListener('DOMContentLoaded', renderComponents);

}());