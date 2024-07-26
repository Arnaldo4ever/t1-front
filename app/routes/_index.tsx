/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
//! Core Imports
import {
	useActionData,
	Form,
	useNavigation,
	useFetcher,
	useLoaderData,
	useSubmit,
	useNavigate,
} from "@remix-run/react";
import { json, type ActionFunction, type ActionFunctionArgs, redirect, type LoaderFunctionArgs, defer } from "@remix-run/node";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

//! Functions
import { CrearTarjeta } from "./crear-tarjeta";

//! Toastify
import { Bounce, ToastContainer, toast as notify } from "react-toastify";
import { jsonWithSuccess, jsonWithError, getToast, redirectWithSuccess, jsonWithInfo } from "remix-toast";

//! Navbar Layout
import Navbar from "../layouts/navbar";

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
	//! Form Data
	const formData = await request.formData();
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
		errors.pan = "El campo número de la tarjeta es obligatorio.";
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
		errors.nombre = "El campo Nombre en la tarjeta es obligatorio.";
	}

	return new Promise((resolve) => {
		setTimeout(() => {
			if (!Object.keys(errors).length) {
				resolve(CrearTarjeta(values).then((response) => response.json()).then((data) => {
					if (data.status === "success") {
						return redirectWithSuccess("/thank-you", `${data.data.cargo.descripcion}`);
					} else {
						for (let i in data.data.errors) {
							return jsonWithError({ data }, `${data.data.errors[i]}`);
						}
					}
				}));
			} else {
				if (errors.pan) {
					resolve(jsonWithError({ values }, `${errors.pan}`));
				} else if (errors.nombre) {
					resolve(jsonWithError({ values }, `${errors.nombre}`));
				} else if (errors.expiracion_mes) {
					resolve(jsonWithError({ values }, `${errors.expiracion_mes}`));
				} else if (errors.expiracion_anio) {
					resolve(jsonWithError({ values }, `${errors.expiracion_anio}`));
				} else if (errors.cvv2) {
					resolve(jsonWithError({ values }, `${errors.cvv2}`));
				}
			}
		}, 3000);
	});
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { toast, headers } = await getToast(request);
	return json({ toast }, { headers });
};

const useRunAfterUpdate = () => {
	const afterPaintRef = useRef(null);

	React.useEffect(() => {
		if (afterPaintRef.current) {
			afterPaintRef.current();
			afterPaintRef.current = null;
		}
	});

	const runAfterUpdate = (fn) => {
		afterPaintRef.current = fn;
	};

	return runAfterUpdate;
};

const strip = value => value.replace(/[^a-zA-Z\s]/g, "");

function filterOut(text, cursor) {
	const beforeCursor = text.slice(0, cursor);
	const afterCursor = text.slice(cursor, text.length);

	const filterBeforeCursor = strip(beforeCursor);
	const fitlerAfterCursor = strip(afterCursor);

	const newText = filterBeforeCursor + fitlerAfterCursor;
	const newCursor = filterBeforeCursor.length;

	return [newText, newCursor];
}

