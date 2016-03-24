var Masonry = require('masonry-layout');

var Grid = module.exports = function Grid(gridEl, itemSelector, breakpoint, scroll, n) {
  var that = this;
  this.el = gridEl;
  this.itemSelector = itemSelector;
  this.isOn = false;
  this.breakpoint = breakpoint;
  this.scroll = scroll;
  this.n = n;
  this.firstTime = true;
  that.make();
};

Grid.prototype = {
  make: function make() {
    console.log('grid:make, firstTime:', this.firstTime);
    if (!this.firstTime) {
      console.log('grid:blocsDestroy');
      this.scroll.blocsDestroy();
    }
    if (window.matchMedia('(min-width: ' + this.breakpoint + ')').matches) {
      console.log('grid:matchmedia');
      if (this.isOn) {
        console.log('grid:layout');
        this.masonry.layout();
      } else {
        console.log('grid:new');
        this.masonry = new Masonry(this.el, {
          itemSelector: this.itemSelector,
          columnWidth: '.masonry-sizer'
        });
        this.isOn = true;
        this.firstTime = false;
      }
    } else if (this.isOn) {
      console.log('grid:destroy');
      this.masonry.destroy();
      this.isOn = false;
    }
    this.scroll.blocsMake(this.el, this.itemSelector, this.n);
  }
};
