var settings = require( "modules/settings" ),
	throttle = require( "modules/throttle" ),
	canvid   = require( "canvid" );


 

module.exports = function( el ) {
		var $el = $(el),
			$button = $('aside .button--primary'),
			$volume = $('.volume-toggle'),
			$mode = $volume.find('.mode'),
			$window = $(window),
			$videoMobile = $('#videoMobile');
			
		var playing = true,
			instance = $el.data('vide'),
			links = [],
			topVal = 0,
			video = instance.getVideoObject(),
			theaterTimer,
			isTheaterMode,
			volumeLevel = 1,
			mobileVideoLoaded = false,
			start = {x:0,y:0};
		
		
		
		function init(){
			
			$('.project').each(function(){
					links.push( { time:$(this).data('time'), title:$(this).data('title'), url:$(this).data('url') } )
			});
			
			$(video).on( "timeupdate", 
			    function(event){
			      onTrackedVideoFrame(this.currentTime, this.duration);
			});
			
			if($window.width()<768){
				settings.isMobile = true;
			} else {
				settings.isMobile = false;
			}
			
			detectMode();
			theaterMode();
			
			$button.on('mouseover', buttonOver).on('mouseout', buttonOut).on('click', buttonClick);
			$volume.on('click', toggleVolume);
			$videoMobile.on('click', buttonClick);
		}
		
		function toggleVolume(){
			$volume.toggleClass('on');
			if($volume.hasClass('on')){
				video.volume = 1;
				$mode.text('off');
			} else {
				video.volume = 0;
				$mode.text('on');
			}
		}
		
		function buttonOver(){
			playing = false;
			video.pause();
		}
		
		function buttonOut(){
			playing = true;
			video.play();
		}
		
		function buttonClick(e){
			e.preventDefault();
			
			$('.overlay').addClass('waiting');
			$button.off('mouseout').addClass('active');
			$('#main article').off('mouseout');
			$('.video').velocity('stop').velocity({ opacity:.5 }, {duration: settings.animationSpeed});
			$volume.addClass('off');
			$('.test-title').text($button.data('title'));
			playing = false;
			video.pause();
			$window.off('mousewheel');
			
			if(!settings.isMobile)
			setTimeout(function(){ loadProject(); }, 2000);
			else
			loadProject();
		}
		
		function loadProject(){
			$('header.over-main').css('height', '100%');
			$('header.over-main').velocity('stop')
			.velocity({ height:0 }, 
				{duration: (settings.animationSpeed * 2),
			     complete:function(){ 
					 $('.overlay').hide(); 
					 $('#main').remove();
				 }});
			$('#main').velocity('stop').velocity({ translateY:'-100%' }, {duration: (settings.animationSpeed * 2) });
		}

		function onTrackedVideoFrame(currentTime, duration){
			var time = Math.round(currentTime);
			console.log(time);
			for(var i=0; i<links.length; i++) {
				if(time == links[i].time){
					$button.attr('href', links[i].url);
					$button.attr('data-title', links[i].title);
				}
			}
		}
		
		$window.on('mousewheel', function(e){

			
			topVal += e.deltaY;
			
			
		
			if(topVal <= -$window.height()){
				if(playing) {
					playing = false;
					video.pause();
				}
				
			} else {
				if(!playing) {
	
					playing = true;
					video.play();
				}
			}
		})
		.on('mousemove', throttle(theaterMode, 300))
		.on('resize', throttle(winResize, 300));
		
		$window.on('mousewheel', throttle(theaterMode, 300));
		
		
		function theaterMode(){
			if(settings.isMobile) return false;
			console.log( 'clear theater timer' );
			
			if( isTheaterMode ) {
				theaterModeOff();
			} else {
				clearTimeout( theaterTimer );
				theaterTimer = setTimeout( theaterModeOn, 5000);
			}
			
			
		}
		
		function theaterModeOn(){
			console.log( 'theater mode on ' );
			isTheaterMode = true;
			$('body').addClass('theaterMode');
			
			//animate video in
			$('.video').velocity('stop').velocity({ opacity:1 }, {duration: settings.animationSpeed});
			
			//animate items out
			$('.project').velocity('stop').velocity({ opacity:0 }, {duration: settings.animationSpeed});
		}
		
		function theaterModeOff(){
			console.log( 'theater mode off' );
			isTheaterMode = false;
			$('body').removeClass('theaterMode');
			
			//animation video out
			$('.video').velocity('stop').velocity({ opacity:.5 }, {duration: settings.animationSpeed});
			
			//animate items in
			$('.project').velocity('stop').velocity({ opacity:1 }, {duration: settings.animationSpeed});
		}
		
		
		function winResize(){
			console.log('resize');
			if($window.width()<768){
				theaterModeOn();
				detectMode();
				settings.isMobile = true;
			} else {
				theaterMode();
				settings.isMobile = false;
			}
			
			detectMode();
		}
		
		function detectMode(){
			if(settings.isMobile) {
				if(mobileVideoLoaded) {
					if($window.width() < $window.height()){
						$('.videoMobile canvas').attr('width', $window.height() * .6666).attr('height', $window.height());
					} else {
						$('.videoMobile canvas').attr('width', $window.width()).attr('height', $window.width() * 1.5 );
					}
					
				} else {
					console.log('LOAD MOBILE VID')
					mobileVideoLoaded = true;
					var canvidControl = canvid({
					    selector : '.videoMobile',
					    videos: {
					        clip1: { src: 'assets/video/myvideo.jpg', frames: 194, fps: 30, cols: 10, loops: 1, onEnd: function(){
					          console.log('clip1 ended.');
					          canvidControl.play('clip1');
					        }},
					    },
					    width: $window.height() * .6666,
					    height: $window.height(),
					    loaded: function() {
					        canvidControl.play('clip1');
					        // reverse playback
					        // canvidControl.play('clip1', true);
					    }
					});
				}
			} else {
				
			}
		}
		
		
		
		
		init();
		
		//console.log( instance );
};  