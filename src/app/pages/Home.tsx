import React, { useState } from 'react';
import { Copy, Check, Youtube } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { BlockyButton } from '../components/BlockyButton';
import { StatusBar } from '../components/StatusBar';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const SERVER_IP = 'play.epicmc.net';

const newsItems = [
  {
    id: 1,
    title: 'New Custom Dungeon Released!',
    date: 'March 20, 2026',
    image: 'https://images.unsplash.com/photo-1606048683263-ce0673504920?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5lY3JhZnQlMjBidWlsZGluZyUyMGNhc3RsZXxlbnwxfHx8fDE3NzQ0NDU3NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    excerpt: 'Explore the Deepslate Fortress with epic loot and challenging bosses!'
  },
  {
    id: 2,
    title: 'Economy Update v2.5',
    date: 'March 18, 2026',
    image: 'https://images.unsplash.com/photo-1689592662265-48f23426af9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5lY3JhZnQlMjBsYW5kc2NhcGUlMjB0ZXJyYWlufGVufDF8fHx8MTc3NDQ3NDAwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    excerpt: 'New jobs, shops, and trading system now available. Start earning emeralds!'
  },
  {
    id: 3,
    title: 'Spring Building Contest',
    date: 'March 15, 2026',
    image: 'https://images.unsplash.com/photo-1579178760475-626f78deed23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5lY3JhZnQlMjB2aWxsYWdlJTIwdG93bnxlbnwxfHx8fDE3NzQ0NzQwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    excerpt: 'Show off your building skills! Prizes include ranks and exclusive items.'
  }
];

export function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#10b981]/20 to-transparent" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 
              className="text-4xl md:text-6xl mb-6 text-[#10b981]"
              style={{ fontFamily: 'var(--font-minecraft)' }}
            >
              EPIC MC
            </h1>
            <p className="text-xl text-[#9ca3af] mb-8">
              The Ultimate Survival Experience
            </p>
            
            <StatusBar online={true} ping={12} playerCount="42/100 Players" />
          </div>

          <GlassCard className="max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-sm text-[#9ca3af] mb-2">Server Address</p>
              <div className="flex items-center justify-center gap-3 mb-4">
                <code className="text-2xl text-[#10b981] px-4 py-2 bg-[#0a0a0f] rounded border border-[#10b981]/30">
                  {SERVER_IP}
                </code>
                <BlockyButton onClick={handleCopy} variant="primary">
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </BlockyButton>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#10b981] text-[#0a0a0f] rounded">
                <div className="w-2 h-2 bg-[#0a0a0f] rounded-full animate-pulse" />
                <span>Server Online</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Latest News */}
          <div className="md:col-span-2">
            <h2 
              className="text-2xl mb-6 text-[#10b981]"
              style={{ fontFamily: 'var(--font-minecraft)' }}
            >
              Latest News
            </h2>
            
            <div className="space-y-6">
              {newsItems.map(item => (
                <GlassCard key={item.id} className="hover:border-[#10b981]/50 transition-colors cursor-pointer">
                  <div className="flex gap-4">
                    <ImageWithFallback 
                      src={item.image}
                      alt={item.title}
                      className="w-32 h-32 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl mb-2 text-[#e8e8ea]">{item.title}</h3>
                      <p className="text-sm text-[#9ca3af] mb-2">{item.date}</p>
                      <p className="text-[#9ca3af]">{item.excerpt}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div>
              <h3 
                className="text-xl mb-4 text-[#10b981]"
                style={{ fontFamily: 'var(--font-minecraft)' }}
              >
                Quick Connect
              </h3>
              <GlassCard>
                <div className="text-center">
                  <p className="text-sm text-[#9ca3af] mb-4">
                    Scan to sync your account
                  </p>
                  <div className="w-48 h-48 mx-auto bg-white p-4 rounded">
                    {/* QR Code Placeholder */}
                    <div className="w-full h-full bg-black/90 flex items-center justify-center">
                      <div className="text-white text-xs">QR CODE</div>
                    </div>
                  </div>
                  <p className="text-xs text-[#9ca3af] mt-4">
                    Mobile players: Scan to link
                  </p>
                </div>
              </GlassCard>
            </div>

            <div>
              <h3 
                className="text-xl mb-4 text-[#10b981]"
                style={{ fontFamily: 'var(--font-minecraft)' }}
              >
                Community
              </h3>
              <GlassCard>
                <div className="space-y-3">
                  <BlockyButton variant="secondary" className="w-full flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    Discord
                  </BlockyButton>
                  <BlockyButton variant="secondary" className="w-full flex items-center justify-center gap-2">
                    <Youtube className="w-5 h-5" />
                    YouTube
                  </BlockyButton>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
