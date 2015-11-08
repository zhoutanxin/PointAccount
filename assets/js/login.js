/**
 * Created by Administrator on 2015-09-25.
 */
$("#login").on("pageshow",function(e){
    jQuery.validator.addMethod("mobile", function(value, element) {
        var length = value.length;
        var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    },"请输入正确的手机号码");
    $("#loginForm").validate({
        rules:{
            mobilePhone:{
                required:true,
                mobile:true
            },
            password:{
                required:true,
                rangelength:[6,20]
            }
        },
        //自定义验证信息
        messages:{
            mobilePhone:{
                required:"手机号码不能为空",
                mobile:"请输入正确的手机号码"
            },
            password:{
                required:"密码不能为空",
                rangelength:$.validator.format("密码长度必须在 {0}-{1} 字符")
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
            login();
        }

    });

});
function login(){
    $.mobile.loading('show', {
        text: '登录中...', //加载器中显示的文字
        textVisible: true, //是否显示文字
        theme: 'b',        //加载器主题样式a-e
        textonly: false,   //是否只显示文字
        html: ""           //要显示的html内容，如图片等
    });
    $.ajax({
        type: 'POST',
        url:Config.root+ "login" ,
        data:$("#loginForm").serialize(),
        dataType: "json",
        crossDomain: true,
        success:function(data){
            if(data.flag){
                var json=eval(data.msg)
                Config.ifLogin=true;
                $.mobile.loading('hide');
//                $.mobile.changePage('index.html',{transition: 'flip'});
                location.href="index.html";
            }else{
                $.mobile.loading('show', {
                    text: data.msg, //加载器中显示的文字
                    textVisible: true, //是否显示文字
                    theme: 'b',        //加载器主题样式a-e
                    textonly: true,   //是否只显示文字
                    html: ""           //要显示的html内容，如图片等
                });
                setTimeout(function(){$.mobile.loading('hide')}, 1500);
            }

        }
    });
}