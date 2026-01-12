import Link from "next/link";
import Section from "../commen/ModelSection";
import { Button } from "../ui/button";

export default function Kaduk() {
    return (
        <>
            {/* Intro */}
            <div className="bg-[#F5F5F7] dark:bg-neutral-900 p-8 md:p-14 rounded-3xl mb-4">
                <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl max-w-4xl mx-auto leading-relaxed">
                    Brandso partnered with Kaduk Family Restaurant to build a strong and
                    consistent digital presence. Our scope focused entirely on online and
                    digital branding — delivering a unified identity across logo, menu,
                    website, search visibility, and social platforms.
                </p>
            </div>

            {/* Logo & Visual Identity */}
            <Section
                title="Logo & Visual Identity"
                description="We designed a distinctive, memorable logo that reflects the brand’s personality and cuisine. A consistent visual language was established to ensure clarity and recognition across all digital platforms and printed materials."
                image="/images/posters/15.png"
                imageClass="w-full max-w-md max-h-[250px] object-contain rounded-xl"
                reverse={false}
            />

            {/* Menu Design */}
            <Section
                title="Menu Design"
                description="A clean, structured digital menu layout was created for maximum readability. The design was optimized for use across the website, Google Business profile, and social media platforms."
                image="/images/projects/kaduk/menu.png"
                imageClass="w-full max-w-md max-h-[300px] object-cover rounded-xl"
                reverse={true}
            />

            {/* Website Development */}
            <Section
                title="Website Development"
                description="We developed a responsive, mobile-first website that highlights the restaurant’s menu, brand story, and contact details. The layout was optimized for performance, usability, and basic SEO best practices."
                image="/images/projects/kaduk/website.png"
                imageClass="w-full max-w-md max-h-[300px] object-cover rounded-xl"
                reverse={false}
            />

            {/* SEO & Google Business */}
            <Section
                title="SEO & Google Business Profile"
                description="Google Business Profile was created and fully optimized with accurate business details, visuals, and service information. SEO-friendly structure improved visibility across Google Search and Maps."
                image="/images/projects/kaduk/gbusiness.png"
                imageClass="w-full max-w-md max-h-[300px] object-cover rounded-xl"
                reverse={true}
            />

            {/* Social Media */}
            <div className="bg-[#F5F5F7] dark:bg-neutral-900 mb-4 p-8 md:p-14 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-xl md:text-3xl font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
                        Social Media Creation & Optimization
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-4xl leading-relaxed">
                        We set up and optimized social media profiles using consistent brand visuals. Each profile was structured to support future content marketing and long-term growth.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl md:text-3xl font-semibold text-neutral-800 dark:text-neutral-100 ">
                        Links
                    </h3>
                    <Link href="https://kadukrestaurant.in" target="_blank">
                        <Button variant="default" className="dark:bg-neutral-900 px-8 py-4 rounded-3xl w-full">
                            Website
                        </Button>
                    </Link>
                    <Link href="https://www.google.com/search?q=kaduk+restaurant+mukkam" target="_blank">
                        <Button variant="default" className="dark:bg-neutral-900 px-8 py-4 rounded-3xl w-full">
                            Google Business
                        </Button>
                    </Link>
                    <Link href="https://www.instagram.com/kaduk.restaurant.mukkam/" target="_blank">
                        <Button variant="default" className="dark:bg-neutral-900 px-8 py-4 rounded-3xl w-full">
                            Instagram
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Result */}
            <div className="bg-[#F5F5F7] dark:bg-neutral-900 p-8 md:p-14 rounded-3xl">
                <div>
                    <h3 className="text-xl md:text-3xl font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
                        Result & Impact
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-4xl leading-relaxed">
                        Through a focused digital approach, Brandso delivered a polished and
                        professional online identity. The project resulted in improved local
                        discoverability, consistent branding across platforms, and a strong
                        digital foundation for future marketing initiatives.
                    </p>
                </div>
            </div>
        </>
    );
};