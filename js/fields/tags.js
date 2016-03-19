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

        this.setValue = function (value) {

            var addItem = function (value) {
                if (this.allowAddNewItem(value)) {
                    this.value.push (value);
                    tagContainer.appendChild(this.createTag(value));
                }
            }.bind(this);

            if (value.constructor === Array) {
                for (var i = 0, len = value.length; i < len; i++) {
                    addItem(value[i]);
                }
            } else {
                addItem(value);
            }

        };

        this.removeValue = function (value) {

            var removeItem = function (value) {
                for (var i = 0, len = this.value.length; i < len; i++) {
                    if (this.value[i] === value) {
                        this.value.splice(i, 1);
                        this.removeTag ('tag-' + value);
                    }
                }
            }.bind(this);

            if (value.constructor === Array) {
                for (var i = 0, len = value.length; i < len; i++) {
                    removeItem(value[i]);
                }
            } else {
                removeItem(value);
            }

        };

        this.createTag = function (value) {

            var id = 'tag-' + value;
            var container = document.createElement('div');
            var closeButton = document.createElement('div');

            container.className = 'tag';
            container.id = id;
            container.innerHTML = value;

            closeButton.className = 'tag-close';

            closeButton.addEventListener('click', function () {
                var tag = this.parentElement;
                tag.parentElement.removeChild (tag);
            });

            container.appendChild(closeButton);

            return container;


        };

        this.removeTag = function (tagId) {

            var tag = document.getElementById(tagId);

            if (tag) {
                tag.parentElement.removeChild(tag);
            }
        };

    }

    return Tags;

}();