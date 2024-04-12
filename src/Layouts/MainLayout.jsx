import { Outlet, useNavigation } from "react-router-dom";
import NavBar from "../Shared/NavBar";
import Footer from "../Shared/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Shared/Loader";
import { useEffect, useState } from "react";
import Preloader from "../Shared/Preloader";

const MainLayout = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Function to check if all resources are loaded
    const handleAllResourcesLoaded = () => {
      setLoading(false); // Set loading to false when all resources are loaded
    };

    // Check if all resources are loaded initially
    if (document.readyState === "complete") {
      handleAllResourcesLoaded();
    }

    // Event listener for the "load" event of the DOM
    const handleLoad = () => {
      handleAllResourcesLoaded();
    };

    // Add event listener for "load" event
    window.addEventListener("load", handleLoad);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return loading ? (
    <Preloader />
  ) : (
    <div className="dark:bg-[#0f172a] dark:text-slate-300">
      <NavBar />
      <div className="min-h-[calc(100vh-170.5px)] mt-16">
        {navigation.state === "loading" ? ( // If loading or navigation is in progress, display the preloader
          <Loader />
        ) : (
          // Otherwise, display the main content
          <Outlet />
        )}
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
