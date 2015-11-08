/**
 * Created by Administrator on 2015/9/24 0024.
 */
function showHuoqi(){
    $(".js-huoqi").show();
    $(".js-dingqi").hide();
    resetInfo();
}
function showDingqi(){
    $(".js-dingqi").show();
    $(".js-huoqi").hide();
    resetInfo();
}
function resetInfo(){
    $(".js_cash_total").text("￥0.00");
    $(".js_interest").text("￥0.00");
    $("form[name='calform']")[0].reset();
}
function changeRate(){
    $("#dingqi_rate").val($("#dayLong").val());
    if($("#dayLong").val()==0.25){
        $("#dingqi_rate").val(1.35);
    }else if($("#dayLong").val()==0.5){
        $("#dingqi_rate").val(1.55);
    }else if($("#dayLong").val()==1){
        $("#dingqi_rate").val(1.75);
    }else if($("#dayLong").val()==2){
        $("#dingqi_rate").val(2.35);
    }else if($("#dayLong").val()==3){
        $("#dingqi_rate").val(3);
    }else if($("#dayLong").val()==5){
        $("#dingqi_rate").val(3);
    }
}
function calDingqi(){
    var year=parseFloat($("#dingqi_year").val()/$("#dayLong").val());
    var rate=$("#dingqi_rate").val()/100*$("#dayLong").val();
    var cash=parseFloat($("#dingqi_cash").val());

    //多次支付复利计算
    //var F= cash*(1-Math.pow(rate,year))/(1-rate);
    //一次性计算复利终值
    var F1= cash*(Math.pow(1+rate,year));
    return F1.toFixed(2);
}
function displayDingqi(){
    if($("#dingqi_cash").val()!=''&&$("#dingqi_year").val()!=''&&$("#dingqi_rate").val()!=''){
        var cash=$("#dingqi_cash").val();
        var cash_total=calDingqi();
        $(".js_cash_total").text("￥"+parseFloat(cash_total).toFixed(2));
        $(".js_interest").text("￥"+parseFloat(cash_total-cash).toFixed(2));
    }
}
function calHuoqi() {
    var cash=parseFloat($("#huoqi_cash").val());
    var rate=parseFloat($("#huoqi_rate").val()/100/360);
    var days=parseFloat($("#huoqi_days").val());
    var F1= cash*rate*days;
    return (F1+cash).toFixed(2);
}
function displayHuoqi(){
    if($("#huoqi_cash").val()!=''&&$("#huoqi_days").val()!=''&&$("#huoqi_rate").val()!='') {
        var cash = $("#huoqi_cash").val();
        var cash_total = calHuoqi();
        $(".js_cash_total").text("￥" + parseFloat(cash_total).toFixed(2));
        $(".js_interest").text("￥" + parseFloat(cash_total - cash).toFixed(2));
    }
}
$("#calDeposit").on("pageshow",function(e){
    $("#dayLong").change(function(){
        changeRate();
        displayDingqi();
    });
    //定期交互事件
    $("#dingqi_cash").change(function () {
        displayDingqi();
    });
    $("#dingqi_year").change(function () {
        displayDingqi();
    });
    $("#dingqi_rate").change(function () {
        displayDingqi();
    });
    //活期交互事件
    $("#huoqi_cash").change(function () {
        displayHuoqi();
    });
    $("#huoqi_rate").change(function () {
        displayHuoqi();
    });
    $("#huoqi_days").change(function () {
        displayHuoqi();
    });
    $.fn.numeral = function() {
        $(this).css("ime-mode", "disabled");
        this.bind("keypress",function(e) {
            var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE
            if(!$.browser.msie&&(e.keyCode==0x8))  //火狐下不能使用退格键
            {
                return ;
            }
            return code >= 48 && code<= 57;
        });
        this.bind("blur", function() {
            if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
                this.value = this.value.substr(0, this.value.length - 1);
            } else if (isNaN(this.value)) {
                this.value = "";
            }
        });
        this.bind("paste", function() {
            var s = clipboardData.getData('text');
            if (!/\D/.test(s));
            value = s.replace(/^0*/, '');
            return false;
        });
        this.bind("dragenter", function() {
            return false;
        });
        this.bind("keyup", function() {
            if (/(^0+)/.test(this.value)) {
                this.value = this.value.replace(/^0*/, '');
            }
        });
    };
    $.fn.floatRal=function(){
        $(this).keyup(function(){
            $(this).val($(this).val().replace(/[^0-9.]/g,''));
        }).bind("paste",function(){  //CTR+V事件处理
            $(this).val($(this).val().replace(/[^0-9.]/g,''));
        }).css("ime-mode", "disabled"); //CSS设置输入法不可用
    }
    $("#dingqi_cash").numeral();
    $("#dingqi_year").numeral();
    $("#dingqi_rate").floatRal();

    $("#huoqi_cash").numeral();
    $("#huoqi_days").numeral();
    $("#huoqi_rate").floatRal();
});