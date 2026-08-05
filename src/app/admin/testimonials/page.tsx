"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Star } from "lucide-react";
import { adminGet, adminPost, adminPut, adminDelete } from "@/Api";

export default function AdminTestimonials() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    clientName: "", reviewText: "", rating: 5, isFeatured: false
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await adminGet("testimonials");
    if (data.status === 'success' && data.data?.success) setItems(data.data.data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await adminPut(`testimonials/${editingId}`, formData);
    } else {
      await adminPost("testimonials", formData);
    }
    setShowModal(false);
    setEditingId(null);
    setFormData({ clientName: "", reviewText: "", rating: 5, isFeatured: false });
    fetchItems();
  };

  const handleEditClick = (item: any) => {
    setEditingId(item._id);
    setFormData({
      clientName: item.clientName || "",
      reviewText: item.reviewText || "",
      rating: item.rating || 5,
      isFeatured: item.isFeatured !== undefined ? item.isFeatured : false
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await adminDelete(`testimonials/${id}`);
      fetchItems();
    }
  };

  return (
    <div className="p-8 font-outfit text-white">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-playfair font-medium">Testimonials</h1>
          <p className="text-neutral-400 mt-2 text-sm">Manage client reviews and featured quotes.</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setFormData({ clientName: "", reviewText: "", rating: 5, isFeatured: false });
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-black px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          <Plus size={18} /> Add Review
        </button>
      </header>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-neutral-950 border-b border-white/10 text-neutral-400 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Client Name</th>
                <th className="px-6 py-4 font-medium">Rating</th>
                <th className="px-6 py-4 font-medium">Featured</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{item.clientName}</td>
                  <td className="px-6 py-4 text-gold-500 flex mt-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </td>
                  <td className="px-6 py-4">
                    {item.isFeatured ? (
                      <span className="bg-gold-500/20 text-gold-400 px-3 py-1 rounded-full text-xs">Featured</span>
                    ) : (
                      <span className="text-neutral-500 text-xs">Standard</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEditClick(item)} className="text-neutral-400 hover:text-white mr-4"><Edit2 size={18} /></button>
                    <button onClick={() => handleDelete(item._id)} className="text-neutral-400 hover:text-red-500"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">No testimonials found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleSubmit} className="bg-neutral-900 border border-white/10 rounded-2xl p-8 max-w-lg w-full">
            <h2 className="text-2xl font-playfair mb-6">{editingId ? "Edit Client Review" : "Add Client Review"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Client Name</label>
                <input required value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Review Text</label>
                <textarea required value={formData.reviewText} onChange={e => setFormData({...formData, reviewText: e.target.value})} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500" rows={4}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Rating (1-5)</label>
                <input type="number" min="1" max="5" required value={formData.rating} onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500" />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="isFeatured" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="w-4 h-4 accent-gold-500" />
                <label htmlFor="isFeatured" className="text-sm font-medium text-white cursor-pointer">Featured Quote (Shows at the top)</label>
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-4">
              <button type="button" onClick={() => {
                setShowModal(false);
                setEditingId(null);
              }} className="px-6 py-2 text-neutral-400 hover:text-white">Cancel</button>
              <button type="submit" className="bg-gold-500 hover:bg-gold-400 text-black px-6 py-2 rounded-lg font-semibold">Save Review</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
