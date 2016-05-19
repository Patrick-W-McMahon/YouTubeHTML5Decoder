;(function($,window,document,undefined){
	var pluginName="YT5D";
	var self;
	var defaults={};

	
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
		var srcTag = $("<source src='http://youtubeinmp4.com/redirect.php?video="+yt_id+"' type='video/mp4' />").appendTo(this.element);
		//var frmTag = $("<iframe src='https://www.youtube.com/v/"+yt_id+"?rel=0' frameborder='0' allowfullscreen></iframe>").appendTo(this.element);
	}
	
})(jQuery,window,document);