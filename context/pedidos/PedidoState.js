import React, { useReducer } from 'react';
import PedidoContext from './PedidoContext';
import { SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTO, CANTIDAD_PRODUCTOS } from '../../types';
import PedidoReducer from './PedidoReducer';

const PedidoState = ({ children }) => {
	const initialState = {
		cliente: [],
		productos: [],
		total: 0
	};

	const [ state, dispatch ] = useReducer(PedidoReducer, initialState);

	return <PedidoContext.Provider value={{}}>{children}</PedidoContext.Provider>;
};

export default PedidoState;
