'use client';
import { motion } from 'framer-motion';
export default function PortfoliosPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-full text-center py-20 text-gray-500">
                <p>Select a category above to view our work.</p>
            </div>
        </div>
    );
}