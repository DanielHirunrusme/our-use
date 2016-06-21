var settings = require( "modules/settings" ),
	controller = require( "modules/section-controller" ),
	velocity = require("velocity-animate/velocity");





module.exports = function( el ) {
		var $el = $( el );
		$window = $( window ),
		$targ = $('.main-wrapper .js-Pjax-add').length > 0 ? $('.main-wrapper .js-Pjax-add') : $( '.inner-wrapper' );
		
		
		function setScrollTarg() {
			if($window.width() < settings.breakpoints.m) {
				$targ = $('body');
			} else {
				$targ = $('.main-wrapper .js-Pjax-add').length > 0 ? $('.main-wrapper .js-Pjax-add') : $( '.inner-wrapper' );
			}
		}
		
		$window.on('resize', function(){
			setScrollTarg();
		})
		
		setScrollTarg();
		
		if($('body').hasClass('projects')) {
			$el.show();
		} else {
			$el.hide();
		}
		
		if($('.bottom-arrow').length)
		$targ.on('mousewheel scroll', scrollCheckOpacity);
		else
		$targ.off('mousewheel scroll', scrollCheckOpacity);
		
		function scrollCheckOpacity(){
			
			$('body').removeClass('scrolling');
			
			if($('.bottom-arrow').length > 0)
			if($('.bottom-arrow').css('opacity').split('px').join('') > .4) {
				$('.bottom-arrow').removeClass('off')
			} else {
				$('.bottom-arrow').addClass('off')
			}
		}
		
		function toNext(e){
			e.preventDefault();
			
	
			
			if($window.width() < settings.breakpoints.m) {
				$targ = $('body');
			}
			
			$el.off();
			$el.addClass('off');
			$('body').addClass('scrolling');
			
			$targ.stop().animate({scrollTop:$window.height() }, 800, function(){
				$el.on('click', toNext);
				$('body').removeClass('scrolling');
				$window.off('mousewheel', stopToNext);
				$window.trigger('resize');
			});
	 
			$('.bottom-arrow').addClass('off')
			$('.projects-menu').removeClass('disable-link');
			$('.main-menu').removeClass('disable-link');
			$('.mobile-black-overlay').velocity('stop').velocity({ opacity: .3 }, 1000);
			//$('.project-information').show().velocity('stop').velocity({ opacity: 1 }, 1000);
			$('.project-information .inner').show().velocity('stop').velocity({ opacity: 1 }, 1000);
			$('.projects-menu').velocity('stop').velocity({ opacity: 1 }, 1000);
			//$('.main-menu').velocity('stop').velocity({ opacity: 1 }, 1000);
			$('.bottom-arrow').hide().velocity('stop').velocity({ opacity: 0 }, 100);
			
			$('[data-to-opacity]').each(function() {
				$(this).show().velocity('stop').velocity({ opacity: $(this).data('to-opacity') }, 1000);
			})
			
			
			
			
			
			$window.on('mousewheel', stopToNext);

		} 
		
		function stopToNext(e){
			$el.on('click', toTop);
			$el.removeClass('off');
			
			$('.project-information .inner').velocity('stop');
			$('.projects-menu').velocity('stop');
			$('.main-menu').velocity('stop');
			$('.bottom-arrow').velocity('stop');
			
			
			$targ.stop();
			$window.off('mousewheel', stopToNext);
			$window.trigger('mousewheel');
		}
		
		$window.on('resize', function(){
			setTarg();
		});
		
		function setTarg() {
			if($window.width() < settings.breakpoints.m) {
				$targ = $('body');
			} else {
				$targ = $('.inner-wrapper');
			}
		}
		
		setTarg();
		
		$el.on('click', toNext);
		
};
  