Polygons.js
-------------------------

Simple library for constructing regular polygons in JS/HTML5 using canvas.

Usage
---------------------
```javascript
  var canvas = document.createElement('canvas')
  polygonCanvas = Polygon.build(canvas, {
    sides: 10,
    size: 500,
    borderWidth: 7,
    borderColor: '#000000',
    fillColor:   '#0000FF',
    unfilledColor: 'white',
    fillPercentage: .7
  })

  document.getElementById('container').appendChild(polygonCanvas)
```


available options:

- sides: (INT) sets number of sides of shape.
- borderWidth: (INT) sets width of border. defined in pixels.
- size: (INT) sets size of element. unaffected by border width declarations. defined in pixels.
- borderColor: (STRING) (OPTIONAL) sets color of border. set with hash, e.g. `"#0000FF"`. defaults to black.
- fillPercentage: (STRING) (OPTIONAL) sets amount of vertical fill from bottom to top. defaults to completely filled.
- fillColor: (STRING) (OPTIONAL) sets color of filled area. set with hash, e.g. `"#0000FF"`
- unfilledColor: (STRING) (OPTIONAL) sets color of unfilled area. defaults to white.