import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {jobInsert} from "./store/Slices/jobSlice";
import {SwalConfirm, SwalWait, Toast} from "./Components/Swal";

function Form() {
    const defaultFields = useMemo(() => {
        return {name: "", priority: ""}
    }, []);
    const [formFields, setFormFields] = useState(defaultFields);
    const dispatch = useDispatch();
    const priorities = useSelector(state => state.priority.all);

    const HandleSubmit = async e => {
        e.preventDefault();
        const confirm = await SwalConfirm.fire({
            icon: 'question',
            title: 'Emin misin?',
            text: 'Veriyi sisteme eklemek istediğinizden emin misiniz?',
        });

        if(confirm.isConfirmed) {
            const wait =  SwalWait.fire({});
            setTimeout(() => {
                dispatch(jobInsert(formFields))
                setFormFields(defaultFields);

                Toast.fire({
                    icon: 'success',
                    title: 'Veri sisteme başarılı bir şekilde eklendi.'
                });
                wait.close();
            }, 500);
        }
    }

    const HandleChange = e => setFormFields({...formFields, [e.target.name]: e.target.value.replace(/[^0-9a-zğüşöçİĞÜŞÖÇ]/gi, '')});

    return (
        <div>
            <div className="card mb-5">
                <div className="card-header">
                    <h5>Create New Job</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={HandleSubmit}>
                        <table className="table table-borderless">
                            <tbody>
                            <tr>
                                <td width="70%">
                                    <div className="form-group">
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
                                </td>
                                <td width="25%">
                                    <div className="form-group">
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
                                </td>
                                <td width="5%" className="text-end">
                                    <button type="submit" className="btn btn-primary bg-primary mt-4">
                                        Create
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Form;