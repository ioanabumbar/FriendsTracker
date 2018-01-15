export default class UsersApi {

  static getUsers() {
    return fetch(
        `http://` + `192.168.1.10` + `:3000/users`,
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
}
