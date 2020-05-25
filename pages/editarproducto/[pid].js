import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const OBTENER_PRODUCTO = gql`
	query obtenerProducto($id: ID!) {
		obtenerProducto(id: $id) {
			nombre
			existencia
			precio
		}
	}
`;

const ACTUALIZAR_PRODUCTO = gql`
	mutation actualizarProducto($id: ID!, $input: ProductoInput) {
		actualizarProducto(id: $id, input: $input) {
			nombre
		}
	}
`;

const EditarProducto = () => {
	const router = useRouter();
	const { query: { id } } = router;

	const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
		variables: {
			id
		}
	});

	const [ actualizarCliente ] = useMutation(ACTUALIZAR_PRODUCTO);

	const schemaValidation = Yup.object({
		nombre: Yup.string().required('El nombre del producto es obligatorio'),
		existencia: Yup.number()
			.required('Agrega la cantidad disponible')
			.positive('No se aceptan números negativos.')
			.integer('La existencia debe ser un número entero.'),
		precio: Yup.number()
			.required('El precio del producto es obligatorio')
			.positive('No se aceptan números negativos.')
	});

	if (loading) return 'Cargando...';

	const actualizarInfoProducto = async (valores) => {
		const { nombre, existencia, precio } = valores;
		try {
			const { data } = await actualizarCliente({
				variables: {
					id,
					input: {
						nombre,
						existencia,
						precio
					}
				}
			});

			Swal.fire('Actualizado!', `${data.actualizarProducto.nombre} se actualizó correctamente.`, 'success');

			router.push('/productos');
		} catch (error) {
			console.log(error);
		}
	};

	const { obtenerProducto } = data;

	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">Editar Producto</h1>

			<div className="flex justify-center mt-5">
				<div className="w-full max-w-lg">
					<Formik
						validationSchema={schemaValidation}
						enableReinitialize
						initialValues={obtenerProducto}
						onSubmit={(valores) => {
							actualizarInfoProducto(valores);
						}}
					>
						{(props) => {
							return (
								<form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={props.handleSubmit}>
									<div className="mb-4">
										<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
											Nombre
										</label>
										<input
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											id="nombre"
											type="text"
											autoComplete="off"
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.nombre}
										/>
										{props.touched.nombre && props.errors.nombre ? (
											<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
												<p className="font-bold">Error</p>
												<p>{props.errors.nombre}</p>
											</div>
										) : null}
									</div>
									<div className="mb-4">
										<label
											className="block text-gray-700 text-sm font-bold mb-2"
											htmlFor="existencia"
										>
											Existencia
										</label>
										<input
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											id="existencia"
											type="number"
											autoComplete="off"
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.existencia}
										/>
										{props.touched.existencia && props.errors.existencia ? (
											<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
												<p className="font-bold">Error</p>
												<p>{props.errors.existencia}</p>
											</div>
										) : null}
									</div>
									<div className="mb-4">
										<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
											Precio
										</label>
										<input
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											id="precio"
											type="number"
											autoComplete="off"
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.precio}
										/>
										{props.touched.precio && props.errors.precio ? (
											<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
												<p className="font-bold">Error</p>
												<p>{props.errors.precio}</p>
											</div>
										) : null}
									</div>
									<input
										type="submit"
										className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
										value="Editar Producto"
									/>
								</form>
							);
						}}
					</Formik>
				</div>
			</div>
		</Layout>
	);
};

export default EditarProducto;
