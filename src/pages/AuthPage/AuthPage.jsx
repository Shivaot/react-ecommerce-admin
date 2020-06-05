import React from "react";

import "./AuthPage.styles.scss";
import SignIn from "../../components/SignIn/SignIn";
const AuthPage = () => {
	return (
		<>
			<h2><u>Welcome to Admin Dashboard</u></h2><br />
			<div className="auth-page" style={{marginLeft:"35%"}}>
				<SignIn />
			</div>
		</>
	);
};

export default AuthPage;
