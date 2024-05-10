import type { MetaFunction, LinksFunction } from "@remix-run/node";
import stylesheet from "../tailwind.css?url";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: stylesheet },
];

export const meta: MetaFunction = () => {
	return [
		{ title: "T1pagos" },
		{ name: "description", content: "¡Bienvenido!" },
	];
};

export default function Index() {
	return (
		<>
			<main className="max-w-full bg-slate-900 h-72">
				<div className="max-w-full md:max-w-7xl px-4 md:px-8 lg:px-12 mx-auto h-full">
					<div className="grid grid-cols-12 gap-4 h-full">
						<div className="col-span-12">
							<div className="flex items-center justify-center h-full">
								<h1 className="text-7xl text-red-500 text-center">T1pagos</h1>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
