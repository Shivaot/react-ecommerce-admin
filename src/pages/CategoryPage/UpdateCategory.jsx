import React, { useState } from 'react';
import axios from '../../axios';
const UpdateCategory = ({ id, token }) => {
    const [name,setName] = useState("");
    const [success,setSuccess] = useState(false);
    const [error,setError] =  useState(null);

    const nameChangeHandler = (e) => setName(e.target.value);
    const formSubmitHandler = (e) => {
        e.preventDefault();
        axios.put('category/update/?id=' + id + '&name=' + name,{},{ headers: { "Authorization": "Bearer" + token}})
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
        <form onSubmit={formSubmitHandler}>
            {success ? <p style={{color:"green"}}>Category updated</p>:null}
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
    );
};

export default UpdateCategory;