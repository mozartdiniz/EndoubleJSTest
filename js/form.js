var Endouble = Endouble || {};
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