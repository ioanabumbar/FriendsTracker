package com.example.lenovo.myapplication;

import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import com.example.lenovo.myapplication.adapter.RequestAdapter;
//import com.example.lenovo.myapplication.controller.ChartController;
import com.example.lenovo.myapplication.controller.Repository;
import com.example.lenovo.myapplication.database.RequestOperations;
import com.example.lenovo.myapplication.model.Request;
import com.github.mikephil.charting.charts.BarChart;
import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.data.PieEntry;
import com.github.mikephil.charting.utils.ColorTemplate;
import com.google.android.gms.common.GooglePlayServicesNotAvailableException;
import com.google.android.gms.common.GooglePlayServicesRepairableException;
import com.google.android.gms.common.GooglePlayServicesUtil;
import com.google.android.gms.security.ProviderInstaller;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private ListView requestsListView;
    private Button addRequestButton;
    private Button updateRequestButton;
    private Button deleteRequestButton;
    private Button viewAllRequestsButton;
    private Button viewChartButton;
    private RequestOperations requestOperations;
    private static final String EXTRA_RQT_ID = "requestId";
    private static final String EXTRA_ADD_UPDATE = "add_update";
    private static PieChart pieChart;
    //final Repository repository = new Repository();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        addRequestButton = (Button) findViewById(R.id.button_add_request);
        updateRequestButton = (Button) findViewById(R.id.button_update_request);
        deleteRequestButton = (Button) findViewById(R.id.button_delete_request);
        viewAllRequestsButton = (Button) findViewById(R.id.button_view_requests);
        viewChartButton = (Button) findViewById(R.id.button_view_chart);

        addRequestButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                Intent i = new Intent(MainActivity.this, AddUpdateRequest.class);
                i.putExtra(EXTRA_ADD_UPDATE, "Add");
                startActivity(i);
            }
        });
        updateRequestButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                getRequestIdAndUpdateRequest();
            }
        });
        deleteRequestButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                getRequestIdAndDeleteRequest();
            }
        });
        viewAllRequestsButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                Intent i = new Intent(MainActivity.this, ViewAllRequests.class);
                startActivity(i);
            }
        });
        final Context context = this;
        viewChartButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                createChart();
                /*Intent i = new Intent(context, ChartController.class);
                startActivity(i);*/
            }
        });

        /*
        requestsListView = (ListView)findViewById(R.id.request_list_view);
        final Repository repository = new Repository();
        RequestAdapter adapter = new RequestAdapter(this, repository.getRequests());
        requestsListView.setAdapter(adapter);

        final Context context = this;
        requestsListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {

            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Request selectedRequest= repository.getRequests().get(position);

                Intent detailIntent = new Intent(context, RequestDetail.class);
                detailIntent.putExtra("type", selectedRequest.getType());
                detailIntent.putExtra("requestedFor", selectedRequest.getRequestedFor());
                detailIntent.putExtra("requestedFrom", selectedRequest.getRequestedFrom());
                detailIntent.putExtra("status", selectedRequest.getStatus());
                startActivityForResult(detailIntent, 0);
            }
        });
        */
    }

    /*
    public void sendMail(View view){
        EditText editText = (EditText) findViewById(R.id.editText);
        String message = editText.getText().toString();

        Intent emailIntent = new Intent(Intent.ACTION_SENDTO, Uri.fromParts(
                "mailto","ioana_bumbar@yahoo.com", null));
        emailIntent.putExtra(Intent.EXTRA_SUBJECT, "Subject");
        emailIntent.putExtra(Intent.EXTRA_TEXT, message);
        startActivity(Intent.createChooser(emailIntent, "Send email..."));
    }*/


    public void getRequestIdAndUpdateRequest(){
        LayoutInflater li = LayoutInflater.from(this);
        View getRequestIdView = li.inflate(R.layout.dialog_get_request_id, null);

        AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(this);
        alertDialogBuilder.setView(getRequestIdView);

        final EditText userInput = (EditText) getRequestIdView.findViewById(R.id.editTextDialogUserInput);

        alertDialogBuilder.
                setCancelable(false)
                .setPositiveButton("OK", new DialogInterface.OnClickListener(){

                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        Intent i = new Intent(MainActivity.this, AddUpdateRequest.class);
                        i.putExtra(EXTRA_ADD_UPDATE, "Update");
                        i.putExtra(EXTRA_RQT_ID, Long.parseLong(userInput.getText().toString()));
                        startActivity(i);
                    }
                }).create()
                .show();
    }

    public void getRequestIdAndDeleteRequest(){
        LayoutInflater li = LayoutInflater.from(this);
        View getRequestIdView = li.inflate(R.layout.dialog_get_request_id, null);

        AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(this);
        alertDialogBuilder.setView(getRequestIdView);

        final EditText userInput = (EditText) getRequestIdView.findViewById(R.id.editTextDialogUserInput);
        //final long requestId = Long.parseLong(userInput.getText().toString());

        alertDialogBuilder.
                setCancelable(false)
                .setPositiveButton("OK", new DialogInterface.OnClickListener(){
                    @Override
                    public void onClick(DialogInterface dialog, int id) {
                        requestOperations = new RequestOperations(MainActivity.this);
                        requestOperations.open();
                        requestOperations.removeRequest(requestOperations.getRequest(Long.parseLong(userInput.getText().toString())));
                        requestOperations.close();
                        Toast t = Toast.makeText(MainActivity.this, "Request "  + " has been removed successfully!", Toast.LENGTH_SHORT);
                        t.show();
                    }
                }).create()
                .show();
    }

    public List<Request> getRequests(){
        List<Request> requests = new ArrayList<>();
        requestOperations = new RequestOperations(MainActivity.this);
        requestOperations.open();
        requests = requestOperations.getAllRequests();
        requestOperations.close();
        return requests;
    }

    public void createChart(){
        pieChart = (PieChart) findViewById(R.id.idPieChart);

        int[] requestStatus = new int[50];

        String labels[] = {"Pending", "Accepted", "Canceled"};

        for (Request request : getRequests()){
            if(request.getStatus().equals("pending")){
                requestStatus[0]++;
            }
            else if(request.getStatus().equals("accepted")){
                requestStatus[1]++;
            }
            else if(request.getStatus().equals("canceled")){
                requestStatus[2]++;
            }
        }

        List<PieEntry> pieEntries = new ArrayList<>();
        for (int i = 0; i < 3; i++){
            pieEntries.add(new PieEntry(requestStatus[i], labels[i]));
        }

        PieDataSet dataSet = new PieDataSet(pieEntries, "Chart");
        dataSet.setColors(ColorTemplate.COLORFUL_COLORS);
        PieData pieData = new PieData(dataSet);

        pieChart.setData(pieData);
        pieChart.invalidate();

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        System.out.println(requestCode + " " + resultCode);
        /*switch(requestCode) {
            case (0) : {*/
        if (resultCode == Activity.RESULT_OK) {
            String requestedFor = data.getStringExtra("requestedFor");
            String requestedFrom = data.getStringExtra("requestedFrom");
            String status = data.getStringExtra("status");
            //System.out.println(requestedFor + ": " + status);

            Repository repository = new Repository();
            repository.setStatus(status, requestedFor, requestedFrom);
            //System.out.println(repository.getRequests().get(1).getType() + ", " + repository.getRequests().get(1).getRequestedFor() + ", " + repository.getRequests().get(1).getStatus());
            RequestAdapter adapter = new RequestAdapter(this, repository.getRequests());
            requestsListView.setAdapter(adapter);
        }
         /*       break;
            }
        }*/
    }

    private void updateAndroidSecurityProvider(Activity callingActivity) {
        try {
            ProviderInstaller.installIfNeeded(this);
        } catch (GooglePlayServicesRepairableException e) {
            // Thrown when Google Play Services is not installed, up-to-date, or enabled
            // Show dialog to allow users to install, update, or otherwise enable Google Play services.
            GooglePlayServicesUtil.getErrorDialog(e.getConnectionStatusCode(), callingActivity, 0);
        } catch (GooglePlayServicesNotAvailableException e) {
            Log.e("SecurityException", "Google Play Services not available.");
        }
    }

    /*
    @Override
    protected void onResume() {
        super.onResume();
        requestOperations.open();
    }

    @Override
    protected void onPause() {
        super.onPause();
        requestOperations.close();

    }
    */
}
