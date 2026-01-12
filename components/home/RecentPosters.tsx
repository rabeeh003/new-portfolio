'use client';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import designsData from "@/utils/designs.json";

const images = designsData.images;

export default function RecentPosters() {
    const [randomImages, setRandomImages] = useState<string[]>([]);

    useEffect(() => {
        // Select 5 random unique images
        const shuffled = [...images].sort(() => 0.5 - Math.random());
        setRandomImages(shuffled.slice(0, 6));
    }, []);

    return (
        <section className="pb-20  relative overflow-hidden bg-black/30">
            {/* Background decoration */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

            <div className="relative">
                {/* Section Header */}
                <div className="text-center px-4 lg:px-10 max-w-7xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-blue-400 text-sm font-semibold mb-3 tracking-wider uppercase"
                    >
                        Portfolio
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-bold mb-4"
                    >
                        My{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                            Works
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        Check out projects and creative poster designs
                    </motion.p>
                </div>

                <CardsCarouselDemo />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Button
                        asChild
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-10 py-6 text-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
                    >
                        <Link href="/portfolios/development">View All Projects</Link>
                    </Button>
                </motion.div>

                {/* Random 5 Posters Display */}
                <div className="flex justify-center items-center overflow-x-scroll md:overflow-x-hidden py-5 px-4 ">
                    {randomImages.map((image, idx) => (
                        <motion.div
                            key={"images" + idx}
                            style={{
                                rotate: Math.random() * 20 - 10,
                            }}
                            whileHover={{
                                scale: 1.1,
                                rotate: 0,
                                zIndex: 100,
                            }}
                            whileTap={{
                                scale: 1.1,
                                rotate: 0,
                                zIndex: 100,
                            }}
                            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden"
                        >
                            <img
                                src={image}
                                alt="recent work poster"
                                width="500"
                                height="500"
                                className="rounded-lg h-40 w-40 md:h-40 md:w-40 object-cover shrink-0"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Button
                        asChild
                        size="lg"
                        className="bg-gradient-to-r mt-6 from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-10 py-6 text-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
                    >
                        <Link href="/portfolios/posters">View All Posters</Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}


import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { projects } from '@/utils/projects';

export function CardsCarouselDemo() {
    const cards = projects.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="w-full">
            <Carousel items={cards} />
        </div>
    );
}