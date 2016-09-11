// var css = require("!css!sass!../css/scss/main.scss");
// var css = require("!css!sass!/assets/css/scss/main.scss");
// var css = require('../css/scss/main.scss');
// import 'assets/css/scss/main.scss'
// import '../css/scss/main.scss'
import 'main.scss';
// import 'assets/css/scss/something.scss'

const displace = require('dist/displace.min.js');

// window.k = require('dist/displace.min.js')
// console.log( displace, k )


const el = document.querySelector('.moveable')
console.log( '11' )

// console.log( 'a' )
const a = displace(el, {
	constrain: true,
	// relativeTo: document.querySelector('.one')
	relativeTo: document.body
});
// console.log( 'main', new Date() )

