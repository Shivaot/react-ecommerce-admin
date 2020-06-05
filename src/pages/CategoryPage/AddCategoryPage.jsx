import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';

const AddCategoryPage = ({ token }) => {
    const [rootName,setRootName] = useState("");
    const [subName,setSubName] = useState("");
    const [parentId,setParentId] = useState("");
    const [categories,setCategories] = useState([]);
    const [rootSuccess,setRootSuccess] = useState(false);
    const [subSuccess,setSubSuccess] = useState(false);
    const [rootError,setRootError] =  useState(null);
    const [subError,setSubError] = useState(null);
    useEffect(() => {
        setRootSuccess(false);
        setSubSuccess(false);
        setRootError(null);
        setSubError(null);
        axios.get('category/all',{ headers: { Authorization : "Bearer" + token}})
            .then(response => {
                // console.log(response.data);
                setCategories(response.data);
            })
            .catch(error => {
                console.log(error.response.data);
            })
    },[token])
 
    // Case 1-  root category 
    const rootNameChangeHandler = (e) => {
        setRootName(e.target.value);
    }
    const rootFormSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('category/add?name=' + rootName,{},{ headers: { Authorization : "Bearer" + token}})
            .then(response => {
                // console.log(response.data);
                setRootSuccess(true);
                setRootError(null);
            })
            .catch(error => {
                // console.log(error.response.data);
                setRootError(error.response.data.message);
                setRootSuccess(false);
            })
            setRootName("");
    }
    // Case 2- sub category 
    const subNameChangeHandler = (e) => {
        setSubName(e.target.value)
    }

    const categoryChangeHandler = (e) => {
        setParentId(e.target.value);
    }
   
    const formSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('/category/add?name=' + subName + '&parentId=' + parentId , {}, { headers: { Authorization : "Bearer" + token}})
            .then(response => {
                // console.log(response.data);
                setSubSuccess(true);
                setSubError(null);
            }) 
            .catch(error => {
                console.log(error.response.data);
                setSubError(error.response.data.message);
                setSubSuccess(false);
            })       
            setSubName("");
    }

    return (
        <>
         <div className="card" style={{marginTop: "5%",width:"70%",marginLeft:"15%",boxShadow: "1px 2px 2px grey"}}>
             <div className="row">
                  <div className="col">
                      <h3>Add a Root Category</h3>
                      {rootSuccess ? <p style={{color:"green"}}>Category added at root</p>:null}
                      {rootError ? <p style={{color: "red"}}>{rootError}</p> :  null}
                      <div className="card-body" style={{marginRight: "15%"}}>
                            <form onSubmit={rootFormSubmitHandler}>
                            <div className="form-group row">
                                 <input className="form-control"  type="text" value={rootName} onChange={rootNameChangeHandler} placeholder="Name" required style={{marginLeft: "22%"}}/>
                           </div>             
                             <div className="form-group row" style={{marginLeft:"30%"}}>
                                   <div className="col-lg-9">
                                         <button type="Submit" className="btn btn-primary" >Submit</button>
                                   </div>
                            </div>
                            </form>
                      </div>
                  </div>
                  <div style={{borderLeft: "2px solid black"}}></div>
                  <div className="col">
                  <h3>Add a Sub Category</h3>
                      {subSuccess ? <p style={{color:"green"}}>Category added</p>:null}
                      {subError ? <p style={{color: "red"}}>{subError}</p> :  null}
                      <div className="card-body" style={{marginRight: "15%"}}>
                            <form onSubmit={formSubmitHandler}>
                                <div className="form-group row">
                                    <input className="form-control"  type="text" value={subName} onChange={subNameChangeHandler} placeholder="Name" required style={{marginLeft: "22%"}}/>
                                </div>
                                <div className="form-group row" style={{marginLeft: "15%",width:"125%"}}>
                                        <div className="col-lg-9">
                                            <select id="categoryId" className="form-control" size="0" onChange={categoryChangeHandler} >
                                                <option value="default">Parent Category</option>
                                                {categories.map(category => (
                                                    <option key={category.category.id} value={category.category.id} onChange={categoryChangeHandler}>{category.category.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                </div>             
                                <div className="form-group row" style={{marginLeft:"30%"}}>
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

export default connect(mapStateToProps)(AddCategoryPage);