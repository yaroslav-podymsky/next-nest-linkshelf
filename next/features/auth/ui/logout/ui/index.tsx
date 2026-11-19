"use client";

import { logoutAction } from "@/features/auth/actions";
import "@/shared/ui/ui.css";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await logoutAction();
    } finally {
      localStorage.removeItem("nextAccessToken");
      window.location.assign("/login");
    }
  };

  return (
    <button className="btn btn--primary" type="button" onClick={handleLogout}>
      Выйти
    </button>
  );
}
