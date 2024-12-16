import { useEffect, useState } from "react";

const usePWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false); 
  const [isIosOrMac, setIsIosOrMac] = useState(false); 
  const [showPopup, setShowPopup] = useState(false); 
  const [showPopupInstalled, setShowPopupInstalled] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    // Detect iOS/macOS devices
    if (/iphone|ipod|ipad/.test(userAgent) || /macintosh/.test(userAgent)) {
      setIsIosOrMac(true);
    }

    // Detect if the app is installed
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    ) {
      setIsAppInstalled(true);
    }

    // Handle the beforeinstallprompt event
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event); // Store the event for later use
    };

    // Listen for app installation event
    window.addEventListener("appinstalled", () => {
      console.log("PWA installed successfully!");
      setIsAppInstalled(true);
    });

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }

      setDeferredPrompt(null);
    }
  };

  return {
    isAppInstalled,
    isIosOrMac,
    showPopup,
    setShowPopup,
    handleInstallClick,
    showPopupInstalled,
    setShowPopupInstalled,
  };
};

export default usePWA;
