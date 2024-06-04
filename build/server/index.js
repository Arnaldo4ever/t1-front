import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, useRouteError, isRouteErrorResponse, useNavigation, useActionData, Form } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { toast, Toaster } from "sonner";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const stylesheet = "/assets/tailwind-VWcDB5m_.css";
//! Toaster Sonner
const meta$1 = () => {
  return [
    { title: "T1pagos" },
    { name: "description", content: "¡Bienvenido!" }
  ];
};
const links = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "es-MX", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
function ErrorBoundary() {
  const error = useRouteError();
  let heading = "¡Algo salio mal!";
  let message = "Disculpe, ha ocurrido un error inesperado. Por favor intente nuevamente o contáctenos si el problema persiste.";
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 401:
        heading = "401 No Autorizado";
        message = "Ups! Parece que has intentado acceder a una página a la cual no tienes suficientes privilegios.";
        break;
      case 404:
        heading = "404 No Encontrado";
        message = "Ups! Parece que has intentado acceder a una página la cual no existe.";
        break;
    }
  }
  const errorMessage = error instanceof Error ? error.message : null;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("section", { className: "max-w-full h-screen", children: /* @__PURE__ */ jsx("div", { className: "max-w-full md:max-w-7xl px-4 sm:px-8 lg:px-12 mx-auto h-full", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-12 gap-4 h-full", children: /* @__PURE__ */ jsx("div", { className: "col-span-12", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center align-middle h-full", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-sans text-4xl font-bold text-red-500 leading-loose", children: heading }),
    /* @__PURE__ */ jsx("p", { className: "font-sans text-base font-normal text-slate-900", children: message }),
    errorMessage && /* @__PURE__ */ jsx("div", { className: "border border-red-500 p-5 my-5", children: /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("b", { children: "Mensaje del Error" }),
      ": ",
      errorMessage
    ] }) }),
    /* @__PURE__ */ jsx("a", { href: "/", children: "Volver al Inicio" })
  ] }) }) }) }) }) });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: App,
  links,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
