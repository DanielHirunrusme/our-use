/**
 * Global URL Param
 * @type {Object}
 */
var urlParam = module.exports = function() {
	
	var popped = ('state' in window.history && window.history.state !== null), initialURL = location.href;
	
	$(window).bind('popstate', function (event) {
	  // Ignore inital popstate that some browsers fire on page load
	  var initialPop = !popped && location.href == initialURL
	  popped = true
	  if (initialPop) return;

	});
	
	this.getPath = function() {
		return location.pathname;
	}
	
	this.setPath = function(location) {
		
		
		if(history.pushState) {
			//var _url = '/jo' + location;
		    //history.replaceState(null, null, _url); // URL is now /inbox/N
		    // showMailItem(); // example function to show email based on link clicked
		  }

	}
	
	this.getParam = function(name){
		//return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	}
	
	this.setParam = function(param, value) {
		/*
        var currentURL = window.location.href+'&';
        var change = new RegExp('('+param+')=(.*)&', 'g');
        var newURL = currentURL.replace(change, '$1='+value+'&');

        if (getParam(param) !== null){
            try {
                window.history.replaceState('', '', newURL.slice(0, - 1) );
            } catch (e) {
                console.log(e);
            }
        } else {
            var currURL = window.location.href;
            if (currURL.indexOf("?") !== -1){
                window.history.replaceState('', '', currentURL.slice(0, - 1) + '&' + param + '=' + value);
            } else {
                window.history.replaceState('', '', currentURL.slice(0, - 1) + '?' + param + '=' + value);
            }
        }
		*/
	}
	
}

