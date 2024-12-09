// import React, { useEffect } from "react";
// import { IoIosStar } from "react-icons/io";
// import { NavLink } from "react-router-dom";
// import { RiArrowRightDoubleFill } from "react-icons/ri";
// import img from "../Images/svgviewer-png-output (1).png";

// const HeroSection = () => {
//   useEffect(() => {
//     let deferredPrompt;

//     // Listen for the beforeinstallprompt event
//     const handleBeforeInstallPrompt = (event) => {
//       // Prevent the default mini-infobar from appearing on mobile
//       event.preventDefault();

//       // Save the event so it can be triggered later
//       deferredPrompt = event;

//       // Always show the install button, even if the app is already installed
//       const installBtn = document.getElementById('installBtn');
//       installBtn.style.display = 'block';

//       // Add a click event listener to the install button
//       const onInstallClick = async () => {
//         if (deferredPrompt) {
//           // Show the install prompt
//           deferredPrompt.prompt();

//           // Wait for the user's response
//           const { outcome } = await deferredPrompt.userChoice;

//           if (outcome === 'accepted') {
//             console.log('User accepted the install prompt');
//           } else {
//             console.log('User dismissed the install prompt');
//           }

//           // Clear the deferred prompt
//           deferredPrompt = null;
//         }
//       };

//       installBtn.addEventListener('click', onInstallClick);

//       // Cleanup the event listener when the component is unmounted
//       return () => {
//         installBtn.removeEventListener('click', onInstallClick);
//       };
//     };

//     // Attach the event listener
//     window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

//     // Optional: Handle the appinstalled event
//     window.addEventListener('appinstalled', () => {
//       console.log('PWA installed successfully!');
//     });

//     // Cleanup on unmount
//     return () => {
//       window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
//     };
//   }, []);

//   return (
//     <div className="text-white lg:px-28 md:px-20 px-5 pt-5">
//       <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 items-center">
//         <div className="max-w-lg mx-auto order-2 lg:order-1 md:order-2">
//           <div className="lg:text-5xl text-4xl font-bold leading-tight">
//             True crypto ownership.
//           </div>
//           <div className="lg:text-5xl text-4xl font-bold leading-tight">
//             Powerful Web3 experiences
//           </div>
//           <div className="pt-5 text-lg">
//             Unlock the power of your cryptocurrency assets and explore the world
//             of Web3 with Trust.
//           </div>
//           <div className="py-5 pt-7" id="installBtn" style={{ display: 'block' }}>
//             <NavLink
//               className="text-[--main-color] border border-[--main-color] py-3 px-6 hover:cursor-pointer rounded-full w-max hover:bg-[--main-color] hover:text-black transition-all duration-500 flex items-center"
//             >
//               Download APP&nbsp;
//               <RiArrowRightDoubleFill className="text-xl" />
//             </NavLink>
//           </div>
//         </div>
//         <div className="order-1 lg:order-2 md:order-1">
//           <img className="lg:w-[560px] md:w-[400px] w-[300px] mx-auto" src={img} alt="Gnosis" />
//         </div>
//       </div>
//       <div className="grid lg:grid-cols-5 md:grid-cols-5 grid-cols-1 gap-5 lg:gap-0 md:gap-0 pt-8 lg:pb-20 md:pb-20 pb-10">
//         <div className="text-center font-bold text-xl">
//           <p>Trusted by</p>
//           <p>
//             <span className="text-[--main-color]">200K</span> people
//           </p>
//         </div>
//         <div className="text-center font-bold text-xl">
//           <p>Founded in</p>
//           <p className="text-[--main-color]">2024</p>
//         </div>
//         <div className="text-center font-bold text-xl">
//           <p>Independently</p>
//           <p className="text-[--main-color]">Audited</p>
//         </div>
//         <div className="text-center font-bold text-xl">
//           <p>ISO</p>
//           <p className="text-[--main-color]">Certified</p>
//         </div>
//         <div className="text-center font-bold text-xl">
//           <p>Top Reviews</p>
//           <p className="flex gap-1 justify-center text-[--main-color] text-2xl">
//             <IoIosStar />
//             <IoIosStar />
//             <IoIosStar />
//             <IoIosStar />
//             <IoIosStar />
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;

