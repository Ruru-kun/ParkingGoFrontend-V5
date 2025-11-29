import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

function favoritesKeyFor(email) {
  return `parkinggo_favorites_${email}`;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]); // array of { id, meta }

  useEffect(() => {
    try {
      const raw = localStorage.getItem("parkinggo_user");
      if (raw) {
        const u = JSON.parse(raw);
        setUser(u);
      }
    } catch (e) {
      console.warn("Auth load error", e);
    }
  }, []);

  // whenever user changes, load favorites for that user
  useEffect(() => {
    if (user && user.email) {
      try {
        const raw = localStorage.getItem(favoritesKeyFor(user.email));
        if (raw) {
          setFavorites(JSON.parse(raw));
        } else {
          setFavorites([]);
        }
      } catch (e) {
        console.warn("Fav load error", e);
        setFavorites([]);
      }
    } else {
      setFavorites([]);
    }
  }, [user]);

  function persistFavorites(next) {
    if (!user || !user.email) return;
    try {
      localStorage.setItem(favoritesKeyFor(user.email), JSON.stringify(next));
    } catch (e) {
      console.warn("Could not persist favorites", e);
    }
  }

  function login({ email }) {
    const u = { email, loggedAt: Date.now() };
    try {
      localStorage.setItem("parkinggo_user", JSON.stringify(u));
    } catch (e) {
      console.warn("Could not persist user", e);
    }
    setUser(u);
    // favorites will be loaded by effect
    return u;
  }

  function logout() {
    try {
      localStorage.removeItem("parkinggo_user");
    } catch (e) {
      console.warn("Could not remove user", e);
    }
    setUser(null);
    setFavorites([]);
  }

  function isFavorite(id) {
    return favorites.some((f) => f.id === id);
  }

  function toggleFavorite(id, meta = {}) {
    if (!user || !user.email) {
      // caller should handle redirect to login if necessary
      return false;
    }

    let next;
    if (isFavorite(id)) {
      next = favorites.filter((f) => f.id !== id);
    } else {
      // add with meta (name/address/price etc.)
      next = [...favorites, { id, meta }];
    }
    setFavorites(next);
    persistFavorites(next);
    return !isFavorite(id); // returns new state (best-effort)
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    favorites,
    toggleFavorite,
    isFavorite,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
