"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Calendar, PenTool, Code, BookOpen, ArrowRight, Clock, TrendingUp, Star, Filter, Search, Bookmark, Share2, Heart, MessageCircle, Eye, Zap, Layers, Grid3x3, List, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { getRealIconUrl } from '@/utils/realTechIcons';

interface BlogPost {
  id: string;
  title: string;
  preview: string;
  content?: string;
  publishDate: string;
  tags: string[];
  icon: 'pen' | 'code' | 'book';
  readTime: string;
  featured?: boolean;
  views?: number;
  likes?: number;
  comments?: number;
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  image?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable React Applications with TypeScript',
    preview: 'Explore advanced patterns and best practices for creating maintainable React applications using TypeScript. Learn about proper component architecture, state management, and performance optimization techniques.',
    content: 'Deep dive into TypeScript patterns for React applications...',
    publishDate: '2024-07-15',
    tags: ['React', 'TypeScript', 'Architecture'],
    icon: 'code',
    readTime: '8 min read',
    featured: true,
    views: 15420,
    likes: 342,
    comments: 28,
    category: 'Frontend',
    difficulty: 'advanced',
    image: '/blog/react-typescript.jpg'
  },
  {
    id: '2',
    title: 'The Art of Clean Code: Principles Every Developer Should Know',
    preview: 'Dive deep into the fundamental principles of writing clean, readable code. Discover how proper naming conventions, function design, and code organization can transform your development workflow.',
    publishDate: '2024-07-08',
    tags: ['Best Practices', 'Clean Code', 'Software Engineering'],
    icon: 'pen',
    readTime: '12 min read',
    featured: true,
    views: 12350,
    likes: 289,
    comments: 41,
    category: 'Best Practices',
    difficulty: 'intermediate'
  },
  {
    id: '3',
    title: 'Modern CSS Techniques: From Grid to Container Queries',
    preview: 'Master the latest CSS features that are revolutionizing web design. Learn about CSS Grid, Flexbox, Container Queries, and how to create responsive layouts without media queries.',
    publishDate: '2024-06-28',
    tags: ['CSS', 'Web Design', 'Responsive'],
    icon: 'book',
    readTime: '10 min read',
    views: 9870,
    likes: 198,
    comments: 15,
    category: 'CSS',
    difficulty: 'intermediate'
  },
  {
    id: '4',
    title: 'Mastering Git Workflows for Team Collaboration',
    preview: 'Learn advanced Git techniques and workflows that streamline team collaboration. Explore branching strategies, conflict resolution, and automation tools that boost productivity.',
    publishDate: '2024-06-20',
    tags: ['Git', 'DevOps', 'Collaboration'],
    icon: 'code',
    readTime: '15 min read',
    views: 7650,
    likes: 156,
    comments: 22,
    category: 'DevOps',
    difficulty: 'advanced'
  },
  {
    id: '5',
    title: 'Performance Optimization in Modern Web Applications',
    preview: 'Uncover the secrets of building lightning-fast web applications. From bundle optimization to lazy loading, discover techniques that significantly improve user experience.',
    publishDate: '2024-06-12',
    tags: ['Performance', 'Optimization', 'Web Vitals'],
    icon: 'book',
    readTime: '14 min read',
    views: 11200,
    likes: 267,
    comments: 33,
    category: 'Performance',
    difficulty: 'advanced'
  },
  {
    id: '6',
    title: 'The Future of Frontend Development: Trends to Watch',
    preview: 'Stay ahead of the curve with insights into emerging frontend technologies and methodologies. Explore what the next generation of web development looks like.',
    publishDate: '2024-06-05',
    tags: ['Frontend', 'Trends', 'Future Tech'],
    icon: 'pen',
    readTime: '11 min read',
    views: 18900,
    likes: 423,
    comments: 67,
    category: 'Trends',
    difficulty: 'beginner'
  }
];

const categories = ['All', 'Frontend', 'Backend', 'DevOps', 'CSS', 'Performance', 'Best Practices', 'Trends'];
const difficulties = ['All', 'beginner', 'intermediate', 'advanced'];

