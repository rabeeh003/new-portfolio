'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Carousel } from '../ui/apple-cards-carousel';
import { Globe, Building2, Share2, Palette, TrendingUp, X, School, MapPin, Mail, Link as LinkIcon } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { DummyContent } from '@/app/portfolios/development/page';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function Services() {
    const [selectedCard, setSelectedCard] = useState<{ title: string; category: string } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useOutsideClick(containerRef as React.RefObject<HTMLDivElement>, () => setSelectedCard(null));

    useEffect(() => {
        if (selectedCard) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [selectedCard]);

    const experiences = [
        {
            type: 'company',
            institution: 'Infineur Digital Creations pvt ltd',
            position: 'Full Stack Developer',
            years: '2024 - 2025',
            email: 'contact@infineur.com',
            website: 'infineur.com',
            location: 'Kasargod, Kerala, India',
            color: 'red',
            logo: 'https://www.infineur.com/media/2020/01/infineur-logo1.png',
            logobg: '#ffffff'
        },
        {
            type: 'company',
            institution: 'Devdroplogy Techsoft pvt ltd',
            position: 'Full Stack Developer',
            years: '2024 - 2024',
            email: 'contact@devdroplogy.com',
            website: 'https://www.linkedin.com/company/dewdropology-tech-soft-private-limited/',
            location: 'Bangalore, Karnataka, India',
            color: 'darkblue',
            logo: 'https://media.licdn.com/dms/image/v2/D560BAQHpry3xrhqe6g/company-logo_200_200/company-logo_200_200/0/1706512586395?e=1769644800&v=beta&t=4EP7JT29GLDqLzk-7AguTDhDGtMBOHU6qLHHqmBDvhM',
            logobg: '#ffffff'
        },
        {
            type: 'company',
            institution: 'Freelance',
            position: 'Web Developer',
            years: '2022 - 2024',
            email: 'pkrabipk@gmail.com',
            website: 'https://pkrabipk.github.io/',
            location: 'Remote',
            color: 'emerald'
        },
        {
            type: 'college',
            institution: 'Brototype',
            position: 'Full Stack Developer Course',
            years: '2023 - 2024',
            email: 'talk@brototype.com',
            website: 'brototype.com',
            location: 'Calicut, Kerala, India',
            color: 'black',
            logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQEWqmtyVtZl7Q/company-logo_200_200/company-logo_200_200/0/1653839709668/brototype_logo?e=1769644800&v=beta&t=K9iV9VWuw1DLuSA4EshMVS14MW35XFYJy_dbpATdBKU',
            logobg: '#000000'
        },
        {
            type: 'college',
            institution: 'Calicut University',
            position: 'Bachelor of Arts',
            years: '2020 - 2023',
            email: '',
            website: 'https://uoc.ac.in/',
            location: 'Calicut, Kerala, India',
            color: 'blue',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/University_of_calicut_logo.png/1200px-University_of_calicut_logo.png',
            logobg: '#ffffff'
        }
    ];

    const IDCard = ({ item }: { item: typeof experiences[0] }) => {
        const colorClasses: any = {
            blue: {
                bg: 'bg-blue-800',
                text: 'text-blue-800',
                lightBg: 'bg-blue-50',
                border: 'border-blue-100'
            },
            black: {
                bg: 'bg-black',
                text: 'text-black',
                lightBg: 'bg-black/10',
                border: 'border-black'
            },
            emerald: {
                bg: 'bg-emerald-600',
                text: 'text-emerald-600',
                lightBg: 'bg-emerald-100',
                border: 'border-emerald-100'
            },
            red: {
                bg: 'bg-red-600',
                text: 'text-red-600',
                lightBg: 'bg-red-100',
                border: 'border-red-100'
            }
        };

        const c = colorClasses[item.color] || colorClasses.blue;

        return (
            <div className="w-[300px] h-[430px] bg-gray-200 rounded-[2rem] shadow-xl overflow-hidden flex flex-col items-center relative mx-auto">
                {/* Header */}
                <div className={`${c.bg} w-full h-28 relative flex flex-col items-center pt-5 px-4`}>
                    <div className="flex items-center gap-2 text-white">
                        <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                            {item.type === 'company' ? <Building2 className="w-4 h-4" /> : item.type === 'college' ? <Globe className="w-4 h-4" /> : <School className="w-4 h-4" />}
                        </div>
                        <span className="font-bold text-[10px] tracking-widest uppercase truncate max-w-[180px]">{item.institution}</span>
                    </div>
                </div>

                {/* Profile/Logo Area */}
                <div className="relative -mt-12 z-10">
                    <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-lg flex items-center justify-center overflow-hidden">
                        {item.logo ? (
                            <img
                                src={item.logo}
                                alt={item.institution}
                                className="w-full h-full object-contain p-2"
                                style={{
                                    backgroundColor: item.logobg
                                }}
                            />
                        ) : (
                            <div className={`${c.lightBg} w-full h-full flex items-center justify-center ${c.text}`}>
                                {item.type === 'company' ? <Building2 className="w-10 h-10" /> : item.type === 'college' ? <Globe className="w-10 h-10" /> : <School className="w-10 h-10" />}
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="mt-4 px-6 text-center w-full flex-1">
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight uppercase">RABEEH PK</h3>
                    <div className={`mt-2 inline-block px-4 py-1 ${c.lightBg} ${c.text} rounded-full text-[10px] font-bold uppercase tracking-wider`}>
                        {item.position}
                    </div>

                    <div className="space-y-2.5 text-left pt-4">
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] font-black text-gray-400 uppercase w-16">Years</span>
                            <span className="text-[11px] font-bold text-gray-700">: {item.years}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] font-black text-gray-400 uppercase w-16">E-mail</span>
                            <span className="text-[11px] font-bold text-gray-700 truncate">: {item.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] font-black text-gray-400 uppercase w-16">Location</span>
                            <span className="text-[11px] font-bold text-gray-700 truncate">: {item.location}</span>
                        </div>
                    </div>
                </div>

                {/* Barcode Area */}
                <div className="mb-6 px-8 w-full flex flex-col items-center">
                    <div className="flex h-8 w-full gap-[1.5px] items-center justify-center grayscale opacity-80">
                        {[...Array(35)].map((_, i) => (
                            <div key={i} className={`bg-gray-900 h-full ${i % 3 === 0 ? 'w-[2.5px]' : i % 5 === 0 ? 'w-[0.5px]' : 'w-[1px]'}`} />
                        ))}
                    </div>
                    <span className="text-[7px] font-mono text-gray-400 mt-1.5 tracking-[0.4em]">EXP-EDU-{Math.floor(Math.random() * 9000 + 1000)}</span>
                </div>

                {/* Decorative Bottom */}
                <div className={`absolute -bottom-6 -left-6 w-16 h-16 ${c.bg} opacity-5 rounded-full`}></div>
                <div className={`absolute -bottom-6 -right-6 w-16 h-16 ${c.bg} opacity-5 rounded-full`}></div>
            </div>
        );
    };

    const serviceCards = experiences.map((exp, idx) => (
        <motion.button
            key={`exp-${idx}`}
            layoutId={`card-${exp.institution}`}
            // onClick={() => setSelectedCard({ title: exp.institution, category: exp.position })}
            className="group relative transition-transform duration-300 hover:scale-[1.02]"
        >
            <IDCard item={exp} />
        </motion.button>
    ));

    return (
        <section className="md:py-20 bg-black relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-40 right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />

            <div className="relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-7xl px-6 lg:px-10 mx-auto ">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-blue-400 text-sm font-semibold mb-3 tracking-wider uppercase"
                    >
                        My Journey
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-bold mb-4"
                    >
                        Experience
                        <br className='md:hidden' />
                        <span className="px-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                            &
                        </span>
                        <br className='md:hidden' />
                        Education
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        From my experience to education, I have a lot to share.
                    </motion.p>
                </div>

                {/* Services Grid - 1 col mobile, 2 col medium, 4 col large */}
                <div className="mb-12">
                    <Carousel items={serviceCards} />
                </div>

                <AnimatePresence>
                    {selectedCard && (
                        <div className="fixed inset-0 z-[100] h-screen pt-20 overflow-auto">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
                                onClick={() => setSelectedCard(null)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                ref={containerRef}
                                layoutId={`card-${selectedCard.title}`}
                                className="relative z-[110] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white p-4 font-sans md:p-10 dark:bg-neutral-900 shadow-2xl"
                            >
                                <button
                                    className="sticky top-4 right-0 ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-black dark:bg-white hover:scale-110 transition-transform"
                                    onClick={() => setSelectedCard(null)}
                                >
                                    <X className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
                                </button>
                                <motion.p
                                    layoutId={`category-${selectedCard.title}`}
                                    className="text-base font-medium text-emerald-500"
                                >
                                    {selectedCard.category}
                                </motion.p>
                                <motion.p
                                    layoutId={`title-${selectedCard.title}`}
                                    className="mt-4 text-2xl font-semibold text-neutral-700 md:text-5xl dark:text-white"
                                >
                                    {selectedCard.title}
                                </motion.p>
                                <div className="py-10">
                                    <DummyContent />
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}
