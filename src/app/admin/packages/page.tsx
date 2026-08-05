"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { adminGet, adminPost, adminPut, adminDelete } from "@/Api";

export default function AdminPackages() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "", price: 0, duration: "", description: "", isHighlighted: false, category: "General"
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await adminGet("packages");
    if (data.status === 'success' && data.data?.success) setItems(data.data.data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await adminPut(`packages/${editingId}`, formData);
    } else {
      await adminPost("packages", formData);
    }
    setShowModal(false);
    setEditingId(null);
    setFormData({
      name: "", price: 0, duration: "", description: "", isHighlighted: false, category: "General"
    });
    fetchItems();
  };

  const handleEditClick = (item: any) => {
    setEditingId(item._id);
    setFormData({
      name: item.name || "",
      price: item.price || 0,
      duration: item.duration || "",
      description: item.description || "",
      isHighlighted: item.isHighlighted !== undefined ? item.isHighlighted : false,
      category: item.category || "General"
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await adminDelete(`packages/${id}`);
      fetchItems();
    }
  };

  return (
    <div className="p-8 font-outfit text-white">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-playfair font-medium">Packages Management</h1>
          <p className="text-neutral-400 mt-2 text-sm">Configure your pricing and service packages.</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setFormData({
              name: "", price: 0, duration: "", description: "", isHighlighted: false, category: "General"
            });
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-black px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          <Plus size={18} /> Add Package
        </button>
      </header>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-neutral-950 border-b border-white/10 text-neutral-400 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Duration</th>
                <th className="px-6 py-4 font-medium">Popular</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-gold-400">₹{item.price?.toLocaleString('en-IN') || item.price}</td>
                  <td className="px-6 py-4 text-neutral-400">{item.duration}</td>
                  <td className="px-6 py-4">
                    {item.isHighlighted ? <span className="bg-gold-500/20 text-gold-400 px-2 py-1 rounded text-xs">Yes</span> : "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEditClick(item)} className="text-neutral-400 hover:text-white mr-4"><Edit2 size={18} /></button>
                    <button onClick={() => handleDelete(item._id)} className="text-neutral-400 hover:text-red-500"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">No packages found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleSubmit} className="bg-neutral-900 border border-white/10 rounded-2xl p-8 max-w-lg w-full">
            <h2 className="text-2xl font-playfair mb-6">{editingId ? "Edit Package" : "Add Package"}</h2>
            <div className="space-y-4">
              <input required placeholder="Name (e.g. Platinum)" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500" />
              <input required type="number" placeholder="Price (INR)" value={formData.price || ""} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500" />
              <input required placeholder="Duration (e.g. 8 Hours)" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500" />
              <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500" />
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.isHighlighted} onChange={e => setFormData({...formData, isHighlighted: e.target.checked})} className="accent-gold-500 w-4 h-4" />
                <span className="text-sm">Highlight as Most Popular</span>
              </label>
            </div>
            <div className="mt-8 flex justify-end gap-4">
              <button type="button" onClick={() => {
                setShowModal(false);
                setEditingId(null);
              }} className="px-6 py-2 text-neutral-400 hover:text-white">Cancel</button>
              <button type="submit" className="bg-gold-500 hover:bg-gold-400 text-black px-6 py-2 rounded-lg font-semibold">Save Package</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
