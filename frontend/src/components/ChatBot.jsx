// // frontend/src/components/ChatBot.js
// import React, { useState } from "react";
// import axios from "axios";
// import AiRoute from "./AiRoute";

// export default function ChatBot() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [policyUploaded, setPolicyUploaded] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     setMessages([...messages, { sender: "user", text: input }]);
//     setInput("");

//     try {
//       // 🔥 Changed endpoint to /api/chatbot
//       const res = await axios.post("http://localhost:5000/api/chatbot", {
//         query: input,
//       });
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: res.data.answer },
//       ]);
//     } catch (err) {
//       console.error(err);
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "Error contacting server" },
//       ]);
//     }
//   };

//   const uploadFile = async (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     const endpoint = type === "policy" ? "/upload-policy" : "/upload-report";

//     const res = await axios.post(
//       `http://localhost:5000/api${endpoint}`,
//       formData,
//       { headers: { "Content-Type": "multipart/form-data" } }
//     );

//     alert(res.data.message);
//     if (type === "policy") setPolicyUploaded(true);
//   };

//   return (
//     <div className="chatbot-container" style={{ padding: "20px", display: "flex", justifyContent: "center" }}>



//       <div style={{ maxWidth: "500px", margin: "0 auto" }}>
//         <h2>Insurance AI Assistant</h2>
//         <div>
//           <label>Upload Policy: </label>
//           <input type="file" onChange={(e) => uploadFile(e, "policy")} />
//           <br />
//           <label>Upload Report: </label>
//           <input type="file" onChange={(e) => uploadFile(e, "report")} />
//         </div>

//         <div
//           style={{
//             border: "1px solid #ccc",
//             padding: "10px",
//             height: "300px",
//             overflowY: "scroll",
//             marginTop: "10px",
//           }}
//         >
//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               style={{
//                 textAlign: msg.sender === "user" ? "right" : "left",
//                 margin: "5px 0",
//               }}
//             >
//               <b>{msg.sender === "user" ? "You" : "Bot"}:</b> {msg.text}
//             </div>
//           ))}
//         </div>

//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask about your insurance..."
//           style={{ width: "80%", padding: "5px", marginTop: "10px" }}
//         />
//         <button onClick={sendMessage} disabled={!policyUploaded}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }



















// // src/components/ChatBot.js
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import gsap from "gsap";

// export default function ChatBot() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [policyUploaded, setPolicyUploaded] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);

//   const titleRef = useRef(null);
//   const uploadSectionRef = useRef(null);
//   const chatWindowRef = useRef(null);
//   const inputSectionRef = useRef(null);

//   // Animate page load
//   useEffect(() => {
//     const titleWords = titleRef.current.querySelectorAll("span");
//     gsap.from(titleWords, {
//       y: 30,
//       opacity: 0,
//       stagger: 0.2,
//       duration: 0.8,
//       ease: "power3.out",
//     });

//     gsap.from(uploadSectionRef.current, {
//       x: -50,
//       opacity: 0,
//       duration: 1,
//       ease: "power3.out",
//     });

//     gsap.from(inputSectionRef.current, {
//       y: 50,
//       opacity: 0,
//       duration: 1,
//       ease: "power3.out",
//       delay: 0.5,
//     });
//   }, []);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const userMsg = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");

//     setIsTyping(true);
//     try {
//       const res = await axios.post("http://localhost:5000/api/chatbot", {
//         query: input,
//       });

//       setTimeout(() => {
//         setMessages((prev) => [
//           ...prev,
//           { sender: "bot", text: res.data.answer },
//         ]);
//         setIsTyping(false);
//       }, 2000); // Simulate bot thinking for 2s
//     } catch (err) {
//       setIsTyping(false);
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "Error contacting server." },
//       ]);
//     }
//   };

//   const uploadFile = async (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     const endpoint = type === "policy" ? "/upload-policy" : "/upload-report";

//     const res = await axios.post(
//       `http://localhost:5000/api${endpoint}`,
//       formData,
//       { headers: { "Content-Type": "multipart/form-data" } }
//     );

//     alert(res.data.message);
//     if (type === "policy") setPolicyUploaded(true);
//   };

//   useEffect(() => {
//     if (chatWindowRef.current) {
//       chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
//     }
//   }, [messages, isTyping]);

//   return (
//     <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 p-4">
//       {/* Title */}
//       <h2
//         ref={titleRef}
//         className="text-3xl font-bold text-center mb-4 text-blue-900"
//       >
//         {"Insurance AI Assistant".split(" ").map((word, i) => (
//           <span key={i} className="inline-block mr-2">
//             {word}
//           </span>
//         ))}
//       </h2>

//       {/* Upload Section */}
//       <div
//         ref={uploadSectionRef}
//         className="flex flex-col sm:flex-row gap-4 justify-center mb-4"
//       >
//         <div>
//           <label className="block mb-1 font-medium">Upload Policy:</label>
//           <input
//             type="file"
//             className="border p-2 rounded-md"
//             onChange={(e) => uploadFile(e, "policy")}
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Upload Report:</label>
//           <input
//             type="file"
//             className="border p-2 rounded-md"
//             onChange={(e) => uploadFile(e, "report")}
//           />
//         </div>
//       </div>

