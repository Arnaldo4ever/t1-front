/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
//! Core Imports
import {
	useActionData,
	Form,
	useNavigation,
	useFetcher,
	useLoaderData,
} from "@remix-run/react";
import { json, type ActionFunction, type ActionFunctionArgs, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import React, { useEffect, useState } from "react";

//! Functions
import { CrearTarjeta } from "./crear-tarjeta";

//! Toastify
import { Bounce, ToastContainer, toast as notify } from "react-toastify";
import { jsonWithSuccess, jsonWithError, getToast, redirectWithSuccess } from "remix-toast";

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
	//! Form Data
	let values = Object.fromEntries(await request.formData());

	//! Form Validation
	let errors: {
		pan?: string,
		cvv2?: string,
		expiracion_mes?: string,
		expiracion_anio?: string,
		nombre?: string,
	} = {}

	if (!values.pan) {
		errors.pan = "El campo número de tarjeta es obligatorio.";
	}

	if (!values.cvv2) {
		errors.cvv2 = "El campo código de seguridad es obligatorio.";
	}

	if (!values.expiracion_mes) {
		errors.expiracion_mes = "El campo mes de expiración es obligatorio.";
	}

	if (!values.expiracion_anio) {
		errors.expiracion_anio = "El campo año de expiración es obligatorio.";
	}

	if (!values.nombre) {
		errors.nombre = "El campo Nombre en la Tarjeta es obligatorio.";
	}

	return new Promise((resolve) => {
		setTimeout(() => {
			if (!Object.keys(errors).length) {
				resolve(redirectWithSuccess("/thank-you", "¡Pago realizado exitosamente!"));
				return resolve(CrearTarjeta(values));
			} else {
				if (errors.pan) {
					resolve(jsonWithError(null, `${errors.pan}`));
				} else if (errors.nombre) {
					resolve(jsonWithError(null, `${errors.nombre}`));
				} else if (errors.expiracion_mes) {
					resolve(jsonWithError(null, `${errors.expiracion_mes}`));
				} else if (errors.expiracion_anio) {
					resolve(jsonWithError(null, `${errors.expiracion_anio}`));
				} else if (errors.cvv2) {
					resolve(jsonWithError(null, `${errors.cvv2}`));
				}
			}
		}, 1500);
	});
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { toast, headers } = await getToast(request);
	return json({ toast }, { headers });
};

