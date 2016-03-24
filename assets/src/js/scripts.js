var Grid = require('./grid.js');
var Scroll = require('./scroll.js');
var imagesLoaded = require('imagesloaded');

(function bootstrap() {
  var gridEls = document.querySelectorAll('.masonry');
  var masonryItemSelector = '.bloc';
  var breakpoint = '60.75rem';
  var i;
  var grids = [];
  var scrollPage = new Scroll(breakpoint);
  var resizeTimer;
  var makeGrid = function makeGrid(gridEl, j) {
    grids[j] = new Grid(gridEl, masonryItemSelector, breakpoint, scrollPage, j);
  };

  var timerSet = function timerSet() {
    var n;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function timer() {
      scrollPage.make();
      for (n = 0; n < gridEls.length; n++) {
        grids[n].make();
      }
    }, 150);
  };

  for (i = 0; i < gridEls.length; i++) {
    imagesLoaded(gridEls[i], { i: i }, function cb(instance) {
      makeGrid(gridEls[instance.options.i], instance.options.i);
    });
  }

  window.addEventListener('resize', timerSet);
}());
