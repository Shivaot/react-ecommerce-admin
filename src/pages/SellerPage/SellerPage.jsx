import React, { useEffect ,useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const SellerPage = ({ token }) => {
    const [sellers,setSellers] = useState([]);
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
        axios.get('/sellers',{ headers: headers })
            .then(response => {
                console.log(response.data);
                setSellers(response.data);
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
        axios.patch('admin/seller/activate/' + id, {} , { headers: headers })
            .then(response => {
                console.log(response.data);
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
        axios.patch('admin/seller/deactivate/' + id, {} , { headers: headers })
            .then(response => {
                console.log(response.data);
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
            <th scope="col">Seller Id</th>
            <th scope="col">Seller Email</th>            
            <th scope="col">Full Name</th>
            <th scope="col">Company Name</th>
            <th scope="col">Status</th>
            <th scope="col">Activate</th>
            <th scope="col">De-Activate</th>
            </tr>
        </thead>
        <tbody>
            {sellers.map((seller,index) => (
                <tr key={seller.id}>
                    <th scope="row">{index}</th>
                    <td>{seller.id}</td>
                    <td>{seller.email}</td>
                    <td>{seller.fullName.replace("null",'')}</td>
                    <td>{seller.companyName}</td>
                    {seller.active.toString() === "true" ? <td><i className="far fa-smile" style={{color:"green"}}></i></td> : <td><i className="far fa-frown" style={{color:"red"}}></i></td>}
                    <td><button type="submit" className="btn btn-success" onClick={() => activateClick(seller.id)} disabled={seller.active ? "disabled" : null}>Activate</button></td>
                    <td><button type="submit" className="btn btn-danger" onClick={() => deActivateClick(seller.id)} disabled={seller.active ? null : "disabled"}>De-Activate</button></td>
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

export default connect(mapStateToProps)(withErrorHandler(SellerPage,axios));