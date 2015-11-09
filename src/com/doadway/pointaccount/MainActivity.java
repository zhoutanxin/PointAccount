package com.doadway.pointaccount;


import java.io.IOException;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.res.AssetManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.Menu;
import android.webkit.WebView;

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
//		    		mWebView.loadUrl("http://dianzhang.doadway.com:8080/GlodmineSever/index.html");

//			 		mWebView.getSettings().setUseWideViewPort(true); 
//			 		mWebView.getSettings().setLoadWithOverviewMode(true);
			 		
		    		mWebView.getSettings().setJavaScriptEnabled(true); 
		    		mWebView.getSettings().setDefaultTextEncodingName("UTF-8") ;
		    		mWebView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);		    		
		    		mWebView.loadUrl("file:///android_asset/index.html");
//		    		mWebView.loadUrl("http://pa.doadway.com/index.html");
		    		
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
}
