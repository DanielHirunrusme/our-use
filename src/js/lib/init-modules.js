/* globals document */
/**
 * Finds all elements with a "data-module-init" attribute
 * and calls the corresponding script
 */

var unique = true;

function initializeModules() {
  var modules = document.querySelectorAll( "[data-module-init]" );

  for ( var i = 0; i < modules.length; i++ ) {
    var el = modules[ i ];
    var names = el.getAttribute( "data-module-init" ).split( " " );
    var Module;

    for ( var j = 0; j < names.length; j++ ) {
	  if(unique) { 
	      try {
	        Module = require( "modules/" + names[ j ] );
	      } catch ( e ) {
	        Module = false;
	        console.log( names[ j ] + " module does not exist." );
	      }
	  } else {
		  
		  if(names[ j ] != 'pjax-container' && names[ j ] != 'settings') {
		      try {
		        Module = require( "modules/" + names[ j ] );
		      } catch ( e ) {
		        Module = false;
		        console.log( names[ j ] + " module does not exist." );
		      }
	  		}
	  }

      // Initialize the module with the calling element
      if ( Module ) {
        new Module( el );
      }
    }
  }
  unique = false;
}

module.exports = initializeModules;
