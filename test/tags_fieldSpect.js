"use strict";

describe('Testing tag field methods', function () {

    var tag = document.createElement('div');
    tag.id = 'tags';
    tag.className = 'tags';

    var el1 = document.createElement('input');
    el1.id = 'el1';
    el1.setAttribute ('data-bind-element', 'tags');

    var tagField = new Endouble.Tags(tag);
    var field1   = new Endouble.Base(el1);

    tagField.render();
    field1.render();

    field1.addValue({
        value: 'test'
    });

    it('First value shold have value test and origin el1', function () {
        expect(tagField.getValue()[0].value).toBe('test');
        expect(tagField.getValue()[0].origin).toBe('el1');
    });

    it('Should have two tags', function () {

        field1.addValue({
            value: 'test2'
        });

        expect(tagField.el.firstChild.firstChild.childNodes.length).toBe(2);

    });


});