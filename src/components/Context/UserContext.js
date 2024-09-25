import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

// Create the UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    return savedUser
      ? JSON.parse(savedUser)
      : { name: "", email: "", mobile: "", dob: "", profession: "", isSignedIn: false, cart: "" };
  });

  const [cart, setCart] = useState([]);

  // Function to fetch full course details based on cart's course IDs
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

  // Call fetchCartCoursesFromDB when user is signed in and cart has course IDs
  useEffect(() => {
    if (loggedInUser.isSignedIn) {
      fetchCartCoursesFromDB();
    }
  }, [loggedInUser.isSignedIn]);

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

  const handleAddCourseToCart =(course) => {
    if(cart.indexOf(course)>=0){
      return;
    }
    const updatedCart = [...cart, course];
    setCart(updatedCart);
    saveCartToDB(updatedCart); // Save to MongoDB
  };

  const handleRemoveCourseFromCart = (course) => {
    const updatedCart = cart.filter((pd) => pd.id !== course.id);
    console.log("uodated cart  ", updatedCart);
    
    setCart(updatedCart);
    saveCartToDB(updatedCart); // Save to MongoDB
  };

  const emptyCart = () => {
    setCart([]);
    saveCartToDB([]); // Clear cart in MongoDB
  };

  // Use effect to update localStorage when loggedInUser state changes
  useEffect(() => {
    if (loggedInUser.isSignedIn) {
      console.log("cart updated");
      loggedInUser.cart = cart;
      
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, [loggedInUser,cart]);

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
