/****************************************************************************************
* for support info on how to use YouTubeHTML5Decoder.js                                 *
* check out the project at https://github.com/Patrick-W-McMahon/YouTubeHTML5Decoder     *
* further updates and tutorials are provided.                                           *
****************************************************************************************/
;(function($,window,document,undefined){
	var pluginName="YT5D";
	var self;
	var defaults={
		decoder:"youtubeinmp4",
		preBuf:false,
		inlineSrc:true,
		flashFallBack:false,
		keyLength:60,
	};
	
	$.fn[pluginName]=function(options){
		return this.each(function(){
			if(!$.data(this,'plugin_'+pluginName)){
				$.data(this,'plugin_'+pluginName,new Plugin(this,options));
			}
		});
	}
	
	//Plugin constructor
	function Plugin(element,options){
		self = this;
		this.element = element;
		this.options = $.extend({},defaults,options);
		this._defaults = defaults;
		this._name = pluginName;
		
		this.init();
		return this;
	}
	
	Plugin.prototype.init=function(){
		var yt_id = $(this.element).attr("youtube_id");
		$(this.element).attr("poster","http://img.youtube.com/vi/"+yt_id+"/default.jpg");
		var key = userKeyGen(this.options['keyLength']);
		var src = 'http://youtubeinmp4.com/redirect.php?video='+yt_id+'&r='+key;
		if(this.options['inlineSrc']){
			var video = this.element;
			video.src = src;
			//video.load();
			video.controls = true;
			if(this.options['preBuf']){
				video.muted = true; 
				video.play();
				video.addEventListener("timeupdate", function() {
					if (this.currentTime > 0) {
						this.pause();
						video.muted = false;
						video.currentTime = 0
						this.removeEventListener("timeupdate", arguments.callee, false);
						video.addEventListener("progress", function() {
							if (Math.round(video.buffered.end(0)) / Math.round(video.seekable.end(0)) == 1) {
								document.body.appendChild(video);
								this.removeEventListener("progress", arguments.callee, false);
							}
						}, false);
					}
				}, false);
			}
		}else{
			var srcTag = $("<source src='"+src+"' type=\"video/mp4\" />").appendTo(this.element);
		}
		if(this.options['flashFallBack']){
			var frmTag = $("<iframe src='https://www.youtube.com/v/"+yt_id+"?rel=0' frameborder='0' allowfullscreen></iframe>").appendTo(this.element);
		}
		
		$(this.element).onplay = function(){
			console.log("play");
			var yt_id = $(this.element).attr("youtube_id");
			$(this.element).attr("poster","http://img.youtube.com/vi/"+yt_id+"/default.jpg");
			var key = userKeyGen(this.options['keyLength']);
			var src = 'http://youtubeinmp4.com/redirect.php?video='+yt_id+'&r='+key;
			var video = this.element;
			video.src = src;
			video.play();
		};
	}
	
	function userKeyGen(length){
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < length; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}
	
})(jQuery,window,document);
