import { Outlet, useLocation } from "@tanstack/react-router";
import { ChatSidebar } from "./ChatSidebar";

export function ChatLayout() {
  const location = useLocation();
  
  // Determine active section based on current route
  const activeSection = location.pathname.includes('/channels') ? 'channels' : 'chats';
  
  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <ChatSidebar activeSection={activeSection as "chats" | "channels"} />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
