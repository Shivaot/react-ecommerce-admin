import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';

const AddMetadata = ({ token }) => {
    const [name,setName] = useState("");
    const [success,setSuccess] = useState(false);
    const [error,setError] =  useState(null);

    const nameChangeHandler = (e) => setName(e.target.value);
    const formSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('metadata/add/?fieldName=' + name,{},{ headers: { "Authorization": "Bearer" + token}})
            .then(response => {
                // console.log(response.data);
                setSuccess(true);
                setError(null);
            })
            .catch(error => {
                console.log(error.response.data);
                setError(error.response.data.message);
                setSuccess(false);
            })
    }

    return (
    <div className="container fluid" style={{marginTop: "5%",marginBottom:"5%",width:"50%"}}>
        <div className="container-fluid">
             <div className="card" style={{marginTop:"2%",boxShadow: "1px 2px 2px grey"}}>
                 <div className="card-body">
                    <form onSubmit={formSubmitHandler}>
                        {success ? <p style={{color:"green"}}>Metadata Added</p>:null}
                        {error ? <p style={{color: "red"}}>{error}</p> :  null}
                        <div className="form-group row" style={{width:"70%",marginLeft:"15%"}}>
                            <input className="form-control"  type="text" value={name} onChange={nameChangeHandler} placeholder="Name" required />
                        </div>             
                        <div className="form-group row" style={{marginLeft:"20%"}}>
                            <div className="col-lg-9">
                                <button type="Submit" className="btn btn-primary" >Submit</button>
                            </div>
                        </div>
                    </form>
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

export default connect(mapStateToProps)(AddMetadata);