/**
 * Created by Administrator on 2015-09-25.
 */
$("#forgetPwd1").on("pageshow",function(e){
    jQuery.validator.addMethod("mobile", function(value, element) {
        var length = value.length;
        var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    },"请输入正确的手机号码");

    $(".ui-block-b img").attr("src",Config.root+"/validcode.do?"+Math.random());
    $(".ui-block-b img").click(function(){
        $(".ui-block-b img").attr("src",Config.root+"/validcode.do?"+Math.random());

    });
    $("#forgetPwd1Form").validate({
        rules:{
        	mobilePhone:{
                required:true,
                mobile:true,
                remote:{                                          //验证手机号不存在
                    type:"POST",
                    url:Config.root+"hasMob",
                    dataType: "json",
                    data:{
                       mobilePhone:function(){return $("#mobilePhone").val();}
                    }
                }
            },
            validateCode:{
                required:true,
                equalTo:function(){
             	   $.ajax({
           	        type: 'POST',
           	        url:Config.root+ "getVCode" ,
           	        async:false,
           	        dataType: "json",
           	        success:function(data){
           	        	if(data.flag){
           	        		code=data.vcode;
           	        		$("#vcode").val(data.vcode); 
           	        	}else{
           	        		$("#vcode").val(null); 
           	        	}
           	        }
           	    });	
               	return "#vcode";                	
              }
}
        },
        //自定义验证信息
        messages:{
        	mobilePhone:{
                required:"请输入手机号",
                mobile:"请输入正确的手机号码",
                remote:"手机号不存在"
            },
            validateCode:{
                required:"请输入验证码",
                equalTo:"验证码错误"
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
//            $.mobile.changePage('forgetPwd2.html',{transition: 'flip'});
            location.href="forgetPwd2.html";
        	var expiresDate = new Date();
        	expiresDate.setTime(expiresDate.getTime()+(3*60*1000));
            $.cookie("mobilePhone", $("#mobilePhone").val(),{expires:expiresDate}); 
        }
    });
});


var wait=90;
function time(t) {
  if (wait == $(t).val()) {
	   $("#smsCode").attr("disabled",false);
	   $("#smsCode").text("获取验证码").button("refresh");
	   wait = 10;
  } else {
	  $("#smsCode").attr('disabled',"");
	  $("#smsCode").text("等待(" + wait + ")").button("refresh");
	   wait--;
	   setTimeout(function() {time(t);},1000);
  }
}

function sendSms(){
	 showLoading('验证码发送中...','',false);
	$.ajax({
       type: 'POST',
       url:Config.root+ "sendSms?type=pwd" ,
       dataType: "json",
       data:{"mobilePhone":$("#mobilePhone").val()},
       success:function(data){
           if(data.flag){
               showLoading('验证码发送成功','',false);
           }
           showLoading(data.msg,'',true);
           setTimeout(hideLoading(), 1000);

       }
   });
}
$("#forgetPwd2").on("pageshow",function(e){
	$("#smsCode").click( function () { 
		time(this);
		sendSms();
	});
	var paramPhone=$.cookie("mobilePhone"); 
	if(paramPhone==null||paramPhone==''){
		location.href="forgetPwd1.html";
		return;
	}	
	$("#mobilePhone").val(paramPhone);
	$("#showMobile").val(paramPhone.replace(paramPhone.substr(3,4),"****"));
	$("#forgetPwd2Form").validate({
		rules:{
			mobCode:{
				required:true,
//				equalTo:"#scode"
				equalTo:function(){            	   
	              	   $.ajax({
	              	        type: 'POST',
	              	        url:Config.root+ "getSmsCode?type=pwd" ,
	              	        async:false,
	              	        dataType: "json",
	              	        success:function(data){
	              	        	if(data.flag){
	              	        		code=data.smscode;
	              	        		$("#scode").val(data.smscode); 
	              	        	}else{
	              	        		$("#scode").val(null); 
	              	        	}
	              	        }
	              	    });	
	                  	return "#scode";   
               }
			}
		},
		//自定义验证信息
		messages:{
			mobCode:{
				required:"请输入验证码",
				equalTo:"验证码错误"
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
//			$.mobile.changePage('forgetPwd3.html',{transition: 'flip'});
			location.href="forgetPwd3.html";
		}
	});
});
$("#forgetPwd3").on("pageshow",function(e){
	var paramPhone=$.cookie("mobilePhone");
	if(paramPhone==null||paramPhone==''){
		location.href="forgetPwd1.html";
		return;
	}
	$("#mobilePhone").val(paramPhone);
	$("#forgetPwd3Form").validate({
		rules:{
			password:{
                required:true,
                rangelength:[6,20]
            },
            comfrimNewPwd:{
                equalTo:"#password"
            }            
		},
		//自定义验证信息
		messages:{
			password:{
                required:"密码不能为空",
                rangelength:$.validator.format("密码长度必须在 {0}-{1} 字符.")
            },
            comfrimNewPwd:{
                equalTo:"两次输入密码必须一致"
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
			updatePwd();
		}
	});
});
function updatePwd(){
    showLoading('密码修改中...','',false);
    $.ajax({
        type: 'POST',
        url:Config.root+ "updatePwd" ,
        data:$("#forgetPwd3Form").serialize(),
        dataType: "json",
        success:function(data){
            if(data.flag){
            	$.mobile.changePage('modifyOk.html',{transition: 'flip'});
            }
            showLoading(data.msg,'',true);
            setTimeout(hideLoading(), 1500);
//            $.cookie('mobilePhone', '', {expires: -1});

        }
    });
}