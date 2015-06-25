Polygon = (function() {

  Shape = function(canvas, sideCount) {
    this.canvas    = canvas;
    this.sideCount = sideCount;
  }

  Shape.prototype = {
    context: function() {
      return this.contextCache = this.contextCache || this.canvas.getContext('2d');
    },

    build: function() {
      return this;
    },

    renderTo: function(container) {
      container.appendChild(this.canvas)
    }
  }

  return {
    build: function(opts) {
      var context = document.createElement('canvas')
      return new Shape(context, opts.sides).build()
    },
  }
})()
