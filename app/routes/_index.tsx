export default function Index() {
	return (
		<>
			<header className="max-w-full bg-slate-900 h-72">
				<div className="max-w-full md:max-w-7xl px-4 md:px-8 lg:px-12 mx-auto h-full">
					<div className="grid grid-cols-12 gap-4 h-full">
						<div className="col-span-12">
							<div className="flex flex-col items-center justify-center h-full space-y-10">
								<h1 className="text-7xl text-red-500 text-center">T1pagos</h1>
								<a href="/checkout" className="font-sans font-normal text-xl text-gray-100 hover:text-red-500 text-center transition-all">Checkout</a>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
