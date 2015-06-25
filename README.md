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
- borderColor: (STRING) (OPTIONAL) sets color of border. set with hash, e.g. `"#0000FF"`. defaults to black.
- fillPercentage: (STRING) (OPTIONAL) sets amount of vertical fill from bottom to top. defaults to completely filled.
- fillColor: (STRING) (OPTIONAL) sets color of filled area. set with hash, e.g. `"#0000FF"`
- unfilledColor: (STRING) (OPTIONAL) sets color of unfilled area. defaults to white.