'use client';
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import designsData from "@/utils/designs.json";
import { useEffect, useState } from "react";

export default function Posters() {
    const [images, setImages] = useState(designsData.images);

    useEffect(() => {
        setImages((prev) => [...prev].sort(() => Math.random() - 0.5));
    }, []);

    return (
        <div className="min-h-screen">
            <ParallaxScroll images={images} />
        </div>
    );
}