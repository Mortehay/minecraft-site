import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../context/AuthContext';

interface NewsPost {
  id: string;
  title: string;
  excerpt: string | null;
  published: boolean;
  created_at: string;
}

interface NewsForm {
  title: string;
  excerpt: string;
  content: string;
  cover_url: string;
  published: boolean;
}

const empty: NewsForm = { title: '', excerpt: '', content: '', cover_url: '', published: false };

export function NewsAdmin() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [editing, setEditing] = useState<string | null>(null); // null = create new
  const [form, setForm] = useState<NewsForm>(empty);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const load = async () => {
    const { data } = await supabase.from('news').select('id,title,excerpt,published,created_at').order('created_at', { ascending: false });
    setPosts(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(empty); setShowForm(true); setMsg(null); };

  const openEdit = async (id: string) => {
    const { data } = await supabase.from('news').select('*').eq('id', id).single();
    if (data) {
      setForm({ 
        title: data.title, 
        excerpt: data.excerpt ?? '', 
        content: typeof data.content === 'string' ? data.content : (data.content?.body ?? ''), 
        cover_url: data.image_url ?? '', // Note: DB column is image_url
        published: data.published 
      });
      setEditing(id);
      setShowForm(true);
      setMsg(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    await supabase.from('news').delete().eq('id', id);
    load();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    const payload = { 
      title: form.title,
      excerpt: form.excerpt,
      content: { body: form.content },
      image_url: form.cover_url,
      published: form.published,
      author_id: user!.id, 
      updated_at: new Date().toISOString() 
    };
    let error;
    if (editing) {
      ({ error } = await supabase.from('news').update(payload).eq('id', editing));
    } else {
      ({ error } = await supabase.from('news').insert(payload));
    }
    setSaving(false);
    if (error) { setMsg('Error: ' + error.message); return; }
    setShowForm(false);
    load();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#e8e8ea]">News</h1>
        <button
          onClick={openCreate}
          className="bg-[#10b981] hover:bg-[#059669] text-[#0a0a0f] font-bold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          + New Post
        </button>
      </div>

      {/* Post list */}
      {!showForm && (
        <div className="space-y-3">
          {posts.length === 0 && <p className="text-[#9ca3af]">No news posts yet.</p>}
          {posts.map(post => (
            <div key={post.id} className="bg-[#13131a] border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${post.published ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-[#9ca3af]/20 text-[#9ca3af]'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                  <p className="font-medium text-[#e8e8ea] truncate">{post.title}</p>
                </div>
                {post.excerpt && <p className="text-sm text-[#9ca3af] mt-1 truncate">{post.excerpt}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEdit(post.id)} className="text-sm text-[#9ca3af] hover:text-[#10b981] px-3 py-1.5 rounded-lg hover:bg-[#10b981]/10 transition-colors">Edit</button>
                <button onClick={() => handleDelete(post.id)} className="text-sm text-[#9ca3af] hover:text-[#ef4444] px-3 py-1.5 rounded-lg hover:bg-[#ef4444]/10 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor */}
      {showForm && (
        <div className="bg-[#13131a] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-[#e8e8ea]">{editing ? 'Edit Post' : 'Create Post'}</h2>
            <button onClick={() => setShowForm(false)} className="text-[#9ca3af] hover:text-[#e8e8ea] text-xl">&times;</button>
          </div>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#9ca3af] mb-1.5 uppercase tracking-wide">Title</label>
              <input
                value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                required
                className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-2.5 text-[#e8e8ea] focus:outline-none focus:border-[#10b981] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#9ca3af] mb-1.5 uppercase tracking-wide">Excerpt</label>
              <input
                value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-2.5 text-[#e8e8ea] focus:outline-none focus:border-[#10b981] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#9ca3af] mb-1.5 uppercase tracking-wide">Cover Image URL</label>
              <input
                value={form.cover_url} onChange={e => setForm(f => ({ ...f, cover_url: e.target.value }))}
                placeholder="https://..."
                className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-2.5 text-[#e8e8ea] placeholder-[#4b5563] focus:outline-none focus:border-[#10b981] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#9ca3af] mb-1.5 uppercase tracking-wide">Content (Markdown)</label>
              <textarea
                value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                required rows={12}
                className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-2.5 text-[#e8e8ea] focus:outline-none focus:border-[#10b981] transition-colors font-mono text-sm resize-none"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox" id="published" checked={form.published}
                onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                className="w-4 h-4 accent-[#10b981]"
              />
              <label htmlFor="published" className="text-sm text-[#9ca3af]">Publish immediately</label>
            </div>
            {msg && <p className="text-sm text-[#ef4444]">{msg}</p>}
            <div className="flex items-center gap-3">
              <button type="submit" disabled={saving} className="bg-[#10b981] hover:bg-[#059669] disabled:opacity-50 text-[#0a0a0f] font-bold px-6 py-2.5 rounded-lg transition-colors">
                {saving ? 'Saving...' : editing ? 'Update Post' : 'Create Post'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="text-[#9ca3af] hover:text-[#e8e8ea] px-4 py-2.5 transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
