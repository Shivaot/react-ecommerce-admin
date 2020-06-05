import React from "react";
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";


import classes from "./Navbar.module.css";


const Navbar = (props) => {


	if (!props.isAuthenticated) {
		return null;
	}
	return (
		<div id="navbarDiv">
			<header className={classes.header}>
				<ul className={classes.mainNav} style={{marginLeft: "8%"}}>
					{props.isAuthenticated ? <li> <NavLink to="/customers" exact className="link" activeStyle={{ color: 'orange' }}>Customer</NavLink> </li> : null}
					{props.isAuthenticated ? <li> <NavLink to="/sellers" exact className="link" activeStyle={{ color: 'orange' }}>Sellers</NavLink> </li> : null}
					{props.isAuthenticated ? <li> <NavLink to="/products" exact className="link" activeStyle={{ color: 'orange' }}>Products</NavLink> </li> : null}
					{props.isAuthenticated ? <li> <NavLink to="/categories" exact className="link" activeStyle={{ color: 'orange' }}>Categories</NavLink> </li> : null}
					{props.isAuthenticated ? <li> <NavLink to="/addCategory" exact className="link" activeStyle={{ color: 'orange' }}>Add Category</NavLink> </li> : null}
					{props.isAuthenticated ? <li> <NavLink to="/metadata" exact className="link" activeStyle={{ color: 'orange' }}>Metadata</NavLink> </li> : null}
					{props.isAuthenticated ? <li> <NavLink to="/addMetadata" exact className="link" activeStyle={{ color: 'orange' }}>Add Metadata</NavLink> </li> : null}
					{props.isAuthenticated ? <li> <NavLink to="/fieldValues" exact className="link" activeStyle={{ color: 'orange' }}>Add Field Values</NavLink> </li> : null}
					{props.isAuthenticated ? <li> <NavLink to="/logout" activeStyle={{ color: 'orange' }} className="link">Logout</NavLink> </li> : <li> <NavLink to="/signin" activeStyle={{ color: 'orange' }} className="link">Sign In</NavLink> </li>}
				</ul>
			</header>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	}
}

export default connect(mapStateToProps)(Navbar);

