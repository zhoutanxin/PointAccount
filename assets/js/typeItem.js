/**
 * Created by Administrator on 2015-09-25.
 */
$("#typeItem").on("pageshow",function(e){
	if($.getUrlParam("categoryflag")==1){
		loadIncomeType();
	}else{
		loadSpeedType();
	}
    $("#typeItemForm").validate({
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
        	updcategory();
        }
    });
});
function loadIncomeType(){
	doNotLogin();
	 var htmlc= $.ajax({
	        type: 'POST',
	        url:Config.root+ "category/findIncome" ,
	        dataType: "json",
	        async:"false",
	        data:{'categoryId':$.getUrlParam("categoryId")},
	        success:function(data){
	            if(data.flag){
	             var json=eval(data.result);
	             $("#categoryflag").val($.getUrlParam("categoryflag"));
	             $("#id").val($.getUrlParam("categoryId"));
                 $("#icategory").val(json.icategory);
                 $("#says").val(json.says);
	            }

	        }
	    });
}
function loadSpeedType(){
	doNotLogin();
	var htmlc= $.ajax({
		type: 'POST',
		url:Config.root+ "category/findSpeed" ,
		dataType: "json",
		async:"false",
		data:{'categoryId':$.getUrlParam("categoryId")},
		success:function(data){
			if(data.flag){
				var json=eval(data.result);
				$("#categoryflag").val($.getUrlParam("categoryflag"));
				$("#id").val($.getUrlParam("categoryId"));
				$("#icategory").val(json.icategory);
				$("#says").val(json.says);
			}
			
		}
	});
}

function updcategory(){
	doNotLogin();
    showLoading('信息保存中...','',false);
    var htmlc=$.ajax({
        type: 'POST',
        url:Config.root+ "category/update" ,
        data:$("#typeItemForm").serialize(),
        dataType: "json",
        success:function(data){
        	showLoading(data.msg,'',true);
            if(data.flag){
            	setTimeout(function(){hideLoading()}, 1500);
            }

        },
        error:function(XMLHttpRequest){
        	if(XMLHttpRequest.status==404){
        		showLoading('404错误','',true);
        		setTimeout(function(){hideLoading();}, 2000);
        		
        	};
        	
        }
    });
}
function delCategory(){
	doNotLogin();
    showLoading('信息删除中...','',false);
    var htmlc=$.ajax({
        type: 'POST',
        url:Config.root+ "category/delete" ,
        data:{"id":$.getUrlParam("categoryId"),"categoryflag":$.getUrlParam("categoryflag")},
        dataType: "json",
        success:function(data){
        	showLoading(data.msg,'',true);
            if(data.flag){
            	setTimeout(function(){hideLoading()}, 1500);
            	location.href='type.html';
            }

        },
        error:function(XMLHttpRequest){
        	if(XMLHttpRequest.status==404){
        		showLoading('404错误','',true);
        		setTimeout(function(){hideLoading()}, 2000);
        		
        	};
        	
        }
    });
}
