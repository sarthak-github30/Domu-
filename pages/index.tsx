import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Listen for login state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setLoading(false);
        router.push("/dashboard"); // redirect to dashboard if logged in
      } else {
        setUser(null);
        setLoading(false);
        router.push("/login"); // redirect if not logged in
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      {user ? (
        <div>
          <h1>Welcome to Domu 🎉</h1>
          <p>Logged in as: {user.email}</p>
          <button onClick={() => auth.signOut()}>Logout</button>
        </div>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </div>
  );
}
