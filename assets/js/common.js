function doNotLogin(){
	if(!Config.ifLogin){
//		$.mobile.changePage(Config.login,{transition: 'flip'});
		location.href=Config.login;
		hideLoading();
	}
}
$(document).bind("mobileinit", function() {
    $.mobile.ajaxEnabled=false;
//    $.mobile.linkBindingEnabled = false;
//    $.mobile.hashListeningEnabled = false;
});
$(function(){
	Config.ifLogin=getLoginFlg();	
	(function ($) {
	    $.getUrlParam = function (name) {
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	        var r = window.location.search.substr(1).match(reg);
	        if (r != null) return unescape(r[2]); return null;
	    }
	})(jQuery);
});
function getLoginFlg(){
    var flg=false;
    $.ajax({
        type: 'POST',
        url:Config.root+ "chklogin" ,
        dataType: "json",
        async:false,
        success:function(data){
            if(data==true){
                flg= true;
            }
        }
    });
    return flg;
}
function showLoading(txt,htm,txtonly){
    $.mobile.loading('show', {
        text: txt, //加载器中显示的文字
        textVisible: true, //是否显示文字
        theme: 'b',        //加载器主题样式a-e
        textonly: txtonly,   //是否只显示文字
        html: htm          //要显示的html内容，如图片等
    });
}
function hideLoading(){
	$.mobile.loading('hide');
}
