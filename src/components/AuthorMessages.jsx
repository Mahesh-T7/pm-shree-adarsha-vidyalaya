import React, { useState, useRef } from 'react';
import { X, Quote, Edit3, Camera, Save, Trash2, PlusCircle, CheckCircle2 } from 'lucide-react';

export default function AuthorMessages({ content, isHMLoggedIn, onContentChange }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [editingCard, setEditingCard] = useState(null);
  const [editDraft, setEditDraft] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCard, setNewCard] = useState({
    id: '',
    title: "New Author's Message",
    name: '',
    role: '',
    image: '/school-banner.jpg',
    excerpt: '',
    fullMessage: ''
  });
  const [successMsg, setSuccessMsg] = useState('');
  const fileInputRef = useRef(null);
  const newFileInputRef = useRef(null);

  const defaultCards = [
    {
      id: 'president',
      title: "President's Message",
      name: "Dr. K. C. Sabitha Ramamurthy",
      role: "President",
      image: "/authors/president.jpg",
      excerpt: "Today, CMR Group of Institutions consists of 19 institutions in India and abroad, 69 different academic programmes, and over 900 faculty members...",
      fullMessage: "Today, CMR Group of Institutions consists of 19 institutions in India and abroad, 69 different academic programmes, and over 900 faculty members.\n\nEducation is the manifestation of the perfection already in man. Our vision has always been to nurture young minds with holistic values, intellectual depth, and compassionate leadership."
    },
    {
      id: 'principal',
      title: "Principal's Message",
      name: "Dr. Sanjay Jain",
      role: "Principal",
      image: "/authors/principal.jpg",
      excerpt: "Learning is 'fun' at CMRIT, as students and faculty members get together to make a difference through persevering and achieving intellectual satisfaction...",
      fullMessage: "Learning is 'fun' at CMRIT, as students and faculty members get together to make a difference through persevering and achieving intellectual satisfaction.\n\nOur educational framework emphasizes experiential learning, critical thinking, and technological innovation."
    },
    {
      id: 'vice-principal',
      title: "Vice-Principal's Message",
      name: "Dr. B Narasimha Murthy",
      role: "Vice-Principal",
      image: "/authors/vice-principal.jpg",
      excerpt: "CMR Institute of Technology (CMRIT), established in the year 2000 with a vision to be a globally recognized institution to provide high-quality technical...",
      fullMessage: "CMR Institute of Technology (CMRIT), established in the year 2000 with a vision to be a globally recognized institution to provide high-quality technical education.\n\nWe are committed to academic discipline, student-centric pedagogy, and continuous curriculum enrichment."
    }
  ];

  const cards = (content && content.cards && content.cards.length > 0) ? content.cards : defaultCards;

  const flash = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  // ---- Save helpers ----
  const saveCards = (updatedCards) => {
    if (onContentChange) {
      onContentChange({
        ...(content || {}),
        cards: updatedCards
      });
    }
  };

  // ---- Image upload handler (shared) ----
  const handleImageFile = (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Image too large – max 5 MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  // ---- Edit card ----
  const openEditModal = (card) => {
    setEditingCard(card.id);
    setEditDraft({ ...card });
  };

  const handleSaveEdit = () => {
    const updatedCards = cards.map(c => c.id === editDraft.id ? { ...editDraft } : c);
    saveCards(updatedCards);
    setEditingCard(null);
    setEditDraft(null);
    flash('✅ Author message updated successfully!');
  };

  // ---- Delete card ----
  const handleDeleteCard = (cardId) => {
    if (!confirm('Are you sure you want to delete this author card?')) return;
    const updatedCards = cards.filter(c => c.id !== cardId);
    saveCards(updatedCards);
    flash('🗑️ Author card deleted');
  };

  // ---- Add new card ----
  const handleAddCard = () => {
    if (!newCard.name.trim()) return;
    const id = newCard.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now();
    const cardToAdd = { ...newCard, id };
    const updatedCards = [...cards, cardToAdd];
    saveCards(updatedCards);
    setIsAddingNew(false);
    setNewCard({
      id: '',
      title: "New Author's Message",
      name: '',
      role: '',
      image: '/school-banner.jpg',
      excerpt: '',
      fullMessage: ''
    });
    flash('✅ New author card added!');
  };

  return (
    <section className="bg-slate-50 py-10 px-4 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">

        {/* Success toast */}
        {successMsg && (
          <div className="mb-4 bg-emerald-50 border-2 border-emerald-400 text-emerald-800 px-4 py-2.5 rounded-xl flex items-center gap-2 shadow animate-in fade-in">
            <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
            <span className="font-bold text-sm">{successMsg}</span>
          </div>
        )}

        {/* HM toolbar: Add new card */}
        {isHMLoggedIn && (
          <div className="flex justify-end mb-4 gap-2">
            <button
              onClick={() => setIsAddingNew(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <PlusCircle size={14} />
              <span>Add New Author Card</span>
            </button>
          </div>
        )}

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card) => (
            <div
              key={card.id || card.title}
              className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden flex flex-col justify-between transition-all duration-300 group relative"
            >
              {/* HM Edit / Delete overlay buttons */}
              {isHMLoggedIn && (
                <div className="absolute top-3 right-3 z-10 flex gap-1.5">
                  <button
                    onClick={() => openEditModal(card)}
                    className="bg-amber-400 hover:bg-amber-500 text-slate-900 p-2 rounded-full shadow-lg transition-all border border-amber-300"
                    title="Edit this author card"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all"
                    title="Delete this author card"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}

              <div>
                {/* Photo */}
                <div className="h-52 sm:h-56 w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/school-banner.jpg'; }}
                  />
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#00645c] tracking-tight mb-1">
                    {card.title}
                  </h3>
                  <h4 className="text-sm sm:text-base font-semibold text-slate-800 mb-3">
                    {card.name}
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-4">
                    {card.excerpt || card.fullMessage}
                  </p>
                </div>
              </div>

              {/* Read More */}
              <div className="px-5 sm:px-6 pb-6 pt-0">
                <button
                  onClick={() => setSelectedCard(card)}
                  className="bg-[#38414a] hover:bg-[#20272e] text-white font-bold px-6 py-2 rounded-md text-sm transition-colors shadow-sm inline-flex items-center justify-center tracking-wide"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============ READ MORE MODAL ============ */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#00645c] to-[#0b3d91] px-6 py-4 text-white flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black">{selectedCard.title}</h3>
                <p className="text-xs text-teal-100 mt-0.5">{selectedCard.name} • {selectedCard.role || 'Leadership'}</p>
              </div>
              <button onClick={() => setSelectedCard(null)} className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 bg-slate-50 p-4 rounded-2xl border border-gray-200">
                <img
                  src={selectedCard.image}
                  alt={selectedCard.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover object-top shadow-md border-2 border-white flex-shrink-0"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/school-banner.jpg'; }}
                />
                <div className="text-center sm:text-left space-y-1">
                  <h4 className="text-lg font-black text-slate-900">{selectedCard.name}</h4>
                  <p className="text-xs font-bold text-[#00645c] uppercase tracking-wider">{selectedCard.role || selectedCard.title}</p>
                </div>
              </div>
              <div className="relative">
                <Quote size={40} className="text-[#00645c]/10 absolute -top-3 -left-2 -z-0" />
                <div className="relative z-10 text-gray-700 text-sm sm:text-base leading-relaxed space-y-3 whitespace-pre-line">
                  {selectedCard.fullMessage || selectedCard.excerpt}
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button onClick={() => setSelectedCard(null)} className="bg-[#38414a] hover:bg-[#20272e] text-white font-bold px-6 py-2 rounded-lg text-sm transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ EDIT CARD MODAL ============ */}
      {editingCard && editDraft && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => { setEditingCard(null); setEditDraft(null); }}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border-4 border-amber-400 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-dark px-6 py-4 text-white flex items-center justify-between border-b-2 border-amber-300">
              <div className="flex items-center gap-2">
                <span className="text-xl">✏️</span>
                <div>
                  <h3 className="font-black text-base">Edit Author Card</h3>
                  <p className="text-xs text-blue-200">Change photo, name, title &amp; message</p>
                </div>
              </div>
              <button onClick={() => { setEditingCard(null); setEditDraft(null); }} className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 overflow-y-auto flex-1 space-y-5">

              {/* Photo Upload */}
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="relative group">
                  <img
                    src={editDraft.image}
                    alt="Author"
                    className="w-32 h-32 rounded-2xl object-cover object-top shadow-md border-2 border-gray-200"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/school-banner.jpg'; }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/50 rounded-2xl flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Camera size={24} className="text-white" />
                    <span className="text-white text-xs font-bold">Change Photo</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageFile(e, (dataUrl) => setEditDraft({ ...editDraft, image: dataUrl }))}
                  />
                </div>
                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <p className="text-xs text-gray-500 font-semibold">Hover on photo and click to upload a new image.</p>
                  <p className="text-[11px] text-gray-400">Max 5 MB • JPG, PNG, WEBP</p>
                  {editDraft.image && editDraft.image.startsWith('data:') && (
                    <span className="inline-block bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1">✓ New photo uploaded</span>
                  )}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Card Title</label>
                <input
                  type="text"
                  value={editDraft.title}
                  onChange={(e) => setEditDraft({ ...editDraft, title: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-primary bg-slate-50"
                  placeholder="e.g. President's Message"
                />
              </div>

              {/* Name + Role row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Author Name</label>
                  <input
                    type="text"
                    value={editDraft.name}
                    onChange={(e) => setEditDraft({ ...editDraft, name: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-primary bg-slate-50"
                    placeholder="Dr. Full Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Role / Designation</label>
                  <input
                    type="text"
                    value={editDraft.role}
                    onChange={(e) => setEditDraft({ ...editDraft, role: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-primary bg-slate-50"
                    placeholder="President / Principal / etc."
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Short Excerpt (shown on card)</label>
                <textarea
                  rows={3}
                  value={editDraft.excerpt}
                  onChange={(e) => setEditDraft({ ...editDraft, excerpt: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary bg-slate-50 resize-none"
                  placeholder="A brief summary shown on the card..."
                />
              </div>

              {/* Full Message */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Full Message (shown in Read More)</label>
                <textarea
                  rows={7}
                  value={editDraft.fullMessage}
                  onChange={(e) => setEditDraft({ ...editDraft, fullMessage: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary bg-slate-50 resize-none"
                  placeholder="The complete message to be shown when the user clicks Read More..."
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t-2 border-amber-200 flex items-center justify-between gap-3">
              <button
                onClick={() => { setEditingCard(null); setEditDraft(null); }}
                className="text-gray-500 hover:text-gray-800 text-sm font-bold px-4 py-2 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-sm px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 border border-amber-300"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ ADD NEW CARD MODAL ============ */}
      {isAddingNew && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setIsAddingNew(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border-4 border-emerald-400 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlusCircle size={20} />
                <div>
                  <h3 className="font-black text-base">Add New Author Card</h3>
                  <p className="text-xs text-emerald-200">Upload photo and fill in the details</p>
                </div>
              </div>
              <button onClick={() => setIsAddingNew(false)} className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 overflow-y-auto flex-1 space-y-5">

              {/* Photo Upload */}
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="relative group">
                  <img
                    src={newCard.image}
                    alt="New author"
                    className="w-32 h-32 rounded-2xl object-cover object-top shadow-md border-2 border-gray-200"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/school-banner.jpg'; }}
                  />
                  <button
                    type="button"
                    onClick={() => newFileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/50 rounded-2xl flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Camera size={24} className="text-white" />
                    <span className="text-white text-xs font-bold">Upload Photo</span>
                  </button>
                  <input
                    ref={newFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageFile(e, (dataUrl) => setNewCard({ ...newCard, image: dataUrl }))}
                  />
                </div>
                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <p className="text-xs text-gray-500 font-semibold">Hover on photo and click to upload.</p>
                  <p className="text-[11px] text-gray-400">Max 5 MB • JPG, PNG, WEBP</p>
                  {newCard.image && newCard.image.startsWith('data:') && (
                    <span className="inline-block bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1">✓ Photo uploaded</span>
                  )}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Card Title</label>
                <input
                  type="text"
                  value={newCard.title}
                  onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-emerald-500 bg-slate-50"
                  placeholder="e.g. Headmaster's Message"
                />
              </div>

              {/* Name + Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Author Name *</label>
                  <input
                    type="text"
                    value={newCard.name}
                    onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-emerald-500 bg-slate-50"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Role / Designation</label>
                  <input
                    type="text"
                    value={newCard.role}
                    onChange={(e) => setNewCard({ ...newCard, role: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-emerald-500 bg-slate-50"
                    placeholder="Headmaster / Chairman / etc."
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Short Excerpt</label>
                <textarea
                  rows={3}
                  value={newCard.excerpt}
                  onChange={(e) => setNewCard({ ...newCard, excerpt: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 bg-slate-50 resize-none"
                  placeholder="Brief text shown on the card..."
                />
              </div>

              {/* Full Message */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Full Message</label>
                <textarea
                  rows={7}
                  value={newCard.fullMessage}
                  onChange={(e) => setNewCard({ ...newCard, fullMessage: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 bg-slate-50 resize-none"
                  placeholder="Complete message for Read More..."
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-emerald-50 border-t-2 border-emerald-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setIsAddingNew(false)}
                className="text-gray-500 hover:text-gray-800 text-sm font-bold px-4 py-2 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCard}
                disabled={!newCard.name.trim()}
                className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-sm px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <PlusCircle size={16} />
                Add Author Card
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
