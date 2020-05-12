import React from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';

const Layout = ({ children }) => {
	return (
		<React.Fragment>
			<Head>
				<title>CRM - Administración de Clientes</title>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
					integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU="
					crossorigin="anonymous"
				/>
				<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
			</Head>

			<div className="bg-gray-200 min-h-screen">
				<div className="flex min-h-screen">
					<Sidebar />
					{children}
				</div>
			</div>
		</React.Fragment>
	);
};

export default Layout;
