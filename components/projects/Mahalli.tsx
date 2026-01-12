import Link from "next/link";
import Section from "../commen/ModelSection";
import { Button } from "../ui/button";

export default function Mahalli() {
    return (
        <>
            {/* Intro */}
            <div className="bg-[#F5F5F7] dark:bg-neutral-900 p-8 md:p-14 rounded-3xl mb-4">
                <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl max-w-4xl mx-auto leading-relaxed">
                    Brandso partnered with Chammal Mahallu to develop a cost-efficient and powerful community management software. The solution allows administrators to manage over 1000+ houses and members, track dues, and handle submissions like house registration and nikah forms while providing limited access to community members via a simple website.
                </p>
            </div>

            {/* Logo & Visual Identity */}
            <Section
                title="Logo & Visual Identity"
                description="We created a professional and modern logo for the Mahalli Management Software to represent the community’s identity. The logo is used across the Windows admin software and the web portal, ensuring consistent branding."
                image="/images/projects/mahalli/logo.png"
                imageClass="w-full max-w-md max-h-[250px] object-contain rounded-xl"
                reverse={false}
            />

            {/* Windows Admin Software */}
            <Section
                title="Admin Windows Software"
                description="A powerful Windows-based software was developed for administrators to manage members, houses, dues, and other important records. Only admins can modify data. This ensures security and control over sensitive community information."
                image="/images/projects/mahalli/mahalli.jpg"
                imageClass="w-full max-w-md max-h-[300px] object-cover rounded-xl"
                reverse={true}
            />

            {/* Web Portal for Members */}
            <Section
                title="Member Web Portal"
                description="We developed a lightweight website hosted on Vercel for members to view dues, submit forms (house registration, nikah forms, etc.), and access essential information. The website is optimized for minimal usage to keep costs low while ensuring availability."
                image="/images/projects/mahalli/website.png"
                imageClass="w-full max-w-md max-h-[300px] object-cover rounded-xl"
                reverse={false}
            />

            {/* Data Storage & Management */}
            <Section
                title="Firebase & Data Strategy"
                description="Member-submitted data is temporarily stored in Firebase and transferred to the main Windows database after verification. Only mandatory information remains in Firebase to minimize storage and security risks."
                // image="/images/projects/mahalli/data_management.png"
                // imageClass="w-full max-w-md max-h-[300px] object-cover rounded-xl"
                reverse={true}
            />

            {/* Social Media & Links */}
            <div className="bg-[#F5F5F7] dark:bg-neutral-900 mb-4 p-8 md:p-14 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-xl md:text-3xl font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
                        Links & Access
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-4xl leading-relaxed">
                        The software and web portal are designed for controlled usage. Admins have full access via the Windows software, while members interact with the web portal for essential tasks.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <Link href="https://mahalli.vercel.app" target="_blank">
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
                        Brandso delivered a secure, cost-efficient, and fully functional community management solution. Administrators can manage members and houses efficiently, while the members can access essential features online. The solution combines a Windows software, web portal, and effective data strategy for long-term community management.
                    </p>
                </div>
            </div>
        </>
    );
}
