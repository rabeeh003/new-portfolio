'use client';
import { motion } from 'framer-motion'; // For infinite scroll and animations
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative md:h-[calc(100vh-6rem)] bg-black pt-25 md:pt-0 flex items-center overflow-hidden">
            {/* Dotted pattern background */}
            {/* <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-32 h-32 bg-[radial-gradient(circle,_#10b981_1px,_transparent_1px)] bg-[length:20px_20px] animate-pulse" />
                <div className="absolute bottom-40 left-40 w-40 h-40 bg-[radial-gradient(circle,_#10b981_1px,_transparent_1px)] bg-[length:15px_15px] animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-40 right-60 w-48 h-48 bg-[radial-gradient(circle,_#059669_1px,_transparent_1px)] bg-[length:18px_18px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div> */}

            <div className="container mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-12 items-center z-10">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    {/* Promo Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-950/30 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-sm text-blue-400 font-medium">Software Developer</span>
                        </div>
                    </motion.div>

                    {/* Main Heading */}
                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                        Hello,
                        <br />
                        I'm
                        <span className="pl-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                            Muhammed Rabeeh PK
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg lg:text-xl text-gray-300 max-w-xl">
                        Full Stack Developer with expertise in web development, app development, graphics, hosting, and publishing apps.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4">
                            <Button
                                asChild
                                size="lg"
                                className="bg-white text-black hover:bg-gray-200 font-semibold px-8 transition-all hover:scale-105"
                            >
                                <a href="/muhammed%20rabeeh-pk.pdf" download="muhammed-rabeeh-pk.pdf">Download CV</a>
                            </Button>
                        <Button
                            asChild
                            variant="default"
                            size="lg"
                            className="border-blue-500 text-blue-400 hover:bg-blue-950/50 font-semibold px-8 transition-all hover:scale-105"
                        >
                            <Link href="/contact">Hire Me →</Link>
                        </Button>
                    </div>
                </motion.div>

                {/* Right Visual Elements */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative flex items-center justify-center h-[600px]"
                >
                    {/* Central AI Box */}
                    <div className="relative z-10">
                        <Image
                            src="/images/home/hero.png"
                            alt="Hero"
                            width={500}
                            height={500}
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>

                    {/* Floating Icons */}
                    {/* Analysis Icon - Top Right */}
                    <motion.div
                        animate={{
                            y: [0, -15, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                        className="absolute top-20 right-0 md:right-20 z-10"
                    >
                        <div className="px-4 py-2 rounded-lg bg-blue-950/80 border border-blue-500/40 backdrop-blur-sm flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            <span className="text-sm text-blue-300 font-medium">Creating...</span>
                        </div>
                    </motion.div>

                    {/* Icon Group - Top Left */}
                    <motion.div
                        animate={{
                            y: [0, -12, 0],
                        }}
                        transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                        className="absolute top-32 left-0 md:left-10 z-10 flex gap-2"
                    >
                        <div className="w-12 h-12 rounded-lg backdrop-blur-sm flex items-center justify-center">
                            <span className="text-blue-400 text-xl">
                                <Image
                                    src="/images/home/js.webp"
                                    alt="Hero"
                                    width={50}
                                    height={50}
                                    className="w-full h-full shadow-lg drop-shadow-[0_10px_25px_rgba(234,179,8,0.7)]"
                                />
                            </span>
                        </div>
                        <div className="w-12 h-12 mt-6 rounded-lg backdrop-blur-sm flex items-center justify-center">
                            <span className="text-blue-400 text-xl">
                                <Image
                                    src="/images/home/ts.webp"
                                    alt="Hero"
                                    width={50}
                                    height={50}
                                    className="w-full h-full shadow-lg drop-shadow-[0_10px_25px_rgba(59,130,246,0.7)]"
                                />
                            </span>
                        </div>
                    </motion.div>

                    {/* Document Icon - Bottom Left */}
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.5
                        }}
                        className="absolute flex md:bottom-25 bottom-36 left-10 z-10"
                    >
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center">
                            <span className="text-white text-3xl">
                                <Image
                                    src="/images/home/reactjs.webp"
                                    alt="ReactJS"
                                    width={50}
                                    height={50}
                                    className="w-full h-full shadow-lg drop-shadow-[0_8px_20px_rgba(5,46,111,0.7)] "
                                />
                            </span>
                        </div>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                            <span className="text-white text-3xl">
                                <Image
                                    src="/images/home/nodejs.webp"
                                    alt="NodeJS"
                                    width={50}
                                    height={50}
                                    className="w-full h-full shadow-lg drop-shadow-[0_8px_20px_rgba(13, 143, 61, 0.7)] "
                                />
                            </span>
                        </div>
                    </motion.div>
                    <motion.div
                        animate={{
                            y: [0, 10, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.7
                        }}
                        className="absolute flex md:bottom-45 bottom-52 left-10 z-10"
                    >
                        <div className="w-12 ml-5 h-12 rounded-xl flex items-center justify-center">
                            <span className="text-white text-3xl">
                                <Image
                                    src="/images/home/nextjs.png"
                                    alt="NextJS"
                                    width={50}
                                    height={50}
                                    className="w-full h-full rounded-xl shadow-lg drop-shadow-[0_8px_20px_rgba(5,46,111,0.7)] "
                                />
                            </span>
                        </div>

                    </motion.div>

                    {/* Sparkle Icon - Bottom Right */}
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 10, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2.2
                        }}
                        className="absolute bottom-45 md:bottom-32 right-0 md:right-32 z-10"
                    >
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center">
                            <span className="text-white text-4xl">
                                <Image
                                    src="/images/home/django.png"
                                    alt="Django"
                                    width={50}
                                    height={50}
                                    className="w-full h-full shadow-lg drop-shadow-[0_8px_20px_rgba(5,46,111,0.7)] "
                                />
                            </span>
                        </div>
                        <div className="w-12 h-12 mt-10 rounded-lg backdrop-blur-sm flex items-center justify-center">
                            <span className="text-blue-400 text-xl">
                                <Image
                                    src="/images/home/python.webp"
                                    alt="Python"
                                    width={50}
                                    height={50}
                                    className="w-full h-full shadow-lg drop-shadow-[0_12px_30px_rgba(234,179,8,0.7)]"
                                />
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}