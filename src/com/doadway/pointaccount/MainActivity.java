package com.doadway.pointaccount;


import java.io.IOException;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.Menu;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

@SuppressLint("SetJavaScriptEnabled")
public class MainActivity extends Activity {
	private WebView mWebView = null;	
	@SuppressLint("HandlerLeak")
	Handler hd=new Handler(){
		  @Override
		  public void handleMessage(Message msg){
			 switch(msg.what)
			 {
			     case 1:
			    	setContentView(R.layout.activity_main);
			 		mWebView = (WebView) findViewById(R.id.mobileWebView); 
					mWebView = (WebView) findViewById(R.id.mobileWebView); 
					WebSettings webSettings=mWebView.getSettings();
//					mWebView.addJavascriptInterface(new WebAppInterface(this), "Android");
					webSettings.setJavaScriptEnabled(true); 
					webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
					webSettings.setDefaultTextEncodingName("UTF-8") ;
					//自适应屏幕
//					mWebView.getSettings().setLayoutAlgorithm(LayoutAlgorithm.SINGLE_COLUMN);
					
//					int screenDensity = getResources().getDisplayMetrics().densityDpi ;   
//					WebSettings.ZoomDensity zoomDensity = WebSettings.ZoomDensity.MEDIUM ;   
//					switch (screenDensity){   
//					case DisplayMetrics.DENSITY_LOW :  
//					    zoomDensity = WebSettings.ZoomDensity.CLOSE;  
//					    break;  
//					case DisplayMetrics.DENSITY_MEDIUM:  
//					    zoomDensity = WebSettings.ZoomDensity.MEDIUM;  
//					    break;  
//					case DisplayMetrics.DENSITY_HIGH:  
//					    zoomDensity = WebSettings.ZoomDensity.FAR;  
//					    break ;  
//					}  
//					webSettings.setDefaultZoom(zoomDensity); 
					
					mWebView.getSettings().setLoadWithOverviewMode(true);
					mWebView.getSettings().setUseWideViewPort(true);   
					//gl error from 0x502
//					mWebView.setLayerType(View.LAYER_TYPE_SOFTWARE, null);	
					mWebView.setWebViewClient(new SelfWebViewClient());
//					//调用客户端loadData方法 
					mWebView.loadUrl("http://pa.doadway.com");				    		
				try {
					String fileNames[] =getAssets().list("");
					for(String fileN:fileNames){
						System.out.println("文件名称:"+fileN);
					}
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
//		    		Button updateBtn = (Button) findViewById(R.id.btnUpdate);
//					updateBtn.setOnClickListener(new OnClickListener()
//					{
//						@Override
//						public void onClick(View v)
//						{
//							UpdateManager manager = new UpdateManager(MainActivity.this);
//							manager.checkUpdate();
//						}
//					});	
		    		System.out.println("获取本地服务器测试页面");
			     break;
			 }
		  }
	};
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		goToWelcomeView();
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}
    public void goToWelcomeView()
    {
    	WelcomeView mView=new WelcomeView(this);
    	setContentView(mView);
    }
    
    private class SelfWebViewClient extends WebViewClient {

		@Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
			//重写shouldOverrideUrlLoading方法，使点击链接后不使用其他的浏览器打开。 
		    	
		    	view.loadUrl(url); 
		        //如果不需要其他对点击链接事件的处理返回true，否则返回false 
	        return super.shouldOverrideUrlLoading(view, url);
        }
		

		 
	}	    
}
