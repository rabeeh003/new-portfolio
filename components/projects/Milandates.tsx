import Link from "next/link";
import Section from "../commen/ModelSection";
import { Button } from "../ui/button";

export default function MilanDates() {
    return (
        <>
            {/* Intro */}
            <div className="bg-[#F5F5F7] dark:bg-neutral-900 p-8 md:p-14 rounded-3xl mb-4">
                <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl max-w-4xl mx-auto leading-relaxed">
                    Brandso partnered with Milan Dates to build a strong and consistent digital presence for their premium date and gift delivery platform. We focused on multi-language support, seamless online ordering, and a unified brand identity across packaging, website, and social channels.
                </p>
            </div>

            {/* Logo & Visual Identity */}
            <Section
                title="Logo & Visual Identity"
                description="We designed a distinctive, premium logo that reflects the elegance and quality of Milan Dates. A consistent visual language was applied across packaging, digital platforms, and marketing materials to ensure strong brand recognition."
                image="/images/projects/milandates/logo.png"
                imageClass="w-full max-w-md max-h-[250px] object-contain rounded-xl"
                reverse={false}
            />

            {/* Package & Gift Design */}
            <Section
                title="Package & Gift Design"
                description="We developed a cohesive package design system for dates and gift items. The design conveys luxury and quality while being practical for delivery across GCC and India."
                image="/images/projects/milandates/package.png"
                imageClass="w-full max-w-md max-h-[300px] object-cover rounded-xl"
                reverse={true}
            />

            {/* Website & PWA Development */}
            <Section
                title="Website & PWA App"
                description="A responsive, multi-language website was created with a full-featured cart system and WhatsApp order integration. The PWA installation system allows customers to order easily from mobile devices, enhancing reach and convenience."
                image="/images/projects/milandates/milandates.jpg"
                imageClass="w-full max-w-md max-h-[300px] object-cover rounded-xl"
                reverse={false}
            />

            {/* Social Media & Online Presence */}
            <div className="bg-[#F5F5F7] dark:bg-neutral-900 mb-4 p-8 md:p-14 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-xl md:text-3xl font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
                        Social Media Creation & Optimization
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-4xl leading-relaxed">
                        We set up and optimized social media profiles using consistent brand visuals. Profiles were structured for future marketing campaigns, ensuring long-term customer engagement.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl md:text-3xl font-semibold text-neutral-800 dark:text-neutral-100">
                        Links
                    </h3>
                    <Link href="https://milandates.com" target="_blank">
                        <Button variant="default" className="dark:bg-neutral-900 px-8 py-4 rounded-3xl w-full">
                            Website
                        </Button>
                    </Link>
                    {/* <Link href="https://www.instagram.com/milandates" target="_blank">
                        <Button variant="default" className="dark:bg-neutral-900 px-8 py-4 rounded-3xl w-full">
                            Instagram
                        </Button>
                    </Link> */}
                </div>
            </div>

            {/* Result & Impact */}
            <div className="bg-[#F5F5F7] dark:bg-neutral-900 p-8 md:p-14 rounded-3xl">
                <div>
                    <h3 className="text-xl md:text-3xl font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
                        Result & Impact
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-4xl leading-relaxed">
                        Brandso delivered a fully functional and visually appealing platform for Milan Dates, combining branding, digital ordering, and multi-language support. The result was increased online sales, streamlined ordering via WhatsApp, and a polished brand identity across all touchpoints.
                    </p>
                </div>
            </div>
        </>
    );
}
