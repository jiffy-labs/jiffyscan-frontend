import React, { useState } from 'react';

const Faq = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index:any) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqs = [
    { question: "How do I subscribe to JiffyScan API services?", answer: "You can sign up to our API services by filling the onboarding form" },
    { question: "How do I cancel or upgrade my account?", answer: "Please contact us should you wish to upgrade or cancel your account. We will assist you accordingly." },
    { question: "What are the payment options available?", answer: "We accept all the popular payment methods supported by stripe." },
    { question: "What is the refund policy?", answer: "Since there’s a free tier to test out the services, payments made on paid tier are non-refundable and we do not provide refunds or credits for any services already paid for. You can cancel the subscription to prevent any future charges." },
  ];

  return (
    <section className="py-10  sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl md:text-[48px] font-medium font-poppins leading-tight text-black">
            Frequently asked Questions
          </h2>
        </div>
        <div className="max-w-5xl mx-auto mt-8 space-y-5 md:mt-16 ">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`transition-all duration-200 bg-[#F5F5F5] rounded-lg border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50 ${openQuestion === index ? 'open' : ''}`}
              onClick={() => toggleQuestion(index)}
            >
              <button
                type="button"
                className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
              >
                <span className="flex md:text-xl font-medium font-inter text-black">{faq.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`w-6 h-6 text-gray-400 transition-transform duration-200 transform ${openQuestion === index ? 'rotate-0' : 'rotate-180'}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`px-4 pb-5 sm:px-6 sm:pb-6 ${openQuestion === index ? 'block' : 'hidden'}`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 text-base mt-9">
          Still have questions?{' '}
          <span className="cursor-pointer font-medium text-tertiary transition-all duration-200 hover:text-tertiary focus:text-tertiary hover-underline">
            Contact our support
          </span>
        </p>
      </div>
    </section>
  );
};

export default Faq;
