var ScrollMagic = require('scrollmagic');

var myScroll = module.exports = function Scroll() {
  this.isActive = false;
  this.scroll = new ScrollMagic.Controller();
  // an object to store every scenes
  // (one for each masonry item)
  this.blocScroll = {};
};

require('ScrollMagicVelocity');
require('ScrollMagicAddIndicators');

myScroll.prototype = {
  // utility to return a random number
  getRandom: function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  },
  // create one scrollMagic scene for each masonry item
  blocCreate: function blocCreate(blocEl, n, i) {
    /*
    blocEl: item to animate and trigger animation
    n: masonry index (if multiple masonry)
    i: item index
    */
    // create a scene and store in an object
    // one sub-object for each instance of masonry (n)
    // one sub-sub-object for each item (i)
    this.blocScroll[n][i] = new ScrollMagic.Scene({
      triggerHook: this.getRandom(0.60, 0.75),
      triggerElement: blocEl
    })
    // velocity animation
    .setVelocity(blocEl, {
      opacity: 1,
      borderTopWidth: 0
    }, {
      duration: 800,
      easing: 'easeOutExpo'
    });
    this.blocAdd(n, i);
  },
  blocAdd: function blocAdd(n, i) {
    this.blocScroll[n][i].addTo(this.scroll).addIndicators();
  },
  blocsMake: function blocsMake(gridEl, itemSelector, n) {
    /*
    gridEl: html element on which is a masonry instance
    itemSelector: css selector of masonry items
    n: masonry index (if multiple masonry)
    */
    var i;
    var borderTop = '300px';
    var blocEls = gridEl.querySelectorAll(itemSelector);
    console.log('blocsMake: ', n, blocEls.length);
    // create an object to store the scenes to be created
    this.blocScroll[n] = {};
    // loop over each masonry item
    for (i = 0; i < blocEls.length; i++) {
      // add a top border to each item, to animate
      blocEls[i].style.borderTopWidth = borderTop;
      this.blocCreate(blocEls[i], n, i);
    }
  },
  blocsDestroy: function blocsDestroy() {
    var n;
    var i;
    console.log('scroll:blocsDestroy');
    for (n in this.blocScroll) {
      if (this.blocScroll.hasOwnProperty(n)) {
        console.log('n: ', n);
        for (i in this.blocScroll[n]) {
          if (this.blocScroll[n].hasOwnProperty(i)) {
            console.log('i: ', i);
            this.blocScroll[n][i].destroy(true);
          }
        }
      }
    }
    // alternative: destroy the controller
    // this.scroll.destroy(true);
  }
};
