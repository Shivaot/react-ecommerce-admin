import React, { useEffect ,useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const CustomerPage = ({ token }) => {
    const [customers,setCustomers] = useState([]);
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
        axios.get('/customers',{ headers: headers })
            .then(response => {
                console.log(response.data);
                setCustomers(response.data);
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
        axios.patch('admin/customer/activate/' + id, {} , { headers: headers })
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
        axios.patch('admin/customer/deactivate/' + id, {} , { headers: headers })
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
            <th scope="col">Customer Id</th>
            <th scope="col">Customer Email</th>
            <th scope="col">Full Name</th>
            <th scope="col">Status</th>
            <th scope="col">Activate</th>
            <th scope="col">De-Activate</th>
            </tr>
        </thead>
        <tbody>
            {customers.map((customer,index) => (
                <tr key={customer.id}>
                    <th scope="row">{index}</th>
                    <td>{customer.id}</td>
                    <td>{customer.email}</td>
                    <td>{customer.fullName.replace("null",'')}</td>
                    {customer.active.toString() === "true" ? <td><i className="far fa-smile" style={{color:"green"}}></i></td> : <td><i className="far fa-frown" style={{color:"red"}}></i></td>}
                    <td><button type="submit" className="btn btn-success" onClick={() => activateClick(customer.id)} disabled={customer.active ? "disabled" : null}>Activate</button></td>
                    <td><button type="submit" className="btn btn-danger" onClick={() => deActivateClick(customer.id)} disabled={customer.active ? null : "disabled"}>De-Activate</button></td>
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

export default connect(mapStateToProps)(withErrorHandler(CustomerPage,axios));