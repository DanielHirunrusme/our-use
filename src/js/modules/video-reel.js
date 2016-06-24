var settings = require( "modules/settings" ),
	throttle = require( "modules/throttle" ),
	canvid   = require( "canvid" );

module.exports = function( el ) {
		var $el = $(el),
			$button = $('aside .button--primary'),
			$volume = $('.volume-toggle'),
			$mode = $volume.find('.mode'),
			$window = $(window),
			$videoMobile = $('#videoMobile'),
			$viewWorkDummy = $('.view-work-dummy');
			
		var playing = true,
			video,
			instance,
			links = [],
			topVal = 0,
			theaterTimer,
			isTheaterMode,
			volumeLevel = 1,
			mobileVideoLoaded = false,
			desktopVideoLoaded = false,
			start = {x:0,y:0};
		
		var clips = [{name:"clip1", length:84 }, {name:"clip2", length:74}],
			selectedClip = clips[ Math.floor( Math.random() * clips.length ) ];
		
		function init(){
			
			$('.project').each(function(){
					links.push( { time:$(this).data('time'), title:$(this).data('title'), url:$(this).data('url') } )
			});
			
			createVideo();
			
			/*
			$(video).on( "timeupdate", 
			    function(event){
			      onTrackedVideoFrame(this.currentTime, this.duration);
			});
			
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				instance.destroy();
			 	//$('.video').remove();
			}
			*/

			
			detectMode();
			theaterMode();
			
			
			
			//$videoMobile.on('click', buttonClick);
			$viewWorkDummy.on('click', buttonClick);
			
		}
		
		function createVideo(){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				settings.isMobile = true;
				
				$('body').addClass('isMobile');
				
				var canvidControl = canvid({
				    selector : '.videoMobile',
				    videos: {
				        clip1: { src: 'assets/video/'+ selectedClip.name +'.jpg', frames: selectedClip.length, fps: 20, cols: 10, loops: 1, onEnd: function(){
				          console.log('clip1 ended.');
				          canvidControl.play('clip1');
				        }},
				    },
				    width: $window.height() * .67,
				    height: $window.height(),
				    loaded: function() {
						mobileVideoLoaded = true;
				        canvidControl.play('clip1');
				        // reverse playback
				        // canvidControl.play('clip1', true);
				    }
				});
			
			
			} else {
				settings.isMobile = false;
				
				 $el.vide('assets/video/video-1', {
				    volume: 1,
				    playbackRate: 1,
				    loop: true,
					muted: false,
				    autoplay: true,
				    position: '0% 0%', // Similar to the CSS `background-position` property. 
				    posterType: 'jpg', // Poster image type. "detect" — auto-detection; "none" — no poster; "jpg", "png", "gif",... - extensions. 
				    resizing: true, // Auto-resizing, read: https://github.com/VodkaBears/Vide#resizing 
				    bgColor: '#000000', // Allow custom background-color for Vide div, 
				});
				
				video = $el.find('video').get(0);
				desktopVideoLoaded = true;
				
				$(video).on( "timeupdate", 
				    function(event){
				      onTrackedVideoFrame(this.currentTime, this.duration);
				});
				
				$button.on('mouseover', buttonOver).on('mouseout', buttonOut).on('click', buttonClick);
				
				$volume.on('click', toggleVolume);
				//toggleVolume();
			}
			
	 	   	//data-vide-bg="mp4: assets/video/video-1, poster: assets/video/video-1-poster"
	 	    //data-vide-options="posterType: jpg, loop: true, muted: false, position: 0% 0%"
		}
		
		function toggleVolume(){
			$volume.toggleClass('on');
			if($volume.hasClass('on')){
				$(video).get(0).volume = 1;
				$mode.text('on');
			} else {
				$(video).get(0).volume = 0;
				$mode.text('off');
			}
		}
		
		function buttonOver(){
			playing = false;
			$(video).get(0).pause();
		}
		
		function buttonOut(){
			playing = true;
			$(video).get(0).play();
		}
		
		function buttonClick(e){
			e.preventDefault();
			
			
			$window.off('mousemove');
			clearTimeout( theaterTimer );
			
			$('.disable-scroll').hide();
			
			$('.overlay').addClass('waiting');
			$button.off('mouseout').addClass('active');
			$('#main article').off('mouseout');

			playing = false;
			
			if(!settings.isMobile) {
				$('.test-title').text($button.data('title'));
				$volume.addClass('off');
				$('.video').velocity('stop').velocity({ opacity:.5 }, {duration: settings.animationSpeed});
				video.pause();
			}
			
			$window.off('mousewheel');
			
			if(!settings.isMobile)
			setTimeout(function(){ loadProject(); }, 300);
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
			
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				settings.isMobile = true;
				$('body').addClass('isMobile');
				if(!mobileVideoLoaded)createVideo();
			} else {
				settings.isMobile = false;	
				$('body').removeClass('isMobile');
				if(desktopVideoLoaded)$('video').css('height', '100%');
			}
			
			console.log('resize');
			if($window.width()<768){
				theaterModeOn();
				detectMode();
				//settings.isMobile = true;
			} else {
				theaterMode();
				//settings.isMobile = false;
			}
			
			
			detectMode();
		}
		
		function detectMode(){
			if(settings.isMobile) {
			
					if($window.width() < $window.height()){
						$('.videoMobile canvas').attr('width', $window.height() * .68).attr('height', $window.height());
					} else {
						$('.videoMobile canvas').attr('width', $window.width()).attr('height', $window.width() * 1.5 );
						//console.log( $('.videoMobile canvas')[0].getContext('2d') );
					}
					
				 
			} else {
				
			}
		}
		
		
		
		
		init();
		
		//console.log( instance );
};  