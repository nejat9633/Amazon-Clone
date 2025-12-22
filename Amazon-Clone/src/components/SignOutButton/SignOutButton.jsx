import { useState } from "react";
import { auth } from "../../Utils/firebase";
import style from './SignOutButton.module.css'

export default function SignOutButton() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await auth.signOut();
      setShowConfirm(false);
    } catch (error) {
      console.error("Sign out failed:", error);
      alert("Sign out failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "inline-block" }}>
      <button
        onClick={() => setShowConfirm(true)}
        className={style.main_btn}
      >
        Sign out
      </button>

      {showConfirm && (
          <div className={style.overlay}>
        <div className={style.container}>
          <p>Are you sure you want to sign out?</p>
          <div className={style.btn_container}>
            <button onClick={() => setShowConfirm(false)} className={style.cancel}>Cancel</button>
            <button
              onClick={handleSignOut}
              disabled={loading}
              className={style.signout}
            >
              {loading ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
