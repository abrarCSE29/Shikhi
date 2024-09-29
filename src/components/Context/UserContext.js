import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

// Create the UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    return savedUser
      ? JSON.parse(savedUser)
      : { name: "", email: "", mobile: "", dob: "", profession: "", isSignedIn: false, cart: [] };
  });

  const [cart, setCart] = useState(() => {
    // Initialize the cart from the loggedInUser data in localStorage
    const savedUser = localStorage.getItem("loggedInUser");
    const parsedUser = savedUser ? JSON.parse(savedUser) : null;
    return parsedUser && parsedUser.cart ? parsedUser.cart : [];
  });

  // Fetch full course details based on cart's course IDs
  const fetchCartCoursesFromDB = async () => {
    if (loggedInUser.cart && loggedInUser.cart.length > 0) {
      try {
        const response = await axios.post('http://localhost:5000/courses/details', {
          courseIds: loggedInUser.cart, // Send stored cart's course IDs
        });
        setCart(response.data); // Set the cart with full course details
      } catch (error) {
        console.error('Error fetching course details from database:', error);
      }
    }
  };

  // Add function to send cart data to MongoDB
  const saveCartToDB = async (updatedCart) => {
    if (loggedInUser.isSignedIn) {
      try {
        await axios.post(`http://localhost:5000/users/${loggedInUser.email}/cart`, {
          cartItems: updatedCart.map(item => item.id), // Send only the product IDs
        });
      } catch (error) {
        console.error("Error saving cart to database:", error);
      }
    }
  };

  const handleAddCourseToCart = (course) => {
    if (cart.find(item => item.id === course.id)) {
      return; // Prevent adding the same course multiple times
    }
    const updatedCart = [...cart, course];
    setCart(updatedCart);
    loggedInUser.cart = updatedCart.map(item => item.id); // Store only course IDs in loggedInUser
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    saveCartToDB(updatedCart); // Save to MongoDB
  };

  const handleRemoveCourseFromCart = (course) => {
    const updatedCart = cart.filter((pd) => pd.id !== course.id);
    setCart(updatedCart);
    loggedInUser.cart = updatedCart.map(item => item.id); // Update the cart in loggedInUser
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    saveCartToDB(updatedCart); // Save to MongoDB
  };

  const emptyCart = () => {
    setCart([]);
    loggedInUser.cart = []; // Clear cart in loggedInUser
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    saveCartToDB([]); // Clear cart in MongoDB
  };

  // Use effect to update localStorage when loggedInUser or cart state changes
  useEffect(() => {
    if (loggedInUser.isSignedIn) {
      fetchCartCoursesFromDB();
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, [loggedInUser]);

  // Update localStorage when the cart changes
  useEffect(() => {
    if (loggedInUser.isSignedIn) {
      loggedInUser.cart = cart.map(item => item.id); // Store only course IDs in loggedInUser
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    }
  }, [cart]);

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        cart,
        setCart,
        handleAddCourseToCart,
        handleRemoveCourseFromCart,
        emptyCart,
        fetchCartCoursesFromDB,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
