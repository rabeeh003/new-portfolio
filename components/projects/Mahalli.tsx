import Link from "next/link";
import Section from "../commen/ModelSection";
import { Button } from "../ui/button";

export default function Mahalli() {
    return (
        <>
            {/* Intro */}
            <div className="bg-[#F5F5F7] dark:bg-neutral-900 p-8 md:p-14 rounded-3xl mb-4">
                <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl max-w-4xl mx-auto leading-relaxed">
                    I worked with Chammal Mahallu to design and develop a cost-efficient and powerful community management system.
                    The solution allows administrators to manage 1000+ houses and members, track dues, and handle submissions such as
                    house registrations and nikah forms, while providing limited and easy access for community members through a simple web portal.
                </p>
            </div>

            {/* Logo & Visual Identity */}
            <Section
                title="Logo & Visual Identity"
                description="I designed a clean and modern logo for the Mahalli Management Software to reflect the community’s identity. The logo is consistently used across the Windows admin software and the web portal to maintain a unified and professional visual presence."
                image="/images/projects/mahalli/logo.png"
                imageClass="w-full max-w-md max-h-[250px] object-contain rounded-xl"
                reverse={false}
            />

            {/* Windows Admin Software */}
            <Section
                title="Admin Windows Software"
                description="I developed a powerful Windows-based admin software that allows administrators to manage members, houses, dues, and other critical records. Only admins have permission to modify data, ensuring strong security and full control over sensitive community information."
                image="/images/projects/mahalli/mahalli.jpg"
                imageClass="w-full max-w-md max-h-[300px] object-cover rounded-xl"
                reverse={true}
            />

            {/* Web Portal for Members */}
            <Section
                title="Member Web Portal"
                description="I built a lightweight and cost-effective web portal hosted on Vercel. Community members can view dues, submit forms (house registration, nikah forms, etc.), and access essential information. The website is optimized for minimal resource usage while remaining reliable and accessible."
                image="/images/projects/mahalli/website.png"
                imageClass="w-full max-w-md max-h-[300px] object-cover rounded-xl"
                reverse={false}
            />

            {/* Data Storage & Management */}
            <Section
                title="Firebase & Data Strategy"
                description="I designed the data flow so that member-submitted information is temporarily stored in Firebase and transferred to the main Windows database after admin verification. Only mandatory data is retained in Firebase, reducing storage costs and improving security."
                reverse={true}
            />

            {/* Social Media & Links */}
            <div className="bg-[#F5F5F7] dark:bg-neutral-900 mb-4 p-8 md:p-14 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-xl md:text-3xl font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
                        Links & Access
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-4xl leading-relaxed">
                        I designed the system with controlled access in mind. Administrators use the Windows software for full management,
                        while members interact with the web portal only for essential actions and submissions.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <Link href="https://mahal-app-six.vercel.app/" target="_blank">
                        <Button variant="default" className="dark:bg-neutral-900 px-8 py-4 rounded-3xl w-full">
                            Web Portal
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Result & Impact */}
            <div className="bg-[#F5F5F7] dark:bg-neutral-900 p-8 md:p-14 rounded-3xl">
                <div>
                    <h3 className="text-xl md:text-3xl font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
                        Result & Impact
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-4xl leading-relaxed">
                        This project resulted in a secure, scalable, and cost-efficient community management solution.
                        Administrators can efficiently manage members and houses, while community members benefit from
                        easy online access to essential services. The combination of Windows software, a web portal,
                        and a well-planned data strategy ensures long-term reliability and maintainability.
                    </p>
                </div>
            </div>
            <div className="flex flex-col mt-4 bg-emerald-500/10 p-3 rounded-lg md:flex-row md:items-center md:justify-between">
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
                            Role: Fullstack & Windows App Developer
                        </p>
                    </div>
                </div>
            </div>
        </>

    );
}
