# EndoubleJSTest

In order to create a reusable solution to Endouble's dynamics forms I created a small lib which generate a form and its components. These components should be created using the plain HTML which are already added at DOM tree.

## How this project is organized

* `src`: All JavaScript and CSS are inside the src folder
* `dist`: After grunt build process which will process the SASS code and concatenate de JavaScript source codes two new files will be created at dist folder. index.css with the processed SASS code and enouble_form_builder.js with the concatenated JavaScript code.
* `test`: This folder has the component tests.

## How Endouble Form Builder Works

At load document, the form function will run and looking for the form elements in order to create the components. Each component should have their markups in order to setup their instances correctlly.

### Dropdown component

``` html
    <select multiple
            class="dropdown"
            id="roles"
            data-bind-element="fieldResult"
            data-placeholder="Roles">

        <option>Data 1</option>
        <option>Data 2</option>
    </select>
```

* `class`: The form function will looking for all select tags with class name dropdown, ergo this class is mandatory if you want use this select as a component.
* `id`: The Id attribute will be used as an identifier of this component in field list, however it is not mandatory. If the Id it is not present the form function will create a new one and use it.
* `data-bind-element`: This attribute will be used in order to know to what components the data should be sent during the data bind.
* `data-placeholder`: The initial text that should be displayed before any data be selected.

### Text component

``` html
	<input name="keyword" type="text" placeholder="Some text">
```

* The text component does not require any special setup.

### Tag component

``` html
	<div class="tags" id="fieldResult"></div>
```

* `class`: The form function will looking for all divs with class name tags in order to initialize the component, therefore class is mandatory as the tag component.
* `id`: The Id attribute will be used as an identifier of this component in field list, however it is not mandatory. If the Id it is not present the form function will create a new one and use it.

### Button component

``` html
	<button type="submit" class="btn" id="send">Search</button>
```

* `class`: The form function will looking for all buttons with class name btn in order to initialize the component, therefore class is mandatory as the button component.

## Bind data

Bind data is the best Endouble's dynamics forms features. With this you can dynamically set data from one component to another only setting up the Id of the component which should receive the data.

[ ElemA ] --> data-bind-element="ElemB" --> [ ElemB ]

The scenario above, everytime a user changes the selected data at the ElemA, form build will reflect this data at ElemB. This works to add data and remove as well.

* A component can receive data from N other components.
* Each component implements they way to represent the selected data.
* Each component can delete only their data in binded component.

### Example

``` html

    <select class="dropdown"
            id="distance"
            data-bind-element="fieldResult"
            data-placeholder="Distance">
        <option>10km</option>
        <option>20km</option>
        <option>30km</option>
    </select>
    
    <div class="tags" id="fieldResult"></div>

```

The code above shows a simple exemple of how bind the dropdown selected element with the tag component.

This setup is enough to make the magic happens, every time one of these options become selected the tags component will create a new tag, and on the other hand, if the user delete a tag in tags component the option will be selected in dropdown component.

Any component can be a source and a target of a bind, just explore the possibilities.

# Developers info

## Tests

The default grunt task call the SASS preprocessor, the grunt-contrib-concat and runs the karma watcher.

`grunt`

All tests were written using Jasmine test framework.

## Build

The grunt task `build` can be used to process the SASS code and concat the JavaScript components source.

The components can be found at the folder `src/js/fields`. Each one recieved the name following the pattern `Developers.<class name>.js`.

The Endouble.Base.js it is where all the common code is implemented, all other components should inherit it.

`grunt build`

## A component anatomy

``` javascript

var Endouble = Endouble || {};
Endouble.YourComponet = function () {

    'use strict';

    function YourComponet(formEl) {

        Endouble.Base.apply(this, arguments);

        this.type = 'YourComponet';
        this.value = [];

        this.createElement = function () {
 			return document.createElement('input');
        };
    }

    return YourComponet;

}();

```

This is a minimal component. All components should be stored inside the Endouble namespace, the name of key used should be the same name of the function that will be returned.

Note that the component should be written using module pattern in order to guarantee the correct scope to inner functions.

The example above overwrite only the createElement method, in most simpler components, only one to three methods will be needed to be overwritten.

## Most used methods

### Endouble.Base.createElement

When a component is initialized, a div tag is created as a field container, inside this a main component tag will be appended. This main component tag is created by createElement method.

### Endouble.Base.addValue

Is used to add a new value to component, also is used to trigger the bind functions.

``` json

{
   "value": "my value",
   "origin" "componentA"
}

```

This method receive as a parameter an object with two keys. The key value is the value informations itself. The key origin is which component is adding this data, this info is not mandatory and in most cases will be managed ny the components.

### Endouble.Base.removeValue

As the opposite of the addAvalue, this method delete the object of the list os values with the same `key: value` passed as a parameter and from the same origin.

For example, the component C2 can recieve data from component C1 and C3, C1 will send the object with key origin: c1 and the component c3 with the origin value c3, this will result in a following list:

``` json

[{
   "value": "valueA",
   "origin" "c1"
},{
   "value": "valueA",
   "origin" "c3"
}]

```

Thus, if the c1 component remove your data, only the item with the c1 source is removed.

### Endouble.Base.addToInterface

This method reflects the changes in the interface when a new data is added.

Usually each will overwrite this method.

### Endouble.Base.addToInterface

Remove the visual representation of the data when is remover from values.

### Endouble.Base.render

The method render will call all method necessary to create a completely and fully functional components.