import React, { createContext, useState, useEffect } from "react";

// Create the UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize loggedInUser with data from localStorage, if available
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    return savedUser
      ? JSON.parse(savedUser)
      : { name: "", email: "", mobile: "", dob: "", profession: "", isSignedIn: false };
  });

  // Cart state and handlers
  const [cart, setCart] = useState([]);

  const handleRemoveCourseFromCart = (course) => {
    const newCartCourses = cart.filter((pd) => pd.id !== course.id);
    setCart(newCartCourses);
  };

  const handleAddCourseToCart = (course) => {
    setCart([...cart, course]);
  };
  const emptyCart = () => {
    setCart([]);
  };

  // Use effect to update localStorage when loggedInUser state changes
  useEffect(() => {
    if (loggedInUser.isSignedIn) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("loggedInUser"); // Remove user data on sign-out
    }
  }, [loggedInUser]);

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        cart,
        setCart,
        handleRemoveCourseFromCart,
        handleAddCourseToCart,
        emptyCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};