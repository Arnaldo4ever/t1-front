/* eslint-disable prefer-const */
//! Core Imports
import { json } from "@remix-run/node";

//! Functions
import { CrearTarjeta } from "./crear-tarjeta";

export async function AntiFraude(values: NonNullable<object>): Promise<Response> {
    //! Datos requeridos de Antifraude
    const data = {
        "monto": values.monto,
        "pais": values.pais,
        "moneda": "MXN",
        "descripcion": "string",
        "metodo_pago": "tarjeta",
        "tarjeta": {
            "nombre": values.nombre,
            "pan": values.pan,
            "expiracion_mes": values.expiracion_mes,
            "expiracion_anio": values.expiracion_anio,
            "direccion": {
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
                "estado": values.ciudad,
                "pais": values.pais,
                // "referencia_1": "string",
                // "referencia_2": "string",
                // "longitud": -90,
                // "latitud": -90
            }
        },
        "pedido": {
            "id_externo": 100,
            "creacion": "2019-08-24T14:15:22Z",
            "direccion_envio": {
                "linea1": "string",
                "linea2": "string",
                "linea3": "string",
                "cp": "string",
                "telefono": {
                    "tipo": "no_definido",
                    "codigo_pais": "string",
                    "codigo_area": "string",
                    "prefijo": "string",
                    "numero": "5566778899",
                    "extension": 0
                },
                "municipio": "string",
                "ciudad": "string",
                "estado": values.estado,
                "pais": values.pais,
                "referencia_1": "string",
                "referencia_2": "string",
                "longitud": -90,
                "latitud": -90,
                "nombre": "string",
                "apellido_paterno": "string",
                "apellido_materno": "string"
            },
            "peso": 0,
            "articulos": [
                {
                    "id_pedido": "string",
                    "nombre_producto": "string",
                    "descripcion_producto": "string",
                    "sku": "string",
                    "ean_upc": "string",
                    "tipo_producto": "digital",
                    "cantidad": 1,
                    "precio_unitario": 0,
                    "precio_total": 0,
                    "otros": "string",
                    "es_digital": true
                }
            ],
            "total_articulos": 0,
            "fecha_creacion": "2019-08-24T14:15:22Z",
            "fecha_entrega": "2019-08-24T14:15:22Z",
            "empresa_envio": "noventamin",
            "numero_guia": "string",
            "es_regalo": true,
            "monto_articulos": 0,
            "monto_envio": 0,
            "total_monto": 0,
            "device_fingerprint": "string",
            "ip_cliente": "192.168.0.1",
            "datos_comercio": {
                "1": "test string",
                "2": "another string"
            }
        },
        "cliente": {
            "id": 0,
            // "id_externo": "ba4e968d-95d0-4a4d-928b-808a58ffbb55",
            "creacion_externa": "2019-08-24T14:15:22Z",
            "nombre": "string",
            "apellido_paterno": "string",
            "apellido_materno": "string",
            "email": "usuario@t1pagos.com",
            "telefono": {
                "tipo": "no_definido",
                "codigo_pais": "string",
                "codigo_area": "string",
                "prefijo": "string",
                "numero": "5566778899",
                "extension": 0
            },
            "direccion": {
                "linea1": "string",
                "linea2": "string",
                "linea3": "string",
                "cp": "string",
                "telefono": {
                    "tipo": "no_definido",
                    "codigo_pais": "string",
                    "codigo_area": "string",
                    "prefijo": "string",
                    "numero": "5566778899",
                    "extension": 0
                },
                "municipio": "string",
                "ciudad": "string",
                "estado": "str",
                "pais": "MEX",
                "referencia_1": "string",
                "referencia_2": "string",
                "longitud": -90,
                "latitud": -90
            }
        },
        "PlanPagos": {
            "plan": "msi",
            "parcialidades": 6,
            "diferido": 0,
            "redime_puntos": false
        }
    };

    //! API Endpoint (DEV)
    const antiFraude_API = "https://api.sandbox.claropagos.com/v1/antifraude";

    //! TOKEN
    const antiFraude_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNjhmY2Y1NGU5NDc0M2YwOTA5ZWU2ZDk3NGM5NjkxM2M2YzZhYzNkZThhNjViYzQ0NTcyODRiMzBkMmQyOTBmYWNiNGY3YTQ3OGYwMTQ2YzYiLCJpYXQiOjE3MTYwNjE3NjguMjMzNTI3LCJuYmYiOjE3MTYwNjE3NjguMjMzNTMyLCJleHAiOjE3NzkxMzM3NjguMjI2NDg3LCJzdWIiOiIxMjMiLCJzY29wZXMiOlsiY2xpZW50ZS1hbnRpZnJhdWRlIl19.XXl8SjEOA4oeyzbOpl6PJTThqR00VmDbexuLzVb9q5kov4iMsrZy882Qvkn8bIQNOpHulEIohxGnANBd0IXWaTd_pYBanX2ZmG3D-5N9ZG6vujUwwm1VyNfTxbKdQpXV3DzwtSSwDMhTGgdAYNzFbYEH2t1kgkvTwy9hTCQ5Xiq_c_Zc4HUlJ-6gkU6o0sxdORXE6E_NYzS-PpTexN-5-cbEiu4FmPzM9CXhvlpueRwDlBRYnHMWWe_FLfNSUijwuGLKxAHoYX90utmBMd-Sc8P6Aem2BUn8HtmMFTZRfZ0p44XDFnsDdRq699gT0i-hIq7m6PJVg1MxuFVXsIsdLGr626S7Fcm3NPqiws_h18_QiDu-1bShpmRmV27nJ3HA4i609psHoP4H49CcqnVF-fIPrYx77cMjznLVFZVY7lLemJfNZtWw23BUQVcmSPXUaTjSoM4LD5HdAM2qI3SXEwuaWS5h9xlzF9qchMSdqs8NqfxdZ8tn7eKiaF8lvoXOcXEYR1PUIoGuFJ4aelq_k0qZq5WqjKtRDGGASiJQmoZyD9jUDmQnn1vGn783pZTQQ5tr1wWQX5YpAFyK5v7eZoRLK1xoVhGn9ZnuxoGEi9zG02-d6_26lc3klfvIK0VB69EdErA27Ofqe7f0bWRpigsgtfu5-22eHO4vj98WSHc";

    const res = await fetch(antiFraude_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${antiFraude_TOKEN}`
        },
        body: JSON.stringify({ ...data }),
    });

    const result = await res.json();

    if (result.status === "success") {
        return CrearTarjeta(json(result));
    }

    return json(result);
}