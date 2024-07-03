/* eslint-disable prefer-const */
//! Core Imports
import { json } from "@remix-run/node";

//! Functions
import { AntiFraude } from "./anti-fraude";
import { ConsultarCargo } from "./consultar-cargo";

export async function CrearCargo(values: NonNullable<object>, tarjeta_token: NonNullable<object>): Promise<Response> {

    /**
    * Datos requeridos del Cargo
    * Asignamos los valores de la data recibida de manera predeterminada para optimizar el tiempo de respuesta de la API
    * 
    * @var data
    * @return <Object>
    */
    let data = {
        "monto": 14500,
        // "pais": values.pais,
        "moneda": "MXN",
        // "descripcion": "string",
        // "capturar": true,
        // "incluir_riesgo": true,
        "metodo_pago": "tarjeta",
        "tarjeta": {
            "token": tarjeta_token
        },
        // "pedido": {
            // "id_externo": "string",
            // "creacion": "2019-08-24T14:15:22Z",
            // "direccion_envio": {
            //     "linea1": values.linea1,
            //     "linea2": values.linea2,
            //     "linea3": values.linea3,
            //     "cp": values.cp,
            // "telefono": {
            //     "tipo": "no_definido",
            //     "codigo_pais": "string",
            //     "codigo_area": "string",
            //     "prefijo": "string",
            //     "numero": "5566778899",
            //     "extension": 0
            // },
            // "municipio": values.municipio,
            // "ciudad": values.ciudad,
            // "estado": values.estado
            // "pais": values.pais,
            // "referencia_1": "string",
            // "referencia_2": "string",
            // "longitud": -90,
            // "latitud": -90,
            // "nombre": values.cliente_nombre,
            // "apellido_paterno": values.apellido_paterno,
            // "apellido_materno": values.apellido_materno,
            // },
            // "peso": 0,
            // "articulos": [],
            // "total_articulos": 0,
            // "fecha_creacion": "2019-08-24T14:15:22Z",
            // "fecha_entrega": "2019-08-24T14:15:22Z",
            // "empresa_envio": "noventamin",
            // "numero_guia": "string",
            // "es_regalo": true,
            // "monto_articulos": 0,
            // "monto_envio": 0,
            // "total_monto": 0,
            // "device_fingerprint": "string",
            // "ip_cliente": "192.168.0.1",
            // "datos_comercio": {}
        // },
        // "cliente": {
        // "id": "0",
        // "id_externo": "ba4e968d-95d0-4a4d-928b-808a58ffbb55",
        //     "creacion_externa": "2019-08-24T14:15:22Z",
        // "nombre": "Andres",
        // "apellido_paterno": "Gutierrez",
        //     "apellido_materno": "string",
        // "email": "andres.4ever@gmail.com",
        // "telefono": {
        //     "tipo": "movil",
        //     "codigo_pais": "57",
        //     "codigo_area": "string",
        //     "prefijo": "string",
        //     "numero": "3134440041",
        //     "extension": 0
        // },
        // "direccion": {
        //     "linea1": " Cra. 8 No. 9 - 83, Bogotá, D.C",
        //     "cp": "111711",
        //     "municipio": "La Candelaria",
        //     "estado": "Bogotá",
        //     "pais": "COL",
        // }
        // },
        // "PlanPagos": {
        //     "plan": "msi",
        //     "parcialidades": 6,
        //     "diferido": 0,
        //     "redime_puntos": false
        // }
    }

    //! API Endpoint (DEV)
    const Crear_Cargo_API = "https://api.sandbox.claropagos.com/v1/cargo";

    //! TOKEN
    const Crear_Cargo_Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiMjVmM2EyOWU3YWUwMjY3MjVmZGJjMWZmMzc1Y2Q2MGM4NDczOTNiYTAwZTQ1MzMzYzlkNGFkYmQ1OWRhMjhhMmYwYjNlYWI0ODY0MDM0OTkiLCJpYXQiOjE3MTYyMTA4ODIuNTEyNTc3LCJuYmYiOjE3MTYyMTA4ODIuNTEyNTg2LCJleHAiOjE3NzkyODI4ODIuNTA2MDA3LCJzdWIiOiIxMjMiLCJzY29wZXMiOlsiY2xpZW50ZS10cmFuc2FjY2lvbmVzIl19.YOb64gfBXHY3Yy-jSuVvLb8NMs8iczxNndL1kaq-WA5QwgGznUhpJ9q9PyKQvzCvinXvAinPuoVPT3078JasEVL06QegiJtTX0GZYHq3vTktYDDJpyb9Ok6wtYi38xD45uVbLh05YlwNfG3-gbGvDCQJIeZS7tECWmPhSmEqsapZF90qM6BH0oYJ-Cfo_36s8ShZVdEn1J00sCTRuyjA17UzrIYE-y95L04DmCWcYQdlyW8krR7Vl2vhVrEB8fnqtV6bAPROSwW4J3rmaGUeFJ10XuZOaKxQIAtjsyV3sqlxpuigG46tKqOKcMzct0Ia7zzGwm10Nj6kzcj8GMGqxmYATxdKxMfIt1paK_mHNkXJigeGccolTogwsBcgqS4xeXrc9Eoz7eom56PEvKrDJN2GKyKqy8NtZt_uzAmrbrL8d7vREtghhzgm9RshpMZqA03Ivg_2l-hc409e27GosyUaXcN4alI3rBXbrF44BeOrA87lXNL8WzJbfnIOVDEdz_8uV484sp92mPWPTRoWkawaPjxll2LiT9WwMFyDGV1ojTBTGBeJn7QT1Y7JsKjO7PPtERt3sDNqxOcQ0dv-EoQ6urqXW3vIT7hTO3ivZxGoSIp7xsJ0R1D69mpl-Fm4utO0ZQKS4yTILYvx2UBAXpzz-5bMzkUhMsofQf5wuxY";

    /**
    * Crear Cargo del Producto
    * Asignar como parametro el Token de la Tarjeta creada para proceder con la creación del Cargo
    * 
    * @param values
    * @param tarjeta_token
    * 
    * @return Promise<Response>
    */
    const response = await fetch(`${Crear_Cargo_API}`, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Crear_Cargo_Token}`
        },
        body: JSON.stringify({ ...data }),
    });

    const result = await response.json();

    // console.log(result);

    if (result.status === "success") {
        return ConsultarCargo(result.data.cargo.id);
    }

    return json(result);
}