import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import ListItem from "./ListItem";
import Modal from "./Modal";
import Filter from "./Filter";

function List() {
    const jobs = useSelector(state => state.job.all);
    const filter = useSelector(state => state.filter);
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        let items = jobs;
        if(filter.name)
            items = items.filter(job => job.name.toLocaleLowerCase('TR').includes(filter.name.toLocaleLowerCase('TR')))
        if(filter.priority)
            items = items.filter(job => Number(job.priority) === Number(filter.priority));
        setFiltered(items);
    }, [filter, jobs]);

    return (
        <div>
            <div className="card mb-5">
                <div className="card-header">
                    <h5>Job List</h5>
                </div>
                <div className="card-body p-0">
                    <Filter />
                    <table className="table mb-0">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th width={200}>Priority</th>
                            <th width={130}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            <ListItem jobs={filtered}/>
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal />
        </div>
    );
}

export default List;