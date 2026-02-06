"use client";

import { GraduationCap, Calendar, MapPin, Award, BookOpen, Users, Target, TrendingUp, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Education() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const isEducationPage = pathname === "/education";

  useEffect(() => {
    // If it's a dedicated education page, show content immediately
    if (isEducationPage) {
      setIsVisible(true);
      return;
    }

    // Otherwise, use intersection observer for home page section
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
  }, [isEducationPage]);

  const education = [
    {
      degree: "BTech Computer Science and Engineering",
      institution: "Central University Of Haryana",
      location: "Haryana, India",
      period: "2022 - 2026",
      gpa: "Pursuing",
      type: "university",
      icon: <GraduationCap className="w-5 h-5" />,
      color: "blue",
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
      type: "college",
      icon: <BookOpen className="w-5 h-5" />,
      color: "purple",
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
      type: "school",
      icon: <Target className="w-5 h-5" />,
      color: "green",
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

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; border: string; text: string; light: string; accent: string } } = {
      blue: {
        bg: "bg-blue-500/5",
        border: "border-blue-500/20",
        text: "text-blue-400",
        light: "bg-blue-500/10",
        accent: "border-blue-500"
      },
      purple: {
        bg: "bg-purple-500/5",
        border: "border-purple-500/20",
        text: "text-purple-400",
        light: "bg-purple-500/10",
        accent: "border-purple-500"
      },
      green: {
        bg: "bg-green-500/5",
        border: "border-green-500/20",
        text: "text-green-400",
        light: "bg-green-500/10",
        accent: "border-green-500"
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section id={isEducationPage ? undefined : 'education-section'} className="py-12 sm:py-16 lg:py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <GraduationCap className="w-6 h-6 text-blue-400" />
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            Education
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Academic journey and continuous learning in computer science
          </p>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className={`lg:hidden ${isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            
            <div className="space-y-8">
              {education.map((edu, index) => {
                const colors = getColorClasses(edu.color);
                
                return (
                  <div key={index} className="relative pl-10">
                    {/* Timeline dot */}
                    <div className={`absolute left-2 w-4 h-4 ${colors.light} rounded-full border-2 ${colors.accent} z-10`}></div>
                    
                    {/* Content */}
                    <div className={`bg-gray-900/50 border ${colors.border} rounded-lg p-4 hover:border-gray-700 transition-all duration-300`}>
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 ${colors.light} rounded-lg`}>
                            <div className={colors.text}>
                              {edu.icon}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-sm">{edu.degree}</h3>
                            <p className={`text-xs ${colors.text} font-medium`}>{edu.institution}</p>
                          </div>
                        </div>
                        <div className={`px-2 py-1 ${colors.bg} rounded text-xs font-medium ${colors.text}`}>
                          {edu.gpa}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex items-center gap-4 mb-3 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{edu.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{edu.location}</span>
                        </div>
                      </div>

                      {/* Courses */}
                      <div className="flex flex-wrap gap-1">
                        {edu.coursework.slice(0, 3).map((course, courseIndex) => (
                          <span
                            key={courseIndex}
                            className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300"
                          >
                            {course}
                          </span>
                        ))}
                        {edu.coursework.length > 3 && (
                          <span className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-500">
                            +{edu.coursework.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className={`hidden lg:block ${isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
          <div className="relative">
            {/* Horizontal line */}
            <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"></div>
            
            <div className="flex justify-between items-start relative">
              {education.map((edu, index) => {
                const colors = getColorClasses(edu.color);
                const isActive = activeIndex === index;
                
                return (
                  <div key={index} className="flex-1 relative">
                    {/* Timeline node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-20 z-10">
                      <div 
                        className={`w-12 h-12 ${colors.light} rounded-full border-2 ${colors.accent} flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 ${isActive ? 'scale-110' : ''}`}
                        onClick={() => setActiveIndex(isActive ? null : index)}
                      >
                        <div className={colors.text}>
                          {edu.icon}
                        </div>
                      </div>
                    </div>

                    {/* Content card */}
                    <div 
                      className={`mt-32 mx-4 bg-gray-900/60 backdrop-blur-sm border ${colors.border} rounded-xl p-6 transition-all duration-300 hover:border-gray-600 ${isActive ? 'scale-105 shadow-2xl' : ''}`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                    >
                      {/* Year badge */}
                      <div className={`inline-block px-3 py-1 ${colors.bg} rounded-full mb-4`}>
                        <span className={`text-sm font-medium ${colors.text}`}>{edu.period}</span>
                      </div>

                      {/* Degree */}
                      <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                      <p className={`text-base ${colors.text} font-semibold mb-4`}>{edu.institution}</p>

                      {/* Location */}
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{edu.location}</span>
                      </div>

                      {/* Status */}
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="text-white font-medium">{edu.gpa}</span>
                      </div>

                      {/* Expanded content */}
                      {isActive && (
                        <div className="mt-4 pt-4 border-t border-gray-800 animate-fade-in">
                          {/* Achievements */}
                          <div className="mb-4">
                            <h4 className="text-white font-semibold mb-2 text-sm">Key Achievements</h4>
                            <div className="space-y-1">
                              {edu.achievements.slice(0, 2).map((achievement, achIndex) => (
                                <div key={achIndex} className="flex items-start gap-2">
                                  <ArrowRight className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-300 text-xs">{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Courses */}
                          <div>
                            <h4 className="text-white font-semibold mb-2 text-sm">Key Courses</h4>
                            <div className="flex flex-wrap gap-1">
                              {edu.coursework.slice(0, 4).map((course, courseIndex) => (
                                <span
                                  key={courseIndex}
                                  className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300"
                                >
                                  {course}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Year label */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-36">
                      <div className={`px-3 py-1 ${colors.bg} rounded-full`}>
                        <span className={`text-xs font-medium ${colors.text}`}>{edu.period.split(' - ')[0]}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom stats - All screens */}
        <div className={`mt-16 ${isVisible ? 'animate-fade-in-up animation-delay-400' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-900/30 border border-gray-800 rounded-lg">
              <div className="text-3xl font-bold text-white mb-2">{education.length}</div>
              <div className="text-gray-400 text-sm">Education Levels</div>
            </div>
            <div className="text-center p-6 bg-gray-900/30 border border-gray-800 rounded-lg">
              <div className="text-3xl font-bold text-white mb-2">20+</div>
              <div className="text-gray-400 text-sm">Key Courses</div>
            </div>
            <div className="text-center p-6 bg-gray-900/30 border border-gray-800 rounded-lg">
              <div className="text-3xl font-bold text-white mb-2">A+</div>
              <div className="text-gray-400 text-sm">Performance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
      `}</style>
    </section>
  );
}
