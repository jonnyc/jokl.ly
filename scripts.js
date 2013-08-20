$(function() {

	var audio = $('#audio')[0];

	// Flag and Jokl Pic
	function down() {
		$('#jokl').stop(true, true).delay(9250).animate({
			width: '250px',
			marginLeft: '-125px',
			top: '155px',
			opacity: 1
		},500).addClass('.active');
		get_tweets();
	};

	function up() {
		$('#jokl').stop(true,true).animate({
			width: '500px',
			marginLeft: '-250px',
			top: '10px',
			opacity: 0
		},300).removeClass('.active');
	};

	$('#container').on('click',function() {

		if (!($('#jokl').hasClass('.active'))) {

			audio.play();
			down();

		} else{

			audio.pause();
			up();
			audio.currentTime=0;

		};
		console.log($('#jokl'));
	});

	// DadBoner Twitter Feed
	var search_query = 'DadBoner';
	var tweets = [];
	current_tweet = 0;
	var tweet_time = [];

	function get_tweets() {
		$.ajax({
			url: 'http://search.twitter.com/search.json?q=from:' + search_query,
			dataType: 'jsonp',
			error: function(){console.log('error getting tweets!')},
			success: parse_tweets
		});
	}

	function parse_tweets(data){
		var value_to_push = [];
		for(i=0;i<data.results.length;i++){
			tweets.push(data.results[i].text);
			tweet_time.push(data.results[i].created_at);
		};
		add_tweet(tweets,0);
	};

	function add_tweet(tweets, diff) {
		current_tweet += diff;
		$('#tweets').text(tweets[current_tweet]); 
		$('#time_stamp').text(tweet_time[current_tweet]);
	};

	$('#down').on('click', function(){
		if(current_tweet != tweets.length-1) {
			add_tweet(tweets, 1);
		}
	});

	$('#up').on('click', function(){
		if(current_tweet != 0) {
			add_tweet(tweets, -1);
		}
	});

	get_tweets();

});

