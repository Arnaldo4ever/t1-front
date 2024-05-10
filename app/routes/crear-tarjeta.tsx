// import { json, redirect } from "@remix-run/node";
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

    const direccion = {
        "linea1": formData.get("linea1"),
        "linea2": formData.get("linea2"),
        "linea3": formData.get("linea3"),
        "cp": formData.get("cp"),
        "tipo": {
            "tipo": formData.get("tipo"),
            "codigo_pais": formData.get("codigo_pais"),
            "codigo_area": formData.get("codigo_area"),
            "prefijo": formData.get("prefijo"),
            "numero": formData.get("numero"),
            "extension": formData.get("extension"),
        },
        "municipio": formData.get("municipio"),
        "ciudad": formData.get("ciudad"),
        "estado": formData.get("estado"),
        "pais": formData.get("pais"),
        "referencia_1": formData.get("referencia_1"),
        "referencia_2": formData.get("referencia_2"),
        "longitud": formData.get("longitud"),
        "latitud": formData.get("latitud"),
    };

    // const cliente_id = ;

    const default_si = formData.get("default_si");

    const default_no = formData.get("default_no");

    const cargo_unico = formData.get("cargo_unico");


    const API = "https://api.sandbox.claropagos.com/v1/tarjeta";

    const res = await fetch(`${API}`, {
        method: "POST",
        body: JSON.stringify({ nombre, cvv2, pan, expiracion_mes, expiracion_anio, direccion, default_si, default_no, cargo_unico }),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiN2FlNjc1NzhlZDNkMDcyNjgxZTk4OWEyYjBhNTRlZTNkZTIyNDU5OGQxN2M4MjZjZjUyN2NhMzRkNmYyMmZmYTQxNGQzZDU1ZWZjMTk3NGEiLCJpYXQiOjE3MTQwNzE4MTcuMjQwNTY4LCJuYmYiOjE3MTQwNzE4MTcuMjQwNTcyLCJleHAiOjE3NzcxNDM4MTcuMjMzNzg4LCJzdWIiOiIxMjMiLCJzY29wZXMiOlsiY2xpZW50ZS10YXJqZXRhcyJdfQ.GRosiDcJE6cg2oB3K0-FijrP9bwmXDAthVHIq4DfilucEWscIbecIG2JtHJ4PdU2E9VeU4VbpmyYE6B-PvKoUvjdlccTe97jNf9T5AYPupI3pkZJw5QtZ_XGNiKS-5ktvB3tLl2BRYTs_SAtgBdK3DiP0sS6btekTggCdugmFYdmQSm6o4KhF0m7xA4RT0EaXCri7FMWh_u2QW5MbWCkJYiqrMP20o6YN8Ad--FPYkJrV4FIiC2AuLjX1wFaI5l76gBVgWdAlsorANvLk1upQGOmYaRQIBPE01FM3Z-oeaQJhmrADFsFKKZUpe5aIcnLzL3KDjzt24v4Zt3Q6cm9wG-FDS0DU3h7Af9zSjy3ec2ejBo-mFIGwKeCNFPweEFbk-Do8VhUDZ40W3JOJCUJ42NJwNxBXLKVxorlyeTIXUARk8rjktHp1J8wP-SWM8H45kWnJ3YjI_Gdf-wEpCstywcTeCpnMl2LcxwRNf0T4aKKkLV1I5KYGbfjjuAOXLrPyktRsQi8SeIT2x2yJnRGtv_d6ZbPheq6ZVaLhV1QVKvd2X0WqOaQxt7bagFGfxSkSXEshHaQEafzRFyctNAXVuDOe2qDAAR0VAq78Zvq-wD9KBGqRIkba7Zl_jAVmyqIg_ybK8E4wJMRNUKa7i1evTCENCPsZz38fE39bnup2uk"
        }
    });

    // 4dfc71fb-9688-44a6-bee2-6f456b9715f1

    return res.json();
};

