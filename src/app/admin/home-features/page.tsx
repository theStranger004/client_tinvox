"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import { adminGet, adminPost, adminPut, adminDelete } from "@/Api";

export default function AdminHomeFeatures() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "", description: "", mediaType: "image", mediaUrl: "", featuresList: "", buttonText: "Explore Our Wedding Frame", buttonLink: "/portfolio"
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await adminGet("home-features");
    if (data.status === 'success' && data.data?.success) setItems(data.data.data);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, mediaUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      featuresList: formData.featuresList.split('\n').filter(Boolean)
    };
    if (editingId) {
      await adminPut(`home-features/${editingId}`, payload);
    } else {
      await adminPost("home-features", payload);
    }
    setShowModal(false);
    setEditingId(null);
    setFormData({
      title: "", description: "", mediaType: "image", mediaUrl: "", featuresList: "", buttonText: "Explore Our Wedding Frame", buttonLink: "/portfolio"
    });
    fetchItems();
  };

  const handleEditClick = (item: any) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || "",
      description: item.description || "",
      mediaType: item.mediaType || "image",
      mediaUrl: item.mediaUrl || "",
      featuresList: Array.isArray(item.featuresList) ? item.featuresList.join('\n') : "",
      buttonText: item.buttonText || "Explore Our Wedding Frame",
      buttonLink: item.buttonLink || "/portfolio"
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await adminDelete(`home-features/${id}`);
      fetchItems();
    }
  };

  return (
    <div className="p-8 font-outfit text-white">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-playfair font-medium">Home Features</h1>
          <p className="text-neutral-400 mt-2 text-sm">Manage the premium feature sections on the homepage.</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setFormData({
              title: "", description: "", mediaType: "image", mediaUrl: "", featuresList: "", buttonText: "Explore Our Wedding Frame", buttonLink: "/portfolio"
            });
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-black px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          <Plus size={18} /> Add Feature
        </button>
      </header>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-neutral-950 border-b border-white/10 text-neutral-400 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Media Type</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{item.title}</td>
                  <td className="px-6 py-4 text-gold-400 uppercase text-xs">{item.mediaType}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEditClick(item)} className="text-neutral-400 hover:text-white mr-4"><Edit2 size={18} /></button>
                    <button onClick={() => handleDelete(item._id)} className="text-neutral-400 hover:text-red-500"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-neutral-500">No feature sections found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <form onSubmit={handleSubmit} className="bg-neutral-900 border border-white/10 rounded-2xl p-8 max-w-lg w-full my-8">
            <h2 className="text-2xl font-playfair mb-6">{editingId ? "Edit Home Feature" : "Add Home Feature"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Title</label>
                <input required placeholder="Section Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Description</label>
                <textarea required placeholder="Detailed section text description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500" rows={3}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Media Type</label>
                <select value={formData.mediaType} onChange={e => setFormData({...formData, mediaType: e.target.value})} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500 appearance-none">
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Upload File</label>
                <input type="file" accept={formData.mediaType === 'image' ? 'image/*' : 'video/*'} onChange={handleFileChange} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500 text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gold-500 file:text-black hover:file:bg-gold-400 mb-3" />
                
                <label className="block text-sm font-medium text-neutral-400 mb-2">Or enter media URL</label>
                <input value={formData.mediaUrl?.startsWith("data:") ? "" : formData.mediaUrl} onChange={e => setFormData({...formData, mediaUrl: e.target.value})} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500" placeholder={formData.mediaUrl?.startsWith("data:") ? "File uploaded locally" : "Or type a custom media URL..."} />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Features List (One item per line)</label>
                <textarea placeholder="Feature item 1&#10;Feature item 2&#10;Feature item 3" value={formData.featuresList} onChange={e => setFormData({...formData, featuresList: e.target.value})} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500" rows={3}></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Button Text</label>
                  <input placeholder="Explore More" value={formData.buttonText} onChange={e => setFormData({...formData, buttonText: e.target.value})} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Button Link</label>
                  <input placeholder="/portfolio" value={formData.buttonLink} onChange={e => setFormData({...formData, buttonLink: e.target.value})} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500" />
                </div>
              </div>
            </div>
            {formData.mediaUrl && formData.mediaType === 'image' && (
              <div className="mt-4 relative h-32 w-full rounded-lg overflow-hidden border border-white/10">
                <Image src={formData.mediaUrl} alt="Preview" fill className="object-cover" />
              </div>
            )}
            <div className="mt-8 flex justify-end gap-4">
              <button type="button" onClick={() => {
                setShowModal(false);
                setEditingId(null);
              }} className="px-6 py-2 text-neutral-400 hover:text-white">Cancel</button>
              <button type="submit" className="bg-gold-500 hover:bg-gold-400 text-black px-6 py-2 rounded-lg font-semibold">Save Section</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
