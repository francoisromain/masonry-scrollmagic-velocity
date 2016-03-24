var Grid = require('./grid.js');
var Scroll = require('./scroll.js');
var imagesLoaded = require('imagesloaded');

(function bootstrap() {
  var gridEls = document.querySelectorAll('.masonry');
  var masonryItemSelector = '.bloc';
  var breakpoint = '60.75rem';
  var i;
  // an object to store the instances of masonry
  var grids = [];
  var scrollPage = new Scroll();
  var resizeTimer;
  var makeGrid = function makeGrid(gridEl, n) {
    /*
    gridEl: html element to apply masonry
    n: index (if multiple masonry are on the page)
    */
    // make an instance of masonry (grid.js)
    grids[n] = new Grid(gridEl, masonryItemSelector, breakpoint, scrollPage, n);
  };

  var timerSet = function timerSet() {
    // set timeout to prevent multiple call
    var n;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function timer() {
      for (n = 0; n < gridEls.length; n++) {
        // create or reset masonry (grid.js)
        // depending on size screen
        grids[n].make();
      }
    }, 150);
  };

  for (i = 0; i < gridEls.length; i++) {
    // loop over each element on which masonry is applied
    imagesLoaded(gridEls[i], { i: i }, function cb(instance) {
      // check that images are loaded
      makeGrid(gridEls[instance.options.i], instance.options.i);
    });
  }

  window.addEventListener('resize', timerSet);
}());
