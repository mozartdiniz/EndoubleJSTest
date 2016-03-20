"use strict";

describe('Testing base field methods', function() {

    var el1 = document.createElement('input');
    el1.id = 'el1';
    el1.setAttribute ('data-bind-element', 'el2');

    var el2 = document.createElement('input');
    el2.id = 'el2';

    var el3 = document.createElement('input');
    el3.id = 'el3';
    el3.setAttribute ('data-bind-element', 'el2');

    var field1 = new Endouble.Base(el1);
    var field2 = new Endouble.Base(el2);
    var field3 = new Endouble.Base(el3);

    field1.render();
    field2.render();
    field3.render();

    field1.addValue({
        value: 'A'
    });

    field1.addValue({
        value: 'B'
    });

    field3.addValue({
        value: 'B'
    });

    field3.addValue({
        value: 'C'
    });

    it('Field 1 should have the id value el1', function() {
        expect(field1.id).toBe('el1');
    });

    it('Field 2 should have the id value el2', function() {
        expect(field2.id).toBe('el2');
    });

    it('Field 1 should return a array with two positions and a key of the first one should be value A', function() {
        expect(field1.getValue()[0].value).toBe('A');
    });

    it('Field 1 should return a array with two positions and a key of the first one should be value B', function() {
        expect(field1.getValue()[1].value).toBe('B');
    });

    it('Field 2 element value should be A B B C', function() {
        expect(field2.el.firstChild.value).toBe('A B B C');
    });


});