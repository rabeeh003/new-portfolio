"use client";
import { useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, Rocket, Palette, Monitor, Share2, LucideIcon, Crown, PenTool, LayoutGrid } from "lucide-react";
import servicesData from "@/utils/services.json";
import Footer from "@/components/home/Footer";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
    "monthly-posters": Palette,
    "business-launch": Rocket,
    "web-app": Monitor,
    "graphics-design": PenTool,
    "ads-marketing": Share2,
};

const cardGradients = [
    "from-teal-900 via-teal-800 to-emerald-900",
    "from-blue-900 via-blue-800 to-indigo-900",
    "from-purple-900 via-violet-800 to-indigo-900",
    "from-cyan-900 via-blue-800 to-blue-900",
];

const borderGradients = [
    "border-emerald-500/30 hover:border-emerald-500/60",
    "border-blue-500/30 hover:border-blue-500/60",
    "border-purple-500/30 hover:border-purple-500/60",
    "border-cyan-500/30 hover:border-cyan-500/60",
];

export default function Services() {
    const categories = servicesData.categories;
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-[100]"
                style={{ scaleX }}
            />

            <section className="py-20 px-4 lg:px-10 relative overflow-hidden bg-black/5 min-h-screen">
                {/* Background decoration */}
                <div className="absolute top-40 right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-emerald-400 text-sm font-semibold mb-3 tracking-wider uppercase"
                        >
                            Our Comprehensive Services
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl lg:text-5xl font-bold mb-4"
                        >
                            Everything You Need By
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600">
                                Category
                            </span>
                        </motion.h2>
                    </div>

                    {/* Quick Navigation Sticky Bar */}
                    <div className="sticky top-4 z-50 flex flex-wrap justify-center gap-2 mb-20 bg-black/40 backdrop-blur-md p-3 rounded-full border border-white/10 w-fit mx-auto shadow-xl">
                        {categories.map((cat) => {
                            const Icon = iconMap[cat.id] || LayoutGrid;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => scrollToSection(cat.id)}
                                    className="px-4 py-2 rounded-full flex items-center gap-2 text-xs md:text-sm font-semibold transition-all duration-300 bg-white/5 border border-white/10 text-gray-300 hover:bg-emerald-500 hover:text-white hover:border-emerald-400"
                                >
                                    <Icon className="w-3 h-3 md:w-4 md:h-4" />
                                    <span className="hidden md:inline">{cat.name}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Render All Categories Vertically */}
                    <div className="space-y-32">
                        {categories.map((category, catIndex) => {
                            const CatIcon = iconMap[category.id] || LayoutGrid;

                            return (
                                <div key={category.id} id={category.id} className="scroll-mt-24">
                                    {/* Category Header */}
                                    <div className="flex flex-col items-center mb-10 text-center">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600/20 to-teal-600/20 flex items-center justify-center mb-4 border border-emerald-500/30">
                                            <CatIcon className="w-8 h-8 text-emerald-400" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-2">{category.name}</h3>
                                        <p className="text-gray-400 max-w-2xl">{category.description}</p>
                                    </div>

                                    {/* Plans Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
                                        {category.plans.map((plan: any, index: number) => {
                                            const gradient = cardGradients[(index + catIndex) % cardGradients.length]; // varying gradients
                                            const border = borderGradients[(index + catIndex) % borderGradients.length];
                                            const isPopular = plan.popular;

                                            return (
                                                <motion.div
                                                    key={category.id + index}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true, margin: "-50px" }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="group relative h-full"
                                                >
                                                    <div
                                                        className={cn(
                                                            "relative h-full bg-gradient-to-br rounded-3xl p-6 border transition-all duration-300 overflow-hidden flex flex-col justify-between",
                                                            gradient,
                                                            border,
                                                            isPopular ? "ring-2 ring-emerald-500 shadow-2xl shadow-emerald-500/20" : ""
                                                        )}
                                                    >
                                                        {isPopular && (
                                                            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl flex items-center gap-1">
                                                                <Crown className="w-3 h-3 fill-current" /> POPULAR
                                                            </div>
                                                        )}

                                                        {/* Starry background effect */}
                                                        <div className="absolute inset-0 opacity-30 pointer-events-none">
                                                            {[...Array(15)].map((_, i) => (
                                                                <div
                                                                    key={i}
                                                                    className="absolute w-1 h-1 bg-white/40 rounded-full"
                                                                    style={{
                                                                        top: `${Math.random() * 100}%`,
                                                                        left: `${Math.random() * 100}%`,
                                                                        opacity: Math.random() * 0.5 + 0.3,
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>

                                                        <div className="relative z-10">
                                                            {/* Plan Name */}
                                                            <h3 className="text-xl font-bold text-white mb-2 mt-2 group-hover:text-emerald-300 transition-colors">
                                                                {plan.name}
                                                            </h3>

                                                            {/* Price */}
                                                            <div className="mb-4 flex items-baseline gap-1">
                                                                {plan.currency && <span className="text-lg text-gray-300">{plan.currency === "INR" ? "₹" : plan.currency}</span>}
                                                                <span className="text-3xl font-bold text-white tracking-tight">{plan.price}</span>
                                                                <span className="text-sm text-gray-400">{plan.billing}</span>
                                                            </div>

                                                            {plan.description && (
                                                                <p className="text-gray-300/80 text-sm mb-4 italic">{plan.description}</p>
                                                            )}

                                                            <div className="h-px w-full bg-white/10 mb-6" />

                                                            {/* Features */}
                                                            <ul className="space-y-3 mb-8">
                                                                {plan.features.map((feature: string, idx: number) => (
                                                                    <li
                                                                        key={idx}
                                                                        className="flex items-start gap-3 text-gray-300"
                                                                    >
                                                                        <div className="mt-1 flex-shrink-0">
                                                                            <Check className="w-4 h-4 text-emerald-400" />
                                                                        </div>
                                                                        <span className="text-sm">{feature}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        {/* CTA Button */}
                                                        <div className="relative z-10 mt-auto pt-4">
                                                            <Button
                                                                asChild
                                                                className={cn(
                                                                    "w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 font-semibold backdrop-blur-sm transition-all duration-300",
                                                                    isPopular ? "bg-emerald-500 hover:bg-emerald-600 border-none shadow-lg shadow-emerald-500/20" : ""
                                                                )}
                                                            >
                                                                <Link href="/contact">Choose Plan</Link>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-32"
                    >
                        <p className="text-gray-400 mb-4">Still not sure?</p>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-emerald-500 text-emerald-400 hover:bg-emerald-950/50 font-semibold px-8"
                        >
                            <Link href="/contact">Talk to an Expert</Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
            <Footer />
        </>
    );
}
