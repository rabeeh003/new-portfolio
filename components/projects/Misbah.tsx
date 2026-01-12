export default function Misbah() {
    return (
        <section className="w-full text-black">

            {/* Links */}
            <div className="flex md:items-center gap-2 mb-3">
                <a
                    href="https://rabeeh003.github.io/almisbah.com/"
                    target="_blank"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center transition"
                >
                    Website
                </a>
                <a
                    href="https://rabeeh003.github.io/almisbah.com/App/almisbah.apk"
                    target="_blank"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-center transition"
                >
                    Android
                </a>

            </div>

            {/* Project Overview */}
            <div className="mb-8">
                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                    <span className="font-semibold">Project Overview:</span> My friends and I published a book of prayers, and I suggested we create a mobile app for it. They laughed at the idea, but their skepticism only pushed me to learn how to do it myself. I found a no-code app builder called Sketchware, and I used it to build a simple version of the app. Over time, I refined it into a polished product. This project was my first step into the world of development. this app developed from smart phone.
                </p>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <img
                    src="/images/projects/misbah/misbah.png"
                    alt="Project Screenshot 1"
                    className="w-full h-64 object-contain rounded-lg shadow"
                />
                <img
                    src="/images/projects/misbah/misbah1.png"
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
                        <li>Include google qibla finder</li>
                        <li>App share option</li>
                        <li>Include some Quran surahs</li>
                        <li>Include fundamental duas, dhikr, counter, adan times and others</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Skills / Technologies:
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>Sketchware</li>
                        <li>Picsart</li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col bg-gray-500/10 p-3 rounded-lg md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-4">
                    <div>
                        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                            HOBBY PROJECT
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                            Frontend Developer
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};