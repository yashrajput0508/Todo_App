import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "../../services/TodoApiService";
import { useAuth } from "../security/AuthContext";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment/moment";

export default function TodoComponent(params) {

    const { id } = useParams();
    const contextAuth = useAuth();
    const username = contextAuth.username;
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        retrieveTodos();
    }, [id])

    function retrieveTodos(params) {
        if (id != -1) {
            retrieveTodoApi(username, id)
                .then(response => {
                    setDescription(response.data.description);
                    setTargetDate(response.data.targetDate);
                })
                .catch(error => console.log(error))
        }
    }

    function validate(values) {

        let errors = {

        }

        if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 characters'
        }

        if (values.targetDate == null || values.targetDate == '' || !moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a target Date';
        }

        return errors;
    }

    function onSubmit(values) {

        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }

        if (id == -1) {
            createTodoApi(username, todo)
                .then(navigate('/todos'))
                .error(error => console.log(error))
        } else {
            updateTodoApi(username, id, todo)
                .then(navigate('/todos'))
                .error(error => console.log(error));
        }
    }

    return (
        <>
            <div className="container">
                <h1>Enter Todo Details</h1>
                <div>
                    <Formik initialValues={{ description, targetDate }}
                        enableReinitialize={true}
                        validate={validate}
                        onSubmit={onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description"
                                        component="div"
                                        className="alert alert-warning"
                                    />

                                    <ErrorMessage name="targetDate"
                                        component="div"
                                        className="alert alert-warning"
                                    />

                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field type="text" className="form-control" name="description" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field type="date" className="form-control" name="targetDate" />
                                    </fieldset>
                                    <div>
                                        <button className="btn btn-success m-5" type="submit">Save</button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        </>
    )
}