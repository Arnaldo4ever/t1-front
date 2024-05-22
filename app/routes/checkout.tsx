/* eslint-disable prefer-const */
import {
	isRouteErrorResponse,
	useActionData,
	useRouteError,
	Form
} from "@remix-run/react";
import type { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
// import { json } from "@remix-run/node";
import { CrearTarjeta } from "./crear-tarjeta";
// import { CrearCargo } from "./crear-cargo";
// import { AntiFraude } from "./anti-fraude";

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();

	const values = Object.fromEntries(formData);

	const btnTrigger = formData.get("btn-trigger");

	if (btnTrigger === "submit-checkout") {
		// return AntiFraude(values);
		return await CrearTarjeta(values);
	}
};

export default function Checkout() {
	const actionData = useActionData<typeof action>();

	return (
		<>
			<div className="max-w-full bg-slate-900 py-20">
				<div className="max-w-full md:max-w-7xl px-4 sm:px-8 lg:px-12 mx-auto">
					<Form method="post" className="grid grid-cols-12 bg-white">
						{/* Datos de Pago */}
						<div className="col-span-12 md:col-span-7 md:border-r md:border-gray-300">
							<div className="w-full p-10">
								<div className="grid grid-cols-12 gap-4">
									{/* Contacto */}
									<div className="col-span-12">
										<h3 className="block text-xl font-semibold text-gray-700">
											Contacto
										</h3>
										<div className="relative mt-2 rounded shadow-sm">
											<input
												type="text"
												name="email"
												id="email"
												className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
												placeholder="Correo electrónico"
											/>
										</div>
										<div className="relative flex gap-x-2 mt-4">
											<div className="flex items-center">
												<input
													id="suscripcion"
													name="suscripcion"
													type="checkbox"
													defaultChecked
													className="h-4 w-4 rounded-md border-gray-100 text-blue-600 focus:ring-blue-600 transition-all"
												/>
											</div>
											<div className="text-sm leading-6">
												<label htmlFor="suscripcion" className="font-normal text-gray-900">
													Enviarme novedades y ofertas por correo electrónico
												</label>
											</div>
										</div>
									</div>
									{/* Delivery */}
									<div className="col-span-12 mt-5">
										<div className="grid grid-cols-12 gap-4">
											<div className="col-span-12">
												<h3 className="text-xl font-medium leading-6 text-gray-900">
													Delivery
												</h3>
												<div className="w-full mt-4">
													<select
														id="pais"
														name="pais"
														autoComplete="country-name"
														className="block w-full rounded-md border-0 py-3.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 transition-all outline-0"
													>
														<option value="COL">Colombia</option>
														<option value="MEX">Mexico</option>
														<option value="PRI">Puerto Rico</option>
													</select>
												</div>
											</div>
											<div className="col-span-6">
												<input
													type="text"
													name="cliente_nombre"
													id="cliente_nombre"
													className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
													placeholder="Nombre"
												/>
												{actionData?.errores?.cliente ? (
													<span className="text-sm font-medium text-red-500 mt-2">{actionData?.errores.cliente}</span>
												) : null}
											</div>
											<div className="col-span-6">
												<input
													type="text"
													name="apellido_paterno"
													id="apellido_paterno"
													className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
													placeholder="Apellido"
												/>
											</div>
											<div className="col-span-12">
												<input
													type="text"
													name="linea1"
													id="linea1"
													className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
													placeholder="Dirección"
												/>
											</div>
											<div className="col-span-12">
												<input
													type="text"
													name="linea2"
													id="linea2"
													className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
													placeholder="Apartamento, casa, etc... (opcional)"
												/>
											</div>
											<div className="col-span-4">
												<input
													type="text"
													name="ciudad"
													id="ciudad"
													className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
													placeholder="Ciudad"
												/>
											</div>
											<div className="col-span-4">
												<input
													type="text"
													name="municipio"
													id="municipio"
													className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
													placeholder="Municipio"
												/>
											</div>
											<div className="col-span-4">
												<input
													type="text"
													name="cp"
													id="cp"
													className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
													placeholder="Código Postal"
												/>
											</div>
											<div className="col-span-12">
												<div className="relative flex gap-x-2">
													<div className="flex items-center">
														<input
															id="guardar_info"
															name="guardar_info"
															type="checkbox"
															className="h-4 w-4 rounded-md border-gray-100 text-blue-600 focus:ring-blue-600 transition-all"
														/>
													</div>
													<div className="text-sm leading-6">
														<label htmlFor="guardar_info" className="font-normal text-gray-900">
															Guardar esta información para una próxima vez
														</label>
													</div>
												</div>
											</div>
											<div className="col-span-12 mt-5">
												<h3 className="text-lg font-medium leading-6 text-gray-900">
													Método de Envio
												</h3>
												<div className="relative flex gap-x-2 mt-4 border rounded-t-md p-5">
													<div className="flex items-center">
														<input
															id="envio_internacional"
															name="envio"
															type="radio"
															className="h-4 w-4 rounded-md border-gray-100 text-blue-600 focus:ring-blue-600 transition-all"
														/>
													</div>
													<div className="text-sm leading-6 flex items-center justify-between w-full">
														<label htmlFor="envio_internacional" className="font-normal text-gray-900">
															Envio Internacional
														</label>
														<p className="font-sans font-semibold">$30.00</p>
													</div>
												</div>
												<div className="relative flex gap-x-2 border border-t-0 rounded-b-md p-5">
													<div className="flex items-center">
														<input
															id="envio_standard"
															name="envio"
															type="radio"
															className="h-4 w-4 rounded-md border-gray-100 text-blue-600 focus:ring-blue-600 transition-all"
														/>
													</div>
													<div className="text-sm leading-6 flex items-center justify-between w-full">
														<label htmlFor="envio_standard" className="font-normal text-gray-900">
															Stándard
														</label>
														<p className="font-sans font-semibold">$100.00</p>
													</div>
												</div>
											</div>
										</div>
									</div>
									{/* Credit Card */}
									<div className="col-span-12 mt-5">
										<h3 className="block text-xl font-semibold text-gray-700">
											Payment / Pago
										</h3>
										<p className="font-sans text-gray-500 text-sm leading-6">Todas las transacciones son seguras y encriptadas</p>
										{/* Card */}
										<div className="grid grid-cols-12 gap-4 mt-3">
											<div className="col-span-12">
												<div className="rounded-md bg-gray-100 border border-t-0">
													<div className="py-4 px-3 border bg-blue-50 border-blue-500 rounded-t-md">
														<h4>Tarjeta de Crédito</h4>
													</div>
													<div className="py-3 px-3.5">
														<div className="grid grid-cols-12 gap-4">
															<div className="col-span-12">
																<input
																	type="text"
																	name="pan"
																	id="pan"
																	className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all mt-3"
																	placeholder="Número de la Tarjeta"
																/>
															</div>
															<div className="col-span-5">
																<input
																	type="text"
																	name="expiracion_mes"
																	id="expiracion_mes"
																	className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
																	placeholder="Fecha de expiración (MM / AA)"
																/>
															</div>
															<div className="col-span-5">
																<input
																	type="text"
																	name="expiracion_anio"
																	id="expiracion_anio"
																	className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
																	placeholder="Fecha de expiración (MM / AA)"
																/>
															</div>
															<div className="col-span-2">
																<input
																	type="text"
																	name="cvv2"
																	id="cvv2"
																	className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
																	placeholder="Código de seguridad"
																/>
															</div>
															<div className="col-span-12">
																<input
																	type="text"
																	name="nombre"
																	id="nombre"
																	className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
																	placeholder="Nombre en la Tarjeta"
																/>
															</div>
															<div className="col-span-12">
																<div className="relative flex gap-x-2">
																	<div className="flex items-center">
																		<input
																			id="billingAddress"
																			name="billingAddress"
																			type="checkbox"
																			defaultChecked
																			className="h-4 w-4 rounded-md border-gray-100 text-blue-600 focus:ring-blue-600 transition-all"
																		/>
																	</div>
																	<div className="text-sm leading-6">
																		<label htmlFor="billingAddress" className="font-normal text-gray-900">
																			Usar la dirección de envío como dirección de facturación
																		</label>
																	</div>
																</div>
															</div>
															{/* <div className="col-span-12">
																<div className="grid grid-cols-12 gap-4">
																	<div className="col-span-12">
																		<h3 className="text-xl font-medium leading-6 text-gray-900">
																			Billing Address
																		</h3>
																		<div className="w-full mt-4">
																			<select
																				id="pais"
																				name="pais"
																				autoComplete="country-name"
																				className="block w-full rounded-md border-0 py-3.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 transition-all outline-0"
																			>
																				<option value="VEN">Venezuela</option>
																				<option value="COL">Colombia</option>
																				<option value="MEX">Mexico</option>
																				<option value="PRI">Puerto Rico</option>
																			</select>
																		</div>
																	</div>
																	<div className="col-span-6">
																		<input
																			type="text"
																			name="cliente_nombre"
																			id="cliente_nombre"
																			className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
																			placeholder="Nombre"
																		/>
																		{actionData?.errores?.cliente ? (
																			<span className="text-sm font-medium text-red-500 mt-2">{actionData?.errores.cliente}</span>
																		) : null}
																	</div>
																	<div className="col-span-6">
																		<input
																			type="text"
																			name="apellido_paterno"
																			id="apellido_paterno"
																			className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
																			placeholder="Apellido"
																		/>
																	</div>
																	<div className="col-span-12">
																		<input
																			type="text"
																			name="linea1"
																			id="linea1"
																			className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
																			placeholder="Dirección"
																		/>
																	</div>
																	<div className="col-span-12">
																		<input
																			type="text"
																			name="linea2"
																			id="linea2"
																			className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
																			placeholder="Apartamento, casa, etc... (opcional)"
																		/>
																	</div>
																	<div className="col-span-4">
																		<input
																			type="text"
																			name="ciudad"
																			id="ciudad"
																			className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
																			placeholder="Ciudad"
																		/>
																	</div>
																	<div className="col-span-4">
																		<input
																			type="text"
																			name="municipio"
																			id="municipio"
																			className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
																			placeholder="Municipio"
																		/>
																	</div>
																	<div className="col-span-4">
																		<input
																			type="text"
																			name="cp"
																			id="cp"
																			className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
																			placeholder="Código Postal"
																		/>
																	</div>
																</div>
															</div> */}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								{/* Action */}
								<div className="col-span-12 mt-5">
									<div className="flex flex-col items-center justify-center align-middle">
										<button type="submit" name="btn-trigger" value="submit-checkout" className="block w-full font-sans font-bold text-xl bg-blue-600 hover:bg-blue-700 text-white rounded hover:shadow-lg py-3 px-2 transition-all">Pagar ahora</button>
									</div>
								</div>
								<div className="col-span-12 mt-20">
									<hr />
								</div>
								<div className="col-span-12 mt-5">
									<a href="#j" className="text-blue-500">Política de suscripción</a>
								</div>
							</div>
						</div>
						{/* Producto */}
						<div className="col-span-12 md:col-span-5 bg-gray-100">
							<div className="w-full p-10 sticky top-0 right-0 left-0">
								<div className="grid grid-cols-12 gap-4">
									<div className="col-span-12">
										<div className="flex items-center justify-between">
											<div className="c-product">
												<h6 className="font-sans text-sm">The 3p Fulfilled Snowboard</h6>
											</div>
											<div className="c-product__price-label">
												<p className="c-product__price font-sans text-sm">$2,629.95</p>
											</div>
										</div>
									</div>
									<div className="col-span-12">
										<div className="flex items-center justify-between space-x-4">
											<input
												type="text"
												name="cupon"
												id="cupon"
												className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
												placeholder="Cupón de descuento o tarjeta de regalo"
											/>
											<div className="flex flex-col items-center justify-center align-middle">
												<button type="submit" className="font-sans text-base font-medium border-gray-300 bg-gray-200 hover:bg-gray-300 text-gray-500 rounded hover:shadow-lg py-3 px-2 ring-1 ring-inset ring-gray-300 outline-0 transition-all">Aplicar</button>
											</div>
										</div>
									</div>
									<div className="col-span-12 space-y-3">
										<div className="flex items-center justify-between">
											<div className="c-product">
												<h6 className="font-sans text-sm">Subtotal</h6>
											</div>
											<div className="c-product__price-label">
												<p className="c-product__price font-sans text-sm font-medium">$2,629.95</p>
											</div>
										</div>
										<div className="flex items-center justify-between">
											<div className="c-product">
												<h6 className="font-sans text-sm">Shipping</h6>
											</div>
											<div className="c-product__price-label">
												<p className="c-product__price font-sans text-sm">Enter shipping address</p>
											</div>
										</div>
										<div className="flex items-center justify-between">
											<div className="c-product">
												<h6 className="font-sans text-sm">Estimated taxes</h6>
											</div>
											<div className="c-product__price-label">
												<p className="c-product__price font-sans text-sm font-medium">$499.69</p>
											</div>
										</div>
										<div className="flex items-center justify-between">
											<div className="c-product">
												<h6 className="font-sans text-xl font-semibold">Total</h6>
											</div>
											<div className="c-product__price-label">
												<div className="c-product__price font-sans text-sm font-medium">
													<span className="font-light text-gray-500">COP  </span>
													<input type="text" name="monto" id="monto" className="text-xl font-medium" defaultValue="99999" />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Form>
				</div>
			</div>
		</>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();
	let heading = '¡Algo salio mal!';
	let message = `Disculpe, algo salio mal, por favor intente nuevamente.`;
	if (isRouteErrorResponse(error) && error.status === 400) {
		heading = 'Error en los parametros de entrada';
		message = `Disculpe, todos los campos son requeridos! Por favor verifique los campos antes de realizar su pago.`;
	}

	return (
		<>
			<div className="max-w-full h-screen">
				<div className="max-w-full md:max-w-7xl px-4 sm:px-8 lg:px-12 mx-auto h-full">
					<div className="grid grid-cols-12 gap-4 h-full">
						<div className="col-span-12">
							<div className="flex flex-col items-center justify-center align-middle h-full">
								<h2 className="font-sans text-3xl font-bold text-red-500 leading-loose">{heading}</h2>
								<p className="font-sans text-base font-normal text-slate-900">{message}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}