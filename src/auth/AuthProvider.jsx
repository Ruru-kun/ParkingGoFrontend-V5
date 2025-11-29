import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "parkinggo_users";
const CURRENT_USER_KEY = "parkinggo_user";
const favoritesKeyFor = (email) => `parkinggo_favorites_${email}`;

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn("Could not load users", e);
    return {};
  }
}

function persistUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.warn("Could not persist users", e);
  }
}

function genId() {
  return "u" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, email, name }
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // load current user
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      if (raw) {
        const u = JSON.parse(raw);
        setUser(u);
      }
    } catch (e) {
      console.warn("Auth load error", e);
    }
  }, []);

  // load favorites for current user
  useEffect(() => {
    if (user && user.email) {
      try {
        const raw = localStorage.getItem(favoritesKeyFor(user.email));
        if (raw) setFavorites(JSON.parse(raw));
        else setFavorites([]);
      } catch (e) {
        console.warn("Favorites load error", e);
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

  // Register: creates user record and logs in
  function register({ name, email, password }) {
    if (!email || !password || !name) {
      return { ok: false, message: "Preencha nome, email e senha." };
    }
    const users = loadUsers();
    if (users[email]) {
      return { ok: false, message: "Email já cadastrado." };
    }
    const id = genId();
    users[email] = { id, name, password };
    persistUsers(users);

    const u = { id, email, name };
    try {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(u));
    } catch (e) {
      console.warn("Could not persist current user", e);
    }
    setUser(u);
    return { ok: true, user: u };
  }

  // Login: verifies credentials against stored users
  function login({ email, password }) {
    const users = loadUsers();
    const found = users[email];
    if (!found) {
      return { ok: false, message: "Usuário não encontrado." };
    }
    if (found.password !== password) {
      return { ok: false, message: "Senha incorreta." };
    }
    const u = { id: found.id, email, name: found.name };
    try {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(u));
    } catch (e) {
      console.warn("Could not persist current user", e);
    }
    setUser(u);
    return { ok: true, user: u };
  }

  // Logout
  function logout() {
    try {
      localStorage.removeItem(CURRENT_USER_KEY);
    } catch (e) {
      console.warn("Could not remove current user", e);
    }
    setUser(null);
    setFavorites([]);
  }

  // Update profile: name, email, password
  // If email changes, migrate favorites and user data
  function updateProfile({ name, email: newEmail, password: newPassword }) {
    if (!user) return { ok: false, message: "Sem usuário autenticado." };

    const oldEmail = user.email;
    const users = loadUsers();

    // if changing to an email that already exists (and it's not the current user) -> error
    if (newEmail !== oldEmail && users[newEmail]) {
      return { ok: false, message: "O email informado já está em uso." };
    }

    // Update users map
    const currentRecord = users[oldEmail];
    if (!currentRecord) {
      return { ok: false, message: "Registro do usuário não encontrado." };
    }

    // Build the new record
    const newRecord = {
      id: currentRecord.id || user.id || genId(),
      name: name || currentRecord.name,
      password: newPassword !== undefined && newPassword !== null && newPassword !== "" ? newPassword : currentRecord.password,
    };

    // Remove old email entry if changed
    if (newEmail && newEmail !== oldEmail) {
      delete users[oldEmail];
      users[newEmail] = newRecord;

      // migrate favorites
      try {
        const oldFavRaw = localStorage.getItem(favoritesKeyFor(oldEmail));
        if (oldFavRaw) {
          localStorage.setItem(favoritesKeyFor(newEmail), oldFavRaw);
          localStorage.removeItem(favoritesKeyFor(oldEmail));
        }
      } catch (e) {
        console.warn("Could not migrate favorites", e);
      }

    } else {
      // keep same email
      users[oldEmail] = newRecord;
    }

    persistUsers(users);

    // Update current user object
    const updatedUser = { id: newRecord.id, email: newEmail || oldEmail, name: newRecord.name };
    try {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    } catch (e) {
      console.warn("Could not persist current user", e);
    }

    setUser(updatedUser);
    // favorites will reload via useEffect
    return { ok: true, user: updatedUser };
  }

  function isFavorite(id) {
    return favorites.some((f) => f.id === id);
  }

  function toggleFavorite(id, meta = {}) {
    if (!user || !user.email) {
      // caller should redirect to login
      return false;
    }
    let next;
    if (isFavorite(id)) {
      next = favorites.filter((f) => f.id !== id);
    } else {
      next = [...favorites, { id, meta }];
    }
    setFavorites(next);
    persistFavorites(next);
    return !isFavorite(id);
  }

  const value = {
    user,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile,
    favorites,
    toggleFavorite,
    isFavorite,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
