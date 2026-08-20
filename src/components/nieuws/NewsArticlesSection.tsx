'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Sparkles, ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { getImageUrl } from '@/sanity/image';

export interface NewsArticleItem {
    _id?: string;
    title: string;
    slug: string;
    category?: string;
    excerpt?: string;
    readTime?: string;
    publishedAt?: string;
    authorName?: string;
    imagePath?: string;
    mainImage?: any;
    isFeatured?: boolean;
    featured?: boolean;
}

export interface NewsArticlesSectionProps {
    articles: NewsArticleItem[];
    locale?: string;
}

export function NewsArticlesSection({ articles, locale = 'nl' }: NewsArticlesSectionProps) {
    const isEn = locale === 'en';
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const categories = useMemo(() => {
        return [
            { id: 'all', label: isEn ? 'All Articles' : 'Alle Artikelen' },
            { id: 'Organisatie', label: isEn ? 'Organization' : 'Organisatie' },
            { id: 'Wet & Regelgeving', label: isEn ? 'Legislation & Tax' : 'Wet & Regelgeving' },
            { id: 'Vastgoedbeheer', label: isEn ? 'Property Management' : 'Vastgoedbeheer' },
            { id: 'ERP & Business Central', label: isEn ? 'ERP & Business Central' : 'ERP & Business Central' },
        ];
    }, [isEn]);

    const filteredArticles = useMemo(() => {
        return articles.filter((article) => {
            const matchesCategory =
                selectedCategory === 'all' ||
                (article.category && article.category.toLowerCase() === selectedCategory.toLowerCase());

            const query = searchQuery.toLowerCase().trim();
            const matchesSearch =
                !query ||
                article.title.toLowerCase().includes(query) ||
                (article.excerpt && article.excerpt.toLowerCase().includes(query)) ||
                (article.category && article.category.toLowerCase().includes(query));

            return matchesCategory && matchesSearch;
        });
    }, [articles, selectedCategory, searchQuery]);

    const featuredArticle = useMemo(() => {
        if (selectedCategory === 'all' && !searchQuery && filteredArticles.length > 0) {
            const explicitFeatured = filteredArticles.find((a) => a.isFeatured || a.featured);
            return explicitFeatured || filteredArticles[0];
        }
        return null;
    }, [filteredArticles, selectedCategory, searchQuery]);

    const gridArticles = useMemo(() => {
        if (featuredArticle) {
            return filteredArticles.filter((a) => a._id !== featuredArticle._id && a.slug !== featuredArticle.slug);
        }
        return filteredArticles;
    }, [filteredArticles, featuredArticle]);

    return (
        <section className='px-6 py-16 max-w-7xl mx-auto space-y-12 relative z-10'>
            {/* Filter & Search Controls */}
            <div className='flex flex-col md:flex-row items-center justify-between gap-6 p-4 rounded-2xl border border-slate-200 bg-white shadow-sm'>
                {/* Category Pills */}
                <div className='flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none'>
                    {categories.map((cat) => {
                        const isActive = selectedCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wide transition-all duration-200 whitespace-nowrap ${
                                    isActive
                                        ? 'bg-darkblue text-white shadow-md'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-darkblue'
                                }`}
                            >
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Search Bar */}
                <div className='relative w-full md:w-72 shrink-0'>
                    <Search className='w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2' />
                    <input
                        type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={isEn ? 'Search articles...' : 'Zoek artikelen...'}
                        className='w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber focus:bg-white transition-all'
                    />
                </div>
            </div>

            {/* Featured Article Spotlight */}
            {featuredArticle && (
                <div className='rounded-3xl border border-amber/30 bg-slate-950 text-white overflow-hidden shadow-2xl group transition-all hover:border-amber/60'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch'>
                        <div className='lg:col-span-6 relative min-h-[300px] lg:min-h-[420px] bg-slate-900 overflow-hidden'>
                            <Image
                                src={getImageUrl(featuredArticle.mainImage, featuredArticle.imagePath || '/emlinked/news/Afbeeling-Iryna-en-Raymond-emlinked-versterkt-team-en-zet-koers-voor-verdere-groei-in-2026-1.png')}
                                alt={featuredArticle.title}
                                fill
                                sizes='(max-width: 1024px) 100vw, 50vw'
                                className='object-cover object-center group-hover:scale-105 transition-transform duration-700'
                                priority
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden' />
                            <div className='absolute top-4 left-4'>
                                <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber text-slate-950 font-mono text-[11px] font-bold uppercase shadow-md'>
                                    <Sparkles className='w-3 h-3' />
                                    <span>{isEn ? 'Featured Spotlight' : 'Uitgelicht Artikel'}</span>
                                </span>
                            </div>
                        </div>

                        <div className='lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between space-y-6 text-left relative z-10'>
                            <div className='space-y-4'>
                                <div className='flex items-center gap-4 text-xs font-mono text-amber'>
                                    {featuredArticle.category && (
                                        <span className='px-2.5 py-1 rounded-md bg-white/10 border border-white/10 uppercase tracking-wider font-semibold'>
                                            {featuredArticle.category}
                                        </span>
                                    )}
                                    {featuredArticle.readTime && (
                                        <span className='flex items-center gap-1 text-slate-400'>
                                            <Clock className='w-3.5 h-3.5' />
                                            <span>{featuredArticle.readTime}</span>
                                        </span>
                                    )}
                                </div>

                                <h2 className='font-display font-bold text-2xl lg:text-3xl text-white group-hover:text-amber transition-colors leading-tight'>
                                    <Link href={isEn ? `/en/news/${featuredArticle.slug}` : `/nieuws/${featuredArticle.slug}`}>
                                        {featuredArticle.title}
                                    </Link>
                                </h2>

                                <p className='text-slate-300 text-sm md:text-base leading-relaxed font-light line-clamp-3'>
                                    {featuredArticle.excerpt}
                                </p>
                            </div>

                            <div className='pt-4 border-t border-white/10 flex items-center justify-between'>
                                <div className='flex items-center gap-2 text-xs text-slate-300 font-mono'>
                                    <User className='w-3.5 h-3.5 text-amber' />
                                    <span>{featuredArticle.authorName || 'emlinked Team'}</span>
                                </div>

                                <Link
                                    href={isEn ? `/en/news/${featuredArticle.slug}` : `/nieuws/${featuredArticle.slug}`}
                                    className='inline-flex items-center gap-2 text-xs font-bold text-amber hover:text-white transition-colors'
                                >
                                    <span>{isEn ? 'Read Article' : 'Lees Artikel'}</span>
                                    <ArrowRight className='w-4 h-4' />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Articles Grid */}
            {gridArticles.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {gridArticles.map((art) => {
                        const imgUrl = getImageUrl(art.mainImage, art.imagePath || '/emlinked/news/Wet-Goed-Verhuurderschap-emlinked.jpg');

                        return (
                            <div
                                key={art._id || art.slug}
                                className='group rounded-2xl border border-slate-200 bg-white text-slate-900 p-0 flex flex-col justify-between hover:border-amber/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden'
                            >
                                {/* Thumbnail Image */}
                                <div className='relative w-full h-48 bg-slate-100 overflow-hidden'>
                                    <Image
                                        src={imgUrl}
                                        alt={art.title}
                                        fill
                                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                        className='object-cover object-center group-hover:scale-105 transition-transform duration-500'
                                    />
                                    {art.category && (
                                        <div className='absolute top-3 left-3'>
                                            <span className='px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-amber font-mono text-[10px] font-bold uppercase shadow-sm'>
                                                {art.category}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className='p-6 space-y-4 flex-1 flex flex-col justify-between text-left'>
                                    <div className='space-y-3'>
                                        <div className='flex items-center justify-between text-[11px] font-mono text-slate-600'>
                                            {art.readTime && (
                                                <span className='flex items-center gap-1'>
                                                    <Clock className='w-3 h-3 text-amber' />
                                                    <span>{art.readTime}</span>
                                                </span>
                                            )}
                                            {art.publishedAt && (
                                                <span className='flex items-center gap-1'>
                                                    <Calendar className='w-3 h-3 text-slate-400' />
                                                    <span>{new Date(art.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'nl-NL', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                </span>
                                            )}
                                        </div>

                                        <h3 className='font-display font-bold text-lg text-darkblue group-hover:text-amber transition-colors leading-snug line-clamp-2'>
                                            <Link href={isEn ? `/en/news/${art.slug}` : `/nieuws/${art.slug}`}>
                                                {art.title}
                                            </Link>
                                        </h3>

                                        <p className='text-xs text-slate-600 leading-relaxed font-light line-clamp-3'>
                                            {art.excerpt}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className='pt-4 mt-4 border-t border-slate-100 flex items-center justify-between'>
                                        <span className='text-[11px] font-mono text-slate-600 flex items-center gap-1.5'>
                                            <User className='w-3.5 h-3.5 text-amber' />
                                            <span>{art.authorName || 'emlinked Team'}</span>
                                        </span>

                                        <Link
                                            href={isEn ? `/en/news/${art.slug}` : `/nieuws/${art.slug}`}
                                            className='inline-flex items-center gap-1.5 text-xs font-bold text-darkblue group-hover:text-amber transition-colors'
                                        >
                                            <span>{isEn ? 'Read Article' : 'Lees Artikel'}</span>
                                            <ArrowRight className='w-3.5 h-3.5' />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className='p-12 text-center rounded-2xl border border-slate-200 bg-white space-y-4'>
                    <p className='text-slate-600 text-sm'>
                        {isEn ? 'No articles found matching your query.' : 'Geen artikelen gevonden voor de gekozen zoekopdracht.'}
                    </p>
                    <button
                        onClick={() => {
                            setSelectedCategory('all');
                            setSearchQuery('');
                        }}
                        className='px-4 py-2 rounded-xl bg-amber text-slate-950 font-bold text-xs hover:bg-amber-light transition-all'
                    >
                        {isEn ? 'Reset Filters' : 'Reset Filters'}
                    </button>
                </div>
            )}
        </section>
    );
}
