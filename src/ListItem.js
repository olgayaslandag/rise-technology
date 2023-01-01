import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {SwalConfirm, Toast} from "./Components/Swal";
import {jobDelete, jobSelect} from "./store/Slices/jobSlice";
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

function ListItem({jobs}) {
    const priorities = useSelector(state => state.priority.all)
    const dispatch = useDispatch();

    const HandleDelete = async jobIndex => {
        const confirm = await SwalConfirm.fire({
            icon: 'question',
            title: 'Emin misin?',
            text: 'Are you sure you want to permanently delete the data?',
        });

        if(confirm.isConfirmed) {
            dispatch(jobDelete(jobIndex));
            await Toast.fire({
                icon: 'success',
                title: 'Successfully deleted to the database.'
            });
        }
    }

    const HandleEdit = async (job, index) => {
        job = {...job, id: index}
        dispatch(jobSelect(job))
    }

    return jobs.map((job, index) => (
        <tr key={index}>
            <td>{job.name}</td>
            <td>
                <div className={'btn btn-sm btn-' + priorities[job.priority]?.class}>
                    {priorities[job.priority]?.name}
                </div>
            </td>
            <td>
                <button
                    className="btn btn-sm btn-secondary me-1"
                    onClick={() => HandleEdit(job, index)}
                    data-bs-toggle="modal"
                    data-bs-target="#edit">
                    <FiEdit2 />
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => HandleDelete(index)}>
                    <FiTrash2 />
                </button>
            </td>
        </tr>
    ))
}

export default ListItem;