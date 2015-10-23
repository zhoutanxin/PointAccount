package com.doadway.pointaccount;


import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.webkit.WebView;
import android.widget.Button;

import com.doadway.pointaccount.update.UpdateManager;

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
			 		Button updateBtn = (Button) findViewById(R.id.btnUpdate);
			 		mWebView = (WebView) findViewById(R.id.mobileWebView); 
		    		mWebView.loadUrl("http://www.doadway.com/mobile/index.html");			 		
					updateBtn.setOnClickListener(new OnClickListener()
					{
						@Override
						public void onClick(View v)
						{
							UpdateManager manager = new UpdateManager(MainActivity.this);
							manager.checkUpdate();
						}
					});					    	 
			    	System.out.println("接受welcome返回的值");
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
