var page1 = document.getElementsByClassName('page')[0];
var page2 = document.getElementsByClassName('page2')[0];
var page3 = document.getElementsByClassName('page3')[0];
var page4 = document.getElementsByClassName('page4')[0];

	page1.addEventListener('touchstart',function(){
		page1.setAttribute('class','page fadeOut');
		page2.setAttribute('class','page page2 fadeIn')
	},false)

	page2.addEventListener('touchstart',function(){
		page2.setAttribute('class','page fadeOut');
		page3.setAttribute('class','page page3 fadeIn');
	},false)

	page3.addEventListener('touchstart',function(){
		page4.setAttribute('class','page page4 fadeIn');
		page3.setAttribute('class','page fadeOut');
	},false)
