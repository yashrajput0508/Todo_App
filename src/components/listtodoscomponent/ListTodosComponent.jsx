import { useEffect, useState } from "react";
import { deleteTodoApi, retriveAllTodosForUsername } from "../../services/TodoApiService";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ListTodosComponent(params) {

    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay());
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => refreshTodos(), []);
    const authContext = useAuth();
    const username = authContext.username;

    function deleteTodo(id) {
        deleteTodoApi(username,id)
            .then( () => {
                setMessage(`Delete of todo with ${id} successfully`);
                refreshTodos();
            })
            .catch(error => console.log(error))
    }

    function updateTodo(id) {
        navigate(`/todo/${id}`)
    }

    function addNewTodo() {
        navigate('/todo/-1')
    }

    function refreshTodos(params) {
        console.log("hi");
        retriveAllTodosForUsername(username)
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <div className='container'>
                <h1>Things You Want To Do!</h1>
                {message && <div className="alert alert-warning">{message}</div>}
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                (todo,index) => (
                                    <tr key={todo.id}>
                                        <td>{index+1}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-success" onClick={()=>updateTodo(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
            </div>
        </>
    )
}

