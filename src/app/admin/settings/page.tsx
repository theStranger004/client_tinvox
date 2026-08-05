"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

import { adminGet, adminPut } from "@/Api";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "",
    tagline: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminGet("settings")
      .then((data) => {
        if (data.status === 'success' && data.data?.success && data.data.data) {
          setSettings({
            siteName: data.data.data.siteName || "",
            tagline: data.data.data.tagline || "",
            contactEmail: data.data.data.contactEmail || "",
            contactPhone: data.data.data.contactPhone || "",
          });
        }
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminPut("settings", settings);
      alert("Settings saved successfully!");
    } catch (err) {
      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="p-8 font-outfit">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-playfair font-medium text-white">Platform Settings</h1>
          <p className="text-neutral-400 mt-2 text-sm">Configure your white-label branding and contact information.</p>
        </div>
        <button 
          onClick={handleSubmit} 
          disabled={saving}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-black px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </header>

      <form className="bg-neutral-900 border border-white/10 rounded-2xl p-8 max-w-3xl space-y-6 text-white">
        <h3 className="font-playfair text-xl mb-4">General Information</h3>
        
        <div className="space-y-2">
          <label className="text-sm text-neutral-400">Site Name</label>
          <input 
            type="text" 
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 focus:border-gold-500 outline-none" 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-neutral-400">Tagline</label>
          <input 
            type="text" 
            value={settings.tagline}
            onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
            className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 focus:border-gold-500 outline-none" 
          />
        </div>

        <h3 className="font-playfair text-xl mb-4 pt-6 border-t border-white/10">Contact Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-neutral-400">Contact Email</label>
            <input 
              type="email" 
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 focus:border-gold-500 outline-none" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-neutral-400">Contact Phone</label>
            <input 
              type="tel" 
              value={settings.contactPhone}
              onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
              className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 focus:border-gold-500 outline-none" 
            />
          </div>
        </div>
      </form>
    </div>
  );
}
