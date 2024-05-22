import { json } from "@remix-run/node";
import { CrearCargo } from "./crear-cargo";

export async function CrearTarjeta(values: NonNullable<object>): Promise<Response> {

    //! Datos requeridos de la Tarjeta
    const data = {
        "nombre": values.nombre,
        "pan": values.pan,
        "cvv2": values.cvv2,
        "expiracion_mes": values.expiracion_mes,
        "expiracion_anio": values.expiracion_anio,
        // "direccion": {
        //     "linea1": "string",
        //     "linea2": "string",
        //     "linea3": "string",
        //     "cp": "string",
        //     "telefono": {
        //         "tipo": "no_definido",
        //         "codigo_pais": "string",
        //         "codigo_area": "string",
        //         "prefijo": "string",
        //         "numero": "5566778899",
        //         "extension": 0
        //     },
        //     "municipio": "string",
        //     "ciudad": "string",
        //     "estado": "str",
        //     "pais": "str",
        //     "referencia_1": "string",
        //     "referencia_2": "string",
        //     "longitud": -90,
        //     "latitud": -90
        // },
        // "cliente_id": "string",
        // "default": true,
        // "cargo_unico": true
    };

    //! API Endpoint (DEV)
    const Crear_Tarjeta_API = "https://api.sandbox.claropagos.com/v1/tarjeta";

    //! TOKEN
    const Crear_Tarjeta_Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNzg4YjdhYmU4ZmM2MjY1N2I1ODVjOGFlYmU3OWE1NTI1ZWUzY2I4OTYwNmYwNjRkOGFlNmNkMGUyMTA3ZGQxMGVjNjVhNzQzMWQ1ZGYyZmEiLCJpYXQiOjE3MTYyMTA4NDIuMjMzOTkxLCJuYmYiOjE3MTYyMTA4NDIuMjM0LCJleHAiOjE3NzkyODI4NDIuMjI2OTE2LCJzdWIiOiIxMjMiLCJzY29wZXMiOlsiY2xpZW50ZS10YXJqZXRhcyJdfQ.I6A6N6Nb44f6yU9C27ciGOJO8JzyqNSqd2Qot6uI3cZshZIw4loW-nlXjCqiUxu0OI2DxPcQgXbKl8wHvUwEribXKIwiyH_lLlhhhSHWfS3Ch_HaXqDr3IaGCsIdE4e8or3N4-EwwhL-k27wUe27MAhMxH1VVmHgcyUpc9NyBNO9pJW4lZHJfndbC5TF9Z-wwXwDRKDdwQWfboAsDnXe2DnrIrDbIJApQy9SMYag3upATpzA0wtAaZP-mLqi_0VevEmcroQyG0aH4YddRrCLII3XxbPkbSn0Ucmq48DPRRwqoI62ZI3UX6he8YHSJdJ7WSTtsrMwaT7tAwd3lz5fALZVkn8sCBp1LTh4TpauagIh2LO1oto9p6kX38fNcB0WrPaFdEpsiH2ZUTgOzvqp30fjI-4Py23a2EHmOJbe9X2DOgqYkTtqWUI2niqudJ6_8HIdkslSnZCfj69P8cKNOUSMbJ45HI_2PbC8KI67CAnZ_9LAhh01zR-9Ny1VCt6L5bTzWKjH2_yXoo2eUQIDwSmytdxxqR32noU9anmFgAO5NPWM1Sa-J8pD-XzGf5xTUo4hLCHa6vJNvO5wZeePkmWyPnAXY1lJUguBlZgcjqriDIxfo4SSxFYoVCMoX8twpZ99Ah-DXiApxYdxjXqiqb8nWlWrc-6oJD51j8hm6Gc";

    const res = await fetch(Crear_Tarjeta_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Crear_Tarjeta_Token}`, // `${process.env.API_TOKEN}`
        },
        body: JSON.stringify({ ...data }),
    });

    const result = await res.json();

    /*
    * //! Si funciona, no lo toques!.
    * Token requerido para la creación del Cargo
    * @return String();
    */

    if (result.status === "success") {
        const tarjeta_token = result.data.tarjeta.token;

        return await CrearCargo(values, tarjeta_token);
    }

    return json(result);
}