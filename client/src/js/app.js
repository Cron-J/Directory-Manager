var app = angular.module('DirectoryManager',[]);
				
app.controller('DirectoryManagerController', ['$scope', '$http', function ($scope, $http) {

	$scope.data = [
		{
			name: "header1",
			path: "/header1",
			type: "folder"
		},
		{
			name: "header2",
			path: "/header2",
			type: "folder"
		}
	];
	$scope.data.root = "/"

	$scope.show_children = function(path, index)
	{
		$http.get('/searchDirectory' + path)
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
	};

	$scope.back_children = function(data, val)
	{
		console.log(val);
		if(val === 'Root')
		{
			$scope.data = [
			{
			name: "header1",
			path: "/header1",
			type: "folder"
			},
			{
				name: "header2",
				path: "/header2",
				type: "folder"
			}];	
			$scope.arr = ""
		}
		else
		{
			var split = data.root.split("/" + val);
			var query = split[0] + "/" + val;

			console.log("query",query);
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
	}
	
}]);