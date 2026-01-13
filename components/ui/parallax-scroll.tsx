"use client";
import { useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
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

    const [isMedium, setIsMedium] = useState(false);
    const [isLarge, setIsLarge] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMedium(window.innerWidth >= 768);
            setIsLarge(window.innerWidth >= 1024);
            setMounted(true);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Translation transforms for all columns
    const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const translateFourth = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const translateFifth = useTransform(scrollYProgress, [0, 1], [0, -200]);

    // Round-robin distribution function
    const distributeImages = (items: string[], numColumns: number): string[][] => {
        const columns: string[][] = Array.from({ length: numColumns }, () => []);
        items.forEach((item, index) => {
            columns[index % numColumns].push(item);
        });
        return columns;
    };

    // Distribute images for 2 columns (mobile), 4 columns (md), and 5 columns (lg)
    const columns2 = distributeImages(images, 2);
    const columns4 = distributeImages(images, 4);
    const columns5 = distributeImages(images, 5);

    const [firstPart2, secondPart2] = columns2;
    const [firstPart4, secondPart4, thirdPart4, fourthPart4] = columns4;
    const [firstPart5, secondPart5, thirdPart5, fourthPart5, fifthPart5] = columns5;

    return (
        <div
            className={cn("w-full py-10", className)}
            ref={gridRef}
        >
            {isLarge && mounted ? (
                // 5 columns layout (lg screens)
                <div
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 items-start max-w-7xl mx-auto gap-4 lg:gap-8 px-4"
                >
                    <div className="grid gap-4 lg:gap-8">
                        {firstPart5.map((el, idx) => (
                            <motion.div style={{ y: translateFirst }} key={`grid-lg-1-${el}-${idx}`}>
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
                        {secondPart5.map((el, idx) => (
                            <motion.div style={{ y: translateSecond }} key={`grid-lg-2-${el}-${idx}`}>
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
                        {thirdPart5.map((el, idx) => (
                            <motion.div style={{ y: translateThird }} key={`grid-lg-3-${el}-${idx}`}>
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
                        {fourthPart5.map((el, idx) => (
                            <motion.div style={{ y: translateFourth }} key={`grid-lg-4-${el}-${idx}`}>
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
                        {fifthPart5.map((el, idx) => (
                            <motion.div style={{ y: translateFifth }} key={`grid-lg-5-${el}-${idx}`}>
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
            ) : isMedium && mounted ? (
                // 4 columns layout (md screens)
                <div
                    className="grid grid-cols-2 md:grid-cols-4 items-start max-w-7xl mx-auto gap-4 lg:gap-8 px-4"
                >
                    <div className="grid gap-4 lg:gap-8">
                        {firstPart4.map((el, idx) => (
                            <motion.div style={{ y: translateFirst }} key={`grid-md-1-${el}-${idx}`}>
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
                        {secondPart4.map((el, idx) => (
                            <motion.div style={{ y: translateSecond }} key={`grid-md-2-${el}-${idx}`}>
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
                        {thirdPart4.map((el, idx) => (
                            <motion.div style={{ y: translateThird }} key={`grid-md-3-${el}-${idx}`}>
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
                        {fourthPart4.map((el, idx) => (
                            <motion.div style={{ y: translateFourth }} key={`grid-md-4-${el}-${idx}`}>
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
            ) : (
                // 2 columns layout (mobile screens or initial render)
                <div
                    className="grid grid-cols-2 items-start max-w-7xl mx-auto gap-4 lg:gap-8 px-4"
                >
                    <div className="grid gap-4 lg:gap-8">
                        {firstPart2.map((el, idx) => (
                            <motion.div style={{ y: translateFirst }} key={`grid-mobile-1-${el}-${idx}`}>
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
                        {secondPart2.map((el, idx) => (
                            <motion.div style={{ y: translateSecond }} key={`grid-mobile-2-${el}-${idx}`}>
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
            )}
        </div>
    );
};
