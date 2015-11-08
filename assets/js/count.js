/**
 * Created by Administrator on 2015-09-25.
 */
function buildDate(){
	var currYear = (new Date()).getFullYear();	
	var opt={};
	opt.date = {preset : 'date'};
	opt.datetime = {preset : 'datetime'};
	opt.time = {preset : 'time'};
	opt.init={
		theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式 
        mode: 'mixed', //日期选择模式
		lang:'zh',
        startYear:currYear - 10, //开始年份
        endYear:currYear + 10 //结束年份
	};
	$("#startTime").val('').scroller('destroy').scroller($.extend(opt['date'], opt['init']));
	$("#endTime").val('').scroller('destroy').scroller($.extend(opt['date'], opt['init']));
}
$("#count").on("pageshow",function(e){
	countIncomeByDate();
	buildDate();
	$("body").perfectScrollbar({suppressScrollX:true});
//	$("input[name='categoryflag']").change(function(){
//		$("table tr").first().siblings().remove();
//		if($(this).val()==1){
//			countIncomeByDate();
//		}else{
//			countSpeedByDate();
//		}
//	});	
	$("#income").click(function(){
		$("table tr").first().siblings().remove();
		countIncomeByDate();
		$("input[name='categoryflag']").val("1");
		$(this).prop("checked", true).checkboxradio("refresh");		
	});
	$("#speed").click(function(){
		$("table tr").first().siblings().remove();
		countSpeedByDate();
		$("input[name='categoryflag']").val("2");
		$(this).prop("checked", true).checkboxradio("refresh");		
	});
    $("#countForm").validate({
        rules:{
            startTime:{
                required:true
            },
            endTime:{
                required:true
            }
        },
        //自定义验证信息
        messages:{
            startTime:{
                required:"请输入开始时间"
            },
            endTime:{
                required:"请输入结束时间"
            }
        },
        showErrors: function(errorMap, errorList) {
            this.defaultShowErrors();
            for(var i = 0; i < errorList.length; i++) {
                $(errorList[i].element).one("blur", function() {
                    $("label.error[for='" + (this.id ? this.id : this.name) + "']").remove();
                });
            }
        },
        submitHandler:function(form){
        	$("table tr").first().siblings().remove();
    		if($("input[name='categoryflag']").val()==1){
    			countIncomeByDate();
    		}else{
    			countSpeedByDate();
    		}
        }
    });
});
function countIncomeByDate(){
	doNotLogin();
	showLoading('加载中...','',false);
	 var htmlc= $.ajax({
	        type: 'POST',
	        url:Config.root+ "income/countbydate" ,
	        dataType: "json",
	        data:$("#countForm").serialize(),
	        async : false,
	        success:function(data){
	        	var noData="<tr><td align='center' colspan=\"2\">暂无数据</td></tr>";
	            if(data.flag){
	                var json=eval(data.result);
	                if(json.length>0){
	                	for(var i=0;i<json.length;i++){
	                		$("table").append("<tr><td>"+json[i].icategory+"</td><td>￥"+json[i].imoney.toFixed(2)+"</td></tr>");
	                	}
	                }
	            }else{
	            	stop=false;
	            	$("table").append(noData);
                }
	            setTimeout(function(){hideLoading();}, 1000);
	        }
	    });
}
function countSpeedByDate(){
	doNotLogin();
	showLoading('加载中...','',false);
	var htmlc= $.ajax({
		type: 'POST',
		url:Config.root+ "speed/countbydate" ,
		dataType: "json",
		data:$("#countForm").serialize(),
		async : false,
		success:function(data){
			var noData="<tr><td align='center' colspan=\"2\">暂无数据</td></tr>";
			if(data.flag){
				var json=eval(data.result);
				if(json.length>0){
					for(var i=0;i<json.length;i++){
						$("table").append("<tr><td>"+json[i].icategory+"</td><td>￥"+json[i].imoney.toFixed(2)+"</td></tr>");
					}
				}
			}else{
				stop=false;
				$("table").append(noData);
			}
			setTimeout(function(){hideLoading();}, 1000);
		}
	});
}