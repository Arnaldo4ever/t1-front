import { json } from "@remix-run/node";
import { useLoaderData, useLocation } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import stylesheet from "../tailwind.css?url";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: stylesheet },
];

// El método loader es el primero a ser ejecutado cuando una ruta es accedida.
export const loader = async () => {
    // Consultar la API externa
    const endpoint = await fetch("https://api.sandbox.claropagos.com/v1/cliente/{cliente_id}");

    // const consultar_cliente = await fetch(endpoint).then((res) => res.json());

    console.log(endpoint);

    // return json(consultar_cliente);

    return json(await endpoint.json());
};

// Imprimir la data en el componente react
export default function ConsultarCliente() {
    const clientes = useLoaderData<typeof loader>();

    return (
        <div className="max-w-full bg-slate-900 h-72">
            <div className="max-w-full md:max-w-7xl px-4 md:px-8 lg:px-12 mx-auto h-full">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-4"></div>
                    <div className="col-span-8">
                        <h1 className="font-sans text-2xl font-semibold text-white">Consultar Cliente</h1>
                        <p className="font-sans font-base font-light text-white">Consultar un Cliente</p>
                        {/* {clientes.map((cliente) => (
                            <div key={cliente.id}>
                                <div>Cliente:</div>
                                <div>{cliente.creacion}</div>
                                <div>{cliente.actualizacion}</div>
                                <div>{cliente.id_externo}</div>
                                <div>{cliente.creacion_externa}</div>
                                <div>{cliente.nombre}</div>
                                <div>{cliente.apellido_paterno}</div>
                                <div>{cliente.apellido_materno}</div>
                                <div>{cliente.sexo}</div>
                                <div>{cliente.email}</div>
                                <div>Telefono:</div>
                                <div>{cliente.tipo}</div>
                                <div>{cliente.codigo_pais}</div>
                                <div>{cliente.codigo_area}</div>
                                <div>{cliente.prefijo}</div>
                                <div>{cliente.numero}</div>
                                <div>{cliente.extension}</div>
                                <div>Información Personal:</div>
                                <div>{cliente.nacimiento}</div>
                                <div>{cliente.linea1}</div>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
        </div>
    );
}