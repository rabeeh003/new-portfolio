import Link from "next/link";
import Section from "../commen/ModelSection";
import { Button } from "../ui/button";

export default function Buyhomesuk() {
    return (
        <section className="w-full text-black">

            {/* Links */}
            <div className="flex md:items-center gap-2 mb-3">
                <a
                    href="https://buyhomesuk.com/"
                    target="_blank"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center transition"
                >
                    Website
                </a>
                <a
                    href="https://play.google.com/store/apps/details?id=com.buyhomesuk.com"
                    target="_blank"
                    className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-center transition"
                >
                    Android App
                </a>
                <a
                    href="https://apps.apple.com/in/app/buyhomesuk/id6752857557?platform=iphone"
                    target="_blank"
                    className="px-5 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-center transition"
                >
                    iOS App
                </a>
            </div>

            {/* Project Overview */}
            <div className="mb-8">
                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                    <span className="font-semibold">Project Overview:</span> BuyHomesUK is a real
                    estate website and mobile app project developed for the UAE market, primarily focused
                    on listing properties across the region. I was mainly responsible for the frontend
                    development of both the website and the mobile app, ensuring a smooth, user-friendly
                    interface and responsive design. On the backend, I contributed to several sections,
                    including implementing email sending functionality using SMTP, which streamlined
                    communication for property inquiries and notifications. This project played a key role
                    in showcasing UAE properties to potential buyers and investors through a modern and
                    efficient platform.
                </p>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <img
                    src="/images/projects/buyhomesuk/buyhomesuk1.png"
                    alt="Project Screenshot 1"
                    className="w-full h-64 object-contain rounded-lg shadow"
                />
                <img
                    src="/images/projects/buyhomesuk/buyhomesuk2.png"
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
                        <li>Multi-user (4) role management</li>
                        <li>Multi-platform support</li>
                        <li>Google Map Integration</li>
                        <li>360° Google Street View</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Skills / Technologies:
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>Next JS</li>
                        <li>React Native</li>
                        <li>Laravel</li>
                        <li>Expo</li>
                        <li>SMTP</li>
                        <li>Tailwind CSS</li>
                        <li>Redux</li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col bg-red-500/10 p-3 rounded-lg md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-4">
                    <img
                        src="https://www.infineur.com/media/2020/01/infineur-logo1.png"
                        alt="Infineur Digital Creations Logo"
                        className="w-15 h-15 bg-white p-1 object-contain rounded-lg shadow"
                    />
                    <div>
                        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                            INFINEUR DIGITAL CREATIONS Pvt Ltd.
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                            Role: Fullstack Developer
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};