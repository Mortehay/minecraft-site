import React from 'react';
import { LogOut, Clock, Skull, Trophy, Coins } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { BlockyButton } from '../components/BlockyButton';
import { InventorySlot } from '../components/InventorySlot';

// Mock player data
const playerData = {
  username: 'SteveBuilder42',
  rank: 'Diamond',
  rankColor: '#10b981',
  stats: {
    kills: 247,
    deaths: 163,
    playtime: '124h 32m',
    balance: 15420
  },
  equipment: [
    { name: 'Diamond Sword', icon: '⚔️', count: 1 },
    { name: 'Diamond Pickaxe', icon: '⛏️', count: 1 },
    { name: 'Diamond Axe', icon: '🪓', count: 1 },
    { name: 'Bow', icon: '🏹', count: 1 },
    null,
    null,
    { name: 'Golden Apple', icon: '🍎', count: 16 },
    { name: 'Emerald', icon: '💎', count: 64 }
  ],
  stash: [
    { name: 'Diamond', icon: '💠', count: 32 },
    { name: 'Iron Ingot', icon: '⚙️', count: 64 },
    { name: 'Gold Ingot', icon: '🔶', count: 48 },
    { name: 'Ender Pearl', icon: '🔮', count: 16 },
    { name: 'TNT', icon: '💣', count: 12 },
    { name: 'Bread', icon: '🍞', count: 64 },
    { name: 'Potion', icon: '🧪', count: 8 },
    { name: 'Book', icon: '📖', count: 3 },
    // Fill rest with nulls
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null
  ]
};

export function Dashboard() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 
            className="text-4xl text-[#10b981]"
            style={{ fontFamily: 'var(--font-minecraft)' }}
          >
            Player Dashboard
          </h1>
          <BlockyButton variant="secondary" className="flex items-center gap-2">
            <LogOut className="w-5 h-5" />
            Logout
          </BlockyButton>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Player Info */}
          <div className="space-y-6">
            <GlassCard>
              <div className="text-center">
                {/* Player Skin Render - 3D placeholder */}
                <div className="w-48 h-48 mx-auto mb-4 bg-gradient-to-br from-[#10b981]/20 to-[#059669]/20 rounded-lg flex items-center justify-center border-2 border-[#10b981]/30">
                  <div className="text-6xl">🧑‍💻</div>
                </div>
                
                <h2 className="text-2xl mb-2 text-[#e8e8ea]">{playerData.username}</h2>
                
                <div 
                  className="inline-block px-4 py-1 rounded"
                  style={{ 
                    backgroundColor: `${playerData.rankColor}20`,
                    border: `2px solid ${playerData.rankColor}`
                  }}
                >
                  <span 
                    className="text-sm"
                    style={{ color: playerData.rankColor }}
                  >
                    {playerData.rank} Rank
                  </span>
                </div>
              </div>
            </GlassCard>

            {/* Quick Actions */}
            <GlassCard>
              <h3 className="text-xl mb-4 text-[#e8e8ea]">Quick Actions</h3>
              <div className="space-y-3">
                <BlockyButton variant="secondary" className="w-full">
                  View Achievements
                </BlockyButton>
                <BlockyButton variant="secondary" className="w-full">
                  Manage Claims
                </BlockyButton>
                <BlockyButton variant="secondary" className="w-full">
                  Transaction History
                </BlockyButton>
              </div>
            </GlassCard>
          </div>

          {/* Center: Stats */}
          <div className="space-y-6">
            <div>
              <h2 
                className="text-2xl mb-4 text-[#10b981]"
                style={{ fontFamily: 'var(--font-minecraft)' }}
              >
                Statistics
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <GlassCard>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-[#10b981]/20 rounded flex items-center justify-center flex-shrink-0">
                      <Skull className="w-6 h-6 text-[#10b981]" />
                    </div>
                    <div>
                      <div className="text-3xl text-[#e8e8ea]">{playerData.stats.kills}</div>
                      <div className="text-sm text-[#9ca3af]">Kills</div>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-[#ef4444]/20 rounded flex items-center justify-center flex-shrink-0">
                      <Skull className="w-6 h-6 text-[#ef4444]" />
                    </div>
                    <div>
                      <div className="text-3xl text-[#e8e8ea]">{playerData.stats.deaths}</div>
                      <div className="text-sm text-[#9ca3af]">Deaths</div>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-[#3b82f6]/20 rounded flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[#3b82f6]" />
                    </div>
                    <div>
                      <div className="text-3xl text-[#e8e8ea]">{playerData.stats.playtime}</div>
                      <div className="text-sm text-[#9ca3af]">Playtime</div>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-[#f59e0b]/20 rounded flex items-center justify-center flex-shrink-0">
                      <Coins className="w-6 h-6 text-[#f59e0b]" />
                    </div>
                    <div>
                      <div className="text-3xl text-[#e8e8ea]">${playerData.stats.balance}</div>
                      <div className="text-sm text-[#9ca3af]">Balance</div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Equipment */}
            <div>
              <h2 
                className="text-2xl mb-4 text-[#10b981]"
                style={{ fontFamily: 'var(--font-minecraft)' }}
              >
                Equipment
              </h2>
              
              <GlassCard>
                <div className="grid grid-cols-4 gap-2">
                  {playerData.equipment.map((item, index) => (
                    <InventorySlot key={index} item={item || undefined} />
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 
                className="text-2xl mb-4 text-[#10b981]"
                style={{ fontFamily: 'var(--font-minecraft)' }}
              >
                Recent Activity
              </h2>
              
              <GlassCard>
                <div className="space-y-3">
                  {[
                    { icon: '⚔️', text: 'Defeated the Ender Dragon', time: '2 hours ago' },
                    { icon: '💰', text: 'Sold items for $450', time: '5 hours ago' },
                    { icon: '🏆', text: 'Completed achievement "Diamond Age"', time: '1 day ago' }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-3 pb-3 border-b border-white/5 last:border-0">
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1">
                        <div className="text-[#e8e8ea]">{activity.text}</div>
                        <div className="text-sm text-[#9ca3af]">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Right: Stash */}
          <div>
            <h2 
              className="text-2xl mb-4 text-[#10b981]"
              style={{ fontFamily: 'var(--font-minecraft)' }}
            >
              Stash & Inventory
            </h2>
            
            <GlassCard>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#9ca3af]">Storage</span>
                  <span className="text-sm text-[#10b981]">8/64 slots used</span>
                </div>
              </div>
              
              <div className="grid grid-cols-8 gap-1">
                {playerData.stash.map((item, index) => (
                  <InventorySlot key={index} item={item || undefined} />
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-[#9ca3af]">
                  💡 Tip: Use <code className="text-[#10b981]">/stash</code> in-game to access your items
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
