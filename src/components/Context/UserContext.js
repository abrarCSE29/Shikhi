import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({
    name: "",
    email: "",
    isSignedIn: false,
  });
  const [cart, setCart] = useState([]);
  const handleRemoveCourseFromCart = (course) => {
    const newCartCourses = cart.filter((pd) => pd.id !== course.id);
    setCart(newCartCourses);
  };

  const emptyCart = () => {
    setCart([]);
  }
  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        cart,
        setCart,
        handleRemoveCourseFromCart,
        emptyCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
