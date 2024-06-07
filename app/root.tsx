/* eslint-disable prefer-const */
//! Core Imports
import { json, type LinksFunction, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
import React, { createContext, useEffect, useState } from "react";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	isRouteErrorResponse,
	useRouteError,
} from "@remix-run/react";

//! TailwindCSS
import stylesheet from "./tailwind.css?url";

//! Toastify
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

export const meta: MetaFunction = () => {
	return [
		{ title: "T1pagos" },
		{ name: "description", content: "¡Bienvenido!" },
	];
};

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: stylesheet },
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
	{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap' },
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="es-MX">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

// export async function loader({ request }: LoaderFunctionArgs) {
// 	return null;
// }

export default function App() {
	return (
		<>
			<Outlet />
		</>
	);
}


export function ErrorBoundary() {
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
	return (
		<>
			<section className="max-w-full h-screen">
				<div className="max-w-full md:max-w-7xl px-4 sm:px-8 lg:px-12 mx-auto h-full">
					<div className="grid grid-cols-12 gap-4 h-full">
						<div className="col-span-12">
							<div className="flex flex-col items-center justify-center align-middle h-full">
								<h2 className="font-sans text-4xl font-bold text-red-500 leading-loose">{heading}</h2>
								<p className="font-sans text-base font-normal text-slate-900">{message}</p>
								{errorMessage && (
									<div className="border border-red-500 p-5 my-5">
										<p><b>Mensaje del Error</b>: {errorMessage}</p>
									</div>
								)}
								<a href="/">
									Volver al Inicio
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}