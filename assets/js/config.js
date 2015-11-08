/**
 * Created by Administrator on 2015-09-25.
 */
Config={};
Config.domain="http://pa.doadway.com:8080";
Config.ctx="GlodmineSever";
Config.root=Config.domain+"/"+Config.ctx+"/";
Config.appName="glodmineApp";
Config.login="login.html";
Config.ifLogin=	false;

Config.COOKIE_VALID_CODE ="valid_code";
Config.COOKIE_SMS_CODE ="sms_code";

Date.prototype.format =function(format)
{
	var o = {
	"M+" : this.getMonth()+1, //month
	"d+" : this.getDate(), //day
	"h+" : this.getHours(), //hour
	"m+" : this.getMinutes(), //minute
	"s+" : this.getSeconds(), //second
	"q+" : Math.floor((this.getMonth()+3)/3), //quarter
	"S" : this.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
	(this.getFullYear()+"").substr(4- RegExp.$1.length));
	for(var k in o)if(new RegExp("("+ k +")").test(format))
	format = format.replace(RegExp.$1,
	RegExp.$1.length==1? o[k] :
	("00"+ o[k]).substr((""+ o[k]).length));
	return format;
}
String.format = function () {
	if (arguments.length == 0)
	return null;
	var str = arguments[0];
	for (var i = 1; i < arguments.length; i++) {
	var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
	str = str.replace(re, arguments[i]);
	}
	return str;
};
Config.importJs=function(jspath){
	if(jspath instanceof Array){
		for(i=0;i<jspath.length;i++){
			document.write('<scr'+'ipt src="'+Config.root+Config.appName+'/'+jspath[i]+'"></scr'+'ipt>');
		}
	}else{
		document.write('<scr'+'ipt src="'+Config.root+Config.appName+'/'+jspath+'"></scr'+'ipt>');
	}
}
Config.importCss=function(csspath){
	var html_doc = document.getElementsByTagName('head')[0];

	if(csspath instanceof Array){
		for(i=0;i<csspath.length;i++){
		    css = document.createElement('link');
		    css.setAttribute('rel', 'stylesheet');
		    css.setAttribute('type', 'text/css');
			css.setAttribute('href', Config.root+Config.appName+'/'+csspath[i]);
			html_doc.appendChild(css);
//			document.write('<cs'+'s rel="stylesheet" src="'+Config.root+Config.appName+'/'+csspath[i]+'"></cs'+'s>');
		}
	}else{
	    css = document.createElement('link');
	    css.setAttribute('rel', 'stylesheet');
	    css.setAttribute('type', 'text/css');
		css.setAttribute('href', Config.root+Config.appName+'/'+csspath);
		html_doc.appendChild(css);		
//		document.write('<cs'+'s rel="stylesheet" src="'+Config.root+Config.appName+'/'+csspath+'"></cs'+'s>');
	}
}