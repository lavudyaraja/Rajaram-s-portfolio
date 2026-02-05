"use client";

import { GraduationCap, Calendar, MapPin, Award, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";

export default function Education() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('education-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const education = [
    {
      degree: "BTech Computer Science and Engineering",
      institution: "Central University Of Haryana",
      location: "Haryana, India",
      period: "2022 - 2026",
      gpa: "Pursuing",
      achievements: [
        "Focused on advanced algorithms",
        "Web development specialization",
        "Software engineering",
        "Machine Learning concentration"
      ],
      coursework: [
        "Data Structures & Algorithms",
        "Machine Learning",
        "Web Development",
        "Database Management Systems",
        "Software Engineering",
        "Computer Networks",
        "Artificial Intelligence"
      ]
    },
    {
      degree: "Intermediate (MPC)",
      institution: "TTWREIS COE BOYS Narsapur",
      location: "Narsapur, India",
      period: "2019 - 2021",
      gpa: "Completed",
      achievements: [
        "Strong foundation in Mathematics",
        "Physics and Chemistry focus",
        "Analytical thinking development",
        "Problem-solving skills enhancement"
      ],
      coursework: [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Computer Science",
        "English Communication"
      ]
    },
    {
      degree: "School of Secondary Certification",
      institution: "ZPHS Boys No-2 Pargi",
      location: "Pargi, Telangana, India",
      period: "2018 - 2019",
      gpa: "83%",
      achievements: [
        "SSC Board of Secondary Education",
        "Strong academic foundation",
        "Excellence in Mathematics and Science"
      ],
      coursework: [
        "Mathematics",
        "Science",
        "Social Studies",
        "English Language",
        "Telugu Language",
        "Hindi Language"
      ]
    }
  ];

  return (
    <section id="education-section" className="py-12 sm:py-16 lg:py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-0.5 h-6 sm:h-8 bg-blue-500"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Education</h2>
            <div className="w-0.5 h-6 sm:h-8 bg-blue-500"></div>
          </div>
          <p className="text-gray-400 max-w-3xl mx-auto text-base sm:text-lg">
            Academic background and professional development journey
          </p>
        </div>

        {/* Education Timeline */}
        <div className={`relative ${isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gray-800"></div>
          
          <div className="space-y-12">
            {education.map((edu, index) => (
              <div key={index} className="relative flex items-center">
                {/* Timeline dot */}
                <div className="absolute left-6 sm:left-8 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full border-4 border-black z-10"></div>
                
                {/* Content */}
                <div className={`ml-16 sm:ml-20 md:ml-0 md:w-full md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 lg:pr-12 md:text-right' : 'md:pl-8 lg:pl-12'}`}>
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 hover:border-blue-500/50 transition-all duration-300">
                      {/* Degree and Institution */}
                      <div className="mb-3 sm:mb-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{edu.degree}</h3>
                        <p className="text-base sm:text-lg text-blue-400 font-medium">{edu.institution}</p>
                      </div>

                      {/* Info row */}
                      <div className={`flex flex-wrap gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{edu.period}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{edu.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span className="text-white font-medium">{edu.gpa}</span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gray-800 mb-3 sm:mb-4"></div>

                      {/* Achievements */}
                      <div className="mb-3 sm:mb-4">
                        <h4 className="text-white font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm sm:text-base">Achievements</span>
                        </h4>
                        <div className="space-y-2">
                          {edu.achievements.map((achievement, achIndex) => (
                            <div key={achIndex} className="flex items-start gap-2">
                              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-600 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                              <span className="text-gray-300 text-xs sm:text-sm">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Coursework */}
                      <div>
                        <h4 className="text-white font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm sm:text-base">Key Courses</span>
                        </h4>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {edu.coursework.map((course, courseIndex) => (
                            <span
                              key={courseIndex}
                              className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gray-800 border border-gray-700 rounded-md text-xs text-gray-300 hover:border-blue-500/30 transition-colors"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out; }
        .animation-delay-200 { animation-delay: 0.2s; }
      `}</style>
    </section>
  );
}
