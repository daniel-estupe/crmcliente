import React, { useContext } from 'react';
import ProductoResumen from './ProductoResumen';
import PedidoContext from '../../context/pedidos/PedidoContext';

const ResumenPedido = () => {
	const pedidoContext = useContext(PedidoContext);
	const { productos } = pedidoContext;

	return (
		<React.Fragment>
			<p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
				3.- Ajusta las cantidades del producto
			</p>
			{productos.length > 0 ? (
				<React.Fragment>
					{productos.map((producto) => <ProductoResumen key={producto.id} producto={producto} />)}
				</React.Fragment>
			) : (
				<p className="mt-5 text-sm">Aún no hay productos</p>
			)}
		</React.Fragment>
	);
};

export default ResumenPedido;
