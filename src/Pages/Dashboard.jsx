import DashboardSidebar from "../Components/DashboardSidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <DashboardSidebar />
      </div>

      {/* Right side content */}
      <main className="flex-1 h-screen overflow-y-auto bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}