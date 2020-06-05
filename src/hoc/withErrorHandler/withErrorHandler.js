import React, { useState, useEffect } from "react";

import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
	return (props) => {
		const [error, setError] = useState(null);

		const requestInterceptors = axios.interceptors.request.use((request) => {
			setError(null);
			return request;
		});

		const responseInterceptors = axios.interceptors.response.use(
			(response) => response,
			(err) => {
				if (err.response) {
					console.log(err.response);
					
				}
				console.log(err);
				
				setError(err.message);
			}
		);

		useEffect(() => {
			return () => {
				axios.interceptors.request.eject(requestInterceptors);
				axios.interceptors.response.eject(responseInterceptors);
			};
		}, [requestInterceptors, responseInterceptors]);

		const errorConfirmedHandler = () => {
			setError(null);
		};

		return (
			<>
				<Modal show={error} modalClosed={errorConfirmedHandler}>
					{error ? error + " sorry for error": null}
				</Modal>
				<WrappedComponent {...props} />
			</>
		);

	
	};
};

export default withErrorHandler;
