Polygon = (function() {

  round = function(num) {
    return Math.round(num * 100000) / 100000;
  };

  Shape = function(canvas, opts) {
    this.canvas        = canvas;
    this.context       = canvas.getContext('2d');
    this.sideCount     = opts.sides;
    this.radius        = (opts.size - opts.borderWidth) / 2;
    this.center        = opts.size / 2;
    this.borderWidth   = opts.borderWidth;
    this.borderColor   = opts.borderColor || 'black';
    this.fillColor     = opts.fillColor || 'white';
    this.unfilledColor = opts.unfilledColor || 'white';
    this.fillImage     = opts.fillImage;
    this.rotation      = round((opts.rotation || 0) * 2 * Math.PI);
    this.indeces       = this.calculateIndeces();
    this.fillHeight    = this.calculateFillHeight(opts.fillPercentage, opts.size);
  };

  Shape.prototype = {
    calculateIndeces: function() {
      var indeces = [];

      for (var i = 0; i <= this.sideCount; i++) {
        indeces.push(this.rotate(this.nextX(i), this.nextY(i)));
      }

      return indeces;
    },

    rotate: function(oldX, oldY) {
      var newX = Math.cos(this.rotation) * (oldX - this.center) - Math.sin(this.rotation) * (oldY - this.center) + this.center;
      var newY = Math.sin(this.rotation) * (oldX - this.center) + Math.cos(this.rotation) * (oldY - this.center) + this.center;
      return [newX, newY];
    },

    calculateFillHeight: function(percentage, size) {
      if (percentage === 1 || typeof percentage === 'undefined' || percentage === null) { return 1; };

      var yCoordinates = this.indeces.map(function(indexTuple) { return indexTuple[1]; });

      var lowestY      = Math.max.apply(null, yCoordinates) - (this.borderWidth / 2);
      var highestY     = Math.min.apply(null, yCoordinates) + (this.borderWidth / 2);
      return 2 * (((lowestY - highestY) * (1 - percentage)) + highestY);

    },

    nextX: function(sideIndex) {
      return this.center + this.radius * Math.cos(round(sideIndex * 2 * Math.PI / this.sideCount));
    },

    nextY: function(sideIndex) {
      return this.center + this.radius * Math.sin(round(sideIndex * 2 * Math.PI / this.sideCount));
    },

    drawSides: function() {
      this.context.beginPath();

      this.indeces.forEach(function(indexTuple, position) {
        if (position === 0) {
          this.context.moveTo(indexTuple[0], indexTuple[1]);
        } else {
          this.context.lineTo(indexTuple[0], indexTuple[1]);
        }
      }.bind(this));

      this.context.strokeStyle = this.borderColor;
      this.context.lineWidth   = this.borderWidth;
    },

    drawFill: function() {
      this.drawFillGradient();
      this.context.fill();
      if (this.fillImage != null) {
        this.context.fillStyle = this.context.createPattern(this.fillImage, 'repeat');
        this.context.fill();
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
