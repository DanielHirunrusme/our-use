var settings = require( "modules/settings" );


 

module.exports = function( el ) {
		var $el = $(el),
			$article = $el.find('article'),
			$video = $('.video');
	
		console.log($article);
		
		$article.on('mouseover', articleOver).on('mouseout', articleOut);
		
		function articleOver(){
			$video.velocity('stop').velocity({ opacity: .5 }, {duration: settings.animationSpeed});
		}
		
		function articleOut(){
			$video.velocity('stop').velocity({ opacity: .5 }, {duration: settings.animationSpeed});
		}
		
};  