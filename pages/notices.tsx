import { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Modal from "../components/Modal";

interface Notice {
  id: string;
  title: string;
  description: string;
  date: string;
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: "1",
      title: "Monthly Rent Collection",
      description: "Please ensure all rent payments are made by the 5th of each month. Late fees will apply after the due date.",
      date: "2024-01-15"
    },
    {
      id: "2",
      title: "Maintenance Schedule",
      description: "Scheduled maintenance for water heaters will be conducted on January 20th. Please be available during 9 AM - 5 PM.",
      date: "2024-01-10"
    },
    {
      id: "3",
      title: "New Security Measures",
      description: "New security cameras have been installed in common areas. Please ensure you have your access cards with you at all times.",
      date: "2024-01-08"
    },
    {
      id: "4",
      title: "WiFi Password Update",
      description: "The WiFi password has been updated. New password: DomuPG2024. Please update your devices accordingly.",
      date: "2024-01-05"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [newNotice, setNewNotice] = useState({
    title: "",
    description: "",
  });

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNotice.title && newNotice.description) {
      const notice: Notice = {
        id: Date.now().toString(),
        title: newNotice.title,
        description: newNotice.description,
        date: new Date().toISOString().split('T')[0],
      };
      setNotices([notice, ...notices]);
      setNewNotice({ title: "", description: "" });
      setIsModalOpen(false);
    }
  };

  const handleEditNotice = (notice: Notice) => {
    setEditingNotice(notice);
    setNewNotice({ title: notice.title, description: notice.description });
    setIsModalOpen(true);
  };

  const handleUpdateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNotice && newNotice.title && newNotice.description) {
      setNotices(notices.map(notice => 
        notice.id === editingNotice.id 
          ? { ...notice, title: newNotice.title, description: newNotice.description }
          : notice
      ));
      setNewNotice({ title: "", description: "" });
      setEditingNotice(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteNotice = (id: string) => {
    setNotices(notices.filter(notice => notice.id !== id));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNotice(null);
    setNewNotice({ title: "", description: "" });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <Header user={null} />
        
        <div className="flex">
          <Sidebar activePage="notices" isOpen={false} onClose={() => {}} />
          
          <main className="flex-1 p-8">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Notices</h2>
                <p className="text-gray-600">Manage announcements and important updates</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Notice
              </button>
            </div>

            {/* Notices List */}
            <div className="space-y-4">
              {notices.map((notice) => (
                <div key={notice.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{notice.title}</h3>
                      <p className="text-gray-600 mb-3">{notice.description}</p>
                      <p className="text-sm text-gray-500">
                        Posted on: {new Date(notice.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEditNotice(notice)}
                        className="text-blue-600 hover:text-blue-900 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteNotice(notice.id)}
                        className="text-red-600 hover:text-red-900 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {notices.length === 0 && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No notices</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new notice.</p>
              </div>
            )}
          </main>
        </div>

        {/* Add/Edit Notice Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingNotice ? "Edit Notice" : "Add New Notice"}
        >
          <form onSubmit={editingNotice ? handleUpdateNotice : handleAddNotice} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                required
                value={newNotice.title}
                onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter notice title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                required
                rows={4}
                value={newNotice.description}
                onChange={(e) => setNewNotice({ ...newNotice, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter notice description"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                {editingNotice ? "Update Notice" : "Add Notice"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </ProtectedRoute>
  );
}
