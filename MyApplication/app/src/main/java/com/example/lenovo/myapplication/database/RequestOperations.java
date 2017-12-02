package com.example.lenovo.myapplication.database;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import com.example.lenovo.myapplication.model.Request;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Lenovo on 02-Dec-17.
 */

public class RequestOperations {

    public static final String LOGTAG = "RQT_MNGMNT_SYS";

    SQLiteOpenHelper dbhandler;
    SQLiteDatabase database;

    private static final String[] allColumns = {
            FriendsTrackerDBHandler.COLUMN_ID,
            FriendsTrackerDBHandler.COLUMN_TYPE,
            FriendsTrackerDBHandler.COLUMN_AT,
            FriendsTrackerDBHandler.COLUMN_FOR,
            FriendsTrackerDBHandler.COLUMN_FROM,
            FriendsTrackerDBHandler.COLUMN_STATUS
    };

    public RequestOperations(Context context){
        dbhandler = new FriendsTrackerDBHandler(context);
    }

    public void open(){
        Log.i(LOGTAG, "Database Opened");
        database = dbhandler.getWritableDatabase();
    }

    public void close(){
        Log.i(LOGTAG, "Database Closed");
        dbhandler.close();
    }

    public Request addRequest(Request request){
        ContentValues values = new ContentValues();
        values.put(FriendsTrackerDBHandler.COLUMN_TYPE, request.getType());
        values.put(FriendsTrackerDBHandler.COLUMN_AT, request.getRequestedAt());
        values.put(FriendsTrackerDBHandler.COLUMN_FOR, request.getRequestedFor());
        values.put(FriendsTrackerDBHandler.COLUMN_FROM, request.getRequestedFrom());
        values.put(FriendsTrackerDBHandler.COLUMN_STATUS, request.getStatus());
        long insertId = database.insert(FriendsTrackerDBHandler.TABLE_REQUESTS, null, values);
        request.setId(insertId);
        return request;
    }

    public Request getRequest(long id){
        Cursor cursor = database.query(FriendsTrackerDBHandler.TABLE_REQUESTS, allColumns, FriendsTrackerDBHandler.COLUMN_ID + "=?", new String[]{String.valueOf(id)}, null, null, null, null);
        if(cursor != null)
            cursor.moveToFirst();

        Request request = new Request(Long.parseLong(cursor.getString(0)), cursor.getString(1), cursor.getString(2), cursor.getString(3), cursor.getString(4), cursor.getString(5));
        return request;
    }

    public List<Request> getAllRequests(){
        Cursor cursor = database.query(FriendsTrackerDBHandler.TABLE_REQUESTS, allColumns, null, null, null, null, null);

        List<Request> requests = new ArrayList<>();
        if (cursor.getCount() > 0){
            while (cursor.moveToNext()){
                Request request = new Request();
                request.setId(cursor.getLong(cursor.getColumnIndex(FriendsTrackerDBHandler.COLUMN_ID)));
                request.setType(cursor.getString(cursor.getColumnIndex(FriendsTrackerDBHandler.COLUMN_TYPE)));
                request.setRequestedAt(cursor.getString(cursor.getColumnIndex(FriendsTrackerDBHandler.COLUMN_AT)));
                request.setRequestedFor(cursor.getString(cursor.getColumnIndex(FriendsTrackerDBHandler.COLUMN_FOR)));
                request.setRequestedFrom(cursor.getString(cursor.getColumnIndex(FriendsTrackerDBHandler.COLUMN_FROM)));
                request.setStatus(cursor.getString(cursor.getColumnIndex(FriendsTrackerDBHandler.COLUMN_STATUS)));

                requests.add(request);
            }
        }
        return requests;
    }
}
