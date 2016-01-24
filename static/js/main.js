$(function(){

	// EasyTymer Chronometer
    var timer = new Timer();
		$('#chronoExample .startButton').click(function () {
			timer.start({countdown: true, startValues: {minutes: 25}});
		});
		$('#chronoExample .pauseButton').click(function () {
			timer.pause();
		});
		$('#chronoExample .stopButton').click(function () {
			timer.stop();
		});
		timer.addEventListener('secondsUpdated', function (e) {
			$('#chronoExample .values').html(timer.getTimeValues().toString());
		});
		timer.addEventListener('started', function (e) {
			$('#chronoExample .values').html(timer.getTimeValues().toString());
		});		


	// temp task listing
	taskListing.init();

});

var taskListing = (function($){

	function init(){
		var task = '';
		$('#submitTask').on('click', function(e){
			e.preventDefault();
			task = $('#taskAtHand').val();
			displayTask(task);
		})
	}

	function displayTask(task){
		$('.task-list').prepend('<li class="list-group-item">' + task + '</li>');
	}

	return {
		init: init
	}

}(jQuery));