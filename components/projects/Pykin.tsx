import Link from "next/link";
import Section from "../commen/ModelSection";
import { Button } from "../ui/button";

export default function Pykin() {
    return (
        <section className="w-full text-black">

            {/* Links */}
            <div className="flex md:items-center gap-2 mb-3">
                <a
                    href="https://play.google.com/store/apps/details?id=com.pykin.infineur&hl=en"
                    target="_blank"
                    className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-center transition"
                >
                    Android App
                </a>
                <a
                    href="https://apps.apple.com/ae/app/pykin/id1517701934"
                    target="_blank"
                    className="px-5 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-center transition"
                >
                    iOS App
                </a>
            </div>

            {/* Project Overview */}
            <div className="mb-8">
                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                    <span className="font-semibold">Project Overview:</span> Pykin is a food delivery app. I worked on the new Pykin Food Delivery app, developed using React Native for both iOS and Android. Pykin is an established food delivery business based in Kasargod, with over 50,000 downloads of their previous app on the Play Store.
                </p>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <img
                    src="/images/projects/pykin/pykin1.png"
                    alt="Project Screenshot 1"
                    className="w-full h-64 object-contain rounded-lg shadow"
                />
                <img
                    src="/images/projects/pykin/pykin2.png"
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
                        <li>Easybuz payment integration</li>
                        <li>live project</li>
                        <li>onesignel notification</li>
                        <li>map integration for locate delivery guy</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Skills / Technologies:
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>react native</li>
                        <li>expo</li>
                        <li>firebase</li>
                        <li>onesignal</li>
                        <li>google map</li>
                        <li>easybuz</li>
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
}
