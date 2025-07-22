// src/components/AnnouncementPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Mail,
  Send as SendIcon,
  FileText,
  Star,
  Trash2,
} from "lucide-react";
import NewAnnouncement from "./NewAnnouncement";

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;

export default function AnnouncementPage() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [starredAnnouncements, setStarredAnnouncements] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState("inbox");
  const [showComposeForm, setShowComposeForm] = useState(false);

  const loggedInUsername = "papersetter001"; // TODO: Replace with dynamic user

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/api/announcements/user/${loggedInUsername}`)
      .then((res) => res.json())
      .then((data) => {
        // Add formatted date to each announcement
        const announcementsWithDate = data.map((a) => ({
          ...a,
          date: new Date(a.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          }),
          recipient: a.recipientUsername,
        }));
        setAnnouncements(announcementsWithDate);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch announcements", err);
        setLoading(false);
      });
  }, []);

  const handleSidebarItemClick = (item) => setActiveSidebarItem(item);
  const handleComposeClick = () => setShowComposeForm(true);

  const toggleStar = (id, e) => {
    e.stopPropagation();
    setStarredAnnouncements((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addNewAnnouncement = ({ to, subject, message }) => {
    const newAnnouncement = {
      author: "admin001", // TODO: Replace with dynamic admin
      recipientUsername: to,
      title: subject,
      message: message,
    };

    fetch("http://localhost:8080/api/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAnnouncement),
    })
      .then((res) => res.json())
      .then((saved) => {
        const formatted = {
          ...saved,
          date: new Date(saved.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          }),
          recipient: saved.recipientUsername,
        };
        setAnnouncements((prev) => [formatted, ...prev]);
        setShowComposeForm(false);
      })
      .catch((err) => console.error("Failed to send announcement", err));
  };

  const deleteAnnouncement = (id, e) => {
    e.stopPropagation();
    fetch(`http://localhost:8080/api/announcements/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setAnnouncements((prev) => prev.filter((a) => a.id !== id));
        setStarredAnnouncements((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      })
      .catch((err) => console.error("Failed to delete announcement", err));
  };

  const filteredAnnouncements = announcements
    .filter((a) => {
      if (activeSidebarItem === "starred") return !!starredAnnouncements[a.id];
      if (activeSidebarItem === "sent") return a.author === "admin001";
      if (activeSidebarItem === "draft") return a.title.includes("Draft");
      return true;
    })
    .filter(
      (a) =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (activeSidebarItem === "sent" ? a.recipient : a.author)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

  return (
    <div className="w-full max-w-6xl mx-auto pt-36">
      <style>{fadeInKeyframes}</style>
      {/* Main Interface */}
      <div className="flex p-4 bg-gray-50 rounded relative">
        {/* Sidebar */}
        <div className="w-52 bg-gray-50 rounded-lg mr-4 p-2">
          <button
            onClick={handleComposeClick}
            className="w-full flex items-center justify-center bg-blue-800 hover:bg-blue-900 text-white rounded-md py-2 mb-4"
          >
            <Mail size={16} className="mr-2" /> Compose
          </button>
          {[
            {
              key: "inbox",
              icon: Mail,
              label: "Inbox",
              count: announcements.filter((a) => a.author !== "admin001")
                .length,
            },
            {
              key: "sent",
              icon: SendIcon,
              label: "Sent",
              count: announcements.filter((a) => a.author === "admin001")
                .length,
            },
            {
              key: "draft",
              icon: FileText,
              label: "Draft",
              count: announcements.filter((a) => a.title.includes("Draft"))
                .length,
            },
            {
              key: "starred",
              icon: Star,
              label: "Starred",
              count: Object.values(starredAnnouncements).filter(Boolean).length,
            },
          ].map(({ key, icon: Icon, label, count }) => (
            <div
              key={key}
              onClick={() => handleSidebarItemClick(key)}
              className={`flex items-center justify-between px-4 py-2 mb-1 cursor-pointer ${
                activeSidebarItem === key ? "bg-blue-50 rounded" : ""
              }`}
            >
              <div className="flex items-center">
                <Icon size={16} className="text-gray-600 mr-2" />
                <span>{label}</span>
              </div>
              <span className="bg-gray-200 rounded-full px-2 text-xs">
                {count}
              </span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 relative">
          <div className="flex mb-4">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1 mr-2">
              <Search size={16} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search announcements"
                className="bg-transparent border-none focus:outline-none flex-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div
            className="space-y-3 overflow-y-auto pr-2"
            style={{ maxHeight: 400 }}
          >
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 rounded-full" />
              </div>
            ) : filteredAnnouncements.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No announcements found
              </div>
            ) : (
              filteredAnnouncements.map((a) => {
                const displayName =
                  activeSidebarItem === "sent" ? a.recipient : a.author;
                return (
                  <div
                    key={a.id}
                    onClick={() =>
                      navigate(`/announcement/${a.id}`, {
                        state: { announcement: a },
                      })
                    }
                    className="bg-blue-100 rounded-full px-4 py-3 flex items-center justify-between animate-fadeIn cursor-pointer"
                  >
                    <div className="flex items-center w-1/3">
                      <button
                        onClick={(e) => toggleStar(a.id, e)}
                        className="mr-2"
                      >
                        <Star
                          size={16}
                          className={
                            starredAnnouncements[a.id]
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-400"
                          }
                        />
                      </button>
                      <span className="font-medium">{displayName}</span>
                    </div>
                    <div className="flex-1 text-center">{a.title}</div>
                    <div className="w-20 flex items-center justify-end text-right">
                      <span className="text-sm mr-3">{a.date}</span>
                      <button
                        onClick={(e) => deleteAnnouncement(a.id, e)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {showComposeForm && (
        <NewAnnouncement
          onClose={() => setShowComposeForm(false)}
          onSend={addNewAnnouncement}
        />
      )}
    </div>
  );
}
