/**
 * Global URL Param
 * @type {Object}
 */

var settings = require( "modules/settings" ),
	velocity = require("velocity-animate/velocity");

var sectionController = module.exports = function() {
	
	this.moveOut = function(name, path){
		$(name).velocity({ 
			top:'-100%'
		}, {
			duration:settings.animationSpeed,
			complete:function(){ setPath(path); }
		});
		//return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	}
	
	this.moveIn = function(name, path) {
		$(name).velocity({ 
			top:0
		}, {
			duration:settings.animationSpeed,
			complete:function(){ setPath(path); }
		});
	}
	
	this.toSection = function(name) {
		var pos = -1 * $(name).index() * 100;
		
		$('#main').velocity({ 
			top:pos + '%'
		}, {
			duration:settings.animationSpeed,
			complete:function(){  }
		});
	}
	
}

