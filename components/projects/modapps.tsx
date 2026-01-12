import Link from "next/link";
import Section from "../commen/ModelSection";
import { Button } from "../ui/button";

export default function Modapps() {
    return (
        <section className="w-full text-black">

            {/* Links */}
            <div className="flex md:items-center gap-2 mb-3">
                <a
                    href="https://Modapps.in/"
                    target="_blank"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center transition"
                >
                    Website
                </a>
            </div>

            {/* Project Overview */}
            <div className="mb-8">
                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                    <span className="font-semibold">Project Overview:</span> This is a freelance project. It's a website for posting blogs and apps, with integrated Google Analytics for traffic analysis and Google Ads. This project is for a tech YouTuber and enhances user experience with NextUI and Framer Motion.
                </p>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <img
                    src="/images/projects/modapps/modapps1.png"
                    alt="Project Screenshot 1"
                    className="w-full h-64 object-contain rounded-lg shadow"
                />
                <img
                    src="/images/projects/modapps/modapps2.png"
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
                        <li>Admin management of apps and blogs</li>
                        <li>Google Analytics and ads integration</li>
                        <li>NextUI and Framer Motion for enhanced user experience</li>
                        <li>Hosted on AWS</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Skills / Technologies:
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>React Vite</li>
                        <li>Django</li>
                        <li>NextUI</li>
                        <li>Framer Motion</li>
                        <li>PostgreSQL</li>
                        <li>AWS</li>
                        <li>Redux</li>
                        <li>RestApi</li>
                        <li>JWT</li>
                        <li>Google Analytics</li>
                        <li>Google Ads</li>
                        <li>AWS</li>
                        <li>Gunicorn</li>
                        <li>Python</li>
                        <li>Git</li>
                        <li>Tailwind CSS</li>
                        <li>Jodit Editor</li>
                        <li>Axios</li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col bg-emerald-500/10 p-3 rounded-lg md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-4">
                    <img
                        src="https://cdn.dribbble.com/userupload/22808646/file/original-cd940b45bbed325d172547e4181e59b2.jpg"
                        alt="Infineur Digital Creations Logo"
                        className="w-15 h-15 bg-white p-1 object-contain rounded-lg shadow"
                    />
                    <div>
                        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                            FREELANCE PROJECT.
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