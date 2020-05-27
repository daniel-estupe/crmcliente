import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';

const OBTENER_PRODUCTOS = gql`
	query obtenerProductos {
		obtenerProductos {
			id
			nombre
			precio
			existencia
		}
	}
`;

const AsignarProductos = () => {
	const [ producto, setProducto ] = useState([]);

	const pedidoContext = useContext(PedidoContext);
	const { agregarProducto } = pedidoContext;

	const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

	useEffect(
		() => {
			agregarProducto(producto);
		},
		[ producto ]
	);

	if (loading) return null;

	const seleccionarProducto = (cliente) => {
		setProducto(cliente);
	};

	const { obtenerProductos } = data;

	return (
		<React.Fragment>
			<p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
				2.- Selecciona o busca los productos
			</p>
			<Select
				className="mt-3"
				options={obtenerProductos}
				onChange={(opcion) => seleccionarProducto(opcion)}
				isMulti={true}
				getOptionValue={(opcion) => opcion.id}
				getOptionLabel={(opcion) => `${opcion.nombre} - ${opcion.existencia} Disponibles`}
				placeholder="Busque o Seleccione el producto"
				noOptionsMessage={() => 'No hay resultados'}
			/>
		</React.Fragment>
	);
};

export default AsignarProductos;
