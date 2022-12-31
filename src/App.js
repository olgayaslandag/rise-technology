import React, {useEffect} from 'react';
import Form from "./Form";
import List from "./List";
import {useDispatch} from "react-redux";
import {jobLoad} from "./store/Slices/jobSlice";

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const result = await fetch('/demo.json');
            const jobs = await result.json();
            dispatch(jobLoad(jobs))
        })()
    }, [])


    return (
        <div className="container mt-5">
            <Form />
            <List />
        </div>
    );
}
