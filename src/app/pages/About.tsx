import React, { useEffect, useState } from 'react';
import { Users, Server, Globe, Shield, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GlassCard } from '../components/GlassCard';
import { supabase } from '../../lib/supabase';

const features = [
  {
    icon: '⚔️',
    title: 'Survival',
    description: 'Pure vanilla survival experience with custom enhancements. Build, explore, and survive in a vast world with friends.',
    highlights: [
      'Protected land claims',
      'Player shops & trading',
      'Custom world generation',
      'Weekly events & challenges'
    ]
  },
  {
    icon: '💎',
    title: 'Economy',
    description: 'Dynamic player-driven economy with jobs, shops, and trading. Earn emeralds and build your wealth!',
    highlights: [
      'Multiple job types',
      'Auction house system',
      'Player-run shops',
      'Daily rewards'
    ]
  },
  {
    icon: '👻',
    title: 'Custom Mobs',
    description: 'Face unique challenges with custom bosses and mobs. Rare drops and epic loot await brave adventurers.',
    highlights: [
      'Boss dungeons',
      'Custom loot tables',
      'Unique abilities',
      'Legendary weapons'
    ]
  }
];

export function About() {
  const [pageInfo, setPageInfo] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('page_content')
      .select('title, content')
      .eq('page_slug', 'about')
      .maybeSingle()
      .then(({ data }) => {
        if (data && data.content && (data.content as any).body) {
          setPageInfo({ title: data.title ?? '', content: (data.content as any).body });
        }
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

  // If custom content found, render it
  if (pageInfo) {
    return (
      <div className="min-h-screen py-12 px-4 bg-[#0a0a0f] text-[#e8e8ea]">
        <div className="max-w-4xl mx-auto ProseMirror prose prose-invert prose-emerald">
          <h1 
            className="text-4xl mb-4 text-[#10b981] text-center"
            style={{ fontFamily: 'var(--font-minecraft)' }}
          >
            {pageInfo.title}
          </h1>
          <div className="mt-8 bg-[#13131a] border border-white/10 rounded-xl p-8 shadow-xl">
            <ReactMarkdown className="markdown-container text-[#9ca3af] leading-relaxed">
              {pageInfo.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className="text-4xl mb-4 text-[#10b981]"
            style={{ fontFamily: 'var(--font-minecraft)' }}
          >
            About & Features
          </h1>
          <p className="text-xl text-[#9ca3af] max-w-2xl mx-auto">
            Discover what makes Epic MC the ultimate Minecraft survival server
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <GlassCard 
              key={index}
              className="hover:border-[#10b981]/50 transition-all hover:scale-105"
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h2 className="text-2xl text-[#e8e8ea] mb-3">{feature.title}</h2>
                <p className="text-[#9ca3af]">{feature.description}</p>
              </div>

              <div className="space-y-2">
                {feature.highlights.map((highlight, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full" />
                    <span className="text-[#9ca3af]">{highlight}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mb-16">
          <h2 
            className="text-3xl mb-8 text-[#10b981] text-center"
            style={{ fontFamily: 'var(--font-minecraft)' }}
          >
            More Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard>
              <h3 className="text-xl mb-3 text-[#e8e8ea] flex items-center gap-2">
                <span>🛡️</span>
                Protection & Security
              </h3>
              <ul className="space-y-2 text-[#9ca3af]">
                <li>• Grief protection with land claims</li>
                <li>• Anti-cheat system</li>
                <li>• Regular backups</li>
                <li>• 24/7 staff moderation</li>
              </ul>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl mb-3 text-[#e8e8ea] flex items-center gap-2">
                <span>🎮</span>
                Quality of Life
              </h3>
              <ul className="space-y-2 text-[#9ca3af]">
                <li>• /spawn and /home teleports</li>
                <li>• Player warps</li>
                <li>• Chest shops</li>
                <li>• Virtual inventory (/enderchest)</li>
              </ul>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl mb-3 text-[#e8e8ea] flex items-center gap-2">
                <span>🏆</span>
                Progression & Ranks
              </h3>
              <ul className="space-y-2 text-[#9ca3af]">
                <li>• Rankup system based on playtime</li>
                <li>• Exclusive rank perks</li>
                <li>• Custom titles and tags</li>
                <li>• Achievement system</li>
              </ul>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl mb-3 text-[#e8e8ea] flex items-center gap-2">
                <span>🌍</span>
                Community Events
              </h3>
              <ul className="space-y-2 text-[#9ca3af]">
                <li>• Weekly building contests</li>
                <li>• Seasonal events</li>
                <li>• PvP tournaments</li>
                <li>• Community projects</li>
              </ul>
            </GlassCard>
          </div>
        </div>

        {/* Mission Section */}
        <GlassCard className="border-[#10b981]/30">
          <div className="text-center max-w-3xl mx-auto">
            <h2 
              className="text-3xl mb-6 text-[#10b981]"
              style={{ fontFamily: 'var(--font-minecraft)' }}
            >
              Our Mission
            </h2>
            <p className="text-lg text-[#9ca3af] leading-relaxed mb-6">
              At Epic MC, we strive to create the perfect balance between vanilla Minecraft 
              and enhanced gameplay. Our goal is to provide a welcoming, lag-free environment 
              where players can enjoy classic survival with quality-of-life improvements and 
              exciting custom content.
            </p>
            <p className="text-lg text-[#9ca3af] leading-relaxed">
              We believe in fair play, community-driven development, and maintaining the core 
              essence of what makes Minecraft great. Join us and be part of something special!
            </p>
          </div>
        </GlassCard>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Players', value: '500+' },
            { label: 'Uptime', value: '99.9%' },
            { label: 'Custom Plugins', value: '25+' },
            { label: 'Server Age', value: '2 Years' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-[#1a1a1f]/60 backdrop-blur-md border border-white/10 rounded overflow-hidden"
            >
              <div 
                className="text-3xl text-[#10b981] mb-2"
                style={{ fontFamily: 'var(--font-minecraft)' }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-[#9ca3af]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
