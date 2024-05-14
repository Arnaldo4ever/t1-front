// import { json, redirect } from "@remix-run/node";
import axios from "axios";
// import { useLoaderData, useActionData, useNavigation, Link, Form } from "@remix-run/react";
import { Form } from "@remix-run/react";
// import type { LinksFunction, ActionFunctionArgs, ActionFunction } from "@remix-run/node";
import type { LinksFunction, ActionFunction } from "@remix-run/node";
// Tailwind CSS
import stylesheet from "../tailwind.css?url";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: stylesheet },
];

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	const nombre = formData.get("nombre");
	const cvv2 = formData.get("cvv2");
	const pan = formData.get("pan");
	const expiracion_mes = formData.get("expiracion_mes");
	const expiracion_anio = formData.get("expiracion_anio");

	const monto = formData.get("monto");
	const metodo_pago = "tarjeta";
	const credito = {
		"formato": "claroshop", // claroshop
	};
	const transferencia = {
		"formato": "1000000",
	};
	const cliente = {
		"nombre": "John Doe",
		"email": formData.get("email"),
		"direccion": {
			"linea1": formData.get("linea1"),
			"linea2": formData.get("linea2"),
			"linea3": formData.get("linea3"),
			"cp": formData.get("cp"),
			"municipio": formData.get("municipio"),
			"ciudad": formData.get("ciudad"),
			"pais": "MEX",
		}
	};

	const Tarjeta_API = "https://api.sandbox.claropagos.com/v1/tarjeta";

	const res = await fetch(`${Tarjeta_API}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiN2FlNjc1NzhlZDNkMDcyNjgxZTk4OWEyYjBhNTRlZTNkZTIyNDU5OGQxN2M4MjZjZjUyN2NhMzRkNmYyMmZmYTQxNGQzZDU1ZWZjMTk3NGEiLCJpYXQiOjE3MTQwNzE4MTcuMjQwNTY4LCJuYmYiOjE3MTQwNzE4MTcuMjQwNTcyLCJleHAiOjE3NzcxNDM4MTcuMjMzNzg4LCJzdWIiOiIxMjMiLCJzY29wZXMiOlsiY2xpZW50ZS10YXJqZXRhcyJdfQ.GRosiDcJE6cg2oB3K0-FijrP9bwmXDAthVHIq4DfilucEWscIbecIG2JtHJ4PdU2E9VeU4VbpmyYE6B-PvKoUvjdlccTe97jNf9T5AYPupI3pkZJw5QtZ_XGNiKS-5ktvB3tLl2BRYTs_SAtgBdK3DiP0sS6btekTggCdugmFYdmQSm6o4KhF0m7xA4RT0EaXCri7FMWh_u2QW5MbWCkJYiqrMP20o6YN8Ad--FPYkJrV4FIiC2AuLjX1wFaI5l76gBVgWdAlsorANvLk1upQGOmYaRQIBPE01FM3Z-oeaQJhmrADFsFKKZUpe5aIcnLzL3KDjzt24v4Zt3Q6cm9wG-FDS0DU3h7Af9zSjy3ec2ejBo-mFIGwKeCNFPweEFbk-Do8VhUDZ40W3JOJCUJ42NJwNxBXLKVxorlyeTIXUARk8rjktHp1J8wP-SWM8H45kWnJ3YjI_Gdf-wEpCstywcTeCpnMl2LcxwRNf0T4aKKkLV1I5KYGbfjjuAOXLrPyktRsQi8SeIT2x2yJnRGtv_d6ZbPheq6ZVaLhV1QVKvd2X0WqOaQxt7bagFGfxSkSXEshHaQEafzRFyctNAXVuDOe2qDAAR0VAq78Zvq-wD9KBGqRIkba7Zl_jAVmyqIg_ybK8E4wJMRNUKa7i1evTCENCPsZz38fE39bnup2uk"
		},
		body: JSON.stringify({ nombre, cvv2, pan, expiracion_mes, expiracion_anio }),
	}).then(function (response) {
		const Server_Response = response.json();
		return Server_Response;
	}).then(function (data) {
		return data;
	});

	// if (res.response === 200) {
	const tarjeta = {
		"token": res.data.tarjeta.token
	};

	const Crear_Cargo_API = "https://api.sandbox.claropagos.com/v1/cargo";

	const Crear_Cargo_Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNTRjN2RlZDdhZWIyOTZlMjgwM2U0NTZmNGFmOTA5OWFjNTYxYTkyN2VjODhiNGMzNTA2ZDVjODA1ZjhiMjQ3NjYzY2EzZmMwYzc1ZGQ1YWMiLCJpYXQiOjE3MTQyODAwNTYuNzI3NTM0LCJuYmYiOjE3MTQyODAwNTYuNzI3NTQzLCJleHAiOjE3NzczNTIwNTYuNzE5OTQzLCJzdWIiOiIxMjMiLCJzY29wZXMiOlsiY2xpZW50ZS10YXJqZXRhcyIsImNsaWVudGUtdHJhbnNhY2Npb25lcyIsImNsaWVudGUtY2xpZW50ZXMiLCJjbGllbnRlLXN1c2NyaXBjaW9uZXMiLCJjbGllbnRlLXBsYW5lcyIsImNsaWVudGUtYW50aWZyYXVkZSIsImNsaWVudGUtd2ViaG9va3MiLCJjbGllbnRlLWNvbmNpbGlhY2lvbiIsImNsaWVudGUtdnRleCJdfQ.Z_5VwiBU7aiRoDStZ2vDjyhvPMkqT3pNDkgowzvVfiyp8gbtIXd8PBFA5muPE1-SYZesyT6nQ_RG9SFm40tT8cbh25gT6E0YCakc1FsoV7nnZsIyT90G-9y6t50pJU_CHtjVrvNjZBd8SrIwZO_MjWhSk_1JJWWiAIPHeFbVNwnGyBPCBYM0GjGcBlhdK-F3n8aosHxZEM7oWlcdHYhZw7DPOQlN7O1sFjjVFoXzyy1vDKsHm3eJ5Ixutl0cLkZm5Ka70XVH3XU_oOISPB-u8yt6G3WkH-ZoWRaP_DZdHyDnl_nCIV_kntRLHkXbqj_IMg3pOG1-10gXBcbp8pGDBb2vs7RdhPPVutZZ5nV18jrHdwiI0CpmvFHNppsT4Q_j7wXTl_GSgT6FOG7YmBuTkPjeajh3Cg1q3ZdFcBF6EB0n_I2l2xTcxxf69gskPhvto_3pouDTq9uvCk9GP6sUqTo9iU9JvxvRIiQD6r5oum7tuxznXk1rjXGIrgzoq5m2xPT0TbIgSWJ-gTHSlQYOtupUhfrFQYxVr2CGDTM4yHDfAjw8T1HC46FSBdd8dmzaBX8b5nii4pZ8s7nJ_Mg1fsa2Zg7zYuu7QI-EqHIsAyrcyT93jjLrkUpcbBJ-3F8TbN5yxpBftOc2bJ5YeWvKF6U1tINNgUWGfdjkydX1Ij0";

	axios(`${Crear_Cargo_API}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Authorization": `Bearer ${Crear_Cargo_Token}`
		},
		data: JSON.stringify({
			monto, metodo_pago, tarjeta, cliente
		}),
	}).then(response => {
		console.log(response);
	});
	// }

	return res.data;
};

// Imprimir la data en el componente react
export default function newPayment() {
	return (
		<div>
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
														<option>Venezuela</option>
														<option>Colombia</option>
														<option>Mexico</option>
														<option>Puerto Rico</option>
														<option>...</option>
													</select>
												</div>
											</div>
											<div className="col-span-6">
												<input
													type="text"
													name="nombre2"
													id="nombre2"
													className="font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all"
													placeholder="Nombre"
												/>
											</div>
											<div className="col-span-6">
												<input
													type="text"
													name="apellido"
													id="apellido"
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
															Guardar esta información para futuras compras
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
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-span-12 mt-5">
									<div className="flex flex-col items-center justify-center align-middle">
										<button type="submit" className="block w-full font-sans font-bold text-xl bg-blue-600 hover:bg-blue-700 text-white rounded hover:shadow-lg py-3 px-2 transition-all">Pagar ahora</button>
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
		</div>
	);
}