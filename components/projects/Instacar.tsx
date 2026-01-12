import Link from "next/link";
import Section from "../commen/ModelSection";
import { Button } from "../ui/button";

export default function Instacar() {
    return (
        <section className="w-full text-black">

            {/* Links */}
            <div className="flex md:items-center gap-2 mb-3">
                <a
                    href="https://instacarwebauction-steel.vercel.app/"
                    target="_blank"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center transition"
                >
                    Website
                </a>
                <a
                    href="https://play.google.com/store/apps/details?id=com.instacarbuyers.com&hl=en_IN"
                    target="_blank"
                    className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-center transition"
                >
                    Android App
                </a>
                <a
                    href="https://apps.apple.com/sk/app/instacarbuyers-uae/id6752535997"
                    target="_blank"
                    className="px-5 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-center transition"
                >
                    iOS App
                </a>
            </div>

            {/* Project Overview */}
            <div className="mb-8">
                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                    <span className="font-semibold">Project Overview:</span> InstaCarBuyers is a UAE-based car bidding platform designed to simplify the process of selling cars through a transparent and competitive live bidding system. The platform allows users to list their vehicles and receive real-time bids from potential buyers, ensuring they get the best market value. It is available both as a responsive website and as fully functional native applications for iOS and Android. In this project, I primarily contributed to the frontend development of the website, creating an intuitive and user-friendly interface that enhances the overall user experience. Additionally, I worked on the mobile applications, ensuring consistent design, smooth navigation, and seamless integration with backend services. My contributions helped improve usability and engagement, making the car selling process faster, more efficient, and accessible across multiple platforms.
                </p>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <img
                    src="/images/projects/instacar/instacar1.png"
                    alt="Project Screenshot 1"
                    className="w-full h-64 object-contain rounded-lg shadow"
                />
                <img
                    src="/images/projects/instacar/instacar2.png"
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
                        <li>Real time bidding</li>
                        <li>Set Max bidding option</li>
                        <li>onesignel notification</li>
                        <li>Wishlist option</li>
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
                        <li>Next JS</li>
                        <li>tailwind</li>
                        <li>WhatsApp OTP</li>
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
}
