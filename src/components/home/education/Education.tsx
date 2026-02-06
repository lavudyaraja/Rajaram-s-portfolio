"use client";

import { GraduationCap, Calendar, MapPin, Award, BookOpen, University, Building, School } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Education() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const isEducationPage = pathname === "/education";

  useEffect(() => {
    if (isEducationPage) {
      setIsVisible(true);
      return;
    }

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
      percentage: "In Progress",
      type: "university",
      icon: <University className="w-6 h-6" />,
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
      percentage: "91%",
      type: "college",
      icon: <Building className="w-6 h-6" />,
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
      percentage: "83%",
      type: "school",
      icon: <School className="w-6 h-6" />,
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
    const colorMap: { [key: string]: { bg: string; border: string; text: string; light: string; accent: string; gradient: string } } = {
      blue: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        text: "text-blue-400",
        light: "bg-blue-500/20",
        accent: "border-blue-500",
        gradient: "from-blue-500 to-cyan-500"
      },
      purple: {
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        text: "text-purple-400",
        light: "bg-purple-500/20",
        accent: "border-purple-500",
        gradient: "from-purple-500 to-pink-500"
      },
      green: {
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        text: "text-green-400",
        light: "bg-green-500/20",
        accent: "border-green-500",
        gradient: "from-green-500 to-emerald-500"
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section id={isEducationPage ? undefined : 'education-section'} className="relative py-12 sm:py-16 lg:py-20 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <div className="relative">
              <GraduationCap className="w-6 h-6 text-blue-400" />
            </div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent bg-300% leading-tight">
            Education Journey
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Academic excellence and continuous learning in computer science
          </p>
        </div>

        {/* Education Timeline */}
        <div className="space-y-8">
          {education.map((edu, index) => {
            const colors = getColorClasses(edu.color);
            
            return (
              <div key={index} className="relative">
                {/* Timeline line */}
                {index < education.length - 1 && (
                  <div className="absolute left-6 sm:left-8 top-16 sm:top-24 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-green-500/30" />
                )}
                
                <div className="flex gap-4 sm:gap-6">
                  {/* Icon circle */}
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 ${colors.bg} border-2 ${colors.accent} rounded-full flex items-center justify-center backdrop-blur-sm`}>
                      <div className={`${colors.text} w-5 h-5 sm:w-6 sm:h-6`}>
                        {edu.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content card */}
                  <div className={`flex-1 p-4 sm:p-6 ${colors.bg} border ${colors.border} rounded-2xl backdrop-blur-sm hover:border-${edu.color}-500/50 transition-all duration-300`}>
                    <div className="flex flex-col gap-3 mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl sm:text-2xl font-bold text-white mb-1">{edu.degree}</h3>
                        <p className={`${colors.text} font-semibold text-base sm:text-lg`}>{edu.institution}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-400 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{edu.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{edu.period}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className={`px-3 py-2 ${colors.light} rounded-lg border ${colors.border}`}>
                        <div className={`text-xs ${colors.text} font-medium mb-1`}>Status</div>
                        <div className="text-white font-bold text-sm">{edu.gpa}</div>
                      </div>
                      <div className="px-3 py-2 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                        <div className="text-xs text-yellow-400 font-medium mb-1">Score</div>
                        <div className="text-yellow-400 font-bold text-sm">{edu.percentage}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-2 lg:mb-3 flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-400" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-1 lg:space-y-2">
                          {edu.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="text-gray-300 text-xs sm:text-sm flex items-start gap-2">
                              <span className="text-blue-400 mt-1 text-xs">•</span>
                              <span className="leading-relaxed">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-2 lg:mb-3 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-green-400" />
                          Core Coursework
                        </h4>
                        <div className="flex flex-wrap gap-1 lg:gap-2">
                          {edu.coursework.map((course, courseIndex) => (
                            <span key={courseIndex} className={`px-2 lg:px-3 py-1 ${colors.bg} border ${colors.border} rounded-full text-xs text-gray-300`}>
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-gray-900/50 to-blue-900/20 border border-blue-500/20 rounded-lg hover:border-blue-500/40 transition-all duration-300 backdrop-blur-sm">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">{education.length}</div>
              <div className="text-gray-400 text-sm">Education Levels</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-gray-900/50 to-purple-900/20 border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-all duration-300 backdrop-blur-sm">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">20+</div>
              <div className="text-gray-400 text-sm">Key Courses</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-gray-900/50 to-green-900/20 border border-green-500/20 rounded-lg hover:border-green-500/40 transition-all duration-300 backdrop-blur-sm">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">A+</div>
              <div className="text-gray-400 text-sm">Performance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
