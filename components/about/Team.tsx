'use client';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Lock, ThumbsUp } from 'lucide-react';

const teamMembers = [
    { name: 'Favas', image: 'https://www.bllifesciences.com/wp-content/uploads/2022/06/testimonial1.jpg', isAI: false },
    { name: 'Rabeeh PK', image: 'https://www.bllifesciences.com/wp-content/uploads/2022/06/testimonial1.jpg', isAI: false },
    { name: 'Adil', image: 'https://www.bllifesciences.com/wp-content/uploads/2022/06/testimonial1.jpg', isAI: false },
    { name: 'Rabeeh MV', image: 'https://www.bllifesciences.com/wp-content/uploads/2022/06/testimonial1.jpg', isAI: false },
    { name: 'Rinshad', image: 'https://www.bllifesciences.com/wp-content/uploads/2022/06/testimonial1.jpg', isAI: false },
];

export default function Team() {
    return (
        <section className="py-20 px-6 lg:px-10 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 via-transparent to-black/50" />
            <div className="absolute top-40 left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-emerald-400 text-sm font-semibold mb-3 tracking-wider uppercase"
                    >
                        Our Team
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-bold mb-4"
                    >
                        Team Collaboration for
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600">
                            Growing Brands
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto mb-8"
                    >
                        Meet the creative minds behind our success
                    </motion.p>
                </div>

                {/* Team Grid - 3-2-1 Pattern */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Floating decorative icons */}
                    <motion.div
                        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-12 left-1/2 -translate-x-1/2 w-12 h-12 bg-emerald-950/80 border border-emerald-500/40 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20"
                    >
                        <Lock className="w-6 h-6 text-emerald-400" />
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute top-1/2 -left-16 w-12 h-12 bg-emerald-950/80 border border-emerald-500/40 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20"
                    >
                        <Sparkles className="w-6 h-6 text-emerald-400" />
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute top-1/2 -right-16 w-12 h-12 bg-emerald-950/80 border border-emerald-500/40 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20"
                    >
                        <ThumbsUp className="w-6 h-6 text-emerald-400" />
                    </motion.div>

                    {/* Team Members Grid */}
                    <div className="flex flex-col items-center gap-6">
                        {/* Row 1 - Top (3 members) */}
                        <div className="flex gap-6 pt-4 justify-center">
                            {teamMembers.slice(0, 3).map((member, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="group relative"
                                >
                                    {/* Card with special styling for center card */}
                                    <div
                                        className={`relative w-40 h-40 rounded-3xl overflow-hidden border-2 ${index === 1
                                            ? 'border-emerald-500 shadow-2xl shadow-emerald-500/40'
                                            : 'border-emerald-500/30 shadow-lg shadow-emerald-500/20'
                                            } bg-gradient-to-br from-gray-800 via-gray-900 to-black transition-all duration-300 group-hover:border-emerald-400`}
                                    >
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

                                        {/* Image */}
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Name overlay - NO ROLE */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                            <p className="text-white font-semibold text-sm text-center">
                                                {member.name}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Row 2 - Middle (2 members) */}
                        <div className="flex gap-6 justify-center">
                            {teamMembers.slice(3, 5).map((member, index) => (
                                <motion.div
                                    key={index + 3}
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (index + 3) * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="group relative"
                                >
                                    <div className="relative w-40 h-48 rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-lg shadow-emerald-500/20 bg-gradient-to-br from-gray-800 via-gray-900 to-black transition-all duration-300 group-hover:border-emerald-400">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

                                        {/* Image */}
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Name overlay - NO ROLE */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                            <p className="text-white font-semibold text-sm text-center">
                                                {member.name}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
