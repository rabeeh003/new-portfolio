'use client';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Link from 'next/link';
import {
    Mail,
    Phone,
    MapPin,
    Send,
    Github,
    Linkedin,
    Instagram,
    Facebook,
    MessageCircle,
    Twitter,
    Globe
} from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleWhatsAppClick = (e: React.FormEvent) => {
        e.preventDefault();
        const phoneNumber = "917994779605";
        const text = `Hi Rabeeh PK, my name is ${name}. ${message}`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <footer className="relative bg-black pt-20 pb-10 px-6 lg:px-10 overflow-hidden border-t border-white/5">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-900/10 rounded-full blur-3xl opacity-30" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-blue-400 text-sm font-semibold mb-3 tracking-wider uppercase"
                    >
                        Contact Me
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-bold mb-4"
                    >
                        Get in touch
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
                            let's discuss
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto mb-8"
                    >
                        I would welcome the opportunity to work with you.
                    </motion.p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">

                    {/* Left Side: Contact Form Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-zinc-900/60 backdrop-blur-sm border border-white/5 p-8 rounded-3xl shadow-xl lg:mr-10"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <MessageCircle className="text-blue-400 w-6 h-6" />
                            <h3 className="text-2xl font-bold text-white">Send a Message</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-8">Get in touch and let's discuss</p>

                        <form onSubmit={handleWhatsAppClick} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-zinc-900/80 border border-white/5 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Tell me..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={4}
                                    className="w-full bg-zinc-900/80 border border-white/5 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold h-12 rounded-xl transition-all shadow-lg shadow-blue-500/20 group"
                            >
                                <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                                Send via WhatsApp
                            </Button>
                        </form>
                    </motion.div>

                    {/* Right Side: Info & Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-between"
                    >
                        {/* Brand Info */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-4 h-4 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                                <h2 className="text-3xl font-bold text-white">Muhammed Rabeeh PK</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed max-w-md">
                                Full Stack Developer | App Developer | Software Developer | UI/UX Designer | Web Developer | Graphics Designer | SEO | Hosting | App Publishing
                            </p>
                        </div>

                        {/* Contact Details */}
                        <div className="mb-10 space-y-5">
                            <h4 className="text-white font-semibold text-lg mb-4">Get in Touch</h4>

                            <a href="mailto:pkrabipk@gmail.com" className="flex items-center gap-4 text-gray-400 hover:text-blue-400 transition-colors group">
                                <Mail className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                                <span>pkrabipk@gmail.com</span>
                            </a>

                            <a href="tel:+971508019605" className="flex items-center gap-4 text-gray-400 hover:text-blue-400 transition-colors group">
                                <Phone className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                                <span>+971 508019605</span>
                            </a>

                            <a href="tel:+917994779605" className="flex items-center gap-4 text-gray-400 hover:text-blue-400 transition-colors group">
                                <Phone className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                                <span>+91 7994779605</span>
                            </a>

                            <div className="flex items-center gap-4 text-gray-400 group">
                                <MapPin className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                                <span>Kerala, India   |   Dubai, UAE (currently)</span>
                            </div>
                        </div>

                        {/* Quick Response Box */}
                        {/* <div className="bg-blue-950/20 border border-blue-900/30 rounded-2xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10" />

                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                                <h4 className="text-blue-400 font-semibold text-sm uppercase tracking-wide">Quick Response</h4>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                We typically respond within <span className="text-blue-400 font-medium">12 hours</span>. For urgent matters, <span className="text-blue-400 font-medium">WhatsApp</span> is the fastest way to reach us.
                            </p>
                        </div> */}
                    </motion.div>
                </div>

                {/* Footer Bottom */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm">
                        © 2026 Rabeeh PK. All rights reserved.
                    </p>

                    <div className="flex items-center gap-3">
                        <span className="text-gray-600 text-sm mr-2 hidden md:block">Follow Me</span>
                        <SocialButton icon={Linkedin} href="https://ae.linkedin.com/in/rabeeh-pk" />
                        <SocialButton icon={Github} href="https://github.com/rabeeh003" />
                        <SocialButton icon={Instagram} href="https://www.instagram.com/rabeeh_pk_/" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialButton({ icon: Icon, href }: { icon: any, href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-white/5 hover:bg-emerald-500/20 border border-white/5 hover:border-emerald-500/30 flex items-center justify-center text-gray-400 hover:text-emerald-400 transition-all duration-300 group"
        >
            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </a>
    );
}