// import React, { useEffect, useState } from "react";
// import { IoIosStar } from "react-icons/io";
// import { NavLink } from "react-router-dom";
// import { RiArrowRightDoubleFill } from "react-icons/ri";
// import img from "../Images/svgviewer-png-output (1).png";

// const HeroSection = () => {
//   const [isIos, setIsIos] = useState(false);
//   const [isAndroid, setIsAndroid] = useState(false);

//   useEffect(() => {
//     // Detect if the user is on iOS or Android
//     const userAgent = navigator.userAgent.toLowerCase();
//     if (/iphone|ipod|ipad/.test(userAgent)) {
//       setIsIos(true);
//     }
//     if (/android/.test(userAgent)) {
//       setIsAndroid(true);
//     }

//     let deferredPrompt;

//     // Listen for the beforeinstallprompt event (for Android, Windows, or desktop browsers)
//     const handleBeforeInstallPrompt = (event) => {
//       // Prevent the default mini-infobar from appearing on mobile
//       event.preventDefault();

//       // Save the event so it can be triggered later
//       deferredPrompt = event;

//       // Always show the install button, even if the app is already installed
//       const installBtn = document.getElementById("installBtn");
//       installBtn.style.display = "block";

//       // Add a click event listener to the install button
//       const onInstallClick = async () => {
//         if (deferredPrompt) {
//           // Show the install prompt
//           deferredPrompt.prompt();

//           // Wait for the user's response
//           const { outcome } = await deferredPrompt.userChoice;

//           if (outcome === "accepted") {
//             console.log("User accepted the install prompt");
//           } else {
//             console.log("User dismissed the install prompt");
//           }

//           // Clear the deferred prompt
//           deferredPrompt = null;
//         }
//       };

//       installBtn.addEventListener("click", onInstallClick);

//       // Cleanup the event listener when the component is unmounted
//       return () => {
//         installBtn.removeEventListener("click", onInstallClick);
//       };
//     };

//     // Attach the event listener (for Android, Windows, or desktop devices)
//     window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

//     // Optional: Handle the appinstalled event
//     window.addEventListener("appinstalled", () => {
//       console.log("PWA installed successfully!");
//     });

//     // Cleanup on unmount
//     return () => {
//       window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
//     };
//   }, []);

//   return (
//     <div className="text-white lg:px-28 md:px-20 px-5 pt-5">
//       <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 items-center">
//         <div className="max-w-lg mx-auto order-2 lg:order-1 md:order-2">
//           <div className="lg:text-5xl text-4xl font-bold leading-tight">
//             True crypto ownership.
//           </div>
//           <div className="lg:text-5xl text-4xl font-bold leading-tight">
//             Powerful Web3 experiences
//           </div>
//           <div className="pt-5 text-lg">
//             Unlock the power of your cryptocurrency assets and explore the world
//             of Web3 with Trust.
//           </div>

