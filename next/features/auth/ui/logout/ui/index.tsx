"use client";

import "@/shared/ui/ui.css";

export default function LogoutButton() {
  const handleLogout = async () => {
    localStorage.removeItem("nextAccessToken");
    window.location.assign("/login");
  };

  return (
    <button className="btn btn--primary" type="submit" onClick={handleLogout}>
      Выйти
    </button>
  );
}
