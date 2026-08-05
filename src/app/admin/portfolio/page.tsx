"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import { adminGet, adminPost, adminPut, adminDelete } from "@/Api";

export default function AdminPortfolio() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "", slug: "", category: "", location: "", heroImage: "", description: ""
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await adminGet("portfolio");
    if (data.status === 'success' && data.data?.success) setItems(data.data.data);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, heroImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await adminPut(`portfolio/${editingId}`, formData);
    } else {
      await adminPost("portfolio", formData);
    }
    setShowModal(false);
    setEditingId(null);
    setFormData({ title: "", slug: "", category: "", location: "", heroImage: "", description: "" });
    fetchItems();
  };

  const handleEditClick = (item: any) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || "",
      slug: item.slug || "",
      category: item.category || "",
      location: item.location || "",
      heroImage: item.heroImage || "",
      description: item.description || ""
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await adminDelete(`portfolio/${id}`);
      fetchItems();
    }
  };

  return (
    <div className="p-8 font-outfit text-white">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-playfair font-medium">Portfolio Management</h1>
          <p className="text-neutral-400 mt-2 text-sm">Manage your galleries and featured work.</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setFormData({ title: "", slug: "", category: "", location: "", heroImage: "", description: "" });
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-black px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          <Plus size={18} /> Add Gallery
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
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{item.title}</td>
                  <td className="px-6 py-4 text-gold-400">{item.category}</td>
                  <td className="px-6 py-4 text-neutral-400">{item.location}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEditClick(item)} className="text-neutral-400 hover:text-white mr-4"><Edit2 size={18} /></button>
                    <button onClick={() => handleDelete(item._id)} className="text-neutral-400 hover:text-red-500"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">No items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <form onSubmit={handleSubmit} className="bg-neutral-900 border border-white/10 rounded-2xl p-8 max-w-lg w-full my-8">
            <h2 className="text-2xl font-playfair mb-6">{editingId ? "Edit Gallery Item" : "Add Gallery Item"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Title</label>
                <input required placeholder="Event/Couple Name" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Slug</label>
                <input required placeholder="slug (e.g. aditya-ananya)" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Category</label>
                <input required placeholder="Category (e.g. Wedding)" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Location</label>
                <input required placeholder="Location (e.g. Udaipur, India)" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Upload Image File</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500 text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gold-500 file:text-black hover:file:bg-gold-400 mb-3" />
                
                <label className="block text-sm font-medium text-neutral-400 mb-2">Or enter image URL</label>
                <input value={formData.heroImage?.startsWith("data:") ? "" : formData.heroImage} onChange={e => setFormData({...formData, heroImage: e.target.value})} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500" placeholder={formData.heroImage?.startsWith("data:") ? "Image uploaded as file" : "Or type a custom image URL..."} />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Description</label>
                <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500" rows={3}></textarea>
              </div>
            </div>
            {formData.heroImage && (
              <div className="mt-4 relative h-32 w-full rounded-lg overflow-hidden border border-white/10">
                <Image src={formData.heroImage} alt="Preview" fill className="object-cover" />
              </div>
            )}
            <div className="mt-8 flex justify-end gap-4">
              <button type="button" onClick={() => {
                setShowModal(false);
                setEditingId(null);
              }} className="px-6 py-2 text-neutral-400 hover:text-white">Cancel</button>
              <button type="submit" className="bg-gold-500 hover:bg-gold-400 text-black px-6 py-2 rounded-lg font-semibold">Save Item</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
