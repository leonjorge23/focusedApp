myApp.factory('chronoService', function () {

	function init(){
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
	}

	 return {
		 init: init
	 }

})
