import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';

const ELIMINAR_CLIENTE = gql`
	mutation eliminarCliente($id: ID!) {
		eliminarCliente(id: $id)
	}
`;

const OBTENER_CLIENTES = gql`
	query obtenerClientesVendedor {
		obtenerClientesVendedor {
			id
			nombre
			apellido
			empresa
			email
		}
	}
`;

const Cliente = ({ cliente }) => {
	const [ eliminarCliente ] = useMutation(ELIMINAR_CLIENTE, {
		update(cache) {
			const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES });

			cache.writeQuery({
				query: OBTENER_CLIENTES,
				data: {
					obtenerClientesVendedor: obtenerClientesVendedor.filter((clienteActual) => clienteActual.id !== id)
				}
			});
		}
	});

	const { id, nombre, apellido, empresa, email } = cliente;

	const confirmarEliminarCliente = () => {
		Swal.fire({
			title: '¿Deseas eliminar a este cliente?',
			text: 'Esta acción no se puede deshacer!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, eliminar!',
			cancelButtonText: 'No, cancelar!'
		}).then(async (result) => {
			if (result.value) {
				try {
					const { data } = await eliminarCliente({
						variables: {
							id
						}
					});
					Swal.fire('Eliminado!', data.eliminarCliente, 'success');
				} catch (error) {
					console.log(error);
				}
			}
		});
	};

	const editarCliente = () => {
		Router.push({
			pathname: '/editarcliente/[id]',
			query: { id }
		});
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
					onClick={() => confirmarEliminarCliente()}
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
			<td className="border px-4 py-2">
				<button
					type="button"
					className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
					onClick={() => editarCliente()}
				>
					Editar
					<svg
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						stroke="currentColor"
						viewBox="0 0 24 24"
						className="w-4 h-4 ml-2"
					>
						<path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
					</svg>
				</button>
			</td>
		</tr>
	);
};

export default Cliente;
