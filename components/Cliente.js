import React from 'react';

const Cliente = ({ cliente }) => {
	const { nombre, apellido, empresa, email } = cliente;

	return (
		<tr>
			<td className="border px-4 py-2">
				{nombre} {apellido}
			</td>
			<td className="border px-4 py-2">{empresa}</td>
			<td className="border px-4 py-2">{email}</td>
		</tr>
	);
};

export default Cliente;
