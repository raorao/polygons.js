Polygon = (function() {

  Shape = function(canvas, sideCount, size, borderWidth) {
    this.canvas    = canvas;
    this.sideCount = sideCount;
    this.size      = size/2 - borderWidth
    this.center    = size/2
    this.borderWidth = borderWidth
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

      cxt.strokeStyle = "#000000";
      cxt.lineWidth = this.borderWidth;
      cxt.stroke();
      return this;

    },

    renderTo: function(container) {
      container.appendChild(this.canvas)
    }
  }

  return {
    build: function(opts) {
      var context = document.createElement('canvas')
      context.height = opts.size
      context.width  = opts.size
      return new Shape(context, opts.sides, opts.size, opts.borderWidth).build()
    },
  }
})()
