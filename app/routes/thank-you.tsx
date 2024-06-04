import { LoaderFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { request } from "node_modules/axios/index.cjs"

// export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
//     console.log(request);
// }

export const meta: MetaFunction = () => {
    return [
        { title: "Thank You" },
        { name: "description", content: "Description..." },
    ]
}

export default function ThankYou() {
    return (
        <>
            <section className="max-w-full h-screen">
                <div className="max-w-full md:max-w-7xl px-4 sm:px-8 lg:px-12 mx-auto h-full">
                    <div className="grid grid-cols-12 gap-4 h-full">
                        <div className="col-span-12">
                            <div className="flex flex-col items-center justify-center align-middle h-full">
                                <div className="max-w-full md:max-w-4xl md:min-h-96 flex flex-col items-center justify-center bg-green-50 rounded-md shadow-xl py-10 px-5 md:py-10 md:px-10 text-center">
                                    <h1 className="font-sans text-2xl font-bold text-slate-900">T1Pagos</h1>
                                    <h2 className="font-sans text-2xl md:text-5xl font-normal md:font-light uppercase text-green-500 mt-5 md:mt-0 md:leading-loose">¡Gracias por su compra!</h2>
                                    {/* <p className="font-sans text-lg font-medium text-slate-900 leading-normal">Su pedido ha sido aprobado exitosamente.</p> */}
                                    <p className="font-sans text-base font-normal text-gray-700 mt-5 md:mt-0 md:leading-normal">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, voluptate. Fugit facilis exercitationem, voluptates aut beatae dolor placeat numquam accusantium. Natus voluptate unde rerum explicabo.</p>
                                    <a href="/" className="font-sans text-base mt-7 md:mt-10 text-white bg-slate-900 hover:bg-slate-700 py-3.5 md:py-3 px-5 rounded transition-all">Volver a Comprar</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}