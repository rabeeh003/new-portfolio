import Link from "next/link";
import Section from "../commen/ModelSection";
import { Button } from "../ui/button";

export default function Fctc() {
    return (
        <section className="w-full text-black">

            {/* Links */}
            <div className="flex md:items-center gap-2 mb-3">
                <a
                    href="https://fctctoken.in/"
                    target="_blank"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center transition"
                >
                    Website
                </a>
            </div>

            {/* Project Overview */}
            <div className="mb-8">
                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                    <span className="font-semibold">Project Overview:</span> Future Crypto Torrent Coin (FCTC) is a UK-based cryptocurrency platform. I worked on the frontend, specifically redesigning the static details page. I transformed the Laravel HTML section into a cleaner, more modern, and visually appealing design.
                </p>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <img
                    src="/images/projects/fctc/fctc1.png"
                    alt="Project Screenshot 1"
                    className="w-full h-64 object-contain rounded-lg shadow"
                />
                <img
                    src="/images/projects/fctc/fctc2.png"
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
                        <li>Responsive Design</li>
                        <li>Modern UI</li>
                        <li>Smooth Animation</li>
                        <li>Light/Dark Mode</li>
                        <li>Static Frontend</li>
                        <li>Admin section Frontend using Laravel html</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Skills / Technologies:
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>React Vite</li>
                        <li>Next UI</li>
                        <li>Laravel Html</li>
                        <li>Tailwind CSS</li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col bg-blue-500/10 p-3 rounded-lg md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-4">
                    <img
                        src="https://media.licdn.com/dms/image/v2/D560BAQHpry3xrhqe6g/company-logo_200_200/company-logo_200_200/0/1706512586395?e=1769644800&v=beta&t=4EP7JT29GLDqLzk-7AguTDhDGtMBOHU6qLHHqmBDvhM"
                        alt="Infineur Digital Creations Logo"
                        className="w-15 h-15 bg-white p-1 object-contain rounded-lg shadow"
                    />
                    <div>
                        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                            DEWDROPOLOGY TECH SOFT PVT LTD.
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                            Role: Frontend Developer
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};