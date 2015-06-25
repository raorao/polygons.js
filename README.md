Polygons.js
-------------------------

Simple library for constructing regular polygons in JS/HTML5 using canvas.

Usage
---------------------
```
var polygon = Polygon.build({sides: 5});
polygon.renderTo(containerElement);
```


available options:

- sides: (INT) sets number of sides of shape.
- borderWidth: (INT) sets width of border. defined in pixels.
- size: (INT) sets size of element. unaffected by border width declarations. defined in pixels.