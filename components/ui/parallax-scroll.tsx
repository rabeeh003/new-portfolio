"use client";
import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const ParallaxScroll = ({
    images,
    className,
}: {
    images: string[];
    className?: string;
}) => {
    const gridRef = useRef<any>(null);
    const { scrollYProgress } = useScroll({
        // Using window scroll by default
    });

    const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const translateFourth = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const translateFifth = useTransform(scrollYProgress, [0, 1], [0, -200]);

    const fifth = Math.ceil(images.length / 5);

    const firstPart = images.slice(0, fifth);
    const secondPart = images.slice(fifth, 2 * fifth);
    const thirdPart = images.slice(2 * fifth, 3 * fifth);
    const fourthPart = images.slice(3 * fifth, 4 * fifth);
    const fifthPart = images.slice(4 * fifth);

    return (
        <div
            className={cn("w-full py-10", className)}
            ref={gridRef}
        >
            <div
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 items-start max-w-7xl mx-auto gap-4 lg:gap-8 px-4"
            >
                <div className="grid gap-4 lg:gap-8">
                    {firstPart.map((el, idx) => (
                        <motion.div style={{ y: translateFirst }} key={"grid-1" + idx}>
                            <img
                                src={el}
                                className="w-full h-auto object-cover rounded-lg"
                                loading="lazy"
                                alt="poster"
                            />
                        </motion.div>
                    ))}
                </div>
                <div className="grid gap-4 lg:gap-8">
                    {secondPart.map((el, idx) => (
                        <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
                            <img
                                src={el}
                                className="w-full h-auto object-cover rounded-lg"
                                loading="lazy"
                                alt="poster"
                            />
                        </motion.div>
                    ))}
                </div>
                <div className="grid gap-4 lg:gap-8">
                    {thirdPart.map((el, idx) => (
                        <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
                            <img
                                src={el}
                                className="w-full h-auto object-cover rounded-lg"
                                loading="lazy"
                                alt="poster"
                            />
                        </motion.div>
                    ))}
                </div>
                <div className="grid gap-4 lg:gap-8">
                    {fourthPart.map((el, idx) => (
                        <motion.div style={{ y: translateFourth }} key={"grid-4" + idx}>
                            <img
                                src={el}
                                className="w-full h-auto object-cover rounded-lg"
                                loading="lazy"
                                alt="poster"
                            />
                        </motion.div>
                    ))}
                </div>
                <div className="grid gap-4 lg:gap-8">
                    {fifthPart.map((el, idx) => (
                        <motion.div style={{ y: translateFifth }} key={"grid-5" + idx}>
                            <img
                                src={el}
                                className="w-full h-auto object-cover rounded-lg"
                                loading="lazy"
                                alt="poster"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
