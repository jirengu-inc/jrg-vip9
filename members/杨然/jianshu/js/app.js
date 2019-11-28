var app = angular.module('jianshu', []);

app.controller('index', function($scope, $http){
	//当前分类
	$scope.categoryNow = 1;
	//分类列表
	$scope.categoryList = [];
	//每次执行获取修改当前id并同步当前文章列表
	$scope.setCategoryNow = function(now){
		if (now != $scope.categoryNow) {
			$scope.articles = [];
			$scope.nowPage = 1;
		}
		$scope.categoryNow = now;
		getArticleList()
	}




	$http.get('/category').success(function(res){
		if (res.code === 100) {
			$scope.categoryList = res.data;
		} else {
			alert('分类列表获取出错code:' + res.code);
		}
	}).error(function(){
		alert('分类列表获取出错');
	})

	//获取文章列表
	//$http.get('url', {pargms:{a:1,b:2}}.success(function(res){//todo}).error(function(){//todo}))
	$scope.nowPage = 1;
	$scope.articles = [];
	getArticleList();
	function getArticleList(){
		$http.get('/articles', {params: {
			categoryId: $scope.categoryNow,
			page: $scope.nowPage
		}}).success(function(res){
			if (res.data.length === 0) {
				alert('当前分类已经没有文章了');
			}
			for (var i = 0; i < res.data.length; i++) {
				$scope.articles.push(res.data[i])
			}
			$scope.nowPage ++;
			
		}).error(function(){
			alert('获取文章列表出错');
		})
	}
	
	//获取当前分类的下一页
	
	$scope.nextPage = function(){
		getArticleList();
	}

});



//浏览文章
app.controller('article', function($scope, $http){
	//点击文章标题后取文章id
	$scope.articleId = window.location.search.substring(1).split('=')[1]

	$http.get('/articleInfor', {params: {
		articleId: $scope.articleId
	}}).success(function(res){
		$scope.main = res.data.content;
		$scope.mainTitle = res.data.title;
	}).error(function(){
		alert('获取文章列表出错');
	})
})



app.filter('showAsHtml', function($sce){
	return function(input){
		return $sce.trustAsHtml(input);
	}
})