var Endouble = Endouble || {};
Endouble.fieldsList = Endouble.fieldsList || {};

Endouble.Form = (function () {

    'use strict';

    Endouble.fieldsList = Endouble.fieldsList || {};

    //Initialize dropdowns
    var dropDowns = function () {

        var drops = document.querySelectorAll('select.dropdown');

        for(var i = 0, l = drops.length; i<l; i++) {

            setTimeout((function (dropsItem, i) {
                return function () {

                    var dropDownEl = new Endouble.Select(dropsItem).render();
                    Endouble.fieldsList[dropDownEl.el.id || 'd' + i] = dropDownEl;
                };
            }(drops[i], i)), 10);

        }
    };

    var buttons = function () {

        var buttons = document.querySelectorAll('button.btn');

        for(var i = 0, l = buttons.length; i<l; i++) {

            setTimeout((function (button, i) {
                return function () {

                    var buttonEl = new Endouble.Button(button).render();
                    Endouble.fieldsList[buttonEl.el.id || 'b' + i] = buttonEl;
                };
            }(buttons[i], i)), 10);

        }

    };

    var tags = function () {

        var tagsContainers = document.querySelectorAll('div.tags');

        for(var i = 0, l = tagsContainers.length; i<l; i++) {

            setTimeout((function (tagContainer, i) {
                return function () {

                    var tagEl = new Endouble.Tags(tagContainer).render();
                    Endouble.fieldsList[tagEl.el.id || 't' + i] = tagEl;
                };
            }(tagsContainers[i], i)), 10);

        }

    };

    var renderComponents = function () {

        dropDowns();
        buttons();
        tags();

    };

    document.addEventListener('DOMContentLoaded', renderComponents);

}());