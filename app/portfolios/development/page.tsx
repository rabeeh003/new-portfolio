"use client";
import React, {
    useEffect,
    useRef,
    useState,
    JSX,
} from "react";
import {
    IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ImageProps } from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { projects } from "@/utils/projects";

type Card = {
    src: string;
    title: string;
    category: string;
    content: React.ReactNode;
};

export default function Development() {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    return (
        <div className="min-h-screen relative">
            <DevelopmentParallax cards={projects} onCardSelect={setSelectedCard} />

            <AnimatePresence>
                {selectedCard && (
                    <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}

// Modal Component
const CardModal = ({ card, onClose }: { card: Card; onClose: () => void }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    useOutsideClick(containerRef as React.RefObject<HTMLDivElement>, () => onClose());

    return (
        <div className="fixed inset-0 z-50 h-screen pt-20 overflow-auto">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 h-full w-full bg-black/40 backdrop-blur-lg"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                ref={containerRef}
                layoutId={`card-${card.title}`}
                className="relative z-50 mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white p-4 font-sans md:p-10 dark:bg-neutral-900 shadow-2xl"
            >
                <button
                    className="hidden md:flex sticky bottom-4 right-0 ml-auto flex h-12 w-12 items-center justify-center rounded-full bg-black dark:bg-white hover:bg-neutral-800 transition-colors"
                    onClick={onClose}
                >
                    <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
                </button>
                <motion.p
                    layoutId={`category-${card.title}`}
                    className="text-base font-medium text-black dark:text-white"
                >
                    {card.category}
                </motion.p>
                <motion.p
                    layoutId={`title-${card.title}`}
                    className="mt-4 text-2xl font-semibold text-neutral-700 md:text-5xl dark:text-white"
                >
                    {card.title}
                </motion.p>
                <div className="py-10">{card.content}</div>
                <button
                    className="sticky md:hidden bottom-8 right-0 ml-auto flex h-12 w-12 items-center justify-center rounded-full bg-black dark:bg-white hover:bg-neutral-800 transition-colors"
                    onClick={onClose}
                >
                    <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
                </button>
            </motion.div>
        </div>
    );
};


// Parallax Grid specific for Cards
const DevelopmentParallax = ({
    cards,
    className,
    onCardSelect,
}: {
    cards: Card[];
    className?: string;
    onCardSelect: (card: Card) => void;
}) => {
    const { scrollYProgress } = useScroll();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // 4 columns logic
    const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const translateThird = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const translateFourth = useTransform(scrollYProgress, [0, 1], [0, 100]);

    const fourth = Math.ceil(cards.length / 4);

    const firstPart = cards.slice(0, fourth);
    const secondPart = cards.slice(fourth, 2 * fourth);
    const thirdPart = cards.slice(2 * fourth, 3 * fourth);
    const fourthPart = cards.slice(3 * fourth);

    return (
        <div
            className={cn("w-full py-10", className)}
        >
            <div
                className="grid grid-cols-1 md:grid-cols-4 items-start max-w-7xl mx-auto gap-8 px-4"
            >
                <div className="grid gap-8">
                    {firstPart.map((card, idx) => (
                        <motion.div style={{ y: isMobile ? 0 : translateFirst }} key={"grid-1" + idx}>
                            <DevelopmentCard card={card} index={idx} onClick={() => onCardSelect(card)} />
                        </motion.div>
                    ))}
                </div>
                <div className="grid gap-8">
                    {secondPart.map((card, idx) => (
                        <motion.div style={{ y: isMobile ? 0 : translateSecond }} key={"grid-2" + idx}>
                            <DevelopmentCard card={card} index={idx} onClick={() => onCardSelect(card)} />
                        </motion.div>
                    ))}
                </div>
                <div className="grid gap-8">
                    {thirdPart.map((card, idx) => (
                        <motion.div style={{ y: isMobile ? 0 : translateThird }} key={"grid-3" + idx}>
                            <DevelopmentCard card={card} index={idx} onClick={() => onCardSelect(card)} />
                        </motion.div>
                    ))}
                </div>
                <div className="grid gap-8">
                    {fourthPart.map((card, idx) => (
                        <motion.div style={{ y: isMobile ? 0 : translateFourth }} key={"grid-4" + idx}>
                            <DevelopmentCard card={card} index={idx} onClick={() => onCardSelect(card)} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};


// Custom Card Component (Button Only)
const DevelopmentCard = ({
    card,
    index,
    onClick,
}: {
    card: Card;
    index: number;
    onClick: () => void;
}) => {
    return (
        <motion.button
            layoutId={`card-${card.title}`}
            onClick={onClick}
            className="relative z-10 flex h-60 w-full flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[25rem] dark:bg-neutral-900 hover:shadow-xl transition-shadow duration-300"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
            <div className="relative z-20 p-8">
                <motion.p
                    layoutId={`category-${card.title}`}
                    className="text-left font-sans text-sm font-medium text-white md:text-base"
                >
                    {card.category}
                </motion.p>
                <motion.p
                    layoutId={`title-${card.title}`}
                    className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl"
                >
                    {card.title}
                </motion.p>
            </div>
            <BlurImage
                src={card.src}
                alt={card.title}
                fill
                className="absolute inset-0 z-10 object-cover"
            />
        </motion.button>
    );
};

const BlurImage = ({
    height,
    width,
    src,
    className,
    alt,
    ...rest
}: ImageProps) => {
    const [isLoading, setLoading] = useState(true);
    return (
        <img
            className={cn(
                "h-full w-full transition duration-300",
                isLoading ? "blur-sm" : "blur-0",
                className,
            )}
            onLoad={() => setLoading(false)}
            src={src as string}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            blurDataURL={typeof src === "string" ? src : undefined}
            alt={alt ? alt : "Background of a beautiful view"}
            {...rest}
        />
    );
};

// Data
export const DummyContent = () => {
    return (
        <>
            {[...new Array(3).fill(1)].map((_, index) => {
                return (
                    <div
                        key={"dummy-content" + index}
                        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
                    >
                        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                            <span className="font-bold text-neutral-700 dark:text-neutral-200">
                                The first rule of Apple club is that you boast about Apple club.
                            </span>{" "}
                            Keep a journal, quickly jot down a grocery list, and take amazing
                            class notes. Want to convert those notes to text? No problem.
                            Langotiya jeetu ka mara hua yaar is ready to capture every
                            thought.
                        </p>
                        <img
                            src="https://assets.aceternity.com/macbook.png"
                            alt="Macbook mockup from Aceternity UI"
                            height="500"
                            width="500"
                            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                        />
                    </div>
                );
            })}
        </>
    );
};

const data = [
    {
        category: "Artificial Intelligence",
        title: "You can do more with AI.",
        src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent />,
    },
    {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent />,
    },
    {
        category: "Product",
        title: "Launching the new Apple Vision Pro.",
        src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent />,
    },
    {
        category: "Product",
        title: "Maps for your iPhone 15 Pro Max.",
        src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent />,
    },
    {
        category: "iOS",
        title: "Photography just got better.",
        src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent />,
    },
    {
        category: "Hiring",
        title: "Hiring for a Staff Software Engineer",
        src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent />,
    },
    // Added more items to demonstrate list view
    {
        category: "Development",
        title: "Building the Future.",
        src: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2940&auto=format&fit=crop",
        content: <DummyContent />,
    },
    {
        category: "Abstract",
        title: "Creative Solutions.",
        src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop",
        content: <DummyContent />,
    },
];