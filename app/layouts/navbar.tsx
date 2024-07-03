export default function Navbar() {
    return (
        <>
            <nav className="max-w-full bg-[#2E2E2E] py-3 md:py-4">
                <div className="max-w-full md:max-w-7xl px-4 sm:px-8 lg:px-12 mx-auto">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12">
                            <div className="flex items-center justify-center align-middle">
                                <img src="/t1pagos.png" alt="" className="max-w-full h-12 object-center object-cover" draggable="false" />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}