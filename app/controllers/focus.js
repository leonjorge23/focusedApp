myApp.controller('FocusController',
		['$scope', '$rootScope', '$timeout', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', 'chronoService',
			function($scope, $rootScope, $timeout, $firebaseAuth, $firebaseArray, FIREBASE_URL, chronoService) {

				chronoService.init();
				var ref = new Firebase(FIREBASE_URL);
				var auth = $firebaseAuth(ref);

				auth.$onAuth(function(authUser){
					if(authUser){
						var tasksRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/sessions');
						var tasksInfo = $firebaseArray(tasksRef);
						$scope.currentTasks = [];
						$scope.tasks = tasksInfo;

						tasksInfo.$loaded().then(function(data){
							$rootScope.howManyTasks = tasksInfo.length;
							if(tasksInfo.length > 0){
								$scope.sessionMessage = "Here are all you sessions "
							}else {
								$scope.sessionMessage = "What, no sessions? Let's get to work "
								$scope.noSessions = true;
							}
						}); // make sure sessions data is loaded

						$scope.addTask = function(){
							$scope.currentTasks.push({
                 task: $scope.taskname,
								 time: Date.now()
							})
							$scope.taskname='';
						}; // add task

						$scope.deleteTask = function(key){
							$scope.currentTasks.splice(key, 1);
							console.log(key);
						}; // deleteTask

						$scope.addSession = function(){
							tasksInfo.$add({
								date: Firebase.ServerValue.TIMESTAMP,
								tasks: $scope.currentTasks
							}).then(function(){
								$scope.meetingname='';
								$scope.currentTasks = [];
								$scope.message = 'Session was saved';
								// hide message after 2000 ms
								$timeout(function(){
									$scope.startFade = true;
									$scope.hidden = true;
								}, 2000);
							});
						};

						$scope.deleteSession = function(key){
							tasksInfo.$remove(key);
						}; // deleteMeeting
					}
				});
}]);
