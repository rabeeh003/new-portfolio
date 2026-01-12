import Link from "next/link";
import Section from "../commen/ModelSection";
import { Button } from "../ui/button";

export default function Hotler() {
    return (
        <section className="w-full text-black">

            {/* Links */}
            <div className="flex md:items-center gap-2 mb-3">
                <a
                    href="https://hotler.vercel.app/"
                    target="_blank"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center transition"
                >
                    Website
                </a>
            </div>

            {/* Project Overview */}
            <div className="mb-8">
                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                    <span className="font-semibold">Project Overview:</span> This project started for learing frontend animations and transitions. i implimneted Gsap for animations. I'm collaborating for the backend with my friend. It aims to implement a QR ordering system for customers without requiring authentication, targeting cafes, messes, hotels, restaurants, and other businesses. The system will generate QR codes for customers to place orders, track order status, and ensure the food is delivered to the customer.
                </p>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <img
                    src="/images/projects/hotler/hotler1.png"
                    alt="Project Screenshot 1"
                    className="w-full h-64 object-contain rounded-lg shadow"
                />
                <img
                    src="/images/projects/hotler/hotler2.png"
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
                        <li>Modern frontend</li>
                        <li>left to right scroll on top to bottom scrolling</li>
                        <li>Modern animation library used</li>
                        <li>QR code menu</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Skills / Technologies:
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>Next JS</li>
                        <li>Gsap</li>
                        <li>Next UI ( Hero UI )</li>
                        <li>Tailwind CSS</li>
                        <li>Redux</li>
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
                            Frontend Developer
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};