/**
 * Created by Administrator on 2015-09-25.
 */

function loadMemberInfo(){
	doNotLogin();
	 var htmlc= $.ajax({
	        type: 'POST',
	        url:Config.root+ "memberInfo" ,
	        dataType: "json",
            async:"false",
	        success:function(data){
	            if(data.flag){
	                var json=eval(data.result);
                    $("#niceName").val(json.niceName);
                    $("#mobilePhone").val(json.mobilePhone);
                    $("#imail").val(json.imail);
                    $("#realName").val(json.realName);
                    if(json.brithday!=null){
                    	$("#brithday").val(new Date(json.brithday.time).format("yyyy-MM-dd"));
                    }
                    if(json.gender==1){
                        $("#male").prop("checked", true).checkboxradio("refresh");
                    }else{
                        $("#female").prop("checked", true).checkboxradio("refresh");
                    }
	            }

	        }
	    });
}
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
        startYear:currYear - 100, //开始年份
        endYear:currYear //结束年份
	};
	$("#brithday").val('').scroller('destroy').scroller($.extend(opt['date'], opt['init']));
}
$("#accountInfo").on("pageshow",function(e){
	buildDate();
	loadMemberInfo();
    $("#accountInfoForm").validate({
        rules:{
            niceName:{
                required:true,
                rangelength:[0,10]
            },
            realName:{
                rangelength:[0,8]
            }
        },
        //自定义验证信息
        messages:{
            niceName:{
                required:"请输入昵称",
                rangelength:$.validator.format("昵称必须在{0}-{1} 字符以内")
            },
            realName:{
                rangelength:$.validator.format("真实姓名必须在{0}-{1} 字符以内")
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
        	updInfo();
        }
    });

});
function updInfo(){
	doNotLogin();
    showLoading('信息修改中...','',false);
    $.ajax({
        type: 'POST',
        url:Config.root+ "updInfo" ,
        data:$("#accountInfoForm").serialize(),
        dataType: "json",
        success:function(data){
            if(data.flag){
            	loadMemberInfo();
            }
            showLoading(data.msg,'',true);
            setTimeout(hideLoading(), 1500);

        }
    });
}