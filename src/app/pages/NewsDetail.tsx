import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { Calendar, User, ArrowLeft, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GlassCard } from '../components/GlassCard';
import { supabase } from '../../lib/supabase';

interface NewsDetailItem {
  id: string;
  title: string;
  content: any;
  image_url: string;
  created_at: string;
  published: boolean;
  author_id: string;
  profiles?: {
    full_name: string;
    avatar_url: string;
  };
}

export function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsDetailItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase
      .from('news')
      .select('*, profiles(full_name, avatar_url)')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) setNews(data as any);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#10b981] animate-spin" />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-[#e8e8ea] mb-4">Post Not Found</h1>
        <p className="text-[#9ca3af] mb-8">The news post you are looking for does not exist or has been removed.</p>
        <Link to="/news" className="bg-[#10b981] text-[#0a0a0f] px-6 py-2 rounded font-bold hover:bg-[#059669] transition-colors">
          Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/news" 
          className="inline-flex items-center gap-2 text-[#9ca3af] hover:text-[#e8e8ea] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to all news
        </Link>
        
        <GlassCard className="overflow-hidden p-0 mb-12">
          {news.image_url && (
            <div className="aspect-[21/9] overflow-hidden">
              <img 
                src={news.image_url} 
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-6 text-sm text-[#9ca3af] mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#10b981]" />
                {new Date(news.created_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-[#1a1a1f] border border-white/10">
                  <img 
                    src={news.profiles?.avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${news.author_id}`}
                    alt={news.profiles?.full_name || 'Admin'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>By {news.profiles?.full_name || 'Administrator'}</span>
              </div>
            </div>
            
            <h1 
              className="text-4xl md:text-5xl font-bold text-[#e8e8ea] mb-8 leading-tight"
              style={{ fontFamily: 'var(--font-minecraft)' }}
            >
              {news.title}
            </h1>
            
            <div className="prose prose-invert prose-emerald max-w-none prose-lg">
              <ReactMarkdown className="markdown-container text-[#9ca3af] leading-relaxed">
                {news.content?.body || ''}
              </ReactMarkdown>
            </div>
          </div>
        </GlassCard>
        
        {/* Author Bio (Optional) */}
        <div className="mt-12 bg-[#1a1a1f]/60 backdrop-blur-md border border-white/10 rounded-xl p-8 flex items-center gap-6">
          <img 
            src={news.profiles?.avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${news.author_id}`}
            alt={news.profiles?.full_name || 'Admin'}
            className="w-16 h-16 rounded-full border-2 border-[#10b981]/50"
          />
          <div>
            <h3 className="text-xl font-bold font-minecraft text-[#e8e8ea]">Published by {news.profiles?.full_name || 'Admin'}</h3>
            <p className="text-sm text-[#9ca3af] mt-1">Official staff member of the Epic MC community.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
