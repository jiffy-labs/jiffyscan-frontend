/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const testimonials = [
    {
        rating: 4.9,
        text: 'Pagedone has made it possible for me to stay on top of my portfolio and make informed decisions quickly and easily.',
        imgSrc: 'https://pagedone.io/asset/uploads/1696229969.png',
        name: 'Jane D',
        title: 'CEO',
        twitter: '@janeD',
    },
    {
        rating: 4.9,
        text: 'Thanks to pagedone, I feel more informed and confident about my investment decisions than ever before.',
        imgSrc: 'https://pagedone.io/asset/uploads/1696229994.png',
        name: 'Harsh P.',
        title: 'Product Designer',
        twitter: '@harshP',
    },
    {
        rating: 4.9,
        text: 'The customer service team at pagedone went above and beyond to help me resolve a billing issue.',
        imgSrc: 'https://pagedone.io/asset/uploads/1696230027.png',
        name: 'Alex K.',
        title: 'Design Lead',
        twitter: '@alexK',
    },
    {
        rating: 4.9,
        text: 'The customer service team at pagedone went above and beyond to help me resolve a billing issue.',
        imgSrc: 'https://pagedone.io/asset/uploads/1696230027.png',
        name: 'Alex K.',
        title: 'Design Lead',
        twitter: '@alexK',
    },
    {
        rating: 4.9,
        text: 'The customer service team at pagedone went above and beyond to help me resolve a billing issue.',
        imgSrc: 'https://pagedone.io/asset/uploads/1696230027.png',
        name: 'Alex K.',
        title: 'Design Lead',
        twitter: '@alexK',
    },
    {
        rating: 4.9,
        text: 'The customer service team at pagedone went above and beyond to help me resolve a billing issue.',
        imgSrc: 'https://pagedone.io/asset/uploads/1696230027.png',
        name: 'Alex K.',
        title: 'Design Lead',
        twitter: '@alexK',
    },
    {
        rating: 4.9,
        text: 'The customer service team at pagedone went above and beyond to help me resolve a billing issue.',
        imgSrc: 'https://pagedone.io/asset/uploads/1696230027.png',
        name: 'Alex K.',
        title: 'Design Lead',
        twitter: '@alexK',
    },
    {
        rating: 4.9,
        text: 'The customer service team at pagedone went above and beyond to help me resolve a billing issue.',
        imgSrc: 'https://pagedone.io/asset/uploads/1696230027.png',
        name: 'Alex K.',
        title: 'Design Lead',
        twitter: '@alexK',
    },
    {
        rating: 4.9,
        text: 'The customer service team at pagedone went above and beyond to help me resolve a billing issue.',
        imgSrc: 'https://pagedone.io/asset/uploads/1696230027.png',
        name: 'Alex K.',
        title: 'Design Lead',
        twitter: '@alexK',
    },
    {
        rating: 4.9,
        text: 'The customer service team at pagedone went above and beyond to help me resolve a billing issue.',
        imgSrc: 'https://pagedone.io/asset/uploads/1696230027.png',
        name: 'Alex K.',
        title: 'Design Lead',
        twitter: '@alexK',
    },
    {
        rating: 4.9,
        text: 'The customer service team at pagedone went above and beyond to help me resolve a billing issue.',
        imgSrc: 'https://pagedone.io/asset/uploads/1696230027.png',
        name: 'Alex K.',
        title: 'Design Lead',
        twitter: '@alexK',
    },
    {
        rating: 4.9,
        text: 'The customer service team at pagedone went above and beyond to help me resolve a billing issue.',
        imgSrc: 'https://pagedone.io/asset/uploads/1696230027.png',
        name: 'Alex K.',
        title: 'Design Lead',
        twitter: '@alexK',
    },
    // Add more testimonials as needed
];

const Testimonials = () => {
    const [testimonialsData, setTestimonialsData] = useState(testimonials);

    useEffect(() => {
        // Duplicate testimonials for seamless loop
        setTestimonialsData([...testimonials, ...testimonials]);
    }, []);

    return (
        <section className="py-16">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 space-y-8">
                    <div className="flex items-center justify-center space-x-2">
                        <FaQuoteRight className="text-[#340CD2] text-4xl scale-x-[-1] "/>
                        <span className="text-xl text-[#340CD2] font-poppins font-medium">TESTIMONIALS</span>
                    </div>{' '}
                    <h2 className="md:text-[48px] sm:text-[24px] tracking-tight text-[32px] text-center font-medium font-poppins text-gray-900">
                        What our happy users say...
                    </h2>
                </div>
                <div className="relative overflow-hidden py-8">
                    <div className="flex animate-slide">
                        {testimonialsData.map((testimonial, index) => (
                            <div key={index} className="w-full sm:w-1/2 lg:w-1/4 px-2 flex-shrink-0">
                                <div className="group bg-gradient-to-r from-[#FFFFFF] to-[#F9F9F9]  border-2 border-[#FFFFFF] rounded-3xl p-6 transition-all duration-500 hover:shadow-lg shadow-xl">
                                    <div>
                                        <div className="flex items-center mb-7 gap-2 text-amber-500 transition-all duration-500">
                                            <svg width="38" height="34" viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M12.3327 0.332031H0.666016L14.4327 18.6904L1.41602 33.6654H5.83268L16.4793 21.417L25.666 33.6654H37.3327L22.986 14.5354L35.3327 0.332031H30.916L20.9394 11.8087L12.3327 0.332031ZM27.3327 30.332L7.33268 3.66536H10.666L30.666 30.332H27.3327Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-base text-gray-600 leading-6 transition-all duration-500 pb-8 group-hover:text-gray-800">
                                            {testimonial.text}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-5  border-solid border-gray-200 pt-5">
                                        <img className="rounded-full h-10 w-10" src={testimonial.imgSrc} alt="avatar" />
                                        <div>
                                            <h5 className="text-gray-900 font-medium transition-all duration-500 mb-1">
                                                {testimonial.name}
                                            </h5>
                                            <span className="text-sm leading-4 text-gray-500">{testimonial.title}</span>
                                            <span className="text-sm leading-4 text-gray-500">{testimonial.twitter}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slide {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-slide {
                    animation: slide 30s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
