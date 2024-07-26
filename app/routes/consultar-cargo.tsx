/* eslint-disable prefer-const */
//! Core Imports
import { json } from "@remix-run/node";

//! Functions

export async function ConsultarCargo(cargo_id: NonNullable<string>): Promise<Response> {
    //! API Endpoint (DEV)
    const Consultar_Cargo_API = `https://api.sandbox.claropagos.com/v1/cargo/${cargo_id}`;

    //! TOKEN
    const Consultar_Cargo_Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiMjVmM2EyOWU3YWUwMjY3MjVmZGJjMWZmMzc1Y2Q2MGM4NDczOTNiYTAwZTQ1MzMzYzlkNGFkYmQ1OWRhMjhhMmYwYjNlYWI0ODY0MDM0OTkiLCJpYXQiOjE3MTYyMTA4ODIuNTEyNTc3LCJuYmYiOjE3MTYyMTA4ODIuNTEyNTg2LCJleHAiOjE3NzkyODI4ODIuNTA2MDA3LCJzdWIiOiIxMjMiLCJzY29wZXMiOlsiY2xpZW50ZS10cmFuc2FjY2lvbmVzIl19.YOb64gfBXHY3Yy-jSuVvLb8NMs8iczxNndL1kaq-WA5QwgGznUhpJ9q9PyKQvzCvinXvAinPuoVPT3078JasEVL06QegiJtTX0GZYHq3vTktYDDJpyb9Ok6wtYi38xD45uVbLh05YlwNfG3-gbGvDCQJIeZS7tECWmPhSmEqsapZF90qM6BH0oYJ-Cfo_36s8ShZVdEn1J00sCTRuyjA17UzrIYE-y95L04DmCWcYQdlyW8krR7Vl2vhVrEB8fnqtV6bAPROSwW4J3rmaGUeFJ10XuZOaKxQIAtjsyV3sqlxpuigG46tKqOKcMzct0Ia7zzGwm10Nj6kzcj8GMGqxmYATxdKxMfIt1paK_mHNkXJigeGccolTogwsBcgqS4xeXrc9Eoz7eom56PEvKrDJN2GKyKqy8NtZt_uzAmrbrL8d7vREtghhzgm9RshpMZqA03Ivg_2l-hc409e27GosyUaXcN4alI3rBXbrF44BeOrA87lXNL8WzJbfnIOVDEdz_8uV484sp92mPWPTRoWkawaPjxll2LiT9WwMFyDGV1ojTBTGBeJn7QT1Y7JsKjO7PPtERt3sDNqxOcQ0dv-EoQ6urqXW3vIT7hTO3ivZxGoSIp7xsJ0R1D69mpl-Fm4utO0ZQKS4yTILYvx2UBAXpzz-5bMzkUhMsofQf5wuxY";

    /**
    * Consultar Cargo del Producto
    * Asignar como parametro el ID creado para proceder con la respectiva consulta del Cargo
    * 
    * @return Promise<Response>
    */
    const response = await fetch(`${Consultar_Cargo_API}`, {
        method: "GET",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Consultar_Cargo_Token}`
        },
    });

    const result = await response.json();

    return json(result);
}