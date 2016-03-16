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
                    tagContainer.innerHTML += value;
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

    }

    return Tags;

}();