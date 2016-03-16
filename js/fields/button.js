var Endouble = Endouble || {};
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

            this.setValue(formEl.innerHTML);

            button.addEventListener('click', function (e) {
                this.bind(formEl);
                this.triggerAction(e);
            }.bind(this));

            return button;
        };


    }

    return Button;

}();