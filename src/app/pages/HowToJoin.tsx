import React from 'react';
import { Download, Check } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { BlockyButton } from '../components/BlockyButton';

const steps = [
  {
    number: 1,
    title: 'Check Version Requirements',
    description: 'Ensure you have Minecraft Java Edition 1.20.4 or higher installed.',
    details: [
      'Java Edition required (Bedrock not supported)',
      'Version 1.20.4 - 1.21.x supported',
      'Optifine and Fabric mods are allowed'
    ]
  },
  {
    number: 2,
    title: 'Add Server Address',
    description: 'Open Minecraft and navigate to Multiplayer > Add Server',
    details: [
      'Server Name: Epic MC (or any name you prefer)',
      'Server Address: play.epicmc.net',
      'Click "Done" to save the server'
    ]
  },
  {
    number: 3,
    title: 'Join & Register',
    description: 'Connect to the server and create your account in-game',
    details: [
      'Click on the server to join',
      'Type: /register <password> <password>',
      'Type: /login <password> to login next time',
      'Your account is now created!'
    ]
  },
  {
    number: 4,
    title: 'Start Playing',
    description: 'Explore the world and join the community!',
    details: [
      'Use /spawn to teleport to the main hub',
      'Type /help to see available commands',
      'Join our Discord for support and updates'
    ]
  }
];

export function HowToJoin() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 
            className="text-4xl mb-4 text-[#10b981]"
            style={{ fontFamily: 'var(--font-minecraft)' }}
          >
            How to Join
          </h1>
          <p className="text-xl text-[#9ca3af]">
            Follow these simple steps to start your adventure
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-[#10b981]/30 hidden md:block" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Step number circle */}
                <div className="absolute left-0 top-0 w-16 h-16 bg-[#10b981] border-4 border-[#0a0a0f] rounded-full flex items-center justify-center z-10 hidden md:flex">
                  <span 
                    className="text-2xl text-[#0a0a0f]"
                    style={{ fontFamily: 'var(--font-minecraft)' }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <GlassCard className="md:ml-24">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 md:hidden">
                      <div className="w-12 h-12 bg-[#10b981] rounded-full flex items-center justify-center">
                        <span 
                          className="text-xl text-[#0a0a0f]"
                          style={{ fontFamily: 'var(--font-minecraft)' }}
                        >
                          {step.number}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h2 className="text-2xl mb-2 text-[#e8e8ea]">{step.title}</h2>
                      <p className="text-[#9ca3af] mb-4">{step.description}</p>
                      
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                            <span className="text-[#9ca3af]">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-12">
          <GlassCard>
            <div className="text-center">
              <h3 className="text-2xl mb-4 text-[#e8e8ea]">Need Minecraft?</h3>
              <p className="text-[#9ca3af] mb-6">
                Download the official Minecraft Launcher to get started
              </p>
              <BlockyButton variant="primary" className="inline-flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download Launcher
              </BlockyButton>
            </div>
          </GlassCard>
        </div>

        {/* Quick Reference */}
        <div className="mt-12">
          <h3 
            className="text-2xl mb-6 text-[#10b981] text-center"
            style={{ fontFamily: 'var(--font-minecraft)' }}
          >
            Quick Reference
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard>
              <h4 className="text-xl mb-3 text-[#e8e8ea]">Server Info</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#9ca3af]">Address:</span>
                  <code className="text-[#10b981]">play.epicmc.net</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9ca3af]">Version:</span>
                  <code className="text-[#10b981]">1.20.4 - 1.21.x</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9ca3af]">Type:</span>
                  <code className="text-[#10b981]">Survival</code>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h4 className="text-xl mb-3 text-[#e8e8ea]">First Commands</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <code className="text-[#10b981]">/register &lt;pass&gt; &lt;pass&gt;</code>
                  <p className="text-[#9ca3af] text-xs mt-1">Create your account</p>
                </div>
                <div>
                  <code className="text-[#10b981]">/login &lt;password&gt;</code>
                  <p className="text-[#9ca3af] text-xs mt-1">Login to your account</p>
                </div>
                <div>
                  <code className="text-[#10b981]">/spawn</code>
                  <p className="text-[#9ca3af] text-xs mt-1">Return to spawn</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
