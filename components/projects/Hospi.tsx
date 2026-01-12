export default function Hospi() {
    return (
        <section className="w-full text-black">

            {/* Links */}
            <div className="flex md:items-center gap-2 mb-3">
                <a
                    href="https://github.com/rabeeh003/Hospi"
                    target="_blank"
                    className="px-5 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-center transition"
                >
                    GitHub
                </a>
            </div>

            {/* Project Overview */}
            <div className="mb-8">
                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                    <span className="font-semibold">Project Overview:</span> Hospi is a small clinic doctor booking website developed with Django and Bootstrap. This project allows patients to book a slot with a doctor using their phone number, helping to save time. The clinic can easily manage tokens and patients. The website also provides additional features for managing the site, such as listing doctors and departments with the help of an admin panel.
                </p>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <img
                    src="/images/projects/hospi/hospi1.png"
                    alt="Project Screenshot 1"
                    className="w-full h-64 object-contain rounded-lg shadow"
                />
                <img
                    src="/images/projects/hospi/hospi.png"
                    alt="Project Screenshot 2"
                    className="w-full h-64 object-cover rounded-lg shadow"
                />
            </div>

            {/* Features & Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Key Features:
                    </h4>
                    <ul className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>Book appointments with doctors using phone numbers</li>
                        <li>Manage appointments, tokens, and patients efficiently</li>
                        <li>List doctors and departments on the website</li>
                        <li>Admin panel for managing website content and direct token booking</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Skills / Technologies:
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>Django</li>
                        <li>Bootstrap</li>
                        <li>Django-admin</li>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col bg-gray-500/10 p-3 rounded-lg md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-4">
                    <img
                        src="https://media.licdn.com/dms/image/v2/C4D0BAQEWqmtyVtZl7Q/company-logo_200_200/company-logo_200_200/0/1653839709668/brototype_logo?e=1769644800&v=beta&t=K9iV9VWuw1DLuSA4EshMVS14MW35XFYJy_dbpATdBKU"
                        alt="Brototype Logo"
                        className="w-15 h-15 bg-white p-1 object-contain rounded-lg shadow"
                    />
                    <div>
                        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                            BROTOTYPE.
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                            Fullstack Developer
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};