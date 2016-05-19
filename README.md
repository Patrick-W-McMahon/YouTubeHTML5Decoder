# YouTubeHTML5Decoder
decodes a youtube video into a format that can be played using a native html5 Video tag

go to the youtube video you want to use. in the url you will see the V value for example:

https://www.youtube.com/watch?v=b6WSh3xOwWs

all we need from this url is the V value so we copy b6WSh3xOwWs and add it to the youtube_id attribute of our video tag. 



		<script src="/js/YouTubeHTML5Decoder.js" type="text/javascript"></script>
		
		<script>
				$(function(){
					$("#player").YT5D();
				});
		</script>
		
		<video id="player" youtube_id="b6WSh3xOwWs" preload="none" poster="" controls></video>  
