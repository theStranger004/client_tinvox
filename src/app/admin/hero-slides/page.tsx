"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

import { adminGet, adminPost, adminPut, adminDelete } from "@/Api";

export default function AdminHeroSlides() {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    imageUrl: "",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    setLoading(true);
    const data = await adminGet("hero-slides");
    if (data.status === 'success' && data.data?.success) setSlides(data.data.data);
    setLoading(false);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await adminPut(`hero-slides/${editingId}`, formData);
    } else {
      await adminPost("hero-slides", formData);
    }
    setShowModal(false);
    setEditingId(null);
    setFormData({ title: "", subtitle: "", imageUrl: "", order: 0, isActive: true });
    fetchSlides();
  };

  const handleEditClick = (slide: any) => {
    setEditingId(slide._id);
    setFormData({
      title: slide.title || "",
      subtitle: slide.subtitle || "",
      imageUrl: slide.imageUrl || "",
      order: slide.order || 0,
      isActive: slide.isActive !== undefined ? slide.isActive : true,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this hero slide?")) {
      await adminDelete(`hero-slides/${id}`);
      fetchSlides();
    }
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    await adminPut(`hero-slides/${id}`, { isActive: !current });
    fetchSlides();
  };

  return (
    <div className="p-8 font-outfit text-white">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-playfair font-medium">Hero Slides</h1>
          <p className="text-neutral-400 mt-2 text-sm">
            Manage the full-screen hero slider on the homepage.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ title: "", subtitle: "", imageUrl: "", order: 0, isActive: true });
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-black px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          <Plus size={18} /> Add Slide
        </button>
      </header>

      {/* Preview grid */}
      {loading ? (
        <div className="text-neutral-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {slides.map((slide) => (
            <div
              key={slide._id}
              className={`relative rounded-2xl overflow-hidden border ${slide.isActive ? "border-gold-500/40" : "border-white/10 opacity-50"}`}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
                  <p className="text-gold-400 text-xs uppercase tracking-widest">{slide.subtitle}</p>
                  <h3 className="text-white font-playfair text-lg">{slide.title}</h3>
                </div>
              </div>
              <div className="bg-neutral-900 p-3 flex items-center justify-between">
                <span className="text-xs text-neutral-400">Order: {slide.order}</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEditClick(slide)}
                    className="text-neutral-400 hover:text-white transition-colors"
                    title="Edit slide"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleToggleActive(slide._id, slide.isActive)}
                    className={`${slide.isActive ? "text-gold-400 hover:text-white" : "text-neutral-500 hover:text-gold-400"} transition-colors`}
                    title={slide.isActive ? "Deactivate slide" : "Activate slide"}
                  >
                    {slide.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button
                    onClick={() => handleDelete(slide._id)}
                    className="text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {slides.length === 0 && (
            <div className="col-span-3 text-center text-neutral-500 py-16">
              No hero slides found. Click "Add Slide" to create one.
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-neutral-900 border border-white/10 rounded-2xl p-8 max-w-2xl w-full my-8"
          >
            <h2 className="text-2xl font-playfair mb-6">{editingId ? "Edit Hero Slide" : "Add Hero Slide"}</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Title (Large Text)</label>
                <input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Cinematic Weddings"
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Subtitle (Small Text Above)</label>
                <input
                  required
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Timeless elegance for your special day"
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                  Upload Image File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500 text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gold-500 file:text-black hover:file:bg-gold-400 mb-3"
                />
                
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                  Or enter custom URL
                </label>
                <input
                  value={formData.imageUrl?.startsWith("data:") ? "" : formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder={formData.imageUrl?.startsWith("data:") ? "Image uploaded as file" : "Or type a custom image URL..."}
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Display Order (lower = first)</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 outline-none focus:border-gold-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 accent-gold-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-white cursor-pointer">
                  Active (visible on homepage)
                </label>
              </div>
            </div>

            {/* Preview */}
            {formData.imageUrl && (
              <div className="mt-6 relative h-40 rounded-xl overflow-hidden border border-white/10">
                <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
                  <p className="text-gold-400 text-xs uppercase tracking-widest">{formData.subtitle || "Subtitle"}</p>
                  <p className="text-white font-playfair text-lg">{formData.title || "Title"}</p>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                }}
                className="px-6 py-2 text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gold-500 hover:bg-gold-400 text-black px-6 py-2 rounded-lg font-semibold"
              >
                Save Slide
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
