import React, { useEffect, useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GlassCard } from '../components/GlassCard';
import { supabase } from '../../lib/supabase';

const categories = [
  { id: 'all', name: 'All Plugins' },
  { id: 'economy', name: 'Economy' },
  { id: 'land', name: 'Land Claims' },
  { id: 'combat', name: 'Combat' },
  { id: 'utility', name: 'Utility' },
  { id: 'social', name: 'Social' }
];

const staticPlugins = [
  {
    id: 1,
    name: 'EssentialsX',
    version: '2.20.1',
    category: 'utility',
    function: 'Core server utilities and commands',
    commands: ['/spawn', '/home', '/sethome', '/tpa', '/warp']
  },
  {
    id: 2,
    name: 'GriefPrevention',
    version: '16.18',
    category: 'land',
    function: 'Protect your builds from grief with land claims',
    commands: ['/abandonclaim', '/trust', '/untrust', '/claimlist', '/claimexplosions']
  },
  {
    id: 3,
    name: 'Vault',
    version: '1.7.3',
    category: 'economy',
    function: 'Economy API and permission management',
    commands: ['/balance', '/pay', '/baltop']
  },
  {
    id: 4,
    name: 'ChestShop',
    version: '3.12',
    category: 'economy',
    function: 'Create shops using chests and signs',
    commands: ['/iteminfo', '/csVersion', '/csMetrics']
  },
  {
    id: 5,
    name: 'Jobs Reborn',
    version: '5.2.0',
    category: 'economy',
    function: 'Join jobs and earn money for your work',
    commands: ['/jobs browse', '/jobs join', '/jobs leave', '/jobs info', '/jobs stats']
  },
  {
    id: 6,
    name: 'mcMMO',
    version: '2.1.220',
    category: 'combat',
    function: 'RPG-style leveling system with skills',
    commands: ['/mcstats', '/mctop', '/mcability', '/mcrank']
  },
  {
    id: 7,
    name: 'DiscordSRV',
    version: '1.26.2',
    category: 'social',
    function: 'Bridge between Minecraft and Discord',
    commands: ['/discord link', '/discord unlink']
  },
  {
    id: 8,
    name: 'AuctionHouse',
    version: '3.5.0',
    category: 'economy',
    function: 'Server-wide auction system for trading items',
    commands: ['/ah', '/ah sell', '/ah search', '/ah expired']
  },
  {
    id: 9,
    name: 'Custom Enchants',
    version: '4.1.0',
    category: 'combat',
    function: 'Add unique custom enchantments to weapons',
    commands: ['/ce list', '/ce info', '/ce apply']
  },
  {
    id: 10,
    name: 'QuickShop',
    version: '6.1.0',
    category: 'economy',
    function: 'Alternative chest shop system',
    commands: ['/qs create', '/qs buy', '/qs sell', '/qs price']
  }
];

export function PluginWiki() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [pageInfo, setPageInfo] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('page_content')
      .select('title, content')
      .eq('page_slug', 'wiki')
      .maybeSingle()
      .then(({ data }) => {
        if (data && data.content && (data.content as any).body) {
          setPageInfo({ title: data.title ?? '', content: (data.content as any).body });
        }
        setLoading(false);
      });
  }, []);

  const filteredPlugins = staticPlugins.filter(plugin => {
    const matchesCategory = selectedCategory === 'all' || plugin.category === selectedCategory;
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          plugin.function.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 
            className="text-4xl mb-4 text-[#10b981]"
            style={{ fontFamily: 'var(--font-minecraft)' }}
          >
            Plugin Wiki
          </h1>
          <p className="text-xl text-[#9ca3af]">
            Complete guide to all server plugins and commands
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <GlassCard>
              <h3 className="text-xl mb-4 text-[#e8e8ea]">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-2 rounded transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-[#10b981] text-[#0a0a0f]'
                        : 'bg-[#2d2d36] text-[#9ca3af] hover:bg-[#3d3d48]'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-sm text-[#9ca3af] mb-2">Quick Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#9ca3af]">Total Plugins:</span>
                    <span className="text-[#10b981]">{staticPlugins.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9ca3af]">Categories:</span>
                    <span className="text-[#10b981]">{categories.length - 1}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                <input
                  type="text"
                  placeholder="Search plugins..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#1a1a1f]/60 backdrop-blur-md border border-white/10 rounded text-[#e8e8ea] placeholder-[#9ca3af] focus:outline-none focus:border-[#10b981]"
                />
              </div>
            </div>

            {/* Plugin Table */}
            <GlassCard className="overflow-hidden p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#2d2d36] border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-[#10b981]">Plugin Name</th>
                      <th className="px-6 py-4 text-left text-[#10b981]">Version</th>
                      <th className="px-6 py-4 text-left text-[#10b981]">Function</th>
                      <th className="px-6 py-4 text-left text-[#10b981]">Commands</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPlugins.length > 0 ? (
                      filteredPlugins.map(plugin => (
                        <tr 
                          key={plugin.id}
                          className="border-b border-white/5 hover:bg-[#2d2d36]/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-[#10b981]/20 rounded flex items-center justify-center">
                                <span className="text-[#10b981]">📦</span>
                              </div>
                              <span className="text-[#e8e8ea]">{plugin.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <code className="text-[#9ca3af] text-sm bg-[#0a0a0f] px-2 py-1 rounded">
                              v{plugin.version}
                            </code>
                          </td>
                          <td className="px-6 py-4 text-[#9ca3af]">
                            {plugin.function}
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              {plugin.commands.map((cmd, i) => (
                                <code 
                                  key={i}
                                  className="block text-[#10b981] text-sm"
                                >
                                  {cmd}
                                </code>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-[#9ca3af]">
                          No plugins found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </GlassCard>

            {/* Help Section */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <GlassCard>
                <h3 className="text-xl mb-3 text-[#e8e8ea]">📚 How to Use Commands</h3>
                <div className="space-y-2 text-sm text-[#9ca3af]">
                  <p>• Commands start with <code className="text-[#10b981]">/</code></p>
                  <p>• Arguments in <code className="text-[#10b981]">&lt;brackets&gt;</code> are required</p>
                  <p>• Arguments in <code className="text-[#10b981]">[brackets]</code> are optional</p>
                  <p>• Type <code className="text-[#10b981]">/help &lt;plugin&gt;</code> for more info</p>
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="text-xl mb-3 text-[#e8e8ea]">❓ Need Help?</h3>
                <div className="space-y-2 text-sm text-[#9ca3af]">
                  <p>• Use <code className="text-[#10b981]">/help</code> in-game</p>
                  <p>• Ask staff members for assistance</p>
                  <p>• Join our Discord for detailed guides</p>
                  <p>• Check our forums for tutorials</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
