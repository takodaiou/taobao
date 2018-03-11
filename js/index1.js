$(function(){
	//=======头部选项卡
	var arr=[
	"请输入有关宝贝的信息",
	"请输入有关天猫的信息",
	"请输入有关店铺的信息"]
	$(".topPan").find("span").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		$("#search").attr("placeholder",arr[$(this).index()]);
	});
	//=======左侧边栏
	$("#ul li").hover(function(){
		$(this).find("div").show(400);
	},function(){
		$(this).find("div").hide();
	});
	//=======商品的动画效果开始
	// $("#goods>li").hover(function(){
	// 	$(this).find("span").show();
	// },function(){
	// 	$(this).find("span").hide();
	// });
	//======轮播图
	var idx=0;
	var timer;
	function imgChange(){
		$(".flash>ul>li").eq(idx).fadeIn().siblings().hide();
		$(".flash>ol>li").eq(idx).addClass('active').siblings().removeClass('active');
	};
	function auto(){
		timer =window.setInterval(function(){
			idx<3?idx++:idx=0;
			imgChange();
		},1000);
	};
	auto();
	$(".flash").hover(function(){
		window.clearInterval(timer);
	},function(){
		auto();
	});
	$(".flash>o l>li").mouseover(function(){
		idx=$(this).index();
		imgChange();
	});
	$(".left").click(function(){
		idx>0?idx--:idx=3;
		imgChange();
	});
	$(".right").click(function(){
		idx<3?idx++:idx=0;
		imgChange();
	});
	//=======分享页面
	$(".share").hover(function(){
		$(this).animate({left:"0px"},"slow");
	},function(){
		$(this).animate({left:"-230px"},"slow");
	})
	//======换肤
	$("#down").mouseover(function(){
		$(".imgs").animate({top:"0px"},800);
	});
	$("#up").mouseover(function(){
		$(".imgs").animate({top:"-200px"},800);
	});
	$(".skin>img").mouseover(function(){
		$("#big").attr("src",$(this).attr("src"));
		$("body").css({
			background:"url("+$(this).attr("src")+")"
		});
	})
})