requirejs.config({
	baseUrl:'js/lib',
	paths:{
		app:'../app',
		jquery:'jquery'
	}
});

requirejs(['jquery','app/carousel','app/Exposure','app/LoadMore','app/GoTop'],
	function($,carousel,Exposure,LoadMore,GoTop){
		new GoTop($('.go-top'))
		new carousel($('.carousel'));
		new LoadMore($('.wrap'))
		$('.about-description li').each(function(idx,node){
	new Exposure($(node),function($node){
		$node.animate({'opacity':1},1000)
		})
	})
})