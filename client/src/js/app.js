var app = angular.module('DirectoryManager',[]);
				
app.controller('DirectoryManagerController', ['$scope', '$http', function ($scope, $http) {

	$scope.init_stage = function ()
	{
		$http.get('/searchDirectory/')
		.success(function(data, status) {
			$scope.data = [];
			for(i=0;i<data.children.length;i++)
			{
				$scope.data[i] = {name:"",path:"",type:""};
				$scope.data[i].name = data.children[i].name;
				$scope.data[i].path = data.children[i].user_path;
				$scope.data[i].type = data.children[i].type;
			}
			$scope.arr = [];
		});	
	};

	$scope.init_stage();

	function getdata(query) {
		$http.get('/searchDirectory' + query)
		.success(function(data, status) {
			$scope.data = [];
			for(i=0;i<data.children.length;i++)
			{
				$scope.data[i] = {name:"",path:"",type:""};
				$scope.data[i].name = data.children[i].name;
				$scope.data[i].path = data.children[i].user_path;
				$scope.data[i].type = data.children[i].type;
			}
			$scope.data.root = data.user_path;
			var split = $scope.data.root.split("/");
			$scope.arr = [];
			for(i=1;i<split.length;i++) {
				$scope.arr.push(split[i]);
			}
		})
	}

	$scope.show_children = function(path, index)
	{
		getdata(path);
	};

	$scope.back_children = function(data, val)
	{
		if(val === 'Root')
		{
			$scope.init_stage();
			$scope.arr = [];
		}
		else
		{
			var split = data.root.split("/" + val);
			var query = split[0] + "/" + val;
			getdata(query);			
		}	
	}
	
}]);