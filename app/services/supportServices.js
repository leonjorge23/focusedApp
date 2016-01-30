myApp.factory('chronoService', ['ngAudio', function (ngAudio) {

	function buzz() { // using buzz.js
		var mySound = ngAudio.load("../static/sounds/newmessage.mp3");

		mySound.play();
	}

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
		timer.addEventListener('targetAchieved', function (e) {
			buzz();
		});
	}

	 return {
		 init: init
	 }

}]);