//           {/* Show the install button for Android, Windows, and other supported platforms */}
//           <div
//             className="py-5 pt-7"
//             id="installBtn"
//             style={{ display: "block" }} // Always show button
//           >
//             {isIos ? (
//               <div className="text-center text-lg">
//                 <p className="mb-2">Add to Home Screen (iOS):</p>
//                 <p className="text-sm">
//                   To install this app, tap the{" "}
//                   <strong>Share</strong> icon in Safari and then select{" "}
//                   <strong>Add to Home Screen</strong>.
//                 </p>
//               </div>
//             ) : isAndroid ? (
//               <NavLink
//                 className="text-[--main-color] border border-[--main-color] py-3 px-6 hover:cursor-pointer rounded-full w-max hover:bg-[--main-color] hover:text-black transition-all duration-500 flex items-center"
//               >
//                 Download APP&nbsp;
//                 <RiArrowRightDoubleFill className="text-xl" />
//               </NavLink>
//             ) : (
//               <NavLink
//                 className="text-[--main-color] border border-[--main-color] py-3 px-6 hover:cursor-pointer rounded-full w-max hover:bg-[--main-color] hover:text-black transition-all duration-500 flex items-center"
//               >
//                 Download APP&nbsp;
//                 <RiArrowRightDoubleFill className="text-xl" />
//               </NavLink>
//             )}
//           </div>
//         </div>
//         <div className="order-1 lg:order-2 md:order-1">
//           <img className="lg:w-[560px] md:w-[400px] w-[300px] mx-auto pt-14" src={img} alt="Gnosis" />
//         </div>
//       </div>
//       <div className="grid lg:grid-cols-5 md:grid-cols-5 grid-cols-1 gap-5 lg:gap-0 md:gap-0 pt-8 lg:pb-20 md:pb-20 pb-10">
//         <div className="text-center font-bold text-xl">
//           <p>Trusted by</p>
//           <p>
//             <span className="text-[--main-color]">200K</span> people
//           </p>
//         </div>
//         <div className="text-center font-bold text-xl">
//           <p>Founded in</p>
//           <p className="text-[--main-color]">2024</p>
//         </div>
//         <div className="text-center font-bold text-xl">
//           <p>Independently</p>
//           <p className="text-[--main-color]">Audited</p>
//         </div>
//         <div className="text-center font-bold text-xl">
//           <p>ISO</p>
//           <p className="text-[--main-color]">Certified</p>
//         </div>
//         <div className="text-center font-bold text-xl">
//           <p>Top Reviews</p>
//           <p className="flex gap-1 justify-center text-[--main-color] text-2xl">
//             <IoIosStar />
//             <IoIosStar />
//             <IoIosStar />
//             <IoIosStar />
//             <IoIosStar />
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
import React, { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { MdOutlineIosShare } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import img from "../Images/svgviewer-png-output (1).png";

const HeroSection = () => {
  const [isIos, setIsIos] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);

  useEffect(() => {
    // Detect if the user is on iOS or Android
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipod|ipad/.test(userAgent)) {
      setIsIos(true);
      setShowInstallModal(true); // Automatically show modal on iOS
    }
    if (/android/.test(userAgent)) {
      setIsAndroid(true);
    }

    let deferredPrompt;

    // Listen for the beforeinstallprompt event (for Android, Windows, or desktop browsers)
    const handleBeforeInstallPrompt = (event) => {
      // Prevent the default mini-infobar from appearing on mobile
      event.preventDefault();

      // Save the event so it can be triggered later
      deferredPrompt = event;

      // Always show the install button, even if the app is already installed
      const installBtn = document.getElementById("installBtn");
      installBtn.style.display = "block";

      // Add a click event listener to the install button
      const onInstallClick = async () => {
        if (deferredPrompt) {
          // Show the install prompt
          deferredPrompt.prompt();

          // Wait for the user's response
          const { outcome } = await deferredPrompt.userChoice;

          if (outcome === "accepted") {
            console.log("User accepted the install prompt");
          } else {
            console.log("User dismissed the install prompt");
          }

          // Clear the deferred prompt
          deferredPrompt = null;
        }
      };

      installBtn.addEventListener("click", onInstallClick);

      // Cleanup the event listener when the component is unmounted
      return () => {
        installBtn.removeEventListener("click", onInstallClick);
      };
    };

    // Attach the event listener (for Android, Windows, or desktop devices)
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Optional: Handle the appinstalled event
    window.addEventListener("appinstalled", () => {
      console.log("PWA installed successfully!");
    });

    // Cleanup on unmount
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    // Show the modal when user clicks the button
    setShowInstallModal(true);
  };

  return (
    <div className="text-white lg:px-28 md:px-20 px-5 pt-5">
      <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 items-center">
        <div className="max-w-lg mx-auto order-2 lg:order-1 md:order-2">
          <div className="lg:text-5xl text-4xl font-bold leading-tight">
            True crypto ownership.
          </div>
          <div className="lg:text-5xl text-4xl font-bold leading-tight">
            Powerful Web3 experiences
          </div>
          <div className="pt-5 text-lg">
            Unlock the power of your cryptocurrency assets and explore the world
            of Web3 with Trust.
          </div>

          {/* Show the install button for Android, Windows, or other supported platforms */}
          <div
            className="py-5 pt-7"
            id="installBtn"
            style={{ display: "block" }} // Always show button
          >
            {isIos ? (
              <NavLink
                className="text-[--main-color] border border-[--main-color] py-3 px-6 hover:cursor-pointer rounded-full w-max hover:bg-[--main-color] hover:text-black transition-all duration-500 flex items-center"
                onClick={handleInstallClick}
              >
                Install PWA&nbsp;
                <RiArrowRightDoubleFill className="text-xl" />
              </NavLink>
            ) : isAndroid ? (
              <NavLink
                className="text-[--main-color] border border-[--main-color] py-3 px-6 hover:cursor-pointer rounded-full w-max hover:bg-[--main-color] hover:text-black transition-all duration-500 flex items-center"
                onClick={handleInstallClick}
              >
                Download APP&nbsp;
                <RiArrowRightDoubleFill className="text-xl" />
              </NavLink>
            ) : (
              <NavLink
                className="text-[--main-color] border border-[--main-color] py-3 px-6 hover:cursor-pointer rounded-full w-max hover:bg-[--main-color] hover:text-black transition-all duration-500 flex items-center"
                onClick={handleInstallClick}
              >
                Download APP&nbsp;
                <RiArrowRightDoubleFill className="text-xl" />
              </NavLink>
            )}
          </div>
        </div>
        <div className="order-1 lg:order-2 md:order-1">
          <img className="lg:w-[560px] md:w-[400px] w-[300px] mx-auto pt-14" src={img} alt="Gnosis" />
        </div>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-5 grid-cols-1 gap-5 lg:gap-0 md:gap-0 pt-8 lg:pb-20 md:pb-20 pb-10">
        <div className="text-center font-bold text-xl">
          <p>Trusted by</p>
          <p>
            <span className="text-[--main-color]">200K</span> people
          </p>
        </div>
        <div className="text-center font-bold text-xl">
          <p>Founded in</p>
          <p className="text-[--main-color]">2024</p>
        </div>
        <div className="text-center font-bold text-xl">
          <p>Independently</p>
          <p className="text-[--main-color]">Audited</p>
        </div>
        <div className="text-center font-bold text-xl">
          <p>ISO</p>
          <p className="text-[--main-color]">Certified</p>
        </div>
        <div className="text-center font-bold text-xl">
          <p>Top Reviews</p>
          <p className="flex gap-1 justify-center text-[--main-color] text-2xl">
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
          </p>
        </div>
      </div>

      {/* Modal for installation instructions */}
      {showInstallModal && (
         <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
         <div className="bg-[#2C2C2E] text-white rounded-xl max-w-sm w-full shadow-lg">
           <div className="flex justify-between items-center p-4 border-b border-gray-700">
             <h2 className="text-lg font-semibold">Add to Home Screen</h2>
             <button
              onClick={() => setShowInstallModal(false)}
               className="text-[#007AFF] text-sm font-medium"
             >
               Cancel
             </button>
           </div>
           <div className="p-4 space-y-4">
             <p className="text-gray-400 text-sm">
               This website has app functionality. Add it to your home screen to use
               it in fullscreen and while offline.
             </p>
             <div className="space-y-4">
               <div className="flex items-start gap-4">
                 <div className="bg-[#3A3A3C] p-2 rounded-lg">
                   <MdOutlineIosShare className="w-6 h-6 text-[#007AFF]" />
                 </div>
                 <p className="text-sm pt-1">
                   1) Press the &apos;Share&apos; button on the menu bar below.
                 </p>
               </div>
               <div className="flex items-start gap-4">
                 <div className="bg-[#3A3A3C] p-2 rounded-lg">
                   <FaPlus className="w-6 h-6 text-[#007AFF]" />
                 </div>
                 <p className="text-sm pt-1">
                   2) Press &apos;Add to Home Screen&apos;.
                 </p>
               </div>
             </div>
           </div>
         </div>
       </div>
      )}
    </div>
  );
};

export default HeroSection;
