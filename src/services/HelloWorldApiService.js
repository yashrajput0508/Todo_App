import axios from "axios";
import {apiClient} from './ApiClient';


export const retriveHelloWorldBean = (token) => apiClient.get("http://localhost:8082/hello-world-bean", {
    headers: {
        Authorization: token
    }
});

export const retriveHelloWorldPathVariable
    = (username, token) =>
        apiClient.get(`http://localhost:8082/hello-world/path-variable/${username}`, {
            headers: {
                Authorization: token
            }
        });

