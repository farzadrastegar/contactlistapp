var contactListApp = angular.module('contactListApp', []);

contactListApp.controller('AppCtrl', function($scope, $http){
	console.log("Hello world from controller.js");

	var refresh = function(){
		$http.get('/contactlist').success(function(response){
			console.log('i got the data in controller.js');
			$scope.contactlist = response;
			$scope.contact = "";
		});
	};

	refresh();

	$scope.addContact = function(){
		if ($scope.contact != ""){
			console.log($scope.contact);
			$http.post('/contactlist', $scope.contact).success(function(response){
				console.log(response);
				refresh();
			});
		}
	};

	$scope.remove = function(id){
		console.log(id);
		$http.delete('/contactlist/' + id).success(function(response){
			refresh();
		});
	};

	$scope.edit = function(id){
		console.log(id);
		$http.get('/contactlist/' + id).success(function(response){
			$scope.contact = response;
		});
	};

	$scope.update = function(){
		if ($scope.contact != ""){
			console.log($scope.contact._id);
			$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
				refresh();
			});
		}
	};

	$scope.deselect = function(){
		$scope.contact = "";
	};
});

