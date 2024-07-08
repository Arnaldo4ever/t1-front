/* eslint-disable prefer-const */
//! Core Imports
import { type LinksFunction, type MetaFunction } from '@remix-run/node';
import React from "react";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useRouteError,
} from "@remix-run/react";

//! TailwindCSS
import stylesheet from "./tailwind.css?url";
import custom from "./styles/custom.css?url";

//! Toastify
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
	{ rel: 'stylesheet', href: custom },
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
				message = "¡Ups! Parece que has intentado acceder a una página a la cual no tienes suficientes privilegios.";
				break;
			case 404:
				heading = "404 No Encontrado";
				message = "¡Ups! Parece que has intentado acceder a una página la cual no existe.";
				break;
		}
	}

	const errorMessage = error instanceof Error ? error.message : null;

	return (
		<>
			<section className="max-w-full h-screen bg-gray-200">
				<div className="max-w-full md:max-w-7xl px-4 sm:px-8 lg:px-12 mx-auto h-full">
					<div className="grid grid-cols-12 gap-4 h-full">
						<div className="col-span-12">
							<div className="flex flex-col items-center justify-center align-middle h-full">
								<h2 className="font-sans text-4xl font-bold text-red-600 leading-loose">{heading}</h2>
								<p className="font-sans text-base font-normal text-[#2E2E2E]">{message}</p>
								{errorMessage && (
									<div className="bg-red-50 border-2 border-red-600 text-[#2E2E2E] rounded red-700 p-5 my-5">
										<p><b>Error</b>: {errorMessage}</p>
									</div>
								)}
								<a href="/" className="font-sans rounded-md bg-red-600 hover:bg-red-700 text-white py-2 px-5 transition-all mt-5">
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