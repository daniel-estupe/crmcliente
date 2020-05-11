import React from 'react';

const Layout = ({ children }) => {
	return (
		<React.Fragment>
			<h1>Desde Layout</h1>
			{children}
		</React.Fragment>
	);
};

export default Layout;