// Imprimir la data en el componente react
export default function newTarjeta() {

    return (
        <div>
            <div className="max-w-full bg-slate-900 py-20">
                <div className="max-w-full md:max-w-7xl px-4 sm:px-8 lg:px-12 mx-auto">
                    <div className="grid grid-cols-12 gap-4 max-w-3xl mx-auto bg-white rounded-md shadow-md p-10">
                        <div className="col-span-12">
                            <h1 className="font-sans text-4xl font-normal text-gray-700 text-center">Datos de pago</h1>
                        </div>
                        <div className="col-span-12 mt-5">
                            <Form method="post">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-8">
                                        <label htmlFor="nombre" className="block text-lg font-semibold text-gray-700">
                                            Nombre del Titular
                                        </label>
                                        <div className="relative mt-2 rounded shadow-sm">
                                            <input
                                                type="text"
                                                name="nombre"
                                                id="nombre"
                                                className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-4">
                                        <label htmlFor="cvv2" className="block text-lg font-semibold text-gray-700">
                                            Código de Seguridad
                                        </label>
                                        <div className="relative mt-2 rounded shadow-sm">
                                            <input
                                                type="text"
                                                name="cvv2"
                                                id="cvv2"
                                                className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <label htmlFor="pan" className="block text-lg font-semibold text-gray-700">
                                            Número de Tarjeta
                                        </label>
                                        <div className="relative mt-2 rounded shadow-sm">
                                            <input
                                                type="text"
                                                name="pan"
                                                id="pan"
                                                className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <label htmlFor="expiracion_mes" className="block text-lg font-semibold text-gray-700">
                                            Fecha de Expiración
                                        </label>
                                        <div className="flex items-center justify-between align-middle">
                                            <div className="mt-2 space-x-4">
                                                <input
                                                    type="text"
                                                    name="expiracion_mes"
                                                    id="expiracion_mes"
                                                    className="font-sans text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                    placeholder="01 - Enero"
                                                />
                                                <input
                                                    type="text"
                                                    name="expiracion_anio"
                                                    id="expiracion_anio"
                                                    className="font-sans text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                    placeholder="2024"
                                                />
                                            </div>
                                            <div className="flex items-center justify-center mt-2 space-x-1">
                                                <img src="/002-visa.png" alt="" className="max-w-full h-auto object-center object-cover" />
                                                <img src="/003-card.png" alt="" className="max-w-full h-auto object-center object-cover" />
                                                <img src="/004-card-1.png" alt="" className="max-w-full h-auto object-center object-cover" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <label htmlFor="linea1" className="block text-lg font-semibold text-gray-700">
                                            Dirección
                                        </label>
                                        <div className="relative mt-2 rounded shadow-sm">
                                            <div className="grid grid-cols-12 gap-2">
                                                <div className="col-span-6">
                                                    <input
                                                        type="text"
                                                        name="linea1"
                                                        id="linea1"
                                                        className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                        placeholder="Linea 1"
                                                    />
                                                </div>
                                                <div className="col-span-6">
                                                    <input
                                                        type="text"
                                                        name="linea2"
                                                        id="linea2"
                                                        className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                        placeholder="Linea 2"
                                                    />
                                                </div>
                                                <div className="col-span-8">
                                                    <input
                                                        type="text"
                                                        name="linea3"
                                                        id="linea3"
                                                        className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                        placeholder="Linea 3"
                                                    />
                                                </div>
                                                <div className="col-span-4">
                                                    <input
                                                        type="text"
                                                        name="cp"
                                                        id="cp"
                                                        className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                        placeholder="Código Postal"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <label htmlFor="tipo" className="block text-lg font-semibold text-gray-700">
                                            Teléfono
                                        </label>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="grid grid-cols-12 gap-2">
                                            <div className="col-span-6">
                                                <input
                                                    type="text"
                                                    name="tipo"
                                                    id="tipo"
                                                    className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                    placeholder="Tipo: Móvil, etc..."
                                                />
                                            </div>
                                            <div className="col-span-3">
                                                <input
                                                    type="text"
                                                    name="codigo_pais"
                                                    id="codigo_pais"
                                                    className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                    placeholder="Código País"
                                                />
                                            </div>
                                            <div className="col-span-3">
                                                <input
                                                    type="text"
                                                    name="codigo_area"
                                                    id="codigo_area"
                                                    className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                    placeholder="Código Area"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <input
                                                    type="text"
                                                    name="prefijo"
                                                    id="prefijo"
                                                    className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                    placeholder="Prefijo"
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <input
                                                    type="text"
                                                    name="numero"
                                                    id="numero"
                                                    className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                    placeholder="Número"
                                                />
                                            </div>
                                            <div className="col-span-4">
                                                <input
                                                    type="text"
                                                    name="extension"
                                                    id="extension"
                                                    className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                    placeholder="Extensión"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <label htmlFor="municipio" className="block text-lg font-semibold text-gray-700">
                                            Información Residencial
                                        </label>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="grid grid-cols-12 gap-2">
                                            <div className="col-span-12">
                                                <input
                                                    type="text"
                                                    name="municipio"
                                                    id="municipio"
                                                    className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                    placeholder="Municipio"
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <input
                                                    type="text"
                                                    name="ciudad"
                                                    id="ciudad"
                                                    className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                    placeholder="Ciudad"
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <input
                                                    type="text"
                                                    name="estado"
                                                    id="estado"
                                                    className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                    placeholder="Estado"
                                                />
                                            </div>
                                            <div className="col-span-12">
                                                <input
                                                    type="text"
                                                    name="pais"
                                                    id="pais"
                                                    className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                    placeholder="País"
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <input
                                                    type="text"
                                                    name="referencia_1"
                                                    id="referencia_1"
                                                    className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                    placeholder="Referencia 1"
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <input
                                                    type="text"
                                                    name="referencia_2"
                                                    id="referencia_2"
                                                    className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                    placeholder="Referencia 2"
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <input
                                                    type="text"
                                                    name="longitud"
                                                    id="longitud"
                                                    className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                    placeholder="Longitud"
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <input
                                                    type="text"
                                                    name="latitud"
                                                    id="latitud"
                                                    className="font-sans block w-full text-sm rounded border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                    placeholder="Latitud"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12">
                                                <label htmlFor="default" className="block text-lg font-semibold text-gray-700">
                                                    Tarjeta Predeterminada
                                                </label>
                                                <span className="text-sm font-light">
                                                    Determina si la tarjeta es la utilizada de manera predeterminada
                                                </span>
                                            </div>
                                            <div className="col-span-6">
                                                <div className="flex items-center gap-x-2">
                                                    <input
                                                        id="default_si"
                                                        name="default"
                                                        value="true"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="default_si" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-2">
                                                    <input
                                                        id="default_no"
                                                        name="default"
                                                        value="false"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="default_no" className="block text-sm font-medium leading-6 text-gray-900">
                                                        No
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <label htmlFor="default" className="block text-lg font-semibold text-gray-700">
                                                    Cargo Único
                                                </label>
                                                <span className="text-sm font-light">
                                                    Determina si la tarjeta sólo se puede utilizar para un único cargo
                                                </span>
                                            </div>
                                            <div className="col-span-6">
                                                <div className="flex items-center gap-x-2">
                                                    <input
                                                        id="cargo_unico_si"
                                                        name="cargo_unico"
                                                        value="true"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="cargo_unico_si" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-2">
                                                    <input
                                                        id="cargo_unico_no"
                                                        name="cargo_unico"
                                                        value="false"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="cargo_unico_no" className="block text-sm font-medium leading-6 text-gray-900">
                                                        No
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 mt-5">
                                        <div className="flex flex-col items-center justify-center align-middle">
                                            <button type="submit" className="block w-full font-sans font-normal text-2xl bg-red-500 hover:bg-red-600 text-white rounded hover:shadow-lg py-3 px-2 transition-all">Pagar</button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}