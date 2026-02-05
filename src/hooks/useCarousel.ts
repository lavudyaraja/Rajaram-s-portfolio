import { useState, useEffect, useCallback } from 'react';

export const useCarousel = (projectsLength: number, autoPlayInterval: number = 4000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projectsLength);
  }, [projectsLength]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projectsLength) % projectsLength);
  }, [projectsLength]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-rotation logic
  useEffect(() => {
    if (!isPaused && projectsLength > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % projectsLength);
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [isPaused, projectsLength, autoPlayInterval]);

  return {
    currentIndex,
    setCurrentIndex,
    isPaused,
    setIsPaused,
    nextSlide,
    prevSlide,
    goToSlide
  };
};

export const useAutoPlayingCarousel = (projectsLength: number, autoPlayInterval: number = 4000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsLength);
  }, [projectsLength]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projectsLength) % projectsLength);
  }, [projectsLength]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (!isAutoPlaying || projectsLength === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, projectsLength, nextSlide, autoPlayInterval]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return {
    currentIndex,
    setCurrentIndex,
    isAutoPlaying,
    setIsAutoPlaying,
    nextSlide,
    prevSlide,
    goToSlide,
    handleMouseEnter,
    handleMouseLeave
  };
};
