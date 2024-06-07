/* eslint-disable prefer-const */
//! Core Imports
import { json } from "@remix-run/node";

//! Functions
import { AntiFraude } from "./anti-fraude";

export async function CrearCargo(values: NonNullable<object>, tarjeta_token: NonNullable<object>): Promise<Response> {

    //! Datos requeridos del Cargo
    let data = {
        "monto": values.monto,
        "pais": values.pais,
        "moneda": "MXN",
        // "descripcion": "string",
        // "capturar": true,
        // "incluir_riesgo": true,
        "metodo_pago": "tarjeta",
        "tarjeta": {
            "token": tarjeta_token
        },
        // "credito": {
        //     "formato": "claroshop",
        //     "sucursal": 0
        // },
        // "transferencia": {
        //     "formato": "string",
        //     "concepto": "string",
        //     "fecha_inicio": "2019-08-24T14:15:22Z",
        //     "fecha_fin": "2019-08-24T14:15:22Z"
        // },
        "pedido": {
            // "id_externo": "string",
            // "creacion": "2019-08-24T14:15:22Z",
            "direccion_envio": {
                "linea1": values.linea1,
                "linea2": values.linea2,
                "linea3": values.linea3,
                "cp": values.cp,
                // "telefono": {
                //     "tipo": "no_definido",
                //     "codigo_pais": "string",
                //     "codigo_area": "string",
                //     "prefijo": "string",
                //     "numero": "5566778899",
                //     "extension": 0
                // },
                "municipio": values.municipio,
                "ciudad": values.ciudad,
                // "estado": values.estado
                "pais": values.pais,
                // "referencia_1": "string",
                // "referencia_2": "string",
                // "longitud": -90,
                // "latitud": -90,
                "nombre": values.cliente_nombre,
                "apellido_paterno": values.apellido_paterno,
                "apellido_materno": values.apellido_materno,
            },
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
        },
        // "cliente": {
        "id": "0",
        // "id_externo": "ba4e968d-95d0-4a4d-928b-808a58ffbb55",
        //     "creacion_externa": "2019-08-24T14:15:22Z",
        //     "nombre": "string",
        //     "apellido_paterno": "string",
        //     "apellido_materno": "string",
        //     "email": "usuario@t1pagos.com",
        //     "telefono": {},
        //     "direccion": {}
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
    let res = await fetch(`${Crear_Cargo_API}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Crear_Cargo_Token}`
        },
        body: JSON.stringify({ ...data }),
    });

    let result = await res.json();

    // if (result.status === "success") {
    //     return AntiFraude(values);
    // }

    return json(result);
}