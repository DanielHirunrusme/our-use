var settings = require( "modules/settings" );

module.exports = function( el ) {
		var $el = $(el),
			$window = $(window),
			welcomeInt;
			
		var welcome = [
			"welcome",
			"salve",
			"velkomst",
			"hoşgeldiniz",
			"ようこそ",					"أهلا بك",
			"benvinguda",
			"欢迎",
			"vítejte",
			"velkomst",
			"welkom",
			"bienvenue",
			"willkommen",
			"καλωσόρισμα",
	"ברוך הבא",
			"selamat datang",
			"fáilte",
			"ようこそ",
			"환영",
			"velkommen",
			"witamy",
			"Добро пожаловат",
			"bienvenido",
			"välkommen",
			"ยินดีต้อนรับ",
			"hoan nghênh",
		];
		
		welcomeInt = setInterval(function(){
			
			if( !settings.playing ) return true;
			
			var txt = welcome[ Math.floor( Math.random() * welcome.length ) ];
			
			$el.text( txt );
			
		}, 3000);
		
		//console.log( instance );
};  