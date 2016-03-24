var Masonry = require('masonry-layout');

var Grid = module.exports = function Grid(gridEl, itemSelector, breakpoint, scroll, n) {
  /*
  gridEl: html element to build masonry
  itemSelector: css selector of the item for masonry
  breakpoint: breakpoint to destroy masonry
  scroll: scrollMagic controller instance
  n: index (if masonry is call multiple time on the page)
  */

  this.el = gridEl;
  this.itemSelector = itemSelector;
  this.isActive = false;
  this.breakpoint = breakpoint;
  this.scroll = scroll;
  this.n = n;
  this.firstTime = true;
  this.make();
};

Grid.prototype = {
  make: function make() {
    console.log('grid:make, firstTime:', this.firstTime);

    if (!this.firstTime) {
      // call destroy on the scrollMagic controller
      // then, masonry can recompute positions on
      // clean items
      this.scroll.blocsDestroy();
    }

    if (window.matchMedia('(min-width: ' + this.breakpoint + ')').matches) {
      // check matchmedia to build or destroy masonry
      console.log('grid:matchmedia');

      if (this.isActive) {
        // if masonry is already active
        console.log('grid:layout');
        this.masonry.layout();
      } else {
        // if masonry is not active, build it
        console.log('grid:new');
        this.masonry = new Masonry(this.el, {
          itemSelector: this.itemSelector,
          columnWidth: '.masonry-sizer'
        });
        this.isActive = true;
        this.firstTime = false;
      }
    } else if (this.isActive) {
      // if viewport is smaller than breakpoint
      // and masonry is active
      // -> destroy masonry
      console.log('grid:destroy');
      this.masonry.destroy();
      this.isActive = false;
    }

    // call makeBLocs on the scrollMagic controller
    this.scroll.blocsMake(this.el, this.itemSelector, this.n);
  }
};
