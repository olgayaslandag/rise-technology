import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {setFilterAction} from "./store/Slices/filterSlice";
import {useDispatch} from "react-redux";

function Filter() {
    const dispatch = useDispatch();
    const priorities = useSelector(state => state.priority.all);
    const filter = useSelector(state => state.filter);
    const HandleFilter = e => {
        setFilterForm({...filterForm, [e.target.name]: e.target.value});
        dispatch(setFilterAction({...filterForm, [e.target.name]: e.target.value}))
    }
    const [filterForm, setFilterForm] = useState(filter);

    return (
        <table className="table table-borderless">
            <tbody>
            <tr>
                <td width="80%">
                    <input
                        name="name"
                        className="form-control"
                        value={filterForm.name}
                        placeholder="Job Name"
                        onChange={HandleFilter} />
                </td>
                <td width="20%">
                    <select
                        name="priority"
                        className="form-select"
                        value={filterForm.priority}
                        onChange={HandleFilter}>
                        <option value="">All Priorities</option>
                        {priorities.map((priority, index) => (
                            <option key={index} value={index}>{priority.name}</option>
                        ))}
                    </select>
                </td>
            </tr>
            </tbody>
        </table>
    );
}

export default Filter;