//       {/* Chat Window */}
//       <div
//         ref={chatWindowRef}
//         className="w-full max-w-lg h-80 border border-gray-300 rounded-lg p-3 bg-white overflow-y-auto shadow-md"
//       >
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`my-2 p-2 rounded-lg inline-block max-w-[80%] ${
//               msg.sender === "user"
//                 ? "bg-blue-100 self-end text-right ml-auto"
//                 : "bg-gray-100 text-left"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//         {isTyping && (
//           <div className="flex gap-2 items-center p-2">
//             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
//             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
//           </div>
//         )}
//       </div>

//       {/* Input Section */}
//       <div
//         ref={inputSectionRef}
//         className="flex gap-8 mt-4 w-full max-w-lg sticky bottom-0 bg-gray-50 p-2"
//       >
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask about your insurance..."
//           className="flex-1  rounded-xl px-4 py-2 hover:border-[#f5f5f5] focus:outline-none border border-gray-300"
//            style={{ boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;" }}

//         />
//         <button
//           onClick={sendMessage}
//           disabled={!policyUploaded}
//           className="px-6 py-2 rounded-full  text-black font-bold disabled:bg-[#f5f5f5]"
//               style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;" }}

//         >
//           Generate
//         </button>
//       </div>
//     </div>
//   );
// }


















// // src/components/ChatBot.js
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import gsap from "gsap";
// import { Circle } from "lucide-react";

// export default function ChatBot() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [policyUploaded, setPolicyUploaded] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);

//   const titleRef = useRef(null);
//   const uploadSectionRef = useRef(null);
//   const chatWindowRef = useRef(null);
//   const inputSectionRef = useRef(null);

//   // Animate page load
//   useEffect(() => {
//     const titleWords = titleRef.current.querySelectorAll("span");
//     gsap.from(titleWords, {
//       y: 30,
//       opacity: 0,
//       stagger: 0.2,
//       duration: 0.8,
//       ease: "power3.out",
//     });

//     gsap.from(uploadSectionRef.current, {
//       x: -50,
//       opacity: 0,
//       duration: 1,
//       ease: "power3.out",
//     });

//     gsap.from(inputSectionRef.current, {
//       y: 50,
//       opacity: 0,
//       duration: 1,
//       ease: "power3.out",
//       delay: 0.5,
//     });
//   }, []);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const userMsg = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");

//     setIsTyping(true);
//     try {
//       const res = await axios.post("http://localhost:5000/api/chatbot", {
//         query: input,
//       });

//       setTimeout(() => {
//         setMessages((prev) => [
//           ...prev,
//           { sender: "bot", text: res.data.answer },
//         ]);
//         setIsTyping(false);
//       }, 2000);
//     } catch (err) {
//       setIsTyping(false);
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "Error contacting server." },
//       ]);
//     }
//   };

//   const uploadFile = async (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     const endpoint = type === "policy" ? "/upload-policy" : "/upload-report";

//     const res = await axios.post(
//       `http://localhost:5000/api${endpoint}`,
//       formData,
//       { headers: { "Content-Type": "multipart/form-data" } }
//     );

//     alert(res.data.message);
//     if (type === "policy") setPolicyUploaded(true);
//   };

//   useEffect(() => {
//     if (chatWindowRef.current) {
//       chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
//     }
//   }, [messages, isTyping]);

//   return (
//     <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 p-4">
//       {/* Title */}
//       <h2
//         ref={titleRef}
//         className="text-3xl font-bold text-center mb-4 text-blue-900"
//       >
//         {"Insurance AI Assistant".split(" ").map((word, i) => (
//           <span key={i} className="inline-block mr-2">
//             {word}
//           </span>
//         ))}
//       </h2>

//       {/* Upload Section */}
//       <div
//         ref={uploadSectionRef}
//         className="flex flex-col sm:flex-row gap-4 justify-center mb-4 w-full max-w-2xl"
//       >
//         <div className="flex-1">
//           <label className="block mb-1 font-medium">Upload Policy:</label>
//           <input
//             type="file"
//             className="border p-2 rounded-md w-full"
//             onChange={(e) => uploadFile(e, "policy")}
//           />
//         </div>
//         <div className="flex-1">
//           <label className="block mb-1 font-medium">Upload Report:</label>
//           <input
//             type="file"
//             className="border p-2 rounded-md w-full"
//             onChange={(e) => uploadFile(e, "report")}
//           />
//         </div>
//       </div>

