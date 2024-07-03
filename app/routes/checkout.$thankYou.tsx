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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (toast) {
            // notify on a toast message
            notify(toast.message, { type: toast.type });
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 3000)
    }, [toast]);

    return (
        <>
            {loading ? <PuffLoader color={'#D0021B'} loading={loading} className="m-auto flex items-center justify-center align-middle" /> :
                <div>
                    <Navbar />
                    <section className="max-w-full bg-gray-200 h-screen">
                        <div className="max-w-full md:max-w-7xl px-4 sm:px-8 lg:px-12 mx-auto h-full">
                            <div className="grid grid-cols-12 gap-4 h-full">
                                <div className="col-span-12">
                                    <div className="flex flex-col items-center justify-center align-middle h-full">
                                        <div className="max-w-full md:max-w-4xl flex flex-col items-center justify-center bg-green-50 rounded-md shadow-xl py-10 px-5 md:px-10 text-center">
                                            {/* <h1 className="font-sans text-3xl font-bold text-slate-900">T1Pagos</h1> */}
                                            <h2 className="font-sans text-2xl md:text-5xl font-normal md:font-light uppercase text-green-500 md:leading-loose">¡Gracias por su compra!</h2>
                                            {/* <p className="font-sans text-lg font-medium text-slate-900 leading-normal">Su pedido ha sido aprobado exitosamente.</p> */}
                                            <p className="font-sans text-base font-normal text-gray-700 mt-5 md:mt-0 md:leading-normal">Muchas gracias por confiar en nosotros estimad@ Andres Gutierrez, Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, quo..</p>
                                            <Link to="/" prefetch="render" relative="route" className="font-sans text-base mt-7 md:mt-10 text-white bg-slate-900 hover:bg-slate-700 py-3.5 md:py-3 px-5 rounded-md transition-all">Volver a Comprar</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            }
            < ToastContainer
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