import React, { useContext } from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarProductos from '../components/pedidos/AsignarProductos';
import ResumenPedido from '../components/pedidos/ResumenPedido';
import Total from '../components/pedidos/Total';
import { gql, useMutation } from '@apollo/client';

import PedidoContext from '../context/pedidos/PedidoContext';

const NUEVO_PEDIDO = gql`
	mutation nuevoPedido($input: PedidoInput) {
		nuevoPedido(input: $input) {
			id
		}
	}
`;

const NuevoPedido = () => {
	const [ nuevoPedido ] = useMutation(NUEVO_PEDIDO);

	const pedidoContext = useContext(PedidoContext);
	const { cliente, productos, total } = pedidoContext;

	const validarPedido = () => {
		return !productos.every((producto) => producto.cantidad > 0) || total === 0 || cliente.length === 0
			? ' opacity-50 cursor-not-allowed'
			: '';
	};

	const crearNuevoPedido = async () => {
		const { id } = cliente;

		// remover lo no deseado de producto
		const pedido = productos.map(({ __typename, existencia, ...producto }) => producto);
		try {
			const { data } = await nuevoPedido({
				variables: {
					input: {
						cliente: id,
						total,
						pedido
					}
				}
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>
			<div className="flex justify-center mt-5">
				<div className="w-full max-w-lg">
					<AsignarCliente />
					<AsignarProductos />
					<ResumenPedido />
					<Total />
					<button
						type="button"
						className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}
						onClick={() => crearNuevoPedido()}
					>
						Registrar Pedido
					</button>
				</div>
			</div>
		</Layout>
	);
};

export default NuevoPedido;
