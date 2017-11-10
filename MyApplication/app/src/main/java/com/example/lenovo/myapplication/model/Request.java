package com.example.lenovo.myapplication.model;

/**
 * Created by Lenovo on 09-Nov-17.
 */

public class Request {
    String type;
    String requestedAt;
    String requestedFor;
    String requestedFrom;
    String status;

    public Request(){}

    public Request(String type, String requestedAt, String requestedFor, String requestedFrom, String status){
        this.type = type;
        this.requestedAt = requestedAt;
        this.requestedFor = requestedFor;
        this.requestedFrom = requestedFrom;
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public String getRequestedAt() {
        return requestedAt;
    }

    public String getRequestedFor() {
        return requestedFor;
    }

    public String getRequestedFrom() {
        return requestedFrom;
    }

    public String getStatus() { return status; }

    public void setStatus(String status){ this.status = status; }
}
