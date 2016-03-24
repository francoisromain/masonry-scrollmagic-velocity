var ScrollMagic = require('scrollmagic');

var myScroll = module.exports = function Scroll(breakpoint) {
  this.isOn = false;
  this.breakpoint = breakpoint;
  this.scroll = new ScrollMagic.Controller();
  this.blocScroll = {};
  this.make();
};

require('ScrollMagicVelocity');
require('ScrollMagicAddIndicators');

myScroll.prototype = {
  make: function make() {
    if (window.matchMedia('(min-width: ' + this.breakpoint + ')').matches) {
      if (this.isOn) {
        console.log('scroll:update');
        this.scroll.update(true);
      } else {
        console.log('scroll:add');
        // this.scroll.addScene([
        //   nothing to add
        // ]);
        this.isOn = true;
      }
    } else {
      console.log('scroll:remove');
      // this.scroll.removeScene();
      this.isOn = false;
    }
  },
  getRandom: function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  },
  blocCreate: function blocCreate(el, n, i) {
    var r = this.getRandom(0.60, 0.75);
    this.blocScroll[n][i] = new ScrollMagic.Scene({
      triggerHook: r,
      triggerElement: el
    }).setVelocity(el, {
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
  blocsMake: function blocsMake(containerEl, blocs, n) {
    var i;
    var borderTop = '300px';
    var blocEls = containerEl.querySelectorAll(blocs);
    console.log('blocsMake: ', n, blocEls.length);
    this.blocScroll[n] = {};
    for (i = 0; i < blocEls.length; i++) {
      blocEls[i].style.borderTopWidth = borderTop;
      this.blocCreate(blocEls[i], n, i);
    }
  },
  blocsDestroy: function blocsDestroy() {
    this.scroll.destroy(true);
  }
};
