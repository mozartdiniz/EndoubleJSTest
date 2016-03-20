var Endouble = Endouble || {};
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

}();