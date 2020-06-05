import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';

import Spinner from '../../components/UI/Spinner/Spinner';

const ViewMetadata = ({ token }) => {
    const [metadata,setMetadata] = useState([]);
    const [loading,setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get('metadata/view',{ headers: { "Authorization" : "Bearer" + token }})
            .then(response => {
                // console.log(response.data);
                setMetadata(response.data);
                setLoading(false);  
            })
            .catch(error => {
                console.log(error.response.data);
                setLoading(false);
            })
    },[token])
    if (loading) {
        return <Spinner />;
    }
    return (
            <div className="container fluid" style={{marginTop: "5%",marginBottom:"5%"}}>
               <div className="container-fluid">
                    <div className="card" style={{marginTop:"2%",boxShadow: "1px 2px 2px grey"}}>
                        <div className="card-body">
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {metadata.map((m,i) => (
                                        <tr key={m.id}>
                                            <th scope="row">{i}</th>
                                            <td>{m.id}</td>
                                            <td>{m.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
               </div>
            </div>
    );
};

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(ViewMetadata);