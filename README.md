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
    fillPercentage: .7,
    roundPercentage: .6,
    rotation: 0.75
  })

  document.getElementById('container').appendChild(polygonCanvas)
```


available options:

- sides: (INT) sets number of sides of shape.
- borderWidth: (INT) sets width of border. defined in pixels.
- size: (INT) sets size of element. unaffected by border width declarations. defined in pixels.
- roundPercentage: (NUM) (OPTIONAL) rounds the borders by the provided percent.
- rotation: (NUM) (OPTIONAL) rotates the polygon by the provided percent. defaults to 0 if not provided.
- borderColor: (STRING) (OPTIONAL) sets color of border. set with hash, e.g. `"#0000FF"`. defaults to black.
- fillPercentage: (STRING) (OPTIONAL) sets amount of vertical fill from bottom to top. defaults to completely filled.
- fillColor: (STRING) (OPTIONAL) sets color of filled area. set with hash, e.g. `"#0000FF"`
- unfilledColor: (STRING) (OPTIONAL) sets color of unfilled area. defaults to white.
- fillImage: (CanvasImageSource) (OPTIONAL) sets background image of canvas shape. Thin wrapper around [CanvasRenderingContext2d.createPattern()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createPattern). This property can work in concert with fillColor and fillPercentage.