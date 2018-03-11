$(function(){
	var stock=0;
	$(".addcar").click(function(){
		var name=$(this).parent().find("em").text();
		var price=$(this).parent().find("strong").text();
		var stock=$(this).parent().find("i").text();
		price=price.substring(0,price.length-1);
		stock=stock.substring(0,stock.length-1);
		if(stock<=0){
			alert("没有库存");
			return;
		}else{
			stock--;
			$(this).parent().find("i").text(stock+"件");
		}
		//添加到购物车
		var trs=$("#orderlist>tr");
		for(var i=0;i<trs.length;i++){
			var gds=trs.eq(i).children();
			var gname=gds.eq(0).html();
			if(gname==name){
				//获取数量值
				var num=parseInt(gds.eq(2).children().eq(1).val());
				gds.eq(2).children().eq(1).val(++num);
				gds.eq(3).html(price*num);
				gettotal()
				return;	
			}
		}
		//新建单元格
		var nametd=$("<td>").text(name);
		var pricetd=$("<td>").text(price);
		var subbut=$("<input>").prop("type","button").prop("value","-").prop("class","butsty");
		var numtxt=$("<input>").prop("type","text").prop("value","1").prop("readonly","readonly");
		var addbut=$("<input>").prop("type","button").prop("value","+").prop("class","butsty");
		var numtd=$("<td>").append(subbut).append(numtxt).append(addbut);
		var cashtd=$("<td>").text(price);
		var closebut=$("<input>").prop("type","button").prop("value","X").prop("class","butsty");
		var closetd=$("<td>").append(closebut);
		var tr=$("<tr>").append(nametd).append(pricetd).append(numtd).append(cashtd).append(closetd);
		$("#orderlist").append(tr);
		addbut.click(function(){
			var num=parseInt($(this).prev().val());
			if(stock<=0){
				alert("没有库存");
				return;
			}
			else{
				var n1=$(this).parent().siblings("td:eq(0)").text();
				stock=$("#goods em:contains('"+n1+"')").next().next().text();
				stock=stock.substring(0,stock.length-1);
				stock--; 
				$("#goods em:contains('"+n1+"')").next().next().text(stock+"件");
				$(this).prev().val(++num);
				var price=parseInt($(this).parent().prev().html());
				$(this).parent().next().text(price*num);
			}
			gettotal()		
		})
		subbut.click(function(){
			var num=parseInt($(this).next().val());
			if(num<=1){
				if(window.confirm("是否删除该行记录"))
					$(this).parent().parent().remove();
				return;
			}
			else{
				var n1=$(this).parent().siblings("td:eq(0)").text();
				stock=$("#goods em:contains('"+n1+"')").next().next().text();
				stock=stock.substring(0,stock.length-1);
				stock++; 
				$("#goods em:contains('"+n1+"')").next().next().text(stock+"件");
				$(this).next().val(--num);
				var price=parseInt($(this).parent().prev().html());
				$(this).parent().next().text(price*num);
			}
			gettotal()		
		})
		closebut.click(function(){
			if(window.confirm("是否删除该行记录")){
				var num=parseInt($(this).parent().siblings("td:eq(2)").children().eq(1).val());
				var n1=$(this).parent().siblings("td:eq(0)").text();
				var n2=parseInt($("#goods em:contains('"+n1+"')").next().next().text());
				$("#goods em:contains('"+n1+"')").next().next().text((num+n2)+"件");
				$(this).parent().parent().remove();
				gettotal()
			}
		})
	gettotal()
	})
	function gettotal(){
		var trs=$("#orderlist tr");
		var amount=0;
		for(var i=0;i<trs.length;i++){
			var money=parseInt(trs.eq(i).children().eq(3).html());
			amount+=money;
		}
		$("#total").html("总计:"+amount);
	}
})
