var Endouble = Endouble || {};
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

}();