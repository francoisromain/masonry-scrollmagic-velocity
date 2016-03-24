#Masonry, ScrollMagic and Velocity together

http://francoisromain.github.io/masonry-scrollmagic-velocity/

There is an error when resizing the viewport: 

`velocity.js:70 Uncaught TypeError: Cannot use 'in' operator to search for '32' in ScrollMagic.animation.velocity[4]`

If velocity is removed entirely (assets/src/scroll.js lines 11, 34-40, 54, 62 and assets/src/css/styles.css line 11), there is still an error when resizing the viewport: 

`debug.addIndicators.js:234 Uncaught TypeError: Cannot read property 'firstChild' of undefined`


I can not understand why. Help welcome. Thanks

If you wich to build: 
- clone this repo 
- `npm install` 
- `npm run dev`: launch webpack compilation and livereload
