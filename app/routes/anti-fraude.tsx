/* eslint-disable prefer-const */
import { json } from "@remix-run/node";
import { CrearTarjeta } from "./crear-tarjeta";

export async function AntiFraude(values: NonNullable<object>): Promise<Response> {
    //! API Endpoint (DEV)
    const antiFraude_API = "https://api.sandbox.claropagos.com/v1/antifraude";

    //! TOKEN
    const antiFraude_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNjhmY2Y1NGU5NDc0M2YwOTA5ZWU2ZDk3NGM5NjkxM2M2YzZhYzNkZThhNjViYzQ0NTcyODRiMzBkMmQyOTBmYWNiNGY3YTQ3OGYwMTQ2YzYiLCJpYXQiOjE3MTYwNjE3NjguMjMzNTI3LCJuYmYiOjE3MTYwNjE3NjguMjMzNTMyLCJleHAiOjE3NzkxMzM3NjguMjI2NDg3LCJzdWIiOiIxMjMiLCJzY29wZXMiOlsiY2xpZW50ZS1hbnRpZnJhdWRlIl19.XXl8SjEOA4oeyzbOpl6PJTThqR00VmDbexuLzVb9q5kov4iMsrZy882Qvkn8bIQNOpHulEIohxGnANBd0IXWaTd_pYBanX2ZmG3D-5N9ZG6vujUwwm1VyNfTxbKdQpXV3DzwtSSwDMhTGgdAYNzFbYEH2t1kgkvTwy9hTCQ5Xiq_c_Zc4HUlJ-6gkU6o0sxdORXE6E_NYzS-PpTexN-5-cbEiu4FmPzM9CXhvlpueRwDlBRYnHMWWe_FLfNSUijwuGLKxAHoYX90utmBMd-Sc8P6Aem2BUn8HtmMFTZRfZ0p44XDFnsDdRq699gT0i-hIq7m6PJVg1MxuFVXsIsdLGr626S7Fcm3NPqiws_h18_QiDu-1bShpmRmV27nJ3HA4i609psHoP4H49CcqnVF-fIPrYx77cMjznLVFZVY7lLemJfNZtWw23BUQVcmSPXUaTjSoM4LD5HdAM2qI3SXEwuaWS5h9xlzF9qchMSdqs8NqfxdZ8tn7eKiaF8lvoXOcXEYR1PUIoGuFJ4aelq_k0qZq5WqjKtRDGGASiJQmoZyD9jUDmQnn1vGn783pZTQQ5tr1wWQX5YpAFyK5v7eZoRLK1xoVhGn9ZnuxoGEi9zG02-d6_26lc3klfvIK0VB69EdErA27Ofqe7f0bWRpigsgtfu5-22eHO4vj98WSHc";

    const REQ = await fetch(antiFraude_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${antiFraude_TOKEN}`
        },
        body: JSON.stringify({ ...values }),
    });

    const RES = await REQ.json();

    if (RES.status === "success") {
        return CrearTarjeta(json(RES));
    } else {
        console.log(RES.data.errors);
    }

    return json(RES);
}