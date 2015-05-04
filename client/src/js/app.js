var app = angular.module('uploadApp',[]);

app.controller('uploadController',['$scope', '$http', function($scope, $http){
	
  $scope.upload = function()
	{
		var fd = new FormData();
  	fd.append("upload_file", $scope.upload_file);
  	fd.append("file_name", $scope.upload_file.name);
  	$http.post('/upload', fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
  	})
  	.success(function (data, status) {
      alert("file uploaded succesfully!!")
 		});
	};
}]);	

app.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;
      element.bind('change', function(){
        scope.$apply(function(){ 
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);	
	
