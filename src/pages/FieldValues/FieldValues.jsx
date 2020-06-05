import React,{ useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';

const FieldValues = ({ token }) => {
    const [categories,setCategories] = useState([]);
    const [metadata,setMetadata] = useState([]);
    const [values,setValues] = useState("");
    const [catId,setCatId] = useState("");
    const [metId,setMetId] = useState("");
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(null);

    const [updateValues,setUpdateValues] = useState("");
    const [updateCatId,setUpdateCatId] = useState("");
    const [updateMetId,setUpdateMetId] = useState("");
    const [updateSuccess,setUpdateSuccess] = useState(false);
    const [updateError,setUpdateError] = useState(null);
    useEffect(() => {
        const headers = {
			Authorization: "Bearer" + token,
        };
        axios.get("category/all",{ headers: headers})
            .then(response => {
                console.log(response.data)
                setCategories(response.data)
            })
            .catch(error=> {                
                if (error.response) {
                    console.log(error.response.data)
                }                
            })
    },[token])

    useEffect(() => {
        const headers = {
			Authorization: "Bearer" + token,
        };
        axios.get("metadata/view",{ headers: headers})
            .then(response => {
                console.log(response.data)
                setMetadata(response.data)
            })
            .catch(error=> {                
                if (error.response) {
                    console.log(error.response.data)
                }                
            })
    },[token])

    const categoryChangeHandler = (e) => setCatId(e.target.value);
    const metadataChangeHandler = (e) => setMetId(e.target.value);
    const valueChangeHandler = (e) => setValues(e.target.value);

    const updateCategoryChangeHandler = (e) => setUpdateCatId(e.target.value);
    const updateMetadataChangeHandler = (e) => setUpdateMetId(e.target.value);
    const updateValueChangeHandler = (e) => setUpdateValues(e.target.value);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const headers = {
			Authorization: "Bearer" + token,
        };
        let filedIdValues = {};
        filedIdValues[`${metId}`] = values.split(",");
        const data = {
            "categoryId": catId,
            "filedIdValues": filedIdValues 
        }
        axios.post('categoryMetadata/add',data,{ headers: headers })
            .then(response => {
                console.log(response.data);
                setSuccess(true);
                setError(null);
            })
            .catch(error => {
                console.log(error);
                setError(error.response.data);
                setSuccess(false);
            });
        setValues("");
    }

    const updateFormSubmitHandler = (e) => {
        e.preventDefault();
        const headers = {
			Authorization: "Bearer" + token,
        };
        let filedIdValues = {};
        filedIdValues[`${updateMetId}`] = updateValues.split(",");
        const data = {
            "categoryId": updateCatId,
            "filedIdValues": filedIdValues 
        }
        axios.put('categoryMetadata/update',data,{ headers: headers })
            .then(response => {
                console.log(response.data);
                setUpdateSuccess(true);
                setUpdateError(null);
            })
            .catch(error => {
                console.log(error.response);
                // setUpdateError(error.response.data);
                setUpdateSuccess(false);
            });
        setUpdateValues("");
    }

    return (
   <>
            <div className="container fluid" style={{marginTop: "5%",marginBottom:"5%",width:"50%"}}>
            <div className="container-fluid">
                 <div className="card" style={{marginTop:"2%",boxShadow: "1px 2px 2px grey"}}>
                     <div className="card-body">
                        <h3>Add New field Values</h3>
                        <form onSubmit={formSubmitHandler}>
                            {success ? <p style={{color:"green"}}>Field Values Added</p>:null}
                            {error ? <p style={{color: "red"}}>{error}</p> :  null}
                            <div className="form-group row" style={{width:"70%",marginLeft:"15%"}}>
                                <input className="form-control"  type="text"  placeholder="Values Comma Separated" value={values} onChange={valueChangeHandler} required />
                            </div>   
                            <div className="form-group row" style={{marginLeft: "12.5%",width:"100%"}}>
                                <div className="col-lg-9">
                                    <select id="categoryId" className="form-control" size="0" onChange={categoryChangeHandler} >
                                        <option value="default">Category</option>
                                            {categories.map(category => (
                                                <option key={category.category.id} value={category.category.id} onChange={categoryChangeHandler}>{category.category.name}</option>
                                            ))}
                                    </select>
                                </div>
                            </div> 
                            <div className="form-group row" style={{marginLeft: "12.5%",width:"100%"}}>
                                <div className="col-lg-9">
                                    <select id="metadataId" className="form-control" size="0" onChange={metadataChangeHandler} >
                                        <option value="default">Metadata</option>
                                            {metadata.map(m => (
                                                <option key={m.id} value={m.id} onChange={metadataChangeHandler}>{m.name}</option>
                                            ))}
                                    </select>
                                </div>
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
     
             <div className="container fluid" style={{marginTop: "5%",marginBottom:"5%",width:"50%"}}>
                <div className="container-fluid">
                     <div className="card" style={{marginTop:"2%",boxShadow: "1px 2px 2px grey"}}>
                         <div className="card-body">
                            <h3>Updated old field Values</h3>
                            <form onSubmit={updateFormSubmitHandler}>
                                {updateSuccess ? <p style={{color:"green"}}>Field Values Updated</p>:null}
                                {updateError ? <p style={{color: "red"}}>{updateError}</p> :  null}
                                <div className="form-group row" style={{width:"70%",marginLeft:"15%"}}>
                                    <input className="form-control"  type="text"  placeholder="Values Comma Separated" value={updateValues} onChange={updateValueChangeHandler} required />
                                </div>   
                                <div className="form-group row" style={{marginLeft: "12.5%",width:"100%"}}>
                                    <div className="col-lg-9">
                                        <select id="categoryId" className="form-control" size="0" onChange={updateCategoryChangeHandler} >
                                            <option value="default">Category</option>
                                                {categories.map(category => (
                                                    <option key={category.category.id} value={category.category.id} onChange={updateCategoryChangeHandler}>{category.category.name}</option>
                                                ))}
                                        </select>
                                    </div>
                                </div> 
                                <div className="form-group row" style={{marginLeft: "12.5%",width:"100%"}}>
                                    <div className="col-lg-9">
                                        <select id="metadataId" className="form-control" size="0" onChange={updateMetadataChangeHandler} >
                                            <option value="default">Metadata</option>
                                                {metadata.map(m => (
                                                    <option key={m.id} value={m.id} onChange={updateMetadataChangeHandler}>{m.name}</option>
                                                ))}
                                        </select>
                                    </div>
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
     
   </>
    );
};

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(FieldValues);