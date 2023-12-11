import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { retriveHelloWorldBean, retriveHelloWorldPathVariable } from "../../services/HelloWorldApiService";
import { useAuth } from "../security/AuthContext";

export default function WelcomeComponent() {

    const { username } = useParams();
    const [message , setMessage] = useState(null);
    const authContext = useAuth();

    function callHelloWorldRestApi(params) {
        retriveHelloWorldBean(authContext.token)
        .then((response) => sucessResponse(response))
        .catch((error) => errorResponse(error))
        .finally( () => console.log("cleanup"));

        // retriveHelloWorldPathVariable("Ranga")
        //     .then((response) => sucessResponse(response))
        //     .catch((error) => errorResponse(error))
        //     .finally( () => console.log("cleanup"));
    }

    function sucessResponse(response) {
        console.log(response);
        setMessage(response.data.message);
    }

    function errorResponse(error) {
        console.log(error);
    }

    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
            <div>
                Manage your todos - <Link to={"/todos"}>Go here</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
                    Call Hello World
                </button>
            </div>
            <div className="text-info">
                {message}
            </div>
        </div>
    )
}