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
    this.canvas        = canvas;
    this.context       = canvas.getContext('2d');
    this.sideCount     = opts.sides;
    this.radius        = opts.size / 2 - opts.borderWidth;
    this.center        = opts.size / 2;
    this.borderWidth   = opts.borderWidth;
    this.borderColor   = opts.borderColor || 'black';
    this.fillHeight    = opts.size * 2 * (1 - (opts.fillPercentage || 0.99));
    this.fillColor     = opts.fillColor || 'white';
    this.unfilledColor = opts.unfilledColor || 'white';
    this.fillImage     = opts.fillImage;
  };

  Shape.prototype = {
    nextX: function(sideIndex) {
      return this.center + this.radius * Math.cos(sideIndex * 2 * Math.PI / this.sideCount);
    },

    nextY: function(sideIndex) {
      return this.center + this.radius * Math.sin(sideIndex * 2 * Math.PI / this.sideCount);
    },

    drawSides: function() {
      this.context.beginPath();
      this.context.moveTo(this.nextX(0), this.nextY(0));

      for (var i = 1; i <= this.sideCount; i++) {
        this.context.lineTo(this.nextX(i), this.nextY(i));
      }

      this.context.strokeStyle = this.borderColor;
      this.context.lineWidth   = this.borderWidth;
    },

    drawFill: function() {
      if (this.fillImage != null) {
        this.context.fillStyle = this.context.createPattern(this.fillImage, 'repeat')
      } else {
        this.drawFillGradient()
      }
    },

    drawFillGradient: function() {
      var fillStyle = this.context.createLinearGradient(0, 0, 0, this.fillHeight);
      fillStyle.addColorStop(0, this.unfilledColor);
      fillStyle.addColorStop(0.5, this.unfilledColor);
      fillStyle.addColorStop(0.5, this.fillColor);
      fillStyle.addColorStop(1, this.fillColor);
      this.context.fillStyle = fillStyle;
    },

    build: function() {
      this.drawSides();
      this.drawFill();
      this.context.fill();
      this.context.stroke();
      return this;
    }
  };

  return {
    build: function(canvas, opts) {
      canvas.className = 'polygon';
      canvas.height = opts.size;
      canvas.width  = opts.size;
      new Shape(canvas, opts).build();

      return canvas;
    }
  };
})();
