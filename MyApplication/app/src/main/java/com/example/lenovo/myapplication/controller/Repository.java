package com.example.lenovo.myapplication.controller;

import com.example.lenovo.myapplication.model.Request;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Lenovo on 09-Nov-17.
 */

public class Repository {
    private List<Request> requests = new ArrayList<>();

    public Repository(){
        init();
    }

    private void init(){
        requests.add(new Request("Friend Sent Request", "08:20 / 05.01.2017", "Ana Matei", "Liana Pop", "Approved"));
        requests.add(new Request("Friend Sent Request",  "16:00 / 29.05.2017", "Ana Matei", "Sami Ionescu","Pending"));
        requests.add(new Request("Friend Sent Request", "23:07/ 12.06.2017", "Gabriel Ciceu", "Andrei Balea", "Approved"));
        requests.add(new Request("Friend Sent Request", "12:24 / 13.06.2017", "Filip Sauca", "Liana Pop", "Canceled"));
    }

    public void setStatus(String status, String name){
        for(Request r : requests){
            if(r.getRequestedFor().equals(name)){
                Request rr = new Request(r.getType(), r.getRequestedAt(), name, r.getRequestedFrom(), status);
                requests.set(requests.indexOf(r), rr);
                System.out.println(rr.getRequestedFor() + rr.getStatus());
                break;
            }
        }
    }


    public List<Request>  getRequests(){
        return requests;
    }
}
