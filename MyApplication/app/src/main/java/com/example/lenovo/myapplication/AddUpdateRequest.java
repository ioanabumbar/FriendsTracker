package com.example.lenovo.myapplication;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.lenovo.myapplication.database.RequestOperations;
import com.example.lenovo.myapplication.model.Request;

/**
 * Created by Lenovo on 04-Dec-17.
 */

public class AddUpdateRequest extends AppCompatActivity {

    private static final String EXTRA_RQT_ID = "requestId";
    private static final String EXTRA_ADD_UPDATE = "add_update";
    private EditText typeEditText;
    private EditText atEditText;
    private EditText forEditText;
    private EditText fromEditText;
    private EditText statusEditText;
    private Button addUpdateButton;
    private long requestId;
    private RequestOperations requestOperations;
    Request newRequest, oldRequest;
    String mode;

    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_update_request);
        newRequest = new Request();
        oldRequest = new Request();
        typeEditText = (EditText)findViewById(R.id.request_type);
        atEditText = (EditText)findViewById(R.id.request_at);
        forEditText = (EditText)findViewById(R.id.request_for);
        fromEditText = (EditText)findViewById(R.id.request_from);
        statusEditText = (EditText)findViewById(R.id.request_status);
        addUpdateButton = (Button)findViewById(R.id.button_add_update_request);
        requestOperations = new RequestOperations(this);
        requestOperations.open();

        mode = getIntent().getStringExtra(EXTRA_ADD_UPDATE);
        if(mode.equals("Update")){
            addUpdateButton.setText("Update request");
            requestId = getIntent().getLongExtra(EXTRA_RQT_ID, 0);
            initializeRequest(requestId);
        }

        addUpdateButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                if(mode.equals("Add")){
                    newRequest.setType(typeEditText.getText().toString());
                    newRequest.setRequestedAt(atEditText.getText().toString());
                    newRequest.setRequestedFor(forEditText.getText().toString());
                    newRequest.setRequestedFrom(fromEditText.getText().toString());
                    newRequest.setStatus(statusEditText.getText().toString());
                    requestOperations.addRequest(newRequest);
                    Toast t = Toast.makeText(AddUpdateRequest.this, "Request " + newRequest.getId() + " has been added successfully!", Toast.LENGTH_SHORT);
                    t.show();
                    Intent i = new Intent(AddUpdateRequest.this, MainActivity.class);
                    startActivity(i);
                }
                else {
                    oldRequest.setStatus(statusEditText.getText().toString());
                    Toast t = Toast.makeText(AddUpdateRequest.this, "Request " + newRequest.getId() + " has been updated successfully!", Toast.LENGTH_SHORT);
                    t.show();
                    Intent i = new Intent(AddUpdateRequest.this, MainActivity.class);
                    startActivity(i);
                }
            }
        });
    }

    private void initializeRequest(long id){
        oldRequest = requestOperations.getRequest(id);
        /*oldRequest.setType(typeEditText.getText().toString());
        oldRequest.setRequestedAt(atEditText.getText().toString());
        oldRequest.setRequestedFor(forEditText.getText().toString());
        oldRequest.setRequestedFrom(fromEditText.getText().toString());*/
        oldRequest.setStatus(statusEditText.getText().toString());
    }
}