export default function Checkout() {
	const actionData = useActionData<typeof action>();
	const { toast } = useLoaderData<typeof loader>();
	const navigation = useNavigation();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const runAfterUpdate = useRunAfterUpdate();
	const [card, setCard] = useState();
	const inputCard = useRef<HTMLFormElement>(null);
	const submit = useSubmit();

	let formRef = useRef<HTMLFormElement>(null);

	const handleNameChange = e => {
		const input = e.target;
		const text = input.value;
		const cursor = input.selectionStart;
		const [newName, newCursor] = filterOut(text, cursor);

		setName(newName);

		runAfterUpdate(() => {
			input.selectionStart = newCursor;
			input.selectionEnd = newCursor;
		})
	}

	const handleChange = () => {
		const cardValue = inputCard.current.value
			.replace(/\D/g, "")
			.match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);

		inputCard.current.value = !cardValue[2]
			? cardValue[1]
			: `${cardValue[1]} ${cardValue[2]}${`${cardValue[3] ? ` ${cardValue[3]}` : ""
			}`}${`${cardValue[4] ? ` ${cardValue[4]}` : ""}`}`;

		const numbers = inputCard.current.value.replace(/(\D)/g, "");

		setCard(numbers);
	};

	useEffect(() => {
		if (toast) {
			notify(toast.message, { type: toast.type });
		}
	}, [toast]);

	return (
		<>
			<div className="max-w-full bg-gray-100">
				<Navbar />
				<div className="max-w-full md:max-w-7xl px-4 sm:px-8 lg:px-12 mx-auto py-16">
					<Form method="post" replace ref={formRef} className="mt-3" onSubmit={(event) => {
						submit(event.currentTarget);
						if (actionData?.ok) {
							event.currentTarget.reset();
							setName("");
						}
						event.preventDefault();
					}}>
						<div className="grid grid-cols-12 gap-4 md:gap-8">
							{/* Datos de Pago */}
							<div className="col-span-12 order-2 md:order-1">
								<h3 className="font-sans text-xl md:text-2xl font-black leading-loose text-[#2E2E2E]">Completa los datos de tu tarjeta</h3>
							</div>
							<div className="col-span-12 md:col-span-7 order-3 md:order-2">
								<div className="w-full py-10 px-8 bg-white rounded-lg shadow-lg">
									<div className="grid grid-cols-12 gap-4">
										{/* Credit Card */}
										<div className="col-span-12">
											{/* Card */}
											<div className="grid grid-cols-12 gap-4">
												<div className="col-span-12">
													<div className="grid grid-cols-12 gap-4">
														<div className="col-span-12">
															<label htmlFor="pan" className="font-sans text-sm font-semibold leading-loose text-[#2E2E2E]">
																Número de la tarjeta
															</label>
															<div className="relative">
																<input
																	type="tel"
																	inputMode="numeric"
																	autoComplete="cc-number"
																	name="pan"
																	id="pan"
																	className="font-sans block w-full text-sm rounded-md border border-gray-400 py-3.5 px-4 text-[#2E2E2E] focus:border-blue-500 outline-0 transition-all"
																	placeholder="0000 0000 0000 0000"
																	pattern="[0-9\s]{13,19}"
																	onChange={handleChange}
																	ref={inputCard}
																	maxLength={19}
																/>
																<div className="absolute inset-y-0 right-0 mr-2 flex items-center">
																	<img src="/credit-card.png" alt="" className="max-w-full h-auto object-center object-cover" draggable="false" />
																</div>
															</div>
														</div>
														<div className="col-span-12">
															<label htmlFor="nombre" className="font-sans text-sm font-semibold leading-loose text-[#2E2E2E]">
																Nombre en la tarjeta
															</label>
															<input
																type="text"
																name="nombre"
																id="nombre"
																autoComplete="cc-family-name"
																className="font-sans block w-full text-sm rounded-md border border-gray-400 py-3.5 px-4 text-[#2E2E2E] focus:border-blue-500 outline-0 transition-all"
																placeholder="Pedro Perez"
																value={name}
																onChange={handleNameChange}
																minLength={1}
																maxLength={60}
															/>
														</div>
														<div className="col-span-12 md:col-span-6 xl:col-span-4">
															<label htmlFor="expiracion_mes" className="font-sans text-sm font-semibold leading-loose text-[#2E2E2E]">
																Mes de expiración
															</label>
															<select
																name="expiracion_mes"
																id="expiracion_mes"
																className="font-sans block w-full text-sm rounded-md border border-gray-400 py-3.5 px-4 text-[#2E2E2E] focus:border-blue-500 outline-0 transition-all form-select cursor-pointer"
																autoComplete="cc-exp-month"
															>
																<option>Seleccionar mes</option>
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
														<div className="col-span-12 md:col-span-6 xl:col-span-4">
															<label htmlFor="expiracion_anio" className="font-sans text-sm font-semibold leading-loose text-[#2E2E2E]">
																Año de expiración
															</label>
															<input
																type="tel"
																inputMode="numeric"
																name="expiracion_anio"
																id="expiracion_anio"
																autoComplete="cc-exp-year"
																className="font-sans block w-full text-sm rounded-md border border-gray-400 py-3.5 px-4 text-[#2E2E2E] focus:border-blue-500 outline-0 transition-all"
																placeholder="2020"
																maxLength={4}
															/>
														</div>
														<div className="col-span-12 xl:col-span-4">
															<label htmlFor="cvv2" className="font-sans text-sm font-semibold leading-loose text-[#2E2E2E]">
																Código de seguridad <span className="font-bold text-[#2E2E2E]">(CVV2)</span>
															</label>
															<div className="relative">
																<input
																	type="password"
																	name="cvv2"
																	id="cvv2"
																	className="font-sans block w-full text-sm rounded-md border border-gray-400 py-3.5 px-4 text-[#2E2E2E] focus:border-blue-500 outline-0 transition-all"
																	placeholder="1234"
																	minLength={3}
																	maxLength={4}
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
										<button type="button" className="font-sans font-semibold text-xl bg-red-400 hover:bg-red-500 text-white rounded-md hover:shadow-lg py-2 px-5 transition-all" disabled={navigation.state === "submitting" ? true : false} onClick={() => {
											navigate(-1)
										}}>Regresar</button>

										<button type="submit" name="_action" value="create" className="font-sans font-semibold text-xl bg-red-600 hover:bg-red-700 text-white rounded-md hover:shadow-lg py-2 px-5 transition-all" disabled={navigation.state === "submitting" ? true : false}>
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
								<div className="w-full py-5 px-8 sticky top-0 right-0 left-0 bg-white rounded-lg shadow-lg">
									<div className="grid grid-cols-12 gap-4">
										<div className="col-span-12">
											<div className="flex flex-col space-y-5">
												<h4 className="font-sans font-black text-xl md:text-2xl text-[#2E2E2E]">Detalles de la compra</h4>
												<div className="relative">
													<div className="flex items-center justify-start space-x-2">
														<img src="/shop.png" alt="Nombre del Comercio" className="max-w-full h-10 object-center object-cover" draggable="false" />
														<p className="font-sans font-semibold text-base text-[#2E2E2E]">Nombre de la tienda</p>
													</div>
												</div>
												<p className="font-sans font-semibold text-base text-[#2E2E2E]">Total de la compra: <b className="font-sans font-black text-xl md:text-2xl text-[#2E2E2E]">$1.456.00</b></p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Form>
				</div >
			</div >
			<ToastContainer
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