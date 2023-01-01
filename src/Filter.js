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
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-7 mb-3">
                        <input
                            name="name"
                            className="form-control"
                            value={filterForm.name}
                            placeholder="Job Name"
                            onChange={HandleFilter} />
                    </div>
                    <div className="col-12 col-sm-5 mb-3">
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default Filter;