export default function Metrix() {
    return (
        <section className="w-full text-black">

            {/* Links */}
            <div className="flex md:items-center gap-2 mb-3">
                <a
                    href="https://1024-game.vercel.app/"
                    target="_blank"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center transition"
                >
                    Website
                </a>
                <a
                    href="https://github.com/rabeeh003/1024/"
                    target="_blank"
                    className="px-5 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-center transition"
                >
                    GitHub
                </a>
            </div>

            {/* Project Overview */}
            <div className="mb-8">
                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                    <span className="font-semibold">Project Overview:</span> Developed the 1024 game with a custom algorithm for metrix calculation and alignment. Used NPM modules for swipe tracking and music playback.
                </p>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <img
                    src="/images/projects/metrix/metrix.png"
                    alt="Project Screenshot 1"
                    className="w-full h-64 object-contain rounded-lg shadow"
                />
                <img
                    src="/images/projects/metrix/1024.png"
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
                        <li>Custom algorithm for metrix calculation</li>
                        <li>NPM modules for swipe tracking</li>
                        <li>NPM modules for music playback</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Skills / Technologies:
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>React Vite</li>
                        <li>React-swipeable-views</li>
                        <li>Metrix</li>
                        <li>React-howler</li>
                        <li>React-player</li>
                        <li>Tailwind CSS</li>
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