import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "John is an exceptional developer who consistently delivers high-quality code. His attention to detail and problem-solving abilities make him a valuable asset to any team.",
    author: "Sarah Johnson",
    position: "CTO, TechInnovate",
    color: "neon-blue"
  },
  {
    quote: "Working with John was a great experience. He not only delivered the project on time but also suggested improvements that we hadn't considered. Highly recommend!",
    author: "Michael Chen",
    position: "Product Manager, DataFlow",
    color: "neon-orange"
  },
  {
    quote: "John's technical expertise and communication skills are outstanding. He transformed our vision into a polished, user-friendly application that exceeded our expectations.",
    author: "Emily Rodriguez",
    position: "Founder, StartupLaunch",
    color: "neon-pink"
  },
  {
    quote: "His innovative approach to complex problems and ability to work under pressure makes John one of the best developers I've worked with.",
    author: "David Wilson",
    position: "Lead Engineer, CodeCraft",
    color: "neon-green"
  },
  {
    quote: "John's dedication to clean code and best practices significantly improved our development workflow. A true professional.",
    author: "Lisa Thompson",
    position: "Technical Director, WebSolutions",
    color: "neon-golden"
  }
];

// Neon gradients
const neonColors: { [key: string]: string } = {
  'neon-blue': 'from-cyan-400 to-blue-500',
  'neon-orange': 'from-orange-400 to-yellow-500',
  'neon-pink': 'from-pink-400 to-purple-500',
  'neon-green': 'from-green-400 to-emerald-500',
  'neon-golden': 'from-yellow-400 to-orange-500'
};

export default function TestimonialsCarousel() {
  // Note: When accessing event.target properties like nextElementSibling,
  // always cast EventTarget to Element or HTMLElement:
  // const element = event.target as Element;
  // console.log(element.nextElementSibling);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToSlide = (index: number) => setCurrentIndex(index);
  const currentTestimonial = testimonials[currentIndex];
  const currentGradient = neonColors[currentTestimonial.color];

  return (
    <section className="py-20 px-4 bg-gray-900 text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
            Client Testimonials
          </h2>
          <div className={`w-24 h-1 mx-auto bg-gradient-to-r ${currentGradient} rounded-full mb-6 shadow-lg`} />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            What clients and colleagues say about my work and collaboration
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl p-8 md:p-12 bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 shadow-xl transition-all duration-500">
            <div className={`absolute inset-0 bg-gradient-to-r ${currentGradient} opacity-5 rounded-2xl`} />
            <div className={`absolute inset-0 bg-gradient-to-r ${currentGradient} opacity-10 rounded-2xl blur-xl`} />
            
            <div className="relative z-10">
              <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 font-light italic text-white">
                "{currentTestimonial.quote}"
              </blockquote>

              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${currentGradient} mr-4 flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-lg">
                    {currentTestimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-lg text-white">{currentTestimonial.author}</p>
                  <p className="text-gray-300">{currentTestimonial.position}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? `bg-gradient-to-r ${currentGradient} shadow-lg`
                  : `bg-gray-600 hover:bg-gray-500`
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
