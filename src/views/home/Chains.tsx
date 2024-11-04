import React from 'react';

const Chains = () => {
    return (
        <section className="py-4 md:mt-16">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 space-y-4 mt-8">
                    <div className="flex items-center justify-center space-x-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.26052 9.80734L11.0053 5.34863C11.0789 5.22631 11.171 5.1375 11.2816 5.08221C11.3921 5.02692 11.5088 4.99952 11.6316 5.00001C11.7544 5.0005 11.871 5.02814 11.9816 5.08294C12.0921 5.13774 12.1842 5.22631 12.2579 5.34863L15.0026 9.80734C15.0763 9.92966 15.1132 10.0581 15.1132 10.1927C15.1132 10.3272 15.0825 10.4495 15.021 10.5596C14.9596 10.6697 14.8737 10.7585 14.7632 10.8261C14.6526 10.8936 14.5237 10.9271 14.3763 10.9266H8.88684C8.73947 10.9266 8.61052 10.8931 8.5 10.8261C8.38947 10.759 8.30351 10.6702 8.2421 10.5596C8.1807 10.4491 8.15 10.3267 8.15 10.1927C8.15 10.0586 8.18684 9.93015 8.26052 9.80734ZM15.6842 19C14.7632 19 13.9804 18.679 13.3359 18.0371C12.6914 17.3951 12.3689 16.6152 12.3684 15.6972C12.3679 14.7793 12.6904 13.9996 13.3359 13.3582C13.9814 12.7167 14.7641 12.3955 15.6842 12.3945C16.6043 12.3935 17.3873 12.7147 18.0333 13.3582C18.6792 14.0016 19.0015 14.7813 19 15.6972C18.9985 16.6132 18.6763 17.3931 18.0333 18.0371C17.3902 18.681 16.6072 19.0019 15.6842 19ZM5 17.8991V13.4954C5 13.2875 5.07074 13.1133 5.21221 12.9728C5.35368 12.8324 5.52856 12.762 5.73684 12.7615H10.1579C10.3667 12.7615 10.5418 12.8319 10.6833 12.9728C10.8247 13.1138 10.8952 13.2879 10.8947 13.4954V17.8991C10.8947 18.107 10.824 18.2815 10.6825 18.4224C10.5411 18.5633 10.3662 18.6335 10.1579 18.633H5.73684C5.52807 18.633 5.35319 18.5626 5.21221 18.4216C5.07123 18.2807 5.00049 18.1065 5 17.8991Z"
                                fill="#340CD2"
                            />
                        </svg>

                        <span className="text-xl text-[#340CD2] dark:text-[] font-poppins font-medium text-center block">SUPPORTED CHAINS</span>
                    </div>
                    <h2 className="md:text-[32px] dark:text-[#989BA6] leading-tight tracking-tight text-base text-center font-medium font-dmsans text-gray-900">
                        And many more to come...
                    </h2>
                </div>
                <section className="py-4 lg:px-8 container -mt-8">
                    <div className="grid gap-8 md:gap-y-16 grid-cols-5">
                        {[
                            { src: "/Ethereum.png", alt: "Ethereum" },
                            { src: "/Polygon.png", alt: "Polygon" },
                            { src: "/Optimisum.png", alt: "Optimism" },
                            { src: "/Base.png", alt: "Base" },
                            { src: "/Avalanche.png", alt: "Avalanche" },
                        ].map((chain, index) => (
                            <span key={index} className="w-full flex items-center justify-center p-2">
                                <span className="sr-only">{chain.alt}</span>
                                <div aria-hidden="true">
                                    <img src={chain.src} alt={chain.alt} className="max-h-12 md:max-h-16" />
                                </div>
                            </span>
                        ))}
                    </div>
                    <div className="grid gap-2 md:gap-y-16 grid-cols-4 justify-center mt-8 md:px-32">
                        {[
                            { src: "/Arbitrium.png", alt: "Arbitrium" },
                            { src: "/images/EduchainLogo.svg", alt: "Educhain Logo" },
                            { src: "/images/odyssey-logo.png", alt: "Odyssey Logo" },
                            { src: "/Group 106.png", alt: "Newfields Logo" },
                        ].map((chain, index) => (
                            <span key={index} className="w-full flex items-center justify-center p-2">
                                <span className="sr-only">{chain.alt}</span>
                                <div aria-hidden="true">
                                    <img src={chain.src} alt={chain.alt} className="max-h-12 md:max-h-16" />
                                </div>
                            </span>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Chains;
