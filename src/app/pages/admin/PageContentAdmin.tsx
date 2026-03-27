import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../context/AuthContext';

const PAGE_META: Record<string, { label: string; icon: string }> = {
  'how-to-join': { label: 'How to Join', icon: '🗺️' },
  'about':       { label: 'About',        icon: '👥' },
  'wiki':        { label: 'Plugin Wiki',  icon: '📖' },
};

export function PageContentAdmin() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const meta = PAGE_META[slug ?? ''] ?? { label: slug, icon: '📄' };

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from('page_content')
      .select('title, content')
      .eq('page_slug', slug)
      .single()
      .then(({ data }) => {
        if (data) {
          setTitle(data.title ?? '');
          setContent(typeof data.content === 'string' ? data.content : (data.content?.body ?? ''));
        }
        setLoading(false);
      });
  }, [slug]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    const { error } = await supabase
      .from('page_content')
      .upsert({
        page_slug: slug,
        title,
        content: { body: content },
        updated_at: new Date().toISOString(),
        updated_by: user?.id,
      }, { onConflict: 'page_slug' });
    setSaving(false);
    setMsg(error
      ? { type: 'err', text: error.message }
      : { type: 'ok', text: 'Page saved!' }
    );
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#10b981] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{meta.icon}</span>
        <h1 className="text-2xl font-bold text-[#e8e8ea]">Edit: {meta.label}</h1>
      </div>

      <div className="bg-[#13131a] border border-white/10 rounded-xl p-6">
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-[#9ca3af] mb-1.5 uppercase tracking-wide">Page Title</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-2.5 text-[#e8e8ea] focus:outline-none focus:border-[#10b981] transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-[#9ca3af] uppercase tracking-wide">Content (Markdown)</label>
              <span className="text-xs text-[#4b5563]">{content.length} chars</span>
            </div>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={20}
              placeholder={`# ${meta.label}\n\nWrite your page content here using Markdown...`}
              className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-3 text-[#e8e8ea] placeholder-[#4b5563] focus:outline-none focus:border-[#10b981] transition-colors font-mono text-sm resize-none"
            />
          </div>

          {/* Markdown tip */}
          <div className="bg-[#1a1a2e] border border-white/5 rounded-lg px-4 py-3 text-xs text-[#4b5563] space-y-1">
            <p className="text-[#9ca3af] font-medium mb-1">Markdown Tips:</p>
            <p><code className="text-[#10b981]"># Heading 1</code> &nbsp;
               <code className="text-[#10b981]">## Heading 2</code> &nbsp;
               <code className="text-[#10b981]">**bold**</code> &nbsp;
               <code className="text-[#10b981]">*italic*</code></p>
            <p><code className="text-[#10b981]">- item</code> for lists &nbsp;
               <code className="text-[#10b981]">[link](url)</code> for links &nbsp;
               <code className="text-[#10b981]">![alt](img-url)</code> for images</p>
          </div>

          {msg && (
            <p className={`text-sm font-medium ${msg.type === 'ok' ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
              {msg.type === 'ok' ? '✓ ' : '✗ '}{msg.text}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="bg-[#10b981] hover:bg-[#059669] disabled:opacity-50 text-[#0a0a0f] font-bold px-6 py-2.5 rounded-lg transition-colors"
          >
            {saving ? 'Saving...' : 'Save Page'}
          </button>
        </form>
      </div>
    </div>
  );
}
