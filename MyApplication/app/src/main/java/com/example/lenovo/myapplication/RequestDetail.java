package com.example.lenovo.myapplication;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

public class RequestDetail extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_request_detail);

        String type = this.getIntent().getExtras().getString("type");
        String requestedFor = this.getIntent().getExtras().getString("requestedFor");
        String requestedFrom = this.getIntent().getExtras().getString("requestedFrom");
        String status = this.getIntent().getExtras().getString("status");

        TextView typeTextView = (TextView) this.findViewById(R.id.request_type);
        TextView requestedForTextView = (TextView) this.findViewById(R.id.request_requestedFor);
        TextView requestedFromTextView = (TextView) this.findViewById(R.id.request_requestedFrom);
        TextView statusTextView = (TextView) this.findViewById(R.id.request_status);

        typeTextView.setText(type);
        requestedForTextView.setText(requestedFor);
        requestedFromTextView.setText(requestedFrom);
        statusTextView.setText(status);
    }

    public void saveStatus(View view){
        EditText editText = (EditText) findViewById(R.id.status);
        String message = editText.getText().toString();

        Intent data = new Intent();
        data.putExtra("message", message);
        data.putExtra("name", this.getIntent().getExtras().getString("type"));
        setResult(Activity.RESULT_OK, data);
        finish();
    }
}
