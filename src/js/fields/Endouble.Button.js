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

}();