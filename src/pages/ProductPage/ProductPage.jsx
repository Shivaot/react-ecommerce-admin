import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
const ProductPage = ({ token }) => {
    const [products,setProducts] = useState([]);
    const [activated,setActivated] = useState(false);
    const [deactivated,setDeactivated] = useState(false);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setActivated(false);
        setDeactivated(false);
        const headers = {
            "Authorization": "Bearer" + token
        }
        axios.get('product/admin/all',{ headers: headers })
            .then(response => {
                // console.log(response.data);
                setProducts(response.data.products)
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                if (error.response) {
                    console.log(error.response.data);
                }
            })
    },[token,activated,deactivated])
    const activateClick = (id) => {
        const headers = {
            "Authorization": "Bearer" + token
        }
        axios.put('product/admin/activate/' + id, {} , { headers: headers })
            .then(response => {
                // console.log(response.data);
                setActivated(true);
            })
            .catch(error => {
                console.log(error.response.data);
            })
    }
    const deActivateClick = (id) => {
        const headers = {
            "Authorization": "Bearer" + token
        }
        axios.put('product/admin/deactivate/' + id, {} , { headers: headers })
            .then(response => {
                // console.log(response.data);
                setDeactivated(true);
            })
            .catch(error => {
                console.log(error.response.data);
            })
    }
    if (loading) {
        return <Spinner />;
    }    
    return (
        <table className="table table-hover table-responsive-lg">
        <thead className="thead-dark">
            <tr>
            <th scope="col">#</th>
            <th scope="col">Product Id</th>
            <th scope="col">Name</th>
            <th scope="col">Brand</th>
            <th scope="col">Category</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Activate</th>
            <th scope="col">De-Activate</th>
            </tr>
        </thead>
        <tbody>
            {products.map((product,index) => (
                <tr key={product.id}>
                    <th scope="row">{index}</th>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{product.category.name}</td>
                    <td>{product.description ? product.description.split(" ").pop(-1) : "-"}</td>
                    {product.active.toString() === "true" ? <td><i className="far fa-smile" style={{color:"green"}}></i></td> : <td><i className="far fa-frown" style={{color:"red"}}></i></td>}
                    <td><button type="submit" className="btn btn-success" onClick={() => activateClick(product.id)} disabled={product.active ? "disabled" : null}>Activate</button></td>
                    <td><button type="submit" className="btn btn-danger" onClick={() => deActivateClick(product.id)} disabled={product.active ? null : "disabled"}>De-Activate</button></td>
                </tr>
            ))} 
        </tbody>
    </table>
    );
};

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(withErrorHandler(ProductPage,axios));