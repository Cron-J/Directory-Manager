var app = angular.module('DirectoryManager',['ngRoute','ngCookies']);

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
				
app.controller('DirectoryManagerController', ['$scope', '$http', '$location', '$cookieStore', '$timeout', function ($scope, $http, $location, $cookieStore, $timeout) {
	var count=0;
	function init_stage()
	{
		$http.get('/searchDirectory')
		//$http.get('/searchDirectory/?query='+ getuserId())
		.success(function(data, status) {
			$scope.data = sortArray(data);
			$scope.arr = [];
		});	
	};
	
	// $timeout(function() {
 //       		$cookieStore.put('key',""); 
 //    	}, 300000);	


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

	// if(window.location.href.indexOf("/Tenants/") > -1)
	// {
 //    	var splitData = window.location.href.split("/Tenants/");
 //    	if(splitData)
 //    	{
 //    		$cookieStore.put('key',splitData[1].split("/")[0]);
 //    		count++;
 //    	}	
	// }

	function getdata(query) {
		$http.get('/searchDirectory/' + query)
		.success(function(data, status) {
			if(data != 'Invalid Path' )
			{	
				$scope.data = sortArray(data);
				$scope.data.root = $location.path();
				$scope.data.absurl = data.absurl;
				var split = $scope.data.root.split("/");
				$scope.arr = [];
				for(var i=1;i<split.length;i++) {
					$scope.arr.push(split[i]);
				}
				var path = ""; 
				for(var i=0;i<split.length;i++)
				{
					path +=  split[i] + '/';
				}
				var trimPath = path.substring(0, path.length - 1);
				$location.path(trimPath);
			}
			else
			{
				$scope.error = data;
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

	$scope.show_children = function(absurl,name)
	{
		if(absurl)
		{
			$location.path('/' + absurl + '/' + name);
		}
		else
		{
			$location.path('/' + name);
		}
		
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

function isEmpty(obj)
{
	for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
};


// function getParameterByName(name) {
//     name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//     var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
//         results = regex.exec(location.search);
//     return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
// }

// function getuserId()
// {
// 	var userId = getParameterByName('user');
// }

