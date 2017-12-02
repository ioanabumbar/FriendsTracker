package com.example.lenovo.myapplication.model;

/**
 * Created by Lenovo on 09-Nov-17.
 */

public class Request {
    long requestId;
    String type;
    String requestedAt;
    String requestedFor;
    String requestedFrom;
    String status;

    public Request(){}

    public Request(long id ,String type, String requestedAt, String requestedFor, String requestedFrom, String status){
        requestId = id;
        this.type = type;
        this.requestedAt = requestedAt;
        this.requestedFor = requestedFor;
        this.requestedFrom = requestedFrom;
        this.status = status;
    }

    public Request(String type, String requestedAt, String requestedFor, String requestedFrom, String status){
        this.type = type;
        this.requestedAt = requestedAt;
        this.requestedFor = requestedFor;
        this.requestedFrom = requestedFrom;
        this.status = status;
    }

    public long getId() { return requestId; }

    public void setId(long id){ this.requestId = id; }

    public String getType() {
        return type;
    }

    public void setType(String type){ this.type = type; }

    public String getRequestedAt() {
        return requestedAt;
    }

    public void setRequestedAt(String at) { this.requestedAt = at; }

    public String getRequestedFor() {
        return requestedFor;
    }

    public void setRequestedFor(String rfor){ this.requestedFor = rfor; }

    public String getRequestedFrom() {
        return requestedFrom;
    }

    public void setRequestedFrom(String from) { this.requestedFrom = from; }

    public String getStatus() { return status; }

    public void setStatus(String status){ this.status = status; }

    public String toString(){
        return "Id: " + requestId +
                ", Type: " + type +
                ", At: " + requestedAt +
                ", From: " + requestedFrom +
                ", For: " + requestedFor +
                ", Status: " + status;
    }
}
