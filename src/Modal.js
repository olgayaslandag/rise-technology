import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {jobUpdate} from "./store/Slices/jobSlice";
import {Toast} from "./Components/Swal";

function Modal() {
    const defaultFields = useSelector(state => state.job.editSelect);
    const priorities = useSelector(state => state.priority.all);
    const [formFields, setFormFields] = useState(defaultFields);
    const dispatch = useDispatch();
    const closeRef = useRef();

    const HandleChange = e => setFormFields({...formFields, [e.target.name]: e.target.value});

    const HandleSubmit = async e => {
        e.preventDefault();

        dispatch(jobUpdate(formFields))
        closeRef.current.click();
        await Toast.fire({
            icon: 'success',
            title: 'Veri başarılı bir şekilde güncellendi'
        });
    }

    useEffect(() => {
        setFormFields(defaultFields);
    }, [defaultFields]);

    return (
        <div className="modal fade" id="edit" tabIndex="-1" aria-labelledby="editLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={HandleSubmit}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editLabel">Job Edit</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group mb-3">
                                <label htmlFor="name">Job Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    required
                                    disabled
                                    className="form-control"
                                    onChange={HandleChange}
                                    value={formFields.name}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="priority">Priority</label>
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
                                    ))}>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>Close</button>
                            <button type="submit" className="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Modal;