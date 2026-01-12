export default function Section({
    title,
    description,
    image,
    reverse,
    imageClass
}: {
    title: string;
    description: string;
    image?: string;
    reverse?: boolean;
    imageClass?: string;
}) {
    return (
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
            <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto ${reverse ? "md:flex-row-reverse" : ""
                    } ${!image ? "md:grid-cols-1" : ""}`}
            >
                {/* Image */}
                {image && (
                    <div className={`flex justify-center ${reverse ? "md:order-2" : ""}`}>
                        <img
                            src={image}
                            alt={title}
                            className={imageClass}
                        />
                    </div>
                )}
                {/* Content */}
                <div className={`${reverse ? "md:order-1" : ""}`}>
                    <h3 className="text-xl md:text-3xl font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
                        {title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