//       {/* Chat Window */}
//       <div
//         ref={chatWindowRef}
//         className="w-full max-w-3xl border border-gray-300 rounded-lg p-3 bg-[#f5f5f5] overflow-y-auto shadow-md
//           h-[19rem] sm:h-[24rem] lg:h-[27rem]"
//         style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}
//       >
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`my-2 p-2 rounded-lg inline-block max-w-[80%] block ${msg.sender === "user"
//                 ? "bg-blue-100 ml-auto text-right"
//                 : "bg-gray-100 text-left"
//               }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//         {isTyping && (
//           <div className="flex gap-2 items-center p-2">
//             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
//             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
//           </div>
//         )}
//       </div>

//       {/* Input Section */}


//       {/* Input Section */}
//       <div
//         ref={inputSectionRef}
//         className="flex flex-row gap-2 mt-4 w-full max-w-3xl sticky bottom-0 bg-gray-50 p-2"
//       >
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask about your insurance..."
//           className="flex-1 min-w-0 rounded-xl px-3 py-2 border border-gray-300 focus:outline-none
//                sm:px-4 sm:py-2" // 🔹 Smaller padding on mobile
//           style={{
//             boxShadow:
//               "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
//           }}
//         />
//         <button
//           onClick={sendMessage}
//           disabled={!policyUploaded}
//           className="flex-shrink-0 px-4 py-2 rounded-full text-black font-bold 
//                disabled:bg-[#f5f5f5] disabled:cursor-not-allowed cursor-pointer
//                sm:px-6" // 🔹 Button slightly smaller on mobile
//           style={{
//             boxShadow:
//               "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
//           }}
//         >
//           Generate
//         </button>
//       </div>





//     </div>
//   );
// }









// src/components/ChatBot.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import gsap from "gsap";
import { FaUserCircle } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [policyUploaded, setPolicyUploaded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const titleRef = useRef(null);
  const uploadSectionRef = useRef(null);
  const chatWindowRef = useRef(null);
  const inputSectionRef = useRef(null);

  // GSAP Page Animation
  useEffect(() => {
    const titleWords = titleRef.current.querySelectorAll("span");
    gsap.from(titleWords, {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(uploadSectionRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(inputSectionRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
    });
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot", {
        query: input,
      });

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: res.data.answer },
        ]);
        setIsTyping(false);
      }, 2000);
    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error contacting server." },
      ]);
    }
  };

  const uploadFile = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    const endpoint = type === "policy" ? "/upload-policy" : "/upload-report";

    const res = await axios.post(
      `http://localhost:5000/api${endpoint}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    alert(res.data.message);
    if (type === "policy") setPolicyUploaded(true);
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#f5f5f5]  p-4">
      {/* Title */}
      <h2
        ref={titleRef}
        className="text-3xl font-bold text-center mb-0 text-blue-900"
      >
        {"Insurance AI Assistant".split(" ").map((word, i) => (
          <span key={i} className="inline-block mr-2">
            {word}
          </span>
        ))}
      </h2>

      {/* Upload Section */}
      <div
        ref={uploadSectionRef}
        className="flex flex-col sm:flex-row gap-4 justify-center mt-4 mb-4 w-full max-w-2xl"
      >
        <div className="flex-1">
          <label className="block mb-1 font-medium">Upload Policy:</label>
          <input
            type="file"
            className=" p-2 rounded-md w-full mt-3 cursor-pointer"
            onChange={(e) => uploadFile(e, "policy")}
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium">Upload Report:</label>
          <input
            type="file"
            className=" p-2 rounded-md w-full mt-3 cursor-pointer"
            onChange={(e) => uploadFile(e, "report")}
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
          />
        </div>
      </div>

      {/* Chat Window */}
      <div
        ref={chatWindowRef}
        className="w-full max-w-4xl border border-gray-300 rounded-lg p-4 bg-[#f5f5f5] overflow-y-auto shadow-md
          h-[22rem] sm:h-[26rem] lg:h-[26rem]"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end mb-4 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" && (
              <FaWandMagicSparkles className="text-gray-500 text-2xl mr-2" />
            )}
            <div
              className={`px-4 py-2 rounded-xl shadow-md max-w-[70%] text-justify ${
                msg.sender === "user"
                  ? "bg-[#f5f5f5] text-gray-900"
                  : "bg-[#f5f5f5] text-gray-900"
              }`}
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
              }}
            >
              {msg.text}
            </div>
            {msg.sender === "user" && (
              <FaUserCircle className="text-gray-500 text-2xl ml-2" />
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-2 items-center p-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div
        ref={inputSectionRef}
        className="flex items-center gap-2 mt-4 w-full max-w-4xl sticky bottom-0 bg-gray-50 p-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your insurance..."
          className="flex-1 min-w-0 rounded-xl px-3 py-2 border text-justify border-gray-300 focus:outline-none sm:px-4 sm:py-2"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!policyUploaded}
          className="flex-shrink-0 px-4 py-2 rounded-xl text-black font-bold 
                     disabled:bg-[#f5f5f5] disabled:cursor-not-allowed cursor-pointer sm:px-6"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          }}
        >
          Generate
        </button>
      </div>
    </div>
  );
}
