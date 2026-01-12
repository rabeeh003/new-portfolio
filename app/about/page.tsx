'use client';
import { Mail, Phone, MapPin, MessageCircle, Clock, Globe, CheckCircle, Palette, Target, Sparkles, Zap, Users, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '@/components/home/Footer';
import Team from '@/components/about/Team';

export default function AboutPage() {
    const stats = [
        { icon: Trophy, value: '30+', label: 'Projects Completed' },
        { icon: Users, value: '20+', label: 'Happy Clients' },
        { icon: Zap, value: '3+', label: 'Years Experience' },
        { icon: Palette, value: '100%', label: 'Creative Freedom' }
    ];

    const values = [
        {
            icon: Target,
            title: 'Client-First Approach',
            description: 'Your vision drives our design. We listen, adapt, and deliver results that exceed expectations.'
        },
        {
            icon: Sparkles,
            title: 'Bold Creativity',
            description: 'We don’t follow trends — we set them. Every project is a chance to innovate and inspire.'
        },
        {
            icon: Zap,
            title: 'Speed & Precision',
            description: 'Fast turnarounds without compromise. Quality delivered on time, every time.'
        }
    ];

    const services = [
        'Brand Identity & Strategy',
        'Visual Design & Illustration',
        'Web & UI/UX Design',
        'Motion Graphics & Video',
        'Print & Packaging Design',
        'Social Media Creative',
        'Campaign Concepting',
        'Art Direction'
    ];

    return (
        <main className="bg-black min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[calc(100vh-15rem)] flex items-center justify-center overflow-hidden pt-20">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-500/10 to-teal-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-teal-500/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-400 mb-6">
                            We Are Brandso
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                            A creative agency that turns bold ideas into unforgettable brands. We design with purpose, strategy, and soul.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-teal-400" />
                                Strategy-Led Design
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock size={16} className="text-emerald-400" />
                                On-Time Delivery
                            </span>
                            <span className="flex items-center gap-2">
                                <Globe size={16} className="text-teal-400" />
                                Global Reach
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                                    <stat.icon size={32} className="text-white" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</h3>
                                <p className="text-gray-400 text-sm">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-400 mb-6">
                            What Drives Us
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Every decision, every design, every interaction is guided by our core principles.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                className="group relative overflow-hidden rounded-2xl p-8 bg-black/50 backdrop-blur-sm border border-teal-800/30 hover:border-teal-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-900/20"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <value.icon size={28} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                                <p className="text-gray-300">{value.description}</p>
                                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-400 mb-6">
                            What We Do
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            From concept to launch, we craft brands that stand out and stories that resonate.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={service}
                                className="group relative overflow-hidden rounded-2xl p-6 bg-black/40 backdrop-blur-sm border border-teal-800/30 hover:border-teal-600/50 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <CheckCircle size={16} className="text-white" />
                                    </div>
                                    <span className="text-white font-medium text-sm">{service}</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-20 relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative overflow-hidden rounded-3xl p-12 bg-gradient-to-r from-teal-600/20 via-emerald-600/20 to-teal-600/20 backdrop-blur-sm border border-teal-700/50"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-400 mb-6">
                            Ready to Build Your Brand?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Let’s create something extraordinary. Start the conversation today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.a
                                href="mailto:brandso.com@gmail.com"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-2xl font-semibold transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Mail size={20} />
                                Send Email
                            </motion.a>
                            <motion.a
                                href="https://wa.me/919562695758"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-black/50 hover:bg-black/70 text-white rounded-2xl font-semibold transition-all duration-300 border border-teal-600/50"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <MessageCircle size={20} />
                                WhatsApp
                            </motion.a>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-emerald-500/5 to-teal-500/5"></div>
                    </motion.div>
                </div>
            </section>
            {/* <Team /> */}
            <Footer />
        </main>
    );
}