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
	$("#idate").val('').scroller('destroy').scroller($.extend(opt['date'], opt['init']));
}
$("#speed").on("pageshow",function(e){
    jQuery.validator.addMethod("isFloat", function(value, element) {
        return this.optional(element) || /^[-\+]?\d+(\.\d+)?$/.test(value);
    }, "只能包含数字、小数点等字符");
    jQuery.validator.addMethod("notEqualZero", function(value, element) {
    	return this.optional(element) || value!=0;
    }, "非法输入值");
    buildDate();
    buildSpeedType();
    $("#speedForm").validate({
        rules:{
            idate:{
                required:true
            },
            imoney:{
                required:true,
                isFloat:true
            },
            isource:{
            	notEqualZero:true
            },            
            imemo:{
                required:true,
                rangelength:[2,50]
            }
        },
        //自定义验证信息
        messages:{
            idate:{
                required:"请输入日期"
            },
            imoney:{
                required:"请输入金额",
                isFloat:"只能输入数字类型"
            },
            isource:{
            	notEqualZero:"必填项"
            },
            imemo:{
                required:"请填写备注信息",
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
        	savespeed();
        }
    });

});
function savespeed(){
	doNotLogin();
    showLoading('信息保存中...','',false);
    $.ajax({
        type: 'POST',
        url:Config.root+ "speed/save" ,
        data:$("#speedForm").serialize(),
        dataType: "json",
        success:function(data){
        	showLoading(data.msg,'',true);
            if(data.flag){
            	$("#speedForm")[0].reset();
            }
            setTimeout(function(){hideLoading()}, 1500);

        }
    });
}
function buildSpeedType(){
	doNotLogin();
	 var htmlc= $.ajax({
	        type: 'POST',
	        url:Config.root+ "category/getall4speedtyp" ,
	        dataType: "json",
           async:"false",
	        success:function(data){
	            if(data.flag){
	                var json=eval(data.result);
	                $("#isource").empty();
	                if(json.length>0){
	                	for(i=0;i<json.length;i++){
	                		$("#isource").append("<option value='"+json[i].id+"'>"+json[i].icategory+"</option>");
	                	}
	                	$("#isource").selectmenu("refresh", true);
	                }
	            }else{
	            	$(".js-nodata").click(function(){$("#isource").selectmenu("close");location.href=location.href='type.html';});
	            }

	        }
	    });
}