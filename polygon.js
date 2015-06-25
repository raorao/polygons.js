// Object#Assign polyfill
if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }
        nextSource = Object(nextSource);

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}

Polygon = (function() {

  Shape = function(canvas, opts) {
    this.canvas    = canvas;
    this.sideCount = opts.sides;
    this.size      = opts.size/2 - opts.borderWidth
    this.center    = opts.size/2
    this.borderWidth = opts.borderWidth
    this.borderColor = opts.borderColor
    this.fillColor   = opts.fillColor
  }

  Shape.prototype = {
    context: function() {
      return this.contextCache = this.contextCache || this.canvas.getContext('2d');
    },

    nextX: function(sideIndex) {
      return this.center + this.size * Math.cos(sideIndex * 2 * Math.PI / this.sideCount)
    },

    nextY: function(sideIndex) {
      return this.center + this.size * Math.sin(sideIndex * 2 * Math.PI / this.sideCount)
    },

    build: function() {
      var cxt = this.context()
      cxt.beginPath()

      cxt.moveTo(this.nextX(0),this.nextY(0));

      for(var i = 1; i <= this.sideCount; i++) {
        cxt.lineTo(this.nextX(i),this.nextY(i));
      }

      cxt.strokeStyle = this.borderColor;
      cxt.lineWidth = this.borderWidth;
      cxt.stroke();
      cxt.fillStyle = this.fillColor;
      cxt.fill()
      return this;
    },
  }

  return {
    build: function(opts) {
      var canvas    = document.createElement('canvas')
      canvas.height = opts.size
      canvas.width  = opts.size
      new Shape(canvas,opts).build()

      return canvas
    },
  }
})()
