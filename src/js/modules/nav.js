var settings = require( "modules/settings" ),
	velocity = require("velocity-animate/velocity");





module.exports = function( el ) {
		var $el = $( el );
		$window = $( window );
		
		$el.on('mouseover', navOver).on('mouseout', navOut).on('click', navClick);
		
		function navOver(){
			console.log($el)
			
			$('.overlay').velocity('stop').velocity({ opacity:.8 });
		}
		
		function navOut(){
			$('.overlay').velocity('stop').velocity({ opacity:$('.overlay').data('opacity') });
		}
		
		function navClick(){
			
		}

};
  