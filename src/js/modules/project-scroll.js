var settings = require( "modules/settings" ),
	velocity = require("velocity-animate/velocity"),
	urlParam = require('modules/urlParam')(),
	mousewheel = require('jquery-mousewheel'),
	throttle = require('modules/throttle');





module.exports = function( el ) {
		var $el = $( el );
		$window = $( window ),
		topVal  = 0,
		opacityVal = 0,
		topNavHeightVal = $('header.content').height(),
		topContainer = true;
		
		$window.on('mousewheel', function(e){
			if(settings.isMobile || !topContainer) return true;
			/*
			*	SET POSITION OF THE CONTAINER
			*/

				topVal += e.deltaY;
				moveScreen();
			
			
			
		});
		
		
		function moveScreen(){
			if(topVal >= 0) topVal = 0;
			else if(topVal >= $window.height()) topVal = $window.height();
			else if(topVal + $window.height() < 0) topVal = -$window.height();
			else topVal = topVal;
			
			//$el.css('top', topVal);
			
			$el.css({
			 transform: 'translateY('+topVal+'px) rotateZ(0deg)',
			 MozTransform: 'translateY('+topVal+'px) rotateZ(0deg)',
			 WebkitTransform: 'translateY('+topVal+'px) rotateZ(0deg)',
			 msTransform: 'translateY('+topVal+'px) rotateZ(0deg)'
			})
			
			/*
			*	SET OPACITY OF OVERLAY
			*/
			opacityVal = Math.abs(topVal/($window.height()));
			
			$('.overlay').css('opacity', opacityVal).data('opacity', opacityVal);
			if(Math.abs(topVal) <= $window.height()/3 ){
				$('.overlay').addClass('bottom');
			} else {
				$('.overlay').removeClass('bottom');
			}
			
			/*
			*	MASK TOP NAV
			*/
			if(topVal + $window.height() <= topNavHeightVal) {
				$('header.over-main').css('height', topVal + $window.height());
			} else {
				$('header.over-main').css('height', topNavHeightVal);
			}
			
			if(topVal + $window.height() <= 0){
				if(topContainer)
				$('.disable-scroll').hide();
				//$('#main').remove();
				//$window.off('mousewheel');
			} else {
				if(topContainer)
				$('.disable-scroll').show();
			}
		}
		
		
		$('#section-body').on('scroll', function(){
			if($('#section-body').scrollTop() <= 0) {
				topContainer = true;
			} else {
				topContainer = false;
			}
		});
		
};
  