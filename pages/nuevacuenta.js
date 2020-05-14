import React from 'react';
import Layout from '../components/Layout';

const NuevaCuenta = () => {
	return (
		<React.Fragment>
			<Layout>
				<h1 className="text-center text-2xl text-white font-light">Crear Nueva Cuenta</h1>
				<div className="flex justify-center mt-5">
					<div className="w-full max-w-sm">
						<form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
									Nombre
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="nombre"
									type="text"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
									Apellido
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="apellido"
									type="text"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
									Email
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="email"
									type="email"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
									Password
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="password"
									type="password"
								/>
							</div>
							<input
								type="submit"
								className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
								value="Crear Cuenta"
							/>
						</form>
					</div>
				</div>
			</Layout>
		</React.Fragment>
	);
};

export default NuevaCuenta;