const getIcon = (iconType: string) => {
  switch (iconType) {
    case 'pen':
      return <PenTool className="w-5 h-5" />;
    case 'code':
      return <Code className="w-5 h-5" />;
    case 'book':
      return <BookOpen className="w-5 h-5" />;
    default:
      return <PenTool className="w-5 h-5" />;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const getDifficultyColor = (difficulty?: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'intermediate':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'advanced':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

const FeaturedPostCard = ({ post }: { post: BlogPost }) => (
  <article className="group relative bg-gray-900 rounded-3xl overflow-hidden border border-gray-700 hover:border-cyan-500/30 transition-all duration-500 hover:transform hover:scale-[1.02]">
    {/* Featured Badge */}
    <div className="absolute top-6 left-6 z-20">
      <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full">
        <Star className="w-3 h-3 text-yellow-400" />
        <span className="text-xs font-medium text-yellow-400">Featured</span>
      </div>
    </div>

    {/* Image Background */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-black/40" />
    </div>

    <div className="relative z-10 p-8 md:p-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400">
              {getIcon(post.icon)}
            </div>
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishDate)}</span>
              <span className="text-gray-600">•</span>
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="mb-4">
            <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(post.difficulty)}`}>
              <Zap className="w-3 h-3" />
              {post.difficulty}
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-cyan-300 transition-colors duration-300">
            {post.title}
          </h3>
          
          <p className="text-gray-300 text-lg leading-relaxed mb-6 line-clamp-3">
            {post.preview}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-white/10 text-gray-300 rounded-full border border-white/10 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300"
              >
                <img
                  src={getRealIconUrl(tag)}
                  alt={tag}
                  className="w-3 h-3"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                {tag}
              </span>
            ))}
          </div>
          {/* Stats */}
          <div className="flex items-center gap-6 mb-6 text-gray-400 text-sm">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{post.views?.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link 
              href={`/blog/${post.id}`} 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-300 group/btn"
            >
              <span>Read Article</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-300">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-300">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
);

const StandardPostCard = ({ post, index }: { post: BlogPost; index: number }) => (
  <article
    className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-cyan-500/30 transition-all duration-500 hover:transform hover:scale-[1.02]"
    style={{
      animationDelay: `${index * 0.1}s`
    }}
  >
    <div className="relative z-10 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400">
            {getIcon(post.icon)}
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(post.publishDate)}</span>
            <span className="text-gray-600">•</span>
            <Clock className="w-3 h-3" />
            <span>{post.readTime}</span>
          </div>
        </div>
        {post.difficulty && (
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(post.difficulty)}`}>
            {post.difficulty}
          </span>
        )}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-cyan-300 transition-colors duration-300">
        {post.title}
      </h3>
      
      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
        {post.preview}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-white/10 text-gray-300 rounded-full border border-white/10 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300"
          >
            <img
              src={getRealIconUrl(tag)}
              alt={tag}
              className="w-2.5 h-2.5"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            {tag}
          </span>
        ))}
        {post.tags.length > 3 && (
          <span className="px-2 py-1 text-xs font-medium bg-white/5 text-gray-400 rounded-full">
            +{post.tags.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-gray-400 text-xs">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{post.views?.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3" />
            <span>{post.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-3 h-3" />
            <span>{post.comments}</span>
          </div>
        </div>

        <Link 
          href={`/blog/${post.id}`} 
          className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-cyan-300 rounded-lg font-medium text-sm transition-all duration-300 group/btn backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-400/50"
        >
          <span>Read</span>
          <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  </article>
);

const CompactPostCard = ({ post }: { post: BlogPost }) => (
  <article className="group relative bg-gray-900 rounded-xl p-4 border border-gray-700 hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:translate-x-2">
    <div className="flex items-center gap-4">
      <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 flex-shrink-0">
        {getIcon(post.icon)}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-gray-400">{formatDate(post.publishDate)}</span>
          <span className="text-gray-600">•</span>
          <span className="text-xs text-gray-400">{post.readTime}</span>
          {post.difficulty && (
            <>
              <span className="text-gray-600">•</span>
              <span className={`text-xs font-medium ${getDifficultyColor(post.difficulty).split(' ')[0]}`}>
                {post.difficulty}
              </span>
            </>
          )}
        </div>
        
        <h3 className="text-sm font-semibold text-white mb-1 leading-tight group-hover:text-cyan-300 transition-colors duration-300 truncate">
          {post.title}
        </h3>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Eye className="w-3 h-3" />
            <span>{post.views?.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Heart className="w-3 h-3" />
            <span>{post.likes}</span>
          </div>
        </div>
      </div>
      
      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300 flex-shrink-0" />
    </div>
  </article>
);

export default function BlogSection() {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  useEffect(() => {
    let filtered = blogPosts;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(post => post.difficulty === selectedDifficulty);
    }

    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, selectedDifficulty, searchTerm]);

  const featuredPost = filteredPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <section className="relative bg-black overflow-hidden font-sans">
      {/* Simple Black Background */}
      <div className="absolute inset-0 bg-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Advanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
            <PenTool className="w-4 h-4 text-cyan-400" />
            <span className="text-gray-300 text-sm font-medium">Latest Articles</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Developer
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> Blog</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Insights, tutorials, and thoughts on modern web development, clean code practices, and emerging technologies.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, tags, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300"
              />
            </div>
          </div>

          {/* Advanced Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 p-1 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-cyan-500/20 text-cyan-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-cyan-500/20 text-cyan-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  viewMode === 'compact' 
                    ? 'bg-cyan-500/20 text-cyan-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="max-w-4xl mx-auto mb-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 text-sm font-medium rounded-lg border transition-all duration-300 ${
                          selectedCategory === category
                            ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Difficulty</label>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map((difficulty) => (
                      <button
                        key={difficulty}
                        onClick={() => setSelectedDifficulty(difficulty)}
                        className={`px-3 py-1 text-sm font-medium rounded-lg border transition-all duration-300 ${
                          selectedDifficulty === difficulty
                            ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {difficulty}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="text-center text-gray-400 text-sm">
            Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
            {searchTerm && ` for "${searchTerm}"`}
          </div>
        </div>

        {/* Blog Content */}
        <div className="space-y-8">
          {/* Featured Post */}
          {featuredPost && viewMode === 'grid' && (
            <div className="mb-12">
              <FeaturedPostCard post={featuredPost} />
            </div>
          )}

          {/* Regular Posts Grid/List */}
          {viewMode === 'grid' && (
            <div className="grid md:grid-cols-2 gap-8">
              {regularPosts.map((post, index) => (
                <StandardPostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          )}

          {viewMode === 'list' && (
            <div className="space-y-6">
              {filteredPosts.map((post, index) => (
                <StandardPostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          )}

          {viewMode === 'compact' && (
            <div className="space-y-3">
              {filteredPosts.map((post) => (
                <CompactPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 backdrop-blur-sm text-cyan-300 rounded-2xl font-medium border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 group/all"
          >
            <span className="text-lg">View All Articles</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}