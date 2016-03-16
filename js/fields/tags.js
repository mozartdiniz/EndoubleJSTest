var Endouble = Endouble || {};
Endouble.Tags = function () {

    'use strict';

    function Tags(formEl) {

        Endouble.Base.apply(this, arguments);

        var tagContainer = document.createElement('div');

        this.type = 'tags';

        this.createElement = function () {

            tagContainer.className = 'tags';

            return tagContainer;
        };

        var tags = [];
        this.type = 'tags';

        this.setValue = function (value) {

            tags.push (value);
            tagContainer.innerHTML += value;


        };

    }

    return Tags;

}();