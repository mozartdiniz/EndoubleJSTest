"use strict";

describe('Testing text field methods', function() {

    Endouble.platforms = {
        isIE9: true
    };

    var el1  = document.createElement('input');
    el1.id   = 'el1';
    el1.placeholder = 'test';
    el1.type = 'text';

    var field1 = new Endouble.Text(el1);
    field1.render();

    field1.addValue({
        value: 'test'
    });

    it('Field 1 should have the id value el1', function() {
        expect(field1.id).toBe('el1');
    });

    it('Field 1 should returns one array with one position with value test', function() {
        expect(field1.getValue()[0].value).toBe('test');
    });

    it('Should write a placeholder', function() {

        field1.addFakePlaceholder({
            target: field1.el.firstChild
        });

        expect(field1.el.firstChild.value).toBe('test');
    });

    it('Should delete a placeholder', function() {

        field1.el.firstChild.value = '';

        field1.removeFakePlaceholder({
            target: field1.el.firstChild
        });

        expect(field1.el.firstChild.value).toBe('');
    });


});