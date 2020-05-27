import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const clientes = [ { id: 1, nombre: 'Juan' }, { id: 2, nombre: 'Pablo' }, { id: 3, nombre: 'Daniel' } ];

const AsignarCliente = () => {
	const [ cliente, setClientes ] = useState([]);

	useEffect(
		() => {
			console.log(cliente);
		},
		[ cliente ]
	);

	const seleccionarCliente = (clientes) => {
		setClientes(clientes);
	};

	return (
		<Select
			options={clientes}
			isMulti={true}
			onChange={(opcion) => seleccionarCliente(opcion)}
			getOptionValue={(opcion) => opcion.id}
			getOptionLabel={(opcion) => opcion.nombre}
			placeholder="Busque o Seleccione el cliente"
			noOptionsMessage={() => 'No hay resultados'}
		/>
	);
};

export default AsignarCliente;
