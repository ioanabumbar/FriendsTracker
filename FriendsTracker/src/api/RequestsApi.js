export default class RequestsApi {

  static getRequests() {
    return fetch(
        `http://` + `192.168.0.106` + `:3000/requests`,
        {
            method: 'GET'
        })
        .then((response) => {
            if (response.status === 200) {
                try {
                    //console.log("response ok", response.json());
                    return response.json();
                } catch (e) {
                    console.log("Unable to parse response: " + response, e);
                    return null;
                }
            }
            console.log("response: " + JSON.stringify(response));
            return null;
        });
    }

    static getRequestById(id) {
      return fetch(
          `http://`+`192.168.0.106`+`:3000/requests/${id}`,
          {
              method: 'GET'
          })
          .then((response) => {
              if (response.status === 200) {
                  try {
                      return response.json();
                  } catch (e) {
                      console.log("Unable to parse response: " + response, e);
                      return null;
                  }
              }
              console.log("response: " + JSON.stringify(response));
              return null;
          });
    }

    static addRequest(newRequest) {
      return fetch(
          `http://`+`192.168.0.106`+`:3000/requests`,
          {
              method: 'POST',
              headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
              },
              body: JSON.stringify({type: newRequest.type,
                                    requestedAt: newRequest.requestedAt,
                                    requestedFor: newRequest.requestedFor,
                                    requestedFrom: newRequest.requestedFrom,
                                    status: newRequest.status})
          })
          .then((response) => {
              if (response.status === 201) {
                  try {
                      return response.json();
                  } catch (e) {
                      console.log("Unable to parse response: " + response, e);
                      return null;
                  }
              }
              console.log("response: " + JSON.stringify(response));
              return null;
          });
    }

    static updateRequest(id, updatedRequest) {
      console.log("up", id);
      return fetch(
          `http://`+`192.168.0.106`+`:3000/requests/${id}`,
          {
              method: 'PUT',
              headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
              },
              body: JSON.stringify({type: updatedRequest.type,
                                    requestedAt: updatedRequest.requestedAt,
                                    requestedFor: updatedRequest.requestedFor,
                                    requestedFrom: updatedRequest.requestedFrom,
                                    status: updatedRequest.status})
          })
          .then((response) => {
              if (response.status === 200) {
                  try {
                      return response.json();
                  } catch (e) {
                      console.log("Unable to parse response: " + response, e);
                      return null;
                  }
              }
              console.log("response: " + JSON.stringify(response));
              return null;
          });
      }

      static deleteRequest(id) {
        console.log("delete id: ", id);
        return fetch(
            `http://`+`192.168.0.106`+`:3000/requests/${id}`,
            {
                method: 'DELETE',
            })
            .then((response) => {
                if (response.status === 200) {
                    try {
                        return response.json();
                    } catch (e) {
                        console.log("Unable to parse response: " + response, e);
                        return null;
                    }
                }
                console.log("response: " + JSON.stringify(response));
                return null;
            });
        }
}