export default function Checkout() {
	const actionData = useActionData<typeof action>();
	const { toast } = useLoaderData<typeof loader>();
	const navigation = useNavigation();

	useEffect(() => {
		if (toast) {
			// notify on a toast message
			notify(toast.message, { type: toast.type });
		}
	}, [toast]);

	return (
		<>
			<div className="max-w-full bg-gray-200">
				<nav className="max-w-full bg-[#2E2E2E] py-3 md:py-4">
					<div className="max-w-full md:max-w-7xl px-4 sm:px-8 lg:px-12 mx-auto">
						<div className="grid grid-cols-12 gap-4">
							<div className="col-span-12">
								<div className="flex items-center justify-center align-middle">
									<img src="/t1pagos.png" alt="" className="max-w-full h-12 object-center object-cover" draggable="false" />
								</div>
							</div>
						</div>
					</div>
				</nav>
				<div className="max-w-full md:max-w-7xl px-4 sm:px-8 lg:px-12 mx-auto py-16">
					<Form method="post" className="mt-3">
						<div className="grid grid-cols-12 gap-4 md:gap-8">
							{/* Datos de Pago */}
							<div className="col-span-12 order-2 md:order-1">
								<h3 className="font-sans text-xl md:text-2xl font-black leading-loose text-gray-900">Completa los datos de tu tarjeta</h3>
							</div>
							<div className="col-span-12 md:col-span-7 order-3 md:order-2">
								<div className="w-full py-10 px-8 bg-white rounded-lg">
									<div className="grid grid-cols-12 gap-4">
										{/* Credit Card */}
										<div className="col-span-12">
											{/* Card */}
											<div className="grid grid-cols-12 gap-4">
												<div className="col-span-12">
													<div className="grid grid-cols-12 gap-4">
														<div className="col-span-12">
															<label htmlFor="pan" className="text-sm font-semibold leading-loose text-gray-900">
																Número de la Tarjeta
															</label>
															<div className="relative">
																<input
																	type="text"
																	name="pan"
																	id="pan"
																	className="font-sans block w-full text-sm rounded-md border border-gray-500 py-3.5 px-4 text-gray-900 focus:border-blue-500 outline-0 transition-all mt-3"
																	placeholder="1234 1234 1234 1234"
																	maxLength={18}
																/>
																<div className="absolute inset-y-0 right-0 mr-2 flex items-center">
																	<img src="/credit-card.png" alt="" className="max-w-full h-auto object-center object-cover" draggable="false" />
																</div>
															</div>
														</div>
														<div className="col-span-12">
															<label htmlFor="nombre" className="text-sm font-semibold leading-loose text-gray-900">
																Nombre en la Tarjeta
															</label>
															<input
																type="text"
																name="nombre"
																id="nombre"
																className="font-sans block w-full text-sm rounded-md border border-gray-500 py-3.5 px-4 text-gray-900 focus:border-blue-500 outline-0 transition-all"
																placeholder="John Doe"
															/>
														</div>
														<div className="col-span-4">
															<label htmlFor="expiracion_mes" className="text-sm font-semibold leading-loose text-gray-900">
																F. Expiración Mes
															</label>
															<select
																name="expiracion_mes"
																id="expiracion_mes"
																className="font-sans block w-full text-sm rounded-md border border-gray-500 py-3.5 px-4 text-gray-900 focus:border-blue-500 outline-0 transition-all appearance-none"
															>
																<option selected>Seleccionar mes</option>
																<option value="01">Enero</option>
																<option value="02">Febrero</option>
																<option value="03">Marzo</option>
																<option value="04">Abril</option>
																<option value="05">Mayo</option>
																<option value="06">Junio</option>
																<option value="07">Julio</option>
																<option value="08">Agosto</option>
																<option value="09">Septiembre</option>
																<option value="10">Octubre</option>
																<option value="11">Noviembre</option>
																<option value="12">Diciembre</option>
															</select>
														</div>
														<div className="col-span-4">
															<label htmlFor="expiracion_anio" className="text-sm font-semibold leading-loose text-gray-900">
																F. Expiración Año
															</label>
															<input
																type="text"
																name="expiracion_anio"
																id="expiracion_anio"
																className="font-sans block w-full text-sm rounded-md border border-gray-500 py-3.5 px-4 text-gray-900 focus:border-blue-500 outline-0 transition-all appearance-none"
																placeholder="(AAAA)"
															/>
														</div>
														<div className="col-span-4">
															<label htmlFor="cvv2" className="text-sm font-semibold leading-loose text-gray-900">
																Código de seguridad <span className="font-bold text-gray-900">(CVV2)</span>
															</label>
															<div className="relative">
																<input
																	type="password"
																	name="cvv2"
																	id="cvv2"
																	className="font-sans block w-full text-sm rounded-md border border-gray-500 py-3.5 px-4 text-gray-900 focus:border-blue-500 outline-0 transition-all"
																	placeholder="000"
																/>
																<div className="absolute inset-y-0 right-0 mr-2 flex items-center">
																	<img src="/pin-number.png" alt="" className="max-w-full h-auto object-center object-cover" draggable="false" />
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								{/* Action */}
								<div className="col-span-12 mt-5">
									<div className="flex items-center justify-end align-middle space-x-5">
										<button type="button" className="font-sans font-semibold text-xl bg-red-400 hover:bg-red-500 text-white rounded-md hover:shadow-lg py-2 px-5 transition-all" disabled={navigation.state === "submitting" ? true : false}>Regresar</button>

										<button type="submit" className="font-sans font-semibold text-xl bg-red-600 hover:bg-red-700 text-white rounded-md hover:shadow-lg py-2 px-5 transition-all" disabled={navigation.state === "submitting" ? true : false}>
											{
												navigation.state === "submitting"
													? "Enviando..."
													: "Continuar"
											}
										</button>
									</div>
								</div>
							</div>
							{/* Producto */}
							<div className="col-span-12 md:col-span-5 order-1 md:order-4">
								<div className="w-full py-5 px-8 sticky top-0 right-0 left-0 bg-white rounded-lg">
									<div className="grid grid-cols-12 gap-4">
										<div className="col-span-12">
											<div className="flex flex-col space-y-5">
												<h4 className="font-sans font-black text-lg text-gray-900">Detalles de la compra</h4>
												<div className="relative">
													<div className="flex items-center justify-start space-x-2">
														<img src="/shop.png" alt="Nombre del Comercio" className="max-w-full max-h-10 object-center object-cover" draggable="false" />
														<p className="font-sans font-semibold text-base text-gray-900">T1Pagos</p>
													</div>
													<div className="flex flex-col items-start justify-center mt-5">
														<div className="flex items-center justify-between w-full space-x-2">
															<div>
																<img src="/1633_hi_res.png" alt="Nombre del Comercio" className="max-w-20 h-16 object-center object-fill border shadow rounded" draggable="false" />
															</div>
															<p className="font-sans font-normal text-sm text-gray-900 flex justify-between">$219.00</p>
														</div>
														<p className="font-sans font-bold text-base text-gray-900 mt-5">RB4011iGS+RM</p>
														<p className="font-sans font-medium text-xs text-gray-900">Powerful 10xGigabit port router with a Quad-core 1.4Ghz CPU, 1GB RAM, SFP+ 10Gbps cage and desktop case with rack ears</p>
														<div className="flex flex-col md:flex-row w-full items-center justify-between mt-2.5">
															<p className="font-sans font-medium text-xs text-gray-900 mt-2.5">Dirección:</p>
															<p className="font-sans font-medium text-xs text-gray-500 mt-2.5">Pekín Ladrillera Manzana 1 Sector 2</p>
														</div>
													</div>
												</div>
												<p className="font-sans font-semibold text-xl text-gray-900 flex justify-between">Total de la compra: <b className="font-sans font-semibold text-xl text-gray-900">$219.00</b></p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Form>
				</div >
			</div >
			< ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				pauseOnHover
				theme="light"
				transition={Bounce}
			/>
		</>
	);
}