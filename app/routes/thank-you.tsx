/* eslint-disable prefer-const */
import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node"
import { useLoaderData, Link } from "@remix-run/react"
import { useEffect, useState } from "react";

//! Toastify
import { Bounce, ToastContainer, toast as notify } from "react-toastify";
import { getToast } from "remix-toast";
import PuffLoader from "react-spinners/PuffLoader";
import Navbar from "../layouts/navbar";
// import { CrearCargo } from "./crear-cargo";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const { toast, headers } = await getToast(request);

    // const producto = await getCargo(params.checkoutId);

    // return json({producto});

    return json({ toast }, { headers });
};

export const meta: MetaFunction = () => {
    return [
        { title: "Thank You" },
        { name: "description", content: "Description..." },
    ]
}

export default function ThankYou() {
    const { toast } = useLoaderData<typeof loader>();

    let gracias = "¡Gracias por su compra!";
    let mensaje = "Muchas gracias por confiar en nosotros estimad@ Andres Gutierrez, Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, quo..";
    let comprar = "Volver a Comprar";

    useEffect(() => {
        if (toast) {
            notify(toast.message, { type: toast.type });
        }
    }, [toast]);

    return (
        <>

            <section className="max-w-full bg-gray-200 h-screen">
                <Navbar />
                <div className="max-w-full md:max-w-7xl px-4 sm:px-8 lg:px-12 mx-auto h-full">
                    <div className="grid grid-cols-12 gap-4 h-full">
                        <div className="col-span-12">
                            <div className="flex flex-col items-center justify-center align-middle h-full">
                                <div className="max-w-full md:max-w-4xl flex flex-col items-center justify-center bg-green-50 rounded-md shadow-xl py-10 px-5 md:px-10 text-center">
                                    <h2 className="font-sans text-2xl md:text-5xl font-normal md:font-light uppercase text-green-500 md:leading-loose">{gracias}</h2>
                                    <p className="font-sans text-base font-normal text-[#2E2E2E] mt-5 md:mt-0 md:leading-normal">{mensaje}</p>
                                    <Link to="/" prefetch="render" relative="route" className="font-sans text-base mt-7 md:mt-10 text-white bg-[#2E2E2E] hover:bg-[#202020] py-3.5 md:py-3 px-5 rounded-md transition-all">{comprar}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ToastContainer
                position="bottom-right"
                autoClose={false}
                hideProgressBar={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </>
    )
}