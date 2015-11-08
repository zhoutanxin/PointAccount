/**
 * Created by Administrator on 2015-09-25.
 */
function loginout(){
    $.ajax({
        type: 'POST',
        url:Config.root+"loginout" ,
        dataType: "json",
        success:function(data){
            var json=eval(data);
//            $.mobile.changePage(Config.login,{transition: 'slideup'});
            location.href=Config.login;
        }
    });
}
