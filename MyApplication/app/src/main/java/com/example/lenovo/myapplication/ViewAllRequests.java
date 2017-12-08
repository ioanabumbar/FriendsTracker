package com.example.lenovo.myapplication;

import android.app.ListActivity;
import android.os.Bundle;
import android.widget.ArrayAdapter;

import com.example.lenovo.myapplication.database.RequestOperations;
import com.example.lenovo.myapplication.model.Request;

import java.util.List;

/**
 * Created by Lenovo on 02-Dec-17.
 */

public class ViewAllRequests extends ListActivity {

    private RequestOperations requestOperations;
    List<Request> requests;

    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_all_requests);
        requestOperations = new RequestOperations(this);
        requestOperations.open();
        //requestOperations.addRequest(new Request("Friend", "11/01/2017", "Andreea", "Ion", "pending"));
        requests = requestOperations.getAllRequests();
        requestOperations.close();
        ArrayAdapter<Request> adapter = new ArrayAdapter<Request>(this, android.R.layout.simple_list_item_1, requests);
        setListAdapter(adapter);
    }
}