//! Core Imports
//! Functions
async function CrearCargo(values, tarjeta_token) {
  //! Datos requeridos del Cargo
  const data = {
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
        "apellido_materno": values.apellido_materno
      }
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
    "id": "0"
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
  };
  //! API Endpoint (DEV)
  const Crear_Cargo_API = "https://api.sandbox.claropagos.com/v1/cargo";
  //! TOKEN
  const Crear_Cargo_Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiMjVmM2EyOWU3YWUwMjY3MjVmZGJjMWZmMzc1Y2Q2MGM4NDczOTNiYTAwZTQ1MzMzYzlkNGFkYmQ1OWRhMjhhMmYwYjNlYWI0ODY0MDM0OTkiLCJpYXQiOjE3MTYyMTA4ODIuNTEyNTc3LCJuYmYiOjE3MTYyMTA4ODIuNTEyNTg2LCJleHAiOjE3NzkyODI4ODIuNTA2MDA3LCJzdWIiOiIxMjMiLCJzY29wZXMiOlsiY2xpZW50ZS10cmFuc2FjY2lvbmVzIl19.YOb64gfBXHY3Yy-jSuVvLb8NMs8iczxNndL1kaq-WA5QwgGznUhpJ9q9PyKQvzCvinXvAinPuoVPT3078JasEVL06QegiJtTX0GZYHq3vTktYDDJpyb9Ok6wtYi38xD45uVbLh05YlwNfG3-gbGvDCQJIeZS7tECWmPhSmEqsapZF90qM6BH0oYJ-Cfo_36s8ShZVdEn1J00sCTRuyjA17UzrIYE-y95L04DmCWcYQdlyW8krR7Vl2vhVrEB8fnqtV6bAPROSwW4J3rmaGUeFJ10XuZOaKxQIAtjsyV3sqlxpuigG46tKqOKcMzct0Ia7zzGwm10Nj6kzcj8GMGqxmYATxdKxMfIt1paK_mHNkXJigeGccolTogwsBcgqS4xeXrc9Eoz7eom56PEvKrDJN2GKyKqy8NtZt_uzAmrbrL8d7vREtghhzgm9RshpMZqA03Ivg_2l-hc409e27GosyUaXcN4alI3rBXbrF44BeOrA87lXNL8WzJbfnIOVDEdz_8uV484sp92mPWPTRoWkawaPjxll2LiT9WwMFyDGV1ojTBTGBeJn7QT1Y7JsKjO7PPtERt3sDNqxOcQ0dv-EoQ6urqXW3vIT7hTO3ivZxGoSIp7xsJ0R1D69mpl-Fm4utO0ZQKS4yTILYvx2UBAXpzz-5bMzkUhMsofQf5wuxY";
  //! Cargo Producto
  const res = await fetch(Crear_Cargo_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Crear_Cargo_Token}`
    },
    body: JSON.stringify({ ...data })
  });
  const result = await res.json();
  return json(result);
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CrearCargo
}, Symbol.toStringTag, { value: "Module" }));
//! Core Imports
async function CrearTarjeta(values) {
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
    // "cliente_id": 0,
    "default": true,
    "cargo_unico": true
  };
  //! API Endpoint (DEV)
  const Crear_Tarjeta_API = "https://api.sandbox.claropagos.com/v1/tarjeta";
  //! TOKEN
  const Crear_Tarjeta_Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNzg4YjdhYmU4ZmM2MjY1N2I1ODVjOGFlYmU3OWE1NTI1ZWUzY2I4OTYwNmYwNjRkOGFlNmNkMGUyMTA3ZGQxMGVjNjVhNzQzMWQ1ZGYyZmEiLCJpYXQiOjE3MTYyMTA4NDIuMjMzOTkxLCJuYmYiOjE3MTYyMTA4NDIuMjM0LCJleHAiOjE3NzkyODI4NDIuMjI2OTE2LCJzdWIiOiIxMjMiLCJzY29wZXMiOlsiY2xpZW50ZS10YXJqZXRhcyJdfQ.I6A6N6Nb44f6yU9C27ciGOJO8JzyqNSqd2Qot6uI3cZshZIw4loW-nlXjCqiUxu0OI2DxPcQgXbKl8wHvUwEribXKIwiyH_lLlhhhSHWfS3Ch_HaXqDr3IaGCsIdE4e8or3N4-EwwhL-k27wUe27MAhMxH1VVmHgcyUpc9NyBNO9pJW4lZHJfndbC5TF9Z-wwXwDRKDdwQWfboAsDnXe2DnrIrDbIJApQy9SMYag3upATpzA0wtAaZP-mLqi_0VevEmcroQyG0aH4YddRrCLII3XxbPkbSn0Ucmq48DPRRwqoI62ZI3UX6he8YHSJdJ7WSTtsrMwaT7tAwd3lz5fALZVkn8sCBp1LTh4TpauagIh2LO1oto9p6kX38fNcB0WrPaFdEpsiH2ZUTgOzvqp30fjI-4Py23a2EHmOJbe9X2DOgqYkTtqWUI2niqudJ6_8HIdkslSnZCfj69P8cKNOUSMbJ45HI_2PbC8KI67CAnZ_9LAhh01zR-9Ny1VCt6L5bTzWKjH2_yXoo2eUQIDwSmytdxxqR32noU9anmFgAO5NPWM1Sa-J8pD-XzGf5xTUo4hLCHa6vJNvO5wZeePkmWyPnAXY1lJUguBlZgcjqriDIxfo4SSxFYoVCMoX8twpZ99Ah-DXiApxYdxjXqiqb8nWlWrc-6oJD51j8hm6Gc";
  const res = await fetch(Crear_Tarjeta_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Crear_Tarjeta_Token}`
      // `${process.env.API_TOKEN}`
    },
    body: JSON.stringify({ ...data })
  });
  const result = await res.json();
  if (result.status === "success") {
    const tarjeta_token = result.data.tarjeta.token;
    return await CrearCargo(values, tarjeta_token);
  }
  return json(result);
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CrearTarjeta
}, Symbol.toStringTag, { value: "Module" }));
//! Core Imports
//! UUID
async function CrearCliente(values) {
  //! ID del Cliente (Comercio)
  const data = {
    "id_externo": 0,
    //     "nombre": values.cliente_nombre,
    //     "apellido": values.apellido_paterno,
    "email": values.email
  };
  //! API Endpoint (DEV)
  const Crear_Cliente_API = "https://api.sandbox.claropagos.com/v1/cliente";
  //! TOKEN
  const Crear_Cliente_Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNGY0MmVmZmViZDZkYmIyYzMxYTRkMzU1N2Y1OTAwOTgzZjNkMDEzM2IwMDA4ZjgzYjAzOTI4MGE4NDgxZmZkODNkMjA3M2RiYWJiMDZhZWQiLCJpYXQiOjE3MTY2MDc2NDEuNjk4NjQ5LCJuYmYiOjE3MTY2MDc2NDEuNjk4NjUzLCJleHAiOjE3Nzk2Nzk2NDEuNjkzMzkxLCJzdWIiOiIxMjMiLCJzY29wZXMiOlsiY2xpZW50ZS1jbGllbnRlcyJdfQ.VkMGQXvz-xoXCBOUaGjMYbNPPimEhDR-2w0qoGJ9X-Ser2B7IooqxFcS2sfOLmoto_4Hqp6c0M_CbKkuMmHMUjGpYRcP-cgBBunVRp05I9o09eUgLUlIjJK93e6dPZlzqNmBUSucmbDaXkACQ-nzocfOvtXgOGOx1eDKkFC7n8KkGcYpnTB1ngSjP_5w6w7FO_P55yBzh2QWRekL8hUB-FS2zn3LiIS3F-oZojhk7gShGiXYlCnIiHUyHsJrUG-Zgb_aliBxLDFY5ub95vtwTkePtpbZnHbs_lKpct3Nz2avxmu54i1ls2mt6Ccxaxh5MmyKkjHlju-Mt8hP4iEK7QhKW3DQe09YMPqOnWRTt3XjdKxEUeul3d3u7D8v8PeJCChRSnaG6_Ja63JarOrobT7wZJC-agPM0IDC3sWMr1p_lAjVZwpoPjcIXfWl_56j3fBlBxI9QwhQHIHsqXQKXR_zqv8bw7b-0FDLPmAial9KC2cF8CBosjAETSphq2TqGuvaLjO6TMVwDAWKo7-WVNASPM8Cte9mgK79XOT9dWqSs7HT6dZMTICihmFig_WByXVE7weSzj1mqIwGHuAkfl-wLbwUIR7htWLfchLW6QLYiwP4vF3y95pwoZyf4MfQKPRPn9EWL73QnZVhlsTvg2xJuNgZGNqwKtGPCROvR1o";
  const res = await fetch(Crear_Cliente_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Crear_Cliente_Token}`
      // `${process.env.API_TOKEN}`
    },
    body: JSON.stringify({ ...data })
  });
  const result = await res.json();
  if (result.status === "success") {
    return CrearTarjeta(values);
  }
  return json(result);
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CrearCliente
}, Symbol.toStringTag, { value: "Module" }));
//! Core Imports
async function AntiFraude(values) {
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
        "pais": values.pais
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
    body: JSON.stringify({ ...data })
  });
  const result = await res.json();
  if (result.status === "success") {
    return CrearTarjeta(json(result));
  }
  return json(result);
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AntiFraude
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  return [
    { title: "Thank You" },
    { name: "description", content: "Description..." }
  ];
};
function ThankYou() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("section", { className: "max-w-full h-screen", children: /* @__PURE__ */ jsx("div", { className: "max-w-full md:max-w-7xl px-4 sm:px-8 lg:px-12 mx-auto h-full", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-12 gap-4 h-full", children: /* @__PURE__ */ jsx("div", { className: "col-span-12", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center align-middle h-full", children: /* @__PURE__ */ jsxs("div", { className: "max-w-full md:max-w-4xl md:min-h-96 flex flex-col items-center justify-center bg-green-50 rounded-md shadow-xl py-10 px-5 md:py-10 md:px-10 text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-sans text-2xl font-bold text-slate-900", children: "T1Pagos" }),
    /* @__PURE__ */ jsx("h2", { className: "font-sans text-2xl md:text-5xl font-normal md:font-light uppercase text-green-500 mt-5 md:mt-0 md:leading-loose", children: "¡Gracias por su compra!" }),
    /* @__PURE__ */ jsx("p", { className: "font-sans text-base font-normal text-gray-700 mt-5 md:mt-0 md:leading-normal", children: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, voluptate. Fugit facilis exercitationem, voluptates aut beatae dolor placeat numquam accusantium. Natus voluptate unde rerum explicabo." }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "font-sans text-base mt-7 md:mt-10 text-white bg-slate-900 hover:bg-slate-700 py-3.5 md:py-3 px-5 rounded transition-all", children: "Volver a Comprar" })
  ] }) }) }) }) }) }) });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ThankYou,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const action = async ({ request }) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  const btnTrigger = formData.get("btn-trigger");
  if (btnTrigger === "submit-checkout") {
    return await CrearTarjeta(values);
  }
  return json(values);
};
function Checkout() {
  const navigation = useNavigation();
  useActionData();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-full bg-slate-900 py-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-full md:max-w-7xl px-4 sm:px-8 lg:px-12 mx-auto", children: /* @__PURE__ */ jsxs(Form, { method: "POST", className: "grid grid-cols-12 bg-white", children: [
      /* @__PURE__ */ jsx("div", { className: "col-span-12 md:col-span-7 md:border-r md:border-gray-300", children: /* @__PURE__ */ jsxs("div", { className: "w-full p-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "col-span-12", children: [
            /* @__PURE__ */ jsx("h3", { className: "block text-xl font-semibold text-gray-700", children: "Contacto" }),
            /* @__PURE__ */ jsx("div", { className: "relative mt-2 rounded shadow-sm", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "email",
                id: "email",
                className: "font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all",
                placeholder: "Correo electrónico"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "relative flex gap-x-2 mt-4", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(
                "input",
                {
                  id: "suscripcion",
                  name: "suscripcion",
                  type: "checkbox",
                  defaultChecked: true,
                  className: "h-4 w-4 rounded-md border-gray-100 text-blue-600 focus:ring-blue-600 transition-all"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "text-sm leading-6", children: /* @__PURE__ */ jsx("label", { htmlFor: "suscripcion", className: "font-normal text-gray-900", children: "Enviarme novedades y ofertas por correo electrónico" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "col-span-12 mt-5", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "col-span-12", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-medium leading-6 text-gray-900", children: "Delivery" }),
              /* @__PURE__ */ jsx("div", { className: "w-full mt-4", children: /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "pais",
                  name: "pais",
                  autoComplete: "country-name",
                  className: "block w-full rounded-md border-0 py-3.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 transition-all outline-0",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "COL", children: "Colombia" }),
                    /* @__PURE__ */ jsx("option", { value: "MEX", children: "Mexico" }),
                    /* @__PURE__ */ jsx("option", { value: "PRI", children: "Puerto Rico" })
                  ]
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "col-span-6", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "cliente_nombre",
                id: "cliente_nombre",
                className: "font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all",
                placeholder: "Nombre"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "col-span-6", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "apellido_paterno",
                id: "apellido_paterno",
                className: "font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all",
                placeholder: "Apellido"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "col-span-12", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "linea1",
                id: "linea1",
                className: "font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all",
                placeholder: "Dirección"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "col-span-12", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "linea2",
                id: "linea2",
                className: "font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all",
                placeholder: "Apartamento, casa, etc... (opcional)"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "col-span-4", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "ciudad",
                id: "ciudad",
                className: "font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all",
                placeholder: "Ciudad"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "col-span-4", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "municipio",
                id: "municipio",
                className: "font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all",
                placeholder: "Municipio"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "col-span-4", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "cp",
                id: "cp",
                className: "font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all",
                placeholder: "Código Postal"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "col-span-12", children: /* @__PURE__ */ jsxs("div", { className: "relative flex gap-x-2", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(
                "input",
                {
                  id: "guardar_info",
                  name: "guardar_info",
                  type: "checkbox",
                  className: "h-4 w-4 rounded-md border-gray-100 text-blue-600 focus:ring-blue-600 transition-all"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "text-sm leading-6", children: /* @__PURE__ */ jsx("label", { htmlFor: "guardar_info", className: "font-normal text-gray-900", children: "Guardar esta información para una próxima vez" }) })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "col-span-12 mt-5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium leading-6 text-gray-900", children: "Método de Envio" }),
              /* @__PURE__ */ jsxs("div", { className: "relative flex gap-x-2 mt-4 border rounded-t-md p-5", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "envio_internacional",
                    name: "envio",
                    type: "radio",
                    className: "h-4 w-4 rounded-md border-gray-100 text-blue-600 focus:ring-blue-600 transition-all"
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm leading-6 flex items-center justify-between w-full", children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "envio_internacional", className: "font-normal text-gray-900", children: "Envio Internacional" }),
                  /* @__PURE__ */ jsx("p", { className: "font-sans font-semibold", children: "$30.00" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative flex gap-x-2 border border-t-0 rounded-b-md p-5", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "envio_standard",
                    name: "envio",
                    type: "radio",
                    className: "h-4 w-4 rounded-md border-gray-100 text-blue-600 focus:ring-blue-600 transition-all"
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm leading-6 flex items-center justify-between w-full", children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "envio_standard", className: "font-normal text-gray-900", children: "Stándard" }),
                  /* @__PURE__ */ jsx("p", { className: "font-sans font-semibold", children: "$100.00" })
                ] })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-12 mt-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "block text-xl font-semibold text-gray-700", children: "Payment / Pago" }),
            /* @__PURE__ */ jsx("p", { className: "font-sans text-gray-500 text-sm leading-6", children: "Todas las transacciones son seguras y encriptadas" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-12 gap-4 mt-3", children: /* @__PURE__ */ jsx("div", { className: "col-span-12", children: /* @__PURE__ */ jsxs("div", { className: "rounded-md bg-gray-100 border border-t-0", children: [
              /* @__PURE__ */ jsx("div", { className: "py-4 px-3 border bg-blue-50 border-blue-500 rounded-t-md", children: /* @__PURE__ */ jsx("h4", { children: "Tarjeta de Crédito" }) }),
              /* @__PURE__ */ jsx("div", { className: "py-3 px-3.5", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "col-span-12", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "pan",
                    id: "pan",
                    className: "font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all mt-3",
                    placeholder: "Número de la Tarjeta"
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "col-span-5", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "expiracion_mes",
                    id: "expiracion_mes",
                    className: "font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all",
                    placeholder: "Fecha de expiración (MM / AA)"
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "col-span-5", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "expiracion_anio",
                    id: "expiracion_anio",
                    className: "font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all",
                    placeholder: "Fecha de expiración (MM / AA)"
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "cvv2",
                    id: "cvv2",
                    className: "font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all",
                    placeholder: "Código de seguridad"
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "col-span-12", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "nombre",
                    id: "nombre",
                    className: "font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all",
                    placeholder: "Nombre en la Tarjeta"
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "col-span-12", children: /* @__PURE__ */ jsxs("div", { className: "relative flex gap-x-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "billingAddress",
                      name: "billingAddress",
                      type: "checkbox",
                      defaultChecked: true,
                      className: "h-4 w-4 rounded-md border-gray-100 text-blue-600 focus:ring-blue-600 transition-all"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm leading-6", children: /* @__PURE__ */ jsx("label", { htmlFor: "billingAddress", className: "font-normal text-gray-900", children: "Usar la dirección de envío como dirección de facturación" }) })
                ] }) })
              ] }) })
            ] }) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col-span-12 mt-5", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center align-middle", children: /* @__PURE__ */ jsx("button", { type: "submit", name: "btn-trigger", value: "submit-checkout", className: "block w-full font-sans font-bold text-xl bg-blue-600 hover:bg-blue-700 text-white rounded hover:shadow-lg py-3 px-2 transition-all", onClick: () => toast.loading("Enviando..."), children: navigation.state === "submitting" ? "Enviando..." : "Pagar ahora" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "col-span-12 mt-20", children: /* @__PURE__ */ jsx("hr", {}) }),
        /* @__PURE__ */ jsx("div", { className: "col-span-12 mt-5", children: /* @__PURE__ */ jsx("a", { href: "#j", className: "text-blue-500", children: "Política de suscripción" }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "col-span-12 md:col-span-5 bg-gray-100", children: /* @__PURE__ */ jsx("div", { className: "w-full p-10 sticky top-0 right-0 left-0", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-12", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("div", { className: "c-product", children: /* @__PURE__ */ jsx("h6", { className: "font-sans text-sm", children: "The 3p Fulfilled Snowboard" }) }),
          /* @__PURE__ */ jsx("div", { className: "c-product__price-label", children: /* @__PURE__ */ jsx("p", { className: "c-product__price font-sans text-sm", children: "$2,629.95" }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-span-12", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between space-x-4", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "cupon",
              id: "cupon",
              className: "font-sans block w-full text-sm rounded border-gray-300 py-3.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-0 transition-all",
              placeholder: "Cupón de descuento o tarjeta de regalo"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center align-middle", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "font-sans text-base font-medium border-gray-300 bg-gray-200 hover:bg-gray-300 text-gray-500 rounded hover:shadow-lg py-3 px-2 ring-1 ring-inset ring-gray-300 outline-0 transition-all", children: "Aplicar" }) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-12 space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("div", { className: "c-product", children: /* @__PURE__ */ jsx("h6", { className: "font-sans text-sm", children: "Subtotal" }) }),
            /* @__PURE__ */ jsx("div", { className: "c-product__price-label", children: /* @__PURE__ */ jsx("p", { className: "c-product__price font-sans text-sm font-medium", children: "$2,629.95" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("div", { className: "c-product", children: /* @__PURE__ */ jsx("h6", { className: "font-sans text-sm", children: "Shipping" }) }),
            /* @__PURE__ */ jsx("div", { className: "c-product__price-label", children: /* @__PURE__ */ jsx("p", { className: "c-product__price font-sans text-sm", children: "Enter shipping address" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("div", { className: "c-product", children: /* @__PURE__ */ jsx("h6", { className: "font-sans text-sm", children: "Estimated taxes" }) }),
            /* @__PURE__ */ jsx("div", { className: "c-product__price-label", children: /* @__PURE__ */ jsx("p", { className: "c-product__price font-sans text-sm font-medium", children: "$499.69" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("div", { className: "c-product", children: /* @__PURE__ */ jsx("h6", { className: "font-sans text-xl font-semibold", children: "Total" }) }),
            /* @__PURE__ */ jsx("div", { className: "c-product__price-label", children: /* @__PURE__ */ jsxs("div", { className: "c-product__price font-sans text-sm font-medium", children: [
              /* @__PURE__ */ jsx("span", { className: "font-light text-gray-500", children: "COP  " }),
              /* @__PURE__ */ jsx("input", { type: "text", name: "monto", id: "monto", className: "text-xl font-medium", defaultValue: "99999" })
            ] }) })
          ] })
        ] })
      ] }) }) })
    ] }) }) }),
    /* @__PURE__ */ jsx(Toaster, { position: "top-right", richColors: true, closeButton: true })
  ] });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: Checkout
}, Symbol.toStringTag, { value: "Module" }));
function Index() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("header", { className: "max-w-full bg-slate-900 h-72", children: /* @__PURE__ */ jsx("div", { className: "max-w-full md:max-w-7xl px-4 md:px-8 lg:px-12 mx-auto h-full", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-12 gap-4 h-full", children: /* @__PURE__ */ jsx("div", { className: "col-span-12", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full space-y-10", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl text-red-500 text-center", children: "T1pagos" }),
    /* @__PURE__ */ jsx("a", { href: "/checkout", className: "font-sans font-normal text-xl text-gray-100 hover:text-red-500 text-center transition-all", children: "Checkout" })
  ] }) }) }) }) }) });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-C2BxZtkz.js", "imports": ["/assets/jsx-runtime-Co9OO0Si.js", "/assets/components-xFE7tJyU.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-C1Z_ydDN.js", "imports": ["/assets/jsx-runtime-Co9OO0Si.js", "/assets/components-xFE7tJyU.js"], "css": [] }, "routes/crear-cliente": { "id": "routes/crear-cliente", "parentId": "root", "path": "crear-cliente", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/crear-cliente-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/crear-tarjeta": { "id": "routes/crear-tarjeta", "parentId": "root", "path": "crear-tarjeta", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/crear-tarjeta-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/anti-fraude": { "id": "routes/anti-fraude", "parentId": "root", "path": "anti-fraude", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/anti-fraude-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/crear-cargo": { "id": "routes/crear-cargo", "parentId": "root", "path": "crear-cargo", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/crear-cargo-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/thank-you": { "id": "routes/thank-you", "parentId": "root", "path": "thank-you", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/thank-you-Bwa0ZSI2.js", "imports": ["/assets/jsx-runtime-Co9OO0Si.js"], "css": [] }, "routes/checkout": { "id": "routes/checkout", "parentId": "root", "path": "checkout", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/checkout-DKZsCbJR.js", "imports": ["/assets/jsx-runtime-Co9OO0Si.js", "/assets/components-xFE7tJyU.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-D6K40kum.js", "imports": ["/assets/jsx-runtime-Co9OO0Si.js"], "css": [] } }, "url": "/assets/manifest-8affd15e.js", "version": "8affd15e" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "unstable_singleFetch": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/crear-cliente": {
    id: "routes/crear-cliente",
    parentId: "root",
    path: "crear-cliente",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/crear-tarjeta": {
    id: "routes/crear-tarjeta",
    parentId: "root",
    path: "crear-tarjeta",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/anti-fraude": {
    id: "routes/anti-fraude",
    parentId: "root",
    path: "anti-fraude",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/crear-cargo": {
    id: "routes/crear-cargo",
    parentId: "root",
    path: "crear-cargo",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/thank-you": {
    id: "routes/thank-you",
    parentId: "root",
    path: "thank-you",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/checkout": {
    id: "routes/checkout",
    parentId: "root",
    path: "checkout",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route7
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
