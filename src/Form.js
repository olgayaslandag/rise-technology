import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {jobInsert} from "./store/Slices/jobSlice";
import {SwalConfirm, SwalNew, SwalWait, Toast} from "./Components/Swal";
import { FiPlus } from 'react-icons/fi';

function Form() {
    const defaultFields = useMemo(() => {
        return {name: "", priority: ""}
    }, []);
    const [formFields, setFormFields] = useState(defaultFields);
    const dispatch = useDispatch();
    const priorities = useSelector(state => state.priority.all);

    const HandleSubmit = async e => {
        e.preventDefault();
        if(formFields.name.length > 255) {
            await SwalNew.fire({
                icon: 'warning',
                title: 'Ooooppssss!!!',
                text: 'The name field must be a maximum of 255 characters.'
            });
            return false;
        }

        const confirm = await SwalConfirm.fire({
            icon: 'question',
            title: 'Are You Sure?',
            text: 'Are you sure you want to add the data to the database?',
        });

        if(confirm.isConfirmed) {
            const wait =  SwalWait.fire({});
            setTimeout(() => {
                dispatch(jobInsert(formFields))
                setFormFields(defaultFields);

                Toast.fire({
                    icon: 'success',
                    title: 'Successfully added to the database.'
                });
                wait.close();
            }, 500);
        }
    }

    const HandleChange = e => setFormFields({...formFields, [e.target.name]: e.target.value.replace(/[^0-9a-zğüşöçİĞÜŞÖÇ ]/gi, '')});

    return (
        <div>
            <div className="card mb-5">
                <div className="card-header">
                    <h5>Create New Job</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={HandleSubmit}>
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-sm-7 mb-3">
                                    <label htmlFor="name">
                                        Job Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        required
                                        className="form-control"
                                        onChange={HandleChange}
                                        value={formFields.name}
                                        maxLength={255}
                                    />
                                </div>
                                <div className="col-12 col-sm-3 mb-3">
                                    <label htmlFor="priority">
                                        Job Priority
                                    </label>
                                    <select
                                        name="priority"
                                        id="priority"
                                        className="form-select"
                                        required
                                        onChange={HandleChange}
                                        value={formFields.priority}>
                                        <option value="">Choose</option>
                                        {priorities.map((priority, index) => (
                                            <option key={index} value={index}>{priority.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-12 col-sm-2">
                                    <button type="submit" className="btn btn-primary form-control addButton">
                                        <FiPlus style={{display: 'inline-block', marginTop: -2}} /> Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Form;