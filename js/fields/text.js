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

        this.addFakePlaceholder = function (e) {

            var el = e.target;

            if (!el.value.trim()) {
                el.value = this.placeholder;
                el.style.color = 'gray';
            }

        };

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