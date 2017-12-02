package com.example.lenovo.myapplication.database;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

/**
 * Created by Lenovo on 02-Dec-17.
 */

public class FriendsTrackerDBHandler extends SQLiteOpenHelper {
    private static final String DATABASE_NAME = "friendsTracker.db";
    private static final int DATABASE_VERSION = 1;

    public static final String TABLE_REQUESTS = "requests";
    public static final String COLUMN_ID = "requestId";
    public static final String COLUMN_TYPE = "type";
    public static final String COLUMN_AT = "requestAt";
    public static final String COLUMN_FOR = "requestFor";
    public static final String COLUMN_FROM = "requestFrom";
    public static final String COLUMN_STATUS = "status";

    private static final String TABLE_CREATE = "CREATE TABLE " + TABLE_REQUESTS + " (" +
                                                COLUMN_ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
                                                COLUMN_TYPE + " TEXT, " +
                                                COLUMN_AT + " TEXT, " +
                                                COLUMN_FOR + " TEXT, " +
                                                COLUMN_FROM + " TEXT, " +
                                                COLUMN_STATUS + " TEXT)";

    public FriendsTrackerDBHandler(Context context){
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL(TABLE_CREATE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_REQUESTS);
        db.execSQL(TABLE_CREATE);
    }
}
