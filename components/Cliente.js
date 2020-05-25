import React from 'react';

const Cliente = ({ cliente }) => {
	const { id, nombre, apellido, empresa, email } = cliente;

	const confirmarEliminarCliente = (id) => {
		console.log(id);
	};

	return (
		<tr>
			<td className="border px-4 py-2">
				{nombre} {apellido}
			</td>
			<td className="border px-4 py-2">{empresa}</td>
			<td className="border px-4 py-2">{email}</td>
			<td className="border px-4 py-2">
				<button
					type="button"
					className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
					onClick={() => confirmarEliminarCliente(id)}
				>
					Eliminar
					<svg
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						stroke="currentColor"
						viewBox="0 0 24 24"
						className="w-4 h-4 ml-2"
					>
						<path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</button>
			</td>
		</tr>
	);
};

export default Cliente;
