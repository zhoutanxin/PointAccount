/**
 * Created by Administrator on 2015-09-25.
 */
var typeflg=1;
$("#type").on("pageshow",function(e){
	loadlist4IncomeType();
	$("body").perfectScrollbar({suppressScrollX:true});
	$("input[name='categoryflag']").change(function(){
		typeflg=$(this).val();
		loadListByTypeVal($(this).val());
	});
    $("#typeForm").validate({
        rules:{
        	icategory:{
                required:true,
                rangelength:[2,8]
            },
            says:{
                rangelength:[0,30]
            }
        },
        //自定义验证信息
        messages:{
        	icategory:{
                required:"请输入类型名称",
                rangelength:$.validator.format("类型长度必须在{0}-{1} 字符以内")
            },
            says:{
                rangelength:$.validator.format("备注必须在{0}-{1} 字符以内")
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
        	savecategory();
        }
    });

});
$("#type").on("pagecreate",function(){
//	loadlist4IncomeType();
});
function savecategory(){
	doNotLogin();
    showLoading('信息保存中...','',false);
    $.ajax({
        type: 'POST',
        url:Config.root+ "category/save" ,
        data:$("#typeForm").serialize(),
        dataType: "json",
        success:function(data){
        	showLoading(data.msg,'',true);
            if(data.flag){
            	loadListByTypeVal(typeflg);
            	$("input[name='icategory']").val("");
            	$("input[name='says']").val("");
            }
            setTimeout(hideLoading(), 1500);

        }
    });
}
function loadListByTypeVal(categoryflg){
	if(categoryflg==1){
		loadlist4IncomeType();
	}else{
		loadlist4SpeedType();
	}
}
function loadlist4IncomeType(){
	doNotLogin();
	 var htmlc= $.ajax({
	        type: 'POST',
	        url:Config.root+ "category/getall4incometyp" ,
	        dataType: "json",
           async:"false",
	        success:function(data){
	        	var noData="<tr><td colspan='2'>暂无数据</td></tr>";
	        	$("table tr").first().siblings().remove();
	            if(data.flag){
	                var json=eval(data.result);
	                if(json.length>0){
	                	for(i=0;i<json.length;i++){
	                		$("table tr").first().after("<tr onclick=\"location.href='typeItem.html?categoryId="+json[i].id+"&categoryflag=1';\"><td>"+json[i].icategory+"</td><td>"+json[i].says+"</td></tr>");
	                	}
	                }
	            }else{
                	$("table tr").first().after(noData);
                }

	        }
	    });
}
function loadlist4SpeedType(){
	doNotLogin();
	var htmlc= $.ajax({
		type: 'POST',
		url:Config.root+ "category/getall4speedtyp" ,
		dataType: "json",
		async:"false",
		success:function(data){
			var noData="<tr><td colspan='2'>暂无数据</td></tr>";
			$("table tr").first().siblings().remove();
			if(data.flag){
				var json=eval(data.result);
				if(json.length>0){
					for(i=0;i<json.length;i++){
						$("table tr").first().after("<tr onclick=\"location.href='typeItem.html?categoryId="+json[i].id+"&categoryflag=2';\"><td>"+json[i].icategory+"</td><td>"+json[i].says+"</td></tr>");
					}
				}
			}else{
				$("table tr").first().after(noData);
			}
			
		}
	});
}