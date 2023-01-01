import React, {useEffect} from 'react';
import Form from "./Form";
import List from "./List";
import {useDispatch, useSelector} from "react-redux";
import {jobLoad} from "./store/Slices/jobSlice";

export default function App() {
    const dispatch = useDispatch();
    const jobs = useSelector(state => state.job.all);

    useEffect(() => {
        if(jobs.length === 0) {
            (async () => {
                const result = await fetch('/demo.json');
                const jobs = await result.json();
                dispatch(jobLoad(jobs))
            })()
        }
    }, [jobs, dispatch])


    return (
        <div className="container mt-5">
            <Form />
            <List />
        </div>
    );
}
