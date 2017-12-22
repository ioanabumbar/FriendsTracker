package com.example.lenovo.myapplication.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.example.lenovo.myapplication.R;
import com.example.lenovo.myapplication.model.Request;

import java.util.List;

/**
 * Created by Lenovo on 09-Nov-17.
 */

public class RequestAdapter extends BaseAdapter {
    List<Request> rDataSource;
    private Context rContext;
    private LayoutInflater rInflater;

    public RequestAdapter(Context rContext, List<Request> rDataSource){
        this.rContext = rContext;
        this.rDataSource = rDataSource;
        this.rInflater = (LayoutInflater) rContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
    }

    @Override
    public int getCount() {
        return rDataSource.size();
    }

    @Override
    public Object getItem(int position) {
        return rDataSource.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        View rowView = rInflater.inflate(R.layout.list_item_register, parent, false);

        // Get title element
        TextView titleTextView = (TextView) rowView.findViewById(com.example.lenovo.myapplication.R.id.request_list_title);

        TextView subtitleTextView = (TextView) rowView.findViewById(com.example.lenovo.myapplication.R.id.request_list_subtitle);

        TextView detailTextView = (TextView) rowView.findViewById(com.example.lenovo.myapplication.R.id.request_list_detail);

        Request register = (Request) getItem(position);

        titleTextView.setText(register.getType());
        subtitleTextView.setText(register.getRequestedFor());
        detailTextView.setText(register.getStatus());

        return rowView;
    }
}