import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';

import Modal from '../../components/UI/Modal/Modal';
import UpdateCategory from './UpdateCategory';
import Spinner from '../../components/UI/Spinner/Spinner';

const ViewCategories = ({ token , history }) => {
    const [categories,setCategories] = useState([]);
    const [metadata,setMetadata] = useState([]);
    const [showModal,setShowModal] = useState(false);
    const [updateId,setUpdateId] = useState("");
    const [updateModal,setUpdateModal] = useState(false);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('category/all',{ headers: { Authorization : "Bearer" + token}})
            .then(response => {
                console.log(response.data);
                setCategories(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error.response.data);
                setLoading(false);
            })
    },[token])
  
    const metadataClick = (arr) => {
        setMetadata(arr);   
        setShowModal(true);
    }
    const modalClosedHandler = () => setShowModal(false);
    const updateModalClosedHandler = () => setUpdateModal(false);
    const updateClick = (id) => {
        setUpdateId(id);
        setUpdateModal(true);
    }
    if (loading) {
        return <Spinner />;
    }
    return (
    <>
            {showModal ? <Modal show={showModal} modalClosed={modalClosedHandler}>
                    <table className="table table-bordered table-hover table-responsive-sm">
                       <thead className="table-dark"><tr><th scope="col">Name</th><th scope="col">Values</th></tr></thead>
                    {metadata ? metadata.map((fv,i) => (
                           <tbody key={i}><tr><td>{Object.keys(fv)}</td><td>{Object.values(fv)}</td></tr></tbody>
                    )):null}
                    </table>

                </Modal> : null}
            {updateModal ? <Modal show={updateModal} modalClosed={updateModalClosedHandler}>
                        <UpdateCategory id={updateId} token={token}/>
            </Modal>: null}    
            <table className="table table-bordered table-hover table-responsive-lg">
            <thead className="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Category Id</th>
                <th scope="col">Name</th>
                <th scope="col">Parent</th>
                <th scope="col">Children</th>
                <th scope="col">Field Values</th>
                <th scope="col">Update</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category,index) => (
                    <tr key={category.category.id}>
                        <th scope="row">{index}</th>
                        <td>{category.category.id}</td>
                        <td>{category.category.name}</td>
                        <td>{category.category.parentId ? category.category.parentId.name : 'No data'}</td>
                        <td>{category.childCategory.length > 0 ? category.childCategory.map((c) => <div key={c.id}>{c.name}<br /></div>) : 'No data'}</td>
                        <td>{category.filedValuesSet.length > 0 ? <button type="submit" className="btn btn-primary" onClick={() => metadataClick(category.filedValuesSet)} >Metadata</button> : 'No data'}</td>
                        <td><button type="submit" className="btn btn-success" onClick={() => updateClick(category.category.id)} >Update</button></td>
                    </tr>
                ))} 
            </tbody>
        </table>
    </>
    );
};

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(ViewCategories);