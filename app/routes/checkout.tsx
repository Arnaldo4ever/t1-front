/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
//! Core Imports
import {
	useActionData,
	Form,
	useNavigation,
} from "@remix-run/react";
import { json, type ActionFunction, type ActionFunctionArgs, redirect } from "@remix-run/node";
import React from "react";

//! Functions
import { CrearTarjeta } from "./crear-tarjeta";

//! Toastify
import { Bounce, ToastContainer, toast } from "react-toastify";

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
	//! Form DOM 
	const formData = await request.formData();

	//! Form Data
	let values = Object.fromEntries(formData);

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
		errors.cvv2 = "El campo CVV2 es obligatorio.";
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

	if (!Object.keys(errors).length) {
		await CrearTarjeta(values);
		return redirect("/thank-you");
	} else {
		return json({ errors });
	}
};

export default function Checkout() {
	let navigation = useNavigation();
	let actionData = useActionData<typeof action>();


	//! Crear Tarjeta (Error Vars)
	let panError = actionData?.errors?.pan;
	let cvv2Error = actionData?.errors?.cvv2;
	let expMonthError = actionData?.errors?.expiracion_mes;
	let expYearError = actionData?.errors?.expiracion_anio;
	let nombreError = actionData?.errors?.nombre;

	//! Toast config
	const toastId = React.useRef(null);

	const notify = () => {
		if (!toast.isActive(toastId.current)) {
			if (panError) {
				toastId.current = toast.error(`${actionData.errors.pan}`);
			} else if (cvv2Error) {
				toastId.current = toast.error(`${actionData.errors.cvv2}`);
			} else if (expMonthError) {
				toastId.current = toast.error(`${actionData.errors.expiracion_mes}`);
			} else if (expYearError) {
				toastId.current = toast.error(`${actionData.errors.expiracion_anio}`);
			} else if (nombreError) {
				toastId.current = toast.error(`${actionData.errors.nombre}`);
			}
		}
	}

	// useEffect(() => {
	// 	{ panError ? toast.error(`${panError}`) : null }
	// 	{ cvv2Error ? toast.error(`${cvv2Error}`) : null }
	// 	{ expMonthError ? toast.error(`${expMonthError}`) : null }
	// 	{ expYearError ? toast.error(`${expYearError}`) : null }
	// 	{ nombreError ? toast.error(`${nombreError}`) : null }
	// });

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
								<h3 className="font-sans text-xl md:text-2xl font-black leading-loose text-slate-900">Completa los datos de tu tarjeta</h3>
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
															<label htmlFor="pan" className="text-sm font-semibold leading-loose text-slate-900">
																Número de la Tarjeta
															</label>
															<div className="relative">
																<input
																	type="text"
																	name="pan"
																	id="pan"
																	className="font-sans block w-full text-sm rounded-md border border-gray-500 py-3.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all mt-3"
																	placeholder="1234 1234 1234 1234"
																/>
																<div className="absolute inset-y-0 right-0 mr-2 flex items-center">
																	<img src="/credit-card.png" alt="" className="max-w-full h-auto object-center object-cover" draggable="false" />
																</div>
															</div>
														</div>
														<div className="col-span-12">
															<label htmlFor="nombre" className="text-sm font-semibold leading-loose text-slate-900">
																Nombre en la Tarjeta
															</label>
															<input
																type="text"
																name="nombre"
																id="nombre"
																className="font-sans block w-full text-sm rounded-md border border-gray-500 py-3.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
																placeholder="John Doe"
															/>
														</div>
														<div className="col-span-6">
															<label htmlFor="expiracion_mes" className="text-sm font-semibold leading-loose text-slate-900">
																Fecha de vencimiento
															</label>
															<input
																type="text"
																name="expiracion_mes"
																id="expiracion_mes"
																className="font-sans block w-full text-sm rounded-md border border-gray-500 py-3.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
																placeholder="Fecha de expiración (MM / AA)"
															/>
														</div>
														<div className="col-span-6">
															<label htmlFor="cvv2" className="text-sm font-semibold leading-loose text-slate-900">
																Código de seguridad
															</label>
															<div className="relative">
																<input
																	type="password"
																	name="cvv2"
																	id="cvv2"
																	className="font-sans block w-full text-sm rounded-md border border-gray-500 py-3.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
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
										<button type="button" className="font-sans font-semibold text-xl bg-red-400 hover:bg-red-500 text-white rounded-md hover:shadow-lg py-2 px-5 transition-all">Regresar</button>

										<button type="submit" name="btn-trigger" value="submit-checkout" className="font-sans font-semibold text-xl bg-red-600 hover:bg-red-700 text-white rounded-md hover:shadow-lg py-2 px-5 transition-all" disabled={navigation.state === "submitting" ? true : false} onClick={notify}>
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
												<h4 className="font-sans font-black text-lg text-slate-900">Detalles de la compra</h4>
												<div className="relative">
													<div className="flex items-center justify-start space-x-2">
														<img src="/shop.png" alt="Nombre del Comercio" className="max-w-full h-10 object-center object-cover" draggable="false" />
														<p className="font-sans font-semibold text-base text-slate-900">Nombre de la tienda</p>
													</div>
												</div>
												<p className="font-sans font-semibold text-lg text-slate-900">Total de la compra: $<b className="font-sans font-black text-lg text-slate-900">1.456.00</b></p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Form>
				</div >
			</div >
			{/* <Toaster position="bottom-right" richColors closeButton /> */}
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