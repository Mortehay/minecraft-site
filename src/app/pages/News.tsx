import React, { useEffect, useState } from 'react';
import { Calendar, User, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router';
import { GlassCard } from '../components/GlassCard';
import { supabase } from '../../lib/supabase';

interface NewsItem {
  id: string;
  title: string;
  content: any;
  image_url: string;
  created_at: string;
  published: boolean;
  author_id: string;
  profiles?: {
    full_name: string;
  };
}

export function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('news')
      .select('*, profiles(full_name)')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setNews(data as any);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#10b981] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 
            className="text-4xl mb-4 text-[#10b981]"
            style={{ fontFamily: 'var(--font-minecraft)' }}
          >
            Server News
          </h1>
          <p className="text-xl text-[#9ca3af]">
            Stay up to date with the latest updates and events
          </p>
        </div>

        {news.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <GlassCard key={item.id} className="group overflow-hidden flex flex-col h-full">
                {item.image_url && (
                  <div className="aspect-video overflow-hidden -mx-6 -mt-6 mb-6">
                    <img 
                      src={item.image_url} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-4 text-xs text-[#9ca3af] mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {item.profiles?.full_name || 'Admin'}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[#e8e8ea] mb-3 group-hover:text-[#10b981] transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-[#9ca3af] text-sm line-clamp-3 mb-6">
                    {item.content?.body || ''}
                  </p>
                </div>
                <Link 
                  to={`/news/${item.id}`} 
                  className="inline-flex items-center gap-2 text-[#10b981] hover:text-[#34d399] font-medium transition-colors mt-auto"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </GlassCard>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[#9ca3af] text-lg">No news posts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
