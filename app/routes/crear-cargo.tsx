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

    const monto = formData.get("monto");

    const pais = formData.get("pais");

    const moneda = formData.get("moneda");

    const descripcion = formData.get("descripcion");

    // const capturar = formData.get("capturar");
    const capturar = true;

    const incluir_riesgo = formData.get("incluir_riesgo");

    const metodo_pago = formData.get("metodo_pago");

    const tarjeta = {
        "token": formData.get("token_tarjeta"),
    };

    const credito = {
        "formato": formData.get("formato"), // claroshop
        "sucursal": formData.get("sucursal"),
    };

    const transferencia = {
        // "formato": formData.get("formato"),
        "formato": "hola.pdf",
        // "concepto": formData.get("concepto"),
        "concepto": "Hola0Mundo1",
        "fecha_inicio": formData.get("fecha_inicio"),
        "fecha_fin": formData.get("fecha_fin"),
    };

    const pedido = {
        "id_externo": formData.get("id_externo"),
        "creacion": formData.get("creacion"),
        "direccion_envio": {
            "linea1": formData.get("linea1"),
            "linea2": formData.get("linea2"),
            "linea3": formData.get("linea3"),
            "cp": formData.get("cp"),
            "telefono": {
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
            "nombre": formData.get("nombre"),
            "apellido_paterno": formData.get("apellido_paterno"),
            "apellido_materno": formData.get("apellido_materno"),
        },
        "peso": formData.get("peso"),
        "articulos": [
            {
                "id_pedido": formData.get("id_pedido"),
                "nombre_producto": formData.get("nombre_producto"),
                "descripcion_producto": formData.get("descripcion_producto"),
                "sku": formData.get("sku"),
                "ean_upc": formData.get("ean_upc"),
                "tipo_producto": formData.get("tipo_producto"),
                "cantidad": formData.get("cantidad"),
                "precio_unitario": formData.get("precio_unitario"),
                "precio_total": formData.get("precio_total"),
                "otros": formData.get("otros"),
                // "es_digital": formData.get("es_digital"),
                "es_digital": true,
            }
        ],
        "total_articulos": formData.get("total_articulos"),
        "fecha_creacion": formData.get("fecha_creacion"),
        "fecha_entrega": formData.get("fecha_entrega"),
        "empresa_envio": formData.get("empresa_envio"),
        "numero_guia": formData.get("numero_guia"),
        // "es_regalo": formData.get("es_regalo"),
        "es_regalo": true,
        "monto_articulos": formData.get("monto_articulos"),
        "monto_envio": formData.get("monto_envio"),
        "total_monto": formData.get("total_monto"),
        "device_fingerprint": formData.get("device_fingerprint"),
        "ip_cliente": formData.get("ip_cliente"),
    };

    const datos_comercio = {
        "1": formData.get("datos_comercio_1"),
        "2": formData.get("datos_comercio_2")
    }

    const cliente = {
        // "id": formData.get("id"),
        "id": "123e4567-e89b-12d3-a456-426655440000",
        "id_externo": formData.get("id_externo"),
        "creacion_externa": formData.get("creacion_externa"),
        "nombre": formData.get("nombre"),
        "apellido_paterno": formData.get("apellido_paterno"),
        "apellido_materno": formData.get("apellido_materno"),
        // "email": formData.get("email"),
        "email": "usuario@prueba.com",
        "telefono": {
            "tipo": formData.get("tipo"),
            "codigo_pais": formData.get("codigo_pais"),
            "codigo_area": formData.get("codigo_area"),
            "prefijo": formData.get("prefijo"),
            "numero": formData.get("numero"),
            "extension": formData.get("extension"),
        },
        "direccion": {
            "linea1": formData.get("linea1"),
            "linea2": formData.get("linea2"),
            "linea3": formData.get("linea3"),
            "cp": formData.get("cp"),
            "telefono": {
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
        }
    };

    const PlanPagos = {
        "plan": formData.get("plan"),
        "parcialidades": formData.get("parcialidades"),
        "diferido": formData.get("diferido"),
        "redime_puntos": formData.get("redime_puntos"),
    }


    const API = "https://api.sandbox.claropagos.com/v1/cargo";

    const res = await fetch(`${API}`, {
        method: "POST",
        body: JSON.stringify({
            monto, pais, moneda, descripcion, capturar, incluir_riesgo, metodo_pago, tarjeta, credito, pedido, datos_comercio, cliente, PlanPagos
        }),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNTRjN2RlZDdhZWIyOTZlMjgwM2U0NTZmNGFmOTA5OWFjNTYxYTkyN2VjODhiNGMzNTA2ZDVjODA1ZjhiMjQ3NjYzY2EzZmMwYzc1ZGQ1YWMiLCJpYXQiOjE3MTQyODAwNTYuNzI3NTM0LCJuYmYiOjE3MTQyODAwNTYuNzI3NTQzLCJleHAiOjE3NzczNTIwNTYuNzE5OTQzLCJzdWIiOiIxMjMiLCJzY29wZXMiOlsiY2xpZW50ZS10YXJqZXRhcyIsImNsaWVudGUtdHJhbnNhY2Npb25lcyIsImNsaWVudGUtY2xpZW50ZXMiLCJjbGllbnRlLXN1c2NyaXBjaW9uZXMiLCJjbGllbnRlLXBsYW5lcyIsImNsaWVudGUtYW50aWZyYXVkZSIsImNsaWVudGUtd2ViaG9va3MiLCJjbGllbnRlLWNvbmNpbGlhY2lvbiIsImNsaWVudGUtdnRleCJdfQ.Z_5VwiBU7aiRoDStZ2vDjyhvPMkqT3pNDkgowzvVfiyp8gbtIXd8PBFA5muPE1-SYZesyT6nQ_RG9SFm40tT8cbh25gT6E0YCakc1FsoV7nnZsIyT90G-9y6t50pJU_CHtjVrvNjZBd8SrIwZO_MjWhSk_1JJWWiAIPHeFbVNwnGyBPCBYM0GjGcBlhdK-F3n8aosHxZEM7oWlcdHYhZw7DPOQlN7O1sFjjVFoXzyy1vDKsHm3eJ5Ixutl0cLkZm5Ka70XVH3XU_oOISPB-u8yt6G3WkH-ZoWRaP_DZdHyDnl_nCIV_kntRLHkXbqj_IMg3pOG1-10gXBcbp8pGDBb2vs7RdhPPVutZZ5nV18jrHdwiI0CpmvFHNppsT4Q_j7wXTl_GSgT6FOG7YmBuTkPjeajh3Cg1q3ZdFcBF6EB0n_I2l2xTcxxf69gskPhvto_3pouDTq9uvCk9GP6sUqTo9iU9JvxvRIiQD6r5oum7tuxznXk1rjXGIrgzoq5m2xPT0TbIgSWJ-gTHSlQYOtupUhfrFQYxVr2CGDTM4yHDfAjw8T1HC46FSBdd8dmzaBX8b5nii4pZ8s7nJ_Mg1fsa2Zg7zYuu7QI-EqHIsAyrcyT93jjLrkUpcbBJ-3F8TbN5yxpBftOc2bJ5YeWvKF6U1tINNgUWGfdjkydX1Ij0"
        },
    });

    return res.json();
};

