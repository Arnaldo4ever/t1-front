/* eslint-disable prefer-const */
//! Core Imports
import { json } from "@remix-run/node";

//! Functions
import { CrearTarjeta } from "./crear-tarjeta";

//! UUID
// import { v4 as uuidv4 } from "uuid";

export async function CrearCliente(values: NonNullable<object>): Promise<Response> {

    //! ID del Cliente (Comercio)
    // const ClienteID = uuidv4();

    // //! Datos requeridos del Cliente
    let data = {
        "id_externo": 0,
        //     "nombre": values.cliente_nombre,
        //     "apellido": values.apellido_paterno,
        "email": values.email,
    };

    //! API Endpoint (DEV)
    const Crear_Cliente_API = "https://api.sandbox.claropagos.com/v1/cliente";

    //! TOKEN
    const Crear_Cliente_Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNGY0MmVmZmViZDZkYmIyYzMxYTRkMzU1N2Y1OTAwOTgzZjNkMDEzM2IwMDA4ZjgzYjAzOTI4MGE4NDgxZmZkODNkMjA3M2RiYWJiMDZhZWQiLCJpYXQiOjE3MTY2MDc2NDEuNjk4NjQ5LCJuYmYiOjE3MTY2MDc2NDEuNjk4NjUzLCJleHAiOjE3Nzk2Nzk2NDEuNjkzMzkxLCJzdWIiOiIxMjMiLCJzY29wZXMiOlsiY2xpZW50ZS1jbGllbnRlcyJdfQ.VkMGQXvz-xoXCBOUaGjMYbNPPimEhDR-2w0qoGJ9X-Ser2B7IooqxFcS2sfOLmoto_4Hqp6c0M_CbKkuMmHMUjGpYRcP-cgBBunVRp05I9o09eUgLUlIjJK93e6dPZlzqNmBUSucmbDaXkACQ-nzocfOvtXgOGOx1eDKkFC7n8KkGcYpnTB1ngSjP_5w6w7FO_P55yBzh2QWRekL8hUB-FS2zn3LiIS3F-oZojhk7gShGiXYlCnIiHUyHsJrUG-Zgb_aliBxLDFY5ub95vtwTkePtpbZnHbs_lKpct3Nz2avxmu54i1ls2mt6Ccxaxh5MmyKkjHlju-Mt8hP4iEK7QhKW3DQe09YMPqOnWRTt3XjdKxEUeul3d3u7D8v8PeJCChRSnaG6_Ja63JarOrobT7wZJC-agPM0IDC3sWMr1p_lAjVZwpoPjcIXfWl_56j3fBlBxI9QwhQHIHsqXQKXR_zqv8bw7b-0FDLPmAial9KC2cF8CBosjAETSphq2TqGuvaLjO6TMVwDAWKo7-WVNASPM8Cte9mgK79XOT9dWqSs7HT6dZMTICihmFig_WByXVE7weSzj1mqIwGHuAkfl-wLbwUIR7htWLfchLW6QLYiwP4vF3y95pwoZyf4MfQKPRPn9EWL73QnZVhlsTvg2xJuNgZGNqwKtGPCROvR1o";

    let res = await fetch(`${Crear_Cliente_API}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Crear_Cliente_Token}`, // `${process.env.API_TOKEN}`
        },
        body: JSON.stringify({ ...data }),
    });

    let result = await res.json();

    if (result.status === "success") {
        return CrearTarjeta(values);
    }

    return json(result);
}