'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Code, Palette, Video } from 'lucide-react';
import Footer from '@/components/home/Footer';

const tabs = [
    // { name: 'All Work', href: '/portfolios', icon: LayoutGrid },
    { name: 'Posters & Graphics', href: '/portfolios/posters', icon: Palette },
    { name: 'Projects', href: '/portfolios/development', icon: Code },
    // { name: 'Video Production', href: '/portfolios/video', icon: Video },
];

export default function PortfoliosLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <main className="bg-black min-h-screen">
            <section className="pt-20 px-6 lg:px-10 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-40 right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />

                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-emerald-400 text-sm font-semibold mb-3 tracking-wider uppercase"
                        >
                            portfolios
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl lg:text-5xl font-bold mb-4"
                        >
                            Gallery of
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600">
                                our best work
                            </span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 text-lg max-w-2xl mx-auto mb-8"
                        >
                            Explore our diverse portfolio of digital excellence
                        </motion.p>
                    </div>

                    {/* Navigation Cards */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {tabs.map((tab, index) => {
                            const isActive = pathname === tab.href;
                            const Icon = tab.icon;

                            return (
                                <Link key={tab.href} href={tab.href}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        className={`relative px-6 py-3 rounded-xl flex items-center gap-2 border transition-all duration-300 ${isActive
                                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-emerald-500/50 hover:text-emerald-300'
                                            }`}
                                    >
                                        <Icon size={18} />
                                        <span className="font-medium">{tab.name}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 rounded-xl bg-emerald-500/10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Content Area */}
                    <div className="min-h-[400px]">
                        {children}
                    </div>
                </div>
            </section>

            <section>
                <Footer />
            </section>
        </main>
    );
}
