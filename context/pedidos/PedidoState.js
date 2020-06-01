import React, { useReducer } from 'react';
import PedidoContext from './PedidoContext';
import { SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTO, CANTIDAD_PRODUCTOS } from '../../types';
import PedidoReducer from './PedidoReducer';

const PedidoState = ({ children }) => {
	const initialState = {
		cliente: {},
		productos: [],
		total: 0
	};

	const [ state, dispatch ] = useReducer(PedidoReducer, initialState);

	const agregarCliente = (cliente) => {
		dispatch({
			type: SELECCIONAR_CLIENTE,
			payload: cliente
		});
	};

	const agregarProducto = (producto) => {
		dispatch({
			type: SELECCIONAR_PRODUCTO,
			payload: producto
		});
	};

	// modifica las cantidades de los productos en un pedido
	const cantidadProductos = (nuevoProducto) => {
		dispatch({
			type: CANTIDAD_PRODUCTOS,
			payload: nuevoProducto
		});
	};

	return (
		<PedidoContext.Provider
			value={{ productos: state.productos, agregarCliente, agregarProducto, cantidadProductos }}
		>
			{children}
		</PedidoContext.Provider>
	);
};

export default PedidoState;