// Imprimir la data en el componente react
export default function newCargo() {
    return (
        <div>
            <div className="max-w-full bg-slate-900 py-20">
                <div className="max-w-full md:max-w-7xl px-4 sm:px-8 lg:px-12 mx-auto">
                    <div className="grid grid-cols-12 gap-4 max-w-3xl mx-auto bg-white rounded-md shadow-md p-5">
                        <div className="col-span-12">
                            <h1 className="font-sans text-4xl font-normal text-gray-700 text-center">Información del Producto</h1>
                        </div>
                        <div className="col-span-12">
                            <hr className="w-full block my-5" />
                        </div>
                        <div className="col-span-12">
                            <Form method="post">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-4">
                                        <label htmlFor="monto" className="block text-base font-semibold text-gray-700">
                                            Monto
                                        </label>
                                        <div className="relative mt-2 rounded shadow-sm">
                                            <input
                                                type="text"
                                                name="monto"
                                                id="monto"
                                                value="100"
                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-4">
                                        <label htmlFor="pais" className="block text-base font-semibold text-gray-700">
                                            País
                                        </label>
                                        <div className="relative mt-2 rounded shadow-sm">
                                            <input
                                                type="text"
                                                name="pais"
                                                id="pais"
                                                value="MEX"
                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-4">
                                        <label htmlFor="moneda" className="block text-base font-semibold text-gray-700">
                                            Moneda
                                        </label>
                                        <div className="relative mt-2 rounded shadow-sm">
                                            <input
                                                type="text"
                                                name="moneda"
                                                id="moneda"
                                                value="MXN"
                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <label htmlFor="descripcion" className="block text-base font-semibold text-gray-700">
                                            Descripción
                                        </label>
                                        <div className="relative mt-2 rounded shadow-sm">
                                            <textarea
                                                name="descripcion"
                                                id="descripcion"
                                                value="string"
                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                placeholder="">
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="col-span-4">
                                        <label htmlFor="capturar" className="block text-base font-semibold text-gray-700">
                                            Capturar
                                        </label>
                                        <div className="relative mt-2 rounded shadow-sm">
                                            <input
                                                type="radio"
                                                name="capturar"
                                                id="capturar"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-4">
                                        <label htmlFor="incluir_riesgo" className="block text-base font-semibold text-gray-700">
                                            Incluir Riesgo
                                        </label>
                                        <div className="relative mt-2 rounded shadow-sm">
                                            <input
                                                type="radio"
                                                name="incluir_riesgo"
                                                id="incluir_riesgo"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-4">
                                        <label htmlFor="metodo_pago" className="block text-base font-semibold text-gray-700">
                                            Método de Pago
                                        </label>
                                        <div className="relative mt-2 rounded shadow-sm">
                                            <input
                                                type="text"
                                                name="metodo_pago"
                                                id="metodo_pago"
                                                value="tarjeta"
                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                placeholder="Tarjeta"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="col-span-4">
                                            <label htmlFor="token_tarjeta" className="block text-lg font-semibold text-gray-700">
                                                Token de la Tarjeta
                                            </label>
                                            <div className="relative mt-2 rounded shadow-sm">
                                                <input
                                                    type="text"
                                                    name="token_tarjeta"
                                                    id="token_tarjeta"
                                                    className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                    placeholder=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <label htmlFor="formato" className="block text-lg font-semibold text-gray-700">
                                            Crédito
                                        </label>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-6">
                                                <div className="relative mt-2 rounded shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="formato"
                                                        id="formato"
                                                        value="claroshop"
                                                        className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                        placeholder=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6">
                                                <div className="relative mt-2 rounded shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="sucursal"
                                                        id="sucursal"
                                                        value="0"
                                                        className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                        placeholder=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <label htmlFor="transferencia_formato" className="block text-lg font-semibold text-gray-700">
                                            Transferencia
                                        </label>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-3">
                                                <div className="relative mt-2 rounded shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="transferencia_formato"
                                                        id="transferencia_formato"
                                                        value="string"
                                                        className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                        placeholder=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="relative mt-2 rounded shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="concepto"
                                                        id="concepto"
                                                        value="string"
                                                        className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                        placeholder=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="relative mt-2 rounded shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="fecha_inicio"
                                                        id="fecha_inicio"
                                                        value="2019-08-24T14:15:22Z"
                                                        className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                        placeholder=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="relative mt-2 rounded shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="fecha_fin"
                                                        id="fecha_fin"
                                                        value="2019-08-24T14:15:22Z"
                                                        className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                        placeholder=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <label htmlFor="id_externo" className="block text-lg font-semibold text-gray-700">
                                            Pedido
                                        </label>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-6">
                                                <div className="relative mt-2 rounded shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="id_externo"
                                                        id="id_externo"
                                                        value="string"
                                                        className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                        placeholder=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6">
                                                <div className="relative mt-2 rounded shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="creacion"
                                                        id="creacion"
                                                        value="2019-08-24T14:15:22Z"
                                                        className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                        placeholder=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <label htmlFor="linea1" className="block text-lg font-semibold text-gray-700">
                                                    Dirección de Envío
                                                </label>
                                                <div className="relative mt-2 rounded shadow-sm">
                                                    <div className="grid grid-cols-12 gap-4">
                                                        <div className="col-span-6">
                                                            <input
                                                                type="text"
                                                                name="linea1"
                                                                id="linea1"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder="Linea 1"
                                                            />
                                                        </div>
                                                        <div className="col-span-6">
                                                            <input
                                                                type="text"
                                                                name="linea2"
                                                                id="linea2"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder="Linea 2"
                                                            />
                                                        </div>
                                                        <div className="col-span-8">
                                                            <input
                                                                type="text"
                                                                name="linea3"
                                                                id="linea3"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder="Linea 3"
                                                            />
                                                        </div>
                                                        <div className="col-span-4">
                                                            <input
                                                                type="text"
                                                                name="cp"
                                                                id="cp"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
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
                                                <div className="relative mt-2 rounded shadow-sm">
                                                    <div className="grid grid-cols-12 gap-4">
                                                        <div className="col-span-6">
                                                            <input
                                                                type="text"
                                                                name="tipo"
                                                                id="tipo"
                                                                value="no_definido"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder="Tipo: Móvil, etc..."
                                                            />
                                                        </div>
                                                        <div className="col-span-3">
                                                            <input
                                                                type="text"
                                                                name="codigo_pais"
                                                                id="codigo_pais"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder="Código País"
                                                            />
                                                        </div>
                                                        <div className="col-span-3">
                                                            <input
                                                                type="text"
                                                                name="codigo_area"
                                                                id="codigo_area"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder="Código Area"
                                                            />
                                                        </div>
                                                        <div className="col-span-2">
                                                            <input
                                                                type="text"
                                                                name="prefijo"
                                                                id="prefijo"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder="Prefijo"
                                                            />
                                                        </div>
                                                        <div className="col-span-6">
                                                            <input
                                                                type="number"
                                                                name="numero"
                                                                id="numero"
                                                                value="5566778899"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder="Número"
                                                            />
                                                        </div>
                                                        <div className="col-span-4">
                                                            <input
                                                                type="text"
                                                                name="extension"
                                                                id="extension"
                                                                value="0"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder="Extensión"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <label htmlFor="municipio" className="block text-lg font-semibold text-gray-700">
                                                    Información Residencial
                                                </label>
                                                <div className="relative mt-2 rounded-shadow-sm">
                                                    <div className="grid grid-cols-12 gap-4">
                                                        <div className="col-span-2">
                                                            <input
                                                                type="text"
                                                                name="municipio"
                                                                id="municipio"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder="Municipio"
                                                            />
                                                        </div>
                                                        <div className="col-span-2">
                                                            <input
                                                                type="text"
                                                                name="ciudad"
                                                                id="ciudad"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder="Ciudad"
                                                            />
                                                        </div>
                                                        <div className="col-span-4">
                                                            <input
                                                                type="text"
                                                                name="estado"
                                                                id="estado"
                                                                value="str"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder="Estado"
                                                            />
                                                        </div>
                                                        <div className="col-span-4">
                                                            <input
                                                                type="text"
                                                                name="pais"
                                                                id="pais"
                                                                value="str"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder="País"
                                                            />
                                                        </div>
                                                        <div className="col-span-8">
                                                            <input
                                                                type="text"
                                                                name="referencia_1"
                                                                id="referencia_1"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder="Referencia adicional, ejemplo: nombre de entre calle 1"
                                                            />
                                                        </div>
                                                        <div className="col-span-4">
                                                            <input
                                                                type="text"
                                                                name="referencia_2"
                                                                id="referencia_2"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder="Referencia adicional, ejemplo: nombre de entre calle 2"
                                                            />
                                                        </div>
                                                        <div className="col-span-6">
                                                            <input
                                                                type="text"
                                                                name="longitud"
                                                                id="longitud"
                                                                value="-90"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder="Longitud"
                                                            />
                                                        </div>
                                                        <div className="col-span-6">
                                                            <input
                                                                type="text"
                                                                name="latitud"
                                                                id="latitud"
                                                                value="-90"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder="Latitud"
                                                            />
                                                        </div>
                                                        <div className="col-span-6">
                                                            <input
                                                                type="text"
                                                                name="nombre"
                                                                id="nombre"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder="Nombre"
                                                            />
                                                        </div>
                                                        <div className="col-span-3">
                                                            <input
                                                                type="text"
                                                                name="apellido_paterno"
                                                                id="apellido_paterno"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder="Apellido Paterno"
                                                            />
                                                        </div>
                                                        <div className="col-span-3">
                                                            <input
                                                                type="text"
                                                                name="apellido_materno"
                                                                id="apellido_materno"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder="Apellido Materno"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <label htmlFor="peso" className="block text-lg font-semibold text-gray-700">
                                                    Peso total del pedido (en Kg.)
                                                </label>
                                                <div className="grid grid-cols-12 gap-4">
                                                    <div className="col-span-12">
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="peso"
                                                                id="peso"
                                                                value="0"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <label htmlFor="id_pedido" className="text-lg font-semibold text-gray-700">
                                                    Artículos
                                                </label>
                                                <div className="grid grid-cols-12 gap-4">
                                                    <div className="col-span-12">
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="id_pedido"
                                                                id="id_pedido"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label htmlFor="nombre_producto" className="block text-base font-semibold text-gray-700">
                                                            Nombre del Producto
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="nombre_producto"
                                                                id="nombre_producto"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label htmlFor="descripcion_producto" className="block text-base font-semibold text-gray-700">
                                                            Descripción del Producto
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="descripcion_producto"
                                                                id="descripcion_producto"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label htmlFor="sku" className="block text-base font-semibold text-gray-700">
                                                            SKU
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="sku"
                                                                id="sku"
                                                                value="0000-0000"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label htmlFor="ean_upc" className="block text-base font-semibold text-gray-700">
                                                            EAN UPC
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="ean_upc"
                                                                id="ean_upc"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label htmlFor="tipo_producto" className="block text-base font-semibold text-gray-700">
                                                            Tipo de Producto
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="tipo_producto"
                                                                id="tipo_producto"
                                                                value="digital"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label htmlFor="cantidad" className="block text-base font-semibold text-gray-700">
                                                            Cantidad
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="cantidad"
                                                                id="cantidad"
                                                                value="1"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label htmlFor="precio_unitario" className="block text-base font-semibold text-gray-700">
                                                            Precio Unitario
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="precio_unitario"
                                                                id="precio_unitario"
                                                                value="0"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label htmlFor="precio_total" className="block text-base font-semibold text-gray-700">
                                                            Precio Total
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="precio_total"
                                                                id="precio_total"
                                                                value="0"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label htmlFor="otros" className="block text-base font-semibold text-gray-700">
                                                            Otros
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="otros"
                                                                id="otros"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label htmlFor="es_digital" className="block text-base font-semibold text-gray-700">
                                                            Es Digital
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="radio"
                                                                name="es_digital"
                                                                id="es_digital"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="grid grid-cols-12 gap-4">
                                                    <div className="col-span-4">
                                                        <label htmlFor="total_articulos" className="block text-base font-semibold text-gray-700">
                                                            Total de Artículos
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="total_articulos"
                                                                id="total_articulos"
                                                                value="0"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label htmlFor="fecha_creacion" className="block text-base font-semibold text-gray-700">
                                                            Fecha de Creación
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="fecha_creacion"
                                                                id="fecha_creacion"
                                                                value="2019-08-24T14:15:22Z"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label htmlFor="fecha_entrega" className="block text-base font-semibold text-gray-700">
                                                            Fecha de Entrega
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="fecha_entrega"
                                                                id="fecha_entrega"
                                                                value="2019-08-24T14:15:22Z"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label htmlFor="empresa_envio" className="block text-base font-semibold text-gray-700">
                                                            Empresa de Envio
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="empresa_envio"
                                                                id="empresa_envio"
                                                                value="noventamin"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label htmlFor="numero_guia" className="block text-base font-semibold text-gray-700">
                                                            Número de Guía
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="numero_guia"
                                                                id="numero_guia"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label htmlFor="es_regalo" className="block text-base font-semibold text-gray-700">
                                                            Es Regalo
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="radio"
                                                                name="es_regalo"
                                                                id="es_regalo"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label htmlFor="monto_articulos" className="block text-base font-semibold text-gray-700">
                                                            Monto Artículos
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="monto_articulos"
                                                                id="monto_articulos"
                                                                value="0"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label htmlFor="monto_envio" className="block text-base font-semibold text-gray-700">
                                                            Monto del Envío
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="monto_envio"
                                                                id="monto_envio"
                                                                value="0"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label htmlFor="total_monto" className="block text-base font-semibold text-gray-700">
                                                            Total del Monto
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="total_monto"
                                                                id="total_monto"
                                                                value="0"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label htmlFor="device_fingerprint" className="block text-base font-semibold text-gray-700">
                                                            Device Fingerprint
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="device_fingerprint"
                                                                id="device_fingerprint"
                                                                value="string"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label htmlFor="ip_cliente" className="block text-base font-semibold text-gray-700">
                                                            IP del Cliente
                                                        </label>
                                                        <div className="relative mt-2 rounded shadow-sm">
                                                            <input
                                                                type="text"
                                                                name="ip_cliente"
                                                                id="ip_cliente"
                                                                value="192.168.0.1"
                                                                className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12">
                                                        <div className="grid grid-cols-12 gap-4">
                                                            <div className="col-span-6">
                                                                <label htmlFor="datos_comercio" className="block text-base font-semibold text-gray-700">
                                                                    Datos del Comercio
                                                                </label>
                                                                <div className="relative mt-2 rounded shadow-sm">
                                                                    <input
                                                                        type="text"
                                                                        name="1"
                                                                        id="1"
                                                                        value="test string"
                                                                        className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                        placeholder=""
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-span-6">
                                                                <label htmlFor="2" className="block text-base font-semibold text-gray-700">
                                                                    Custom Key 2
                                                                </label>
                                                                <div className="relative mt-2 rounded shadow-sm">
                                                                    <input
                                                                        type="text"
                                                                        name="2"
                                                                        id="2"
                                                                        value="another string"
                                                                        className="font-sans block w-full text-sm bg-gray-50 border border-gray-300 p-2.5 text-gray-900 ring-0 outline-0 shadow-none appearance-none"
                                                                        placeholder=""
                                                                    />
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
                                            <button type="submit" className="block w-full font-sans font-normal text-2xl bg-red-500 hover:bg-red-600 text-white rounded hover:shadow-lg py-3 px-2 transition-all">Crear Cargo</button>
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