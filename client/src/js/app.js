var app = angular.module('DirectoryManager',['ngRoute']);

//routing
app.config(function($routeProvider){
	$routeProvider
    	.when('/', { 
        	controller:'DirectoryManagerController', 
        	templateUrl:'views/directory.html'
      	})

      	.when('/:param*',{
      		controller:'DirectoryManagerController',
      		templateUrl:'views/directory.html'
      	})
      
      	.otherwise('/')
});
				
app.controller('DirectoryManagerController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

	function init_stage()
	{
		$http.get('/searchDirectory/')
		.success(function(data, status) {
			$scope.data = sortArray(data);
			$scope.arr = [];
		});	
	};

	function init()
	{
		var param = window.location.href.split('/#/');
		if(param[1])
		{
			getdata(param[1]);
		}
		else
		{
			init_stage();
		}	
	};
	init();

	function getdata(query) {
		$http.get('/searchDirectory/' + query)
		.success(function(data, status) {
			$scope.data = sortArray(data);
			$scope.data.root = data.user_path;
			var split = $scope.data.root.split("/");
			$scope.arr = [];
			for(i=1;i<split.length;i++) {
				$scope.arr.push(split[i]);
			}
		})
	};

	function sortArray(data)
	{
		var result = [];
		for(i=0;i<data.children.length;i++)
		{
			result[i] = {name:"",path:"",type:"",download_path:""};
			result[i].name = data.children[i].name;
			result[i].path = data.children[i].user_path;
			result[i].type = data.children[i].type;
			if(data.children[i].path)
			{
				var split = data.children[i].path.split('../client/src/');
				result[i].download_path = split[1];
			}
		}
		return result;
	};

	$scope.show_children = function(path)
	{
		var trimPath = path.substring(path.indexOf('/')+1);
		$location.path('/' + trimPath);
	};

	$scope.back_children = function(data, val)
	{
		if(val === 'Root')
		{
			init_stage();
			$location.path('/');
		}
		else
		{
			var split = data.root.split(val);
			var trimPath = split[0] + val;
			$location.path(trimPath);		
		}	
	}
	
}]);

