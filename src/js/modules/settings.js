/**
 * Global settings shared by all modules
 * @type {Object}
 */
var settings = module.exports = {
	breakpoints: {
		xs: 481,
		s: 641,
		m: 1000,
		ml: 999,
		l: 1281,
		xl: 1441,
		xxl: 1921
	},
	padding: {
		top: $(window).height() * .04,
		left: $(window).width() * .03
	},
	animationSpeed: 400,
	isMobile:false,
	playing:false
};

settings.breakpoints = settings.breakpoints;
settings.playing = settings.playing;
settings.isMobile = settings.isMobile;

/*
settings.breakpoints.header = settings.breakpoints.m;
settings.breakpoints.navHover = settings.breakpoints.m;
settings.breakpoints.mobile = settings.breakpoints.l;
*/ 