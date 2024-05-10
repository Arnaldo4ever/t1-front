// import { json } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";

// // El método loader es el primero a ser ejecutado cuando una ruta es accedida.
// export const loader = async () => {
//     // Consultar la API externa
//     const endpoint = "https://api.sandbox.claropagos.com/v1/cliente";

//     const crear_cliente = await fetch(endpoint).then((res) => res.json());

//     return json(crear_cliente);
// };

// // Imprimir la data en el componente react
// export default function crear_cliente() {
//     const clientes = useLoaderData<typeof loader>();

//     return (
//         <div>
//             <h1>Crear Cliente</h1>
//             {clientes.map((cliente) => (
//                 <div key={cliente.id}>{cliente.nombre}</div>
//             ))}
//         </div>
//     );
// }