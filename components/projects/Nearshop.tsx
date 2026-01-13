import Link from "next/link";
import Section from "../commen/ModelSection";
import { Button } from "../ui/button";

export default function Nearshop() {
    return (
        <section className="w-full text-black">

            {/* Links */}
            {/* <div className="flex md:items-center gap-2 mb-3">
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
            </div> */}

            {/* Project Overview */}
            <div className="mb-8">
                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                    <span className="font-semibold">Project Overview:</span>Nearshop is a Multi-vendor eCommerce app connecting shops and customers with inventory management, billing, and payment management. A platform for retail shops to connect with customers, featuring billing management and multi-shop ownership. Integrated Google Maps for location-based services. shop can manage inventory, orders and billing, customers can order products, and owners can manage shops. shops and owncer can analize the their sales and customers' orders.
                </p>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <img
                    src="/images/projects/nearshop/nearshop1.png"
                    alt="Project Screenshot 1"
                    className="w-full h-64 object-contain rounded-lg shadow"
                />
                <img
                    src="/images/projects/nearshop/nearshop2.png"
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
                        <li>3 types of users (customers, shoppers, owners).</li>
                        <li>4 types of authentication methods.</li>
                        <li>Google Maps integration.</li>
                        <li>Billing and payment management.</li>
                        <li>Global product concept to reduce duplicate entries.</li>
                        <li>Progressive Web App (PWA)</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Skills / Technologies:
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>React</li>
                        <li>Django</li>
                        <li>PostgreSQL</li>
                        <li>RestAPI</li>
                        <li>JWT</li>
                        <li>Google Maps</li>
                        <li>Firebase</li>
                        <li>AWS</li>
                        <li>Gunicorn</li>
                        <li>Git</li>
                        <li>Bootstrap</li>
                        <li>Phone OTP Auth</li>
                        <li>Razorpay</li>
                        <li>Figma</li>
                        <li>Progressive Web App (PWA)</li>
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <img
                    src="/images/projects/nearshop/nearshop3.jpeg"
                    alt="Project Screenshot 1"
                    className="w-full h-64 object-contain rounded-lg shadow"
                />
                 <img
                    src="/images/projects/nearshop/nearshop11.jpeg"
                    alt="Project Screenshot 2"
                    className="w-full h-64 object-cover rounded-lg shadow"
                />
                <img
                    src="/images/projects/nearshop/nearshop10.jpeg"
                    alt="Project Screenshot 2"
                    className="w-full h-64 object-cover rounded-lg shadow"
                />
                <img
                    src="/images/projects/nearshop/nearshop4.jpeg"
                    alt="Project Screenshot 2"
                    className="w-full h-64 object-cover rounded-lg shadow"
                />
                <img
                    src="/images/projects/nearshop/nearshop9.jpeg"
                    alt="Project Screenshot 2"
                    className="w-full h-64 object-cover rounded-lg shadow"
                />
                <img
                    src="/images/projects/nearshop/nearshop5.jpeg"
                    alt="Project Screenshot 2"
                    className="w-full h-64 object-cover rounded-lg shadow"
                />
                <img
                    src="/images/projects/nearshop/nearshop5.jpeg"
                    alt="Project Screenshot 2"
                    className="w-full h-64 object-cover rounded-lg shadow"
                />
                <img
                    src="/images/projects/nearshop/nearshop6.jpeg"
                    alt="Project Screenshot 2"
                    className="w-full h-64 object-cover rounded-lg shadow"
                />
                <img
                    src="/images/projects/nearshop/nearshop7.jpeg"
                    alt="Project Screenshot 2"
                    className="w-full h-64 object-cover rounded-lg shadow"
                />
                
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
