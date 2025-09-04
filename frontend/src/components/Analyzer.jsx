// import React, { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";


// const API = "http://localhost:5000/api";

// const Analyzer = () => {
//   const [reportFile, setReportFile] = useState(null);
//   const [reportText, setReportText] = useState("");
//   const [policyFile, setPolicyFile] = useState(null);
//   const [policyText, setPolicyText] = useState("");

//   const [report, setReport] = useState(null);
//   const [policy, setPolicy] = useState(null);
//   const [analysis, setAnalysis] = useState(null);

//   const uploadReport = async () => {
//     try {
//       const form = new FormData();
//       if (reportFile) {
//         form.append("file", reportFile);
//       } else {
//         if (!reportText.trim()) { toast.error("Paste report text or choose a file"); return; }
//         form.append("textInput", reportText.trim());
//       }
//       const { data } = await axios.post(`${API}/report/upload`, form, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       setReport(data.report);
//       setPolicy(null);
//       setAnalysis(null);
//       toast.success("Report uploaded");
//     } catch (e) {
//       toast.error(e?.response?.data?.error || "Report upload failed");
//       console.log("Report upload error:", e?.response?.data || e);
//     }
//   };

//   const uploadPolicy = async () => {
//     try {
//       const form = new FormData();
//       if (policyFile) {
//         form.append("file", policyFile);
//       } else {
//         if (!policyText.trim()) { toast.error("Paste policy text or choose a file"); return; }
//         form.append("textInput", policyText.trim());
//       }
//       form.append("policyName", "User Policy");
//       const { data } = await axios.post(`${API}/policy/upload`, form, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       setPolicy(data.policy);
//       setAnalysis(null);
//       toast.success("Policy uploaded");
//     } catch (e) {
//       toast.error(e?.response?.data?.error || "Policy upload failed");
//       console.log("Policy upload error:", e?.response?.data || e);
//     }
//   };

//   const analyze = async () => {
//     try {
//       if (!report || !policy) return toast.error("Upload report and policy first");
//       const { data } = await axios.post(`${API}/analyze`, {});
//       setAnalysis(data.analysis);
//       toast.success("Analysis ready");
//     } catch (e) {
//       toast.error(e?.response?.data?.error || "Analyze failed");
//       console.log("Analyze error:", e?.response?.data || e);
//     }
//   };

//   return (
//     <>
//       <section className="card">
//         <h3>Report</h3>
//         <input
//           type="file"
//           accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
//           onChange={(e) => setReportFile(e.target.files[0] || null)}
//         />
//         <div style={{ margin: "8px 0" }}>or</div>
//         <textarea
//           rows={4}
//           placeholder="Paste report text..."
//           value={reportText}
//           onChange={(e) => setReportText(e.target.value)}
//         />
//         <div><button onClick={uploadReport}>Upload Report</button></div>
//         {report && (
//           <div style={{ marginTop: 8 }}>
//             <div><b>Diagnosis:</b> {report.diagnosis || "-"}</div>
//             <div><b>Severity:</b> {report.severity || "-"}</div>
//             <div><b>Treatment:</b> {report.treatment || "-"}</div>
//             <div><b>Description:</b> {report.description || "-"}</div>
//           </div>
//         )}
//       </section>

//       <section className="card" style={{ opacity: report ? 1 : 0.6 }}>
//         <h3>Policy</h3>
//         <input
//           type="file"
//           accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
//           onChange={(e) => setPolicyFile(e.target.files[0] || null)}
//           disabled={!report}
//         />
//         <div style={{ margin: "8px 0" }}>or</div>
//         <textarea
//           rows={4}
//           placeholder="Paste policy text..."
//           value={policyText}
//           onChange={(e) => setPolicyText(e.target.value)}
//           disabled={!report}
//         />
//         <div><button onClick={uploadPolicy} disabled={!report}>Upload Policy</button></div>

//         {policy && (
//           <div style={{ marginTop: 8 }}>
//             <div><b>Policy Name:</b> {policy.policyName}</div>
//             <div><b>File:</b> {policy.filename || "—"}</div>
//             <div><b>Clauses:</b> {policy.clauses?.length || 0}</div>
//           </div>
//         )}
//       </section>

//       <section className="card">
//         <h3>Analyze</h3>
//         <button onClick={analyze} disabled={!report || !policy}>Compare Latest</button>
//         {analysis && (
//           <div style={{ marginTop: 12 }}>
//             <div><b>Decision:</b> {analysis.decision}</div>
//             <div><b>Clause:</b> {analysis.clauseRef || "-"}</div>
//             <div><b>Limit:</b> {analysis.resultJson?.limit || "-"}</div>
//             <div><b>Justification:</b> {analysis.justification || "-"}</div>
//             <div><b>Confidence:</b> {analysis.confidence || "-"}</div>
//           </div>
//         )}
//       </section>
//     </>
//   );
// }
// export default Analyzer;










// // src/components/Analyzer.jsx
// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import gsap from "gsap";
// import demoVideo from "../assets/card4.mp4";


// const API = "http://localhost:5000/api";

// const Analyzer = () => {
//   const [reportFile, setReportFile] = useState(null);
//   const [reportText, setReportText] = useState("");
//   const [policyFile, setPolicyFile] = useState(null);
//   const [policyText, setPolicyText] = useState("");
//   const [report, setReport] = useState(null);
//   const [policy, setPolicy] = useState(null);
//   const [analysis, setAnalysis] = useState(null);

//   const reportRef = useRef(null);
//   const policyRef = useRef(null);
//   const analyzeRef = useRef(null);
//   const videoRef = useRef(null);

//   // Animations on mount
//   useEffect(() => {
//     gsap.from(reportRef.current, {
//       x: -100,
//       opacity: 0,
//       duration: 1,
//       ease: "power3.out",
//     });
//     gsap.from(policyRef.current, {
//       x: 100,
//       opacity: 0,
//       duration: 1,
//       ease: "power3.out",
//     });
//     gsap.from([analyzeRef.current, videoRef.current], {
//       y: 100,
//       opacity: 0,
//       duration: 1,
//       stagger: 0.2,
//       ease: "power3.out",
//     });
//   }, []);

//   const uploadReport = async () => {
//     try {
//       const form = new FormData();
//       if (reportFile) form.append("file", reportFile);
//       else {
//         if (!reportText.trim()) {
//           toast.error("Paste report text or choose a file");
//           return;
//         }
//         form.append("textInput", reportText.trim());
//       }
//       const { data } = await axios.post(`${API}/report/upload`, form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setReport(data.report);
//       setPolicy(null);
//       setAnalysis(null);
//       toast.success("Report uploaded");
//     } catch (e) {
//       toast.error(e?.response?.data?.error || "Report upload failed");
//     }
//   };

//   const uploadPolicy = async () => {
//     try {
//       const form = new FormData();
//       if (policyFile) form.append("file", policyFile);
//       else {
//         if (!policyText.trim()) {
//           toast.error("Paste policy text or choose a file");
//           return;
//         }
//         form.append("textInput", policyText.trim());
//       }
//       form.append("policyName", "User Policy");
//       const { data } = await axios.post(`${API}/policy/upload`, form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setPolicy(data.policy);
//       setAnalysis(null);
//       toast.success("Policy uploaded");
//     } catch (e) {
//       toast.error(e?.response?.data?.error || "Policy upload failed");
//     }
//   };

//   const analyze = async () => {
//     try {
//       if (!report || !policy) return toast.error("Upload report and policy first");
//       const { data } = await axios.post(`${API}/analyze`, {});
//       setAnalysis(data.analysis);
//       toast.success("Analysis ready");
//     } catch (e) {
//       toast.error(e?.response?.data?.error || "Analyze failed");
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-gray-50 p-6 flex flex-col gap-6">
//       {/* Top Row: Report & Policy */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ml-30  mr-30">
//         {/* Report Section */}
//         <section
//           ref={reportRef}
//           className="bg-white shadow-lg rounded-xl p-6 transition-transform hover:scale-[1.02]"
//         >
//           <h3 className="text-xl font-bold mb-4">Report</h3>
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
//             onChange={(e) => setReportFile(e.target.files[0] || null)}
//             className="mb-3"
//           />
//           <div className="text-center mb-3 text-gray-500">or</div>
//           <textarea
//             rows={4}
//             placeholder="Paste report text..."
//             value={reportText}
//             onChange={(e) => setReportText(e.target.value)}
//             className="w-full border rounded-md p-2 mb-3"
//           />
//           <button
//             onClick={uploadReport}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md"
//           >
//             Upload Report
//           </button>

//           {report && (
//             <div className="mt-4 divide-y divide-gray-400">
//               <div className="py-2"><b>Diagnosis:</b> {report.diagnosis || "-"}</div>
//               <div className="py-2"><b>Severity:</b> {report.severity || "-"}</div>
//               <div className="py-2"><b>Treatment:</b> {report.treatment || "-"}</div>
//               <div className="py-2"><b>Description:</b> {report.description || "-"}</div>
//             </div>
//           )}
//         </section>

//         {/* Policy Section */}
//         <section
//           ref={policyRef}
//           className={`bg-white shadow-lg rounded-xl p-6 transition-transform hover:scale-[1.02] ${!report ? "opacity-60" : ""
//             }`}
//         >
//           <h3 className="text-xl font-bold mb-4">Policy</h3>
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
//             onChange={(e) => setPolicyFile(e.target.files[0] || null)}
//             disabled={!report}
//             className="mb-3"
//           />
//           <div className="text-center mb-3 text-gray-500">or</div>
//           <textarea
//             rows={4}
//             placeholder="Paste policy text..."
//             value={policyText}
//             onChange={(e) => setPolicyText(e.target.value)}
//             disabled={!report}
//             className="w-full border rounded-md p-2 mb-3"
//           />
//           <button
//             onClick={uploadPolicy}
//             disabled={!report}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
//           >
//             Upload Policy
//           </button>

//           {policy && (
//             <div className="mt-4 divide-y divide-gray-400">
//               <div className="py-2"><b>Policy Name:</b> {policy.policyName}</div>
//               <div className="py-2"><b>File:</b> {policy.filename || "—"}</div>
//               <div className="py-2"><b>Clauses:</b> {policy.clauses?.length || 0}</div>
//             </div>
//           )}
//         </section>
//       </div>

//       {/* Bottom Row: Analyze & Video */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ml-30">
//         {/* Analyze Section */}
//         <section
//           ref={analyzeRef}
//           className="bg-white shadow-lg rounded-xl p-6 transition-transform hover:scale-[1.02]"
//         >
//           <h3 className="text-xl font-bold mb-4">Analyze</h3>
//           <button
//             onClick={analyze}
//             disabled={!report || !policy}
//             className="px-4 py-2 bg-green-600 text-white rounded-md disabled:opacity-50"
//           >
//             Compare Latest
//           </button>

//           {analysis && (
//             <div className="mt-4 divide-y divide-gray-400">
//               <div className="py-2"><b>Decision:</b> {analysis.decision}</div>
//               <div className="py-2"><b>Clause:</b> {analysis.clauseRef || "-"}</div>
//               <div className="py-2"><b>Limit:</b> {analysis.resultJson?.limit || "-"}</div>
//               <div className="py-2"><b>Justification:</b> {analysis.justification || "-"}</div>
//               <div className="py-2"><b>Confidence:</b> {analysis.confidence || "-"}</div>
//             </div>
//           )}
//         </section>

//         {/* Video Section */}
//         <section
//           ref={videoRef}
//           className="bg-[#f5f5f5] h-80 w-80 shadow-lg rounded-xl p-6 flex flex-col justify-center items-center transition-transform hover:scale-[1.02]"
//         >
          
//           <video
//             autoPlay
//             loop
//             muted
//             playsInline
//             className=" rounded-lg  h-70 w-70"
//           >
//             <source src={demoVideo} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <h3 className="text-xl font-bold mb-2">Automated Workflows</h3>
//           <p className="text-center text-gray-600 mb-4">
//             Automate workflows to streamline tasks, boost efficiency, and save time
//           </p>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Analyzer;























// // src/components/Analyzer.jsx
// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import gsap from "gsap";
// import demoVideo from "../assets/card4.mp4";

// const API = "http://localhost:5000/api";

// const Analyzer = () => {
//   const [reportFile, setReportFile] = useState(null);
//   const [reportText, setReportText] = useState("");
//   const [policyFile, setPolicyFile] = useState(null);
//   const [policyText, setPolicyText] = useState("");
//   const [report, setReport] = useState(null);
//   const [policy, setPolicy] = useState(null);
//   const [analysis, setAnalysis] = useState(null);

//   const reportRef = useRef(null);
//   const policyRef = useRef(null);
//   const analyzeRef = useRef(null);
//   const videoRef = useRef(null);

//   // GSAP animations
//   useEffect(() => {
//     gsap.from([reportRef.current, policyRef.current], {
//       y: 60,
//       opacity: 0,
//       duration: 1,
//       stagger: 0.2,
//       ease: "power3.out",
//     });

//     gsap.from([analyzeRef.current, videoRef.current], {
//       y: 80,
//       opacity: 0,
//       duration: 1.2,
//       stagger: 0.3,
//       ease: "power3.out",
//       delay: 0.3,
//     });

//     // Smooth Scroll
//     document.documentElement.style.scrollBehavior = "smooth";
//   }, []);

//   const uploadReport = async () => {
//     try {
//       const form = new FormData();
//       if (reportFile) form.append("file", reportFile);
//       else {
//         if (!reportText.trim()) return toast.error("Paste report text or choose a file");
//         form.append("textInput", reportText.trim());
//       }
//       const { data } = await axios.post(`${API}/report/upload`, form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setReport(data.report);
//       setPolicy(null);
//       setAnalysis(null);
//       toast.success("Report uploaded");
//     } catch (e) {
//       toast.error(e?.response?.data?.error || "Report upload failed");
//     }
//   };

//   const uploadPolicy = async () => {
//     try {
//       const form = new FormData();
//       if (policyFile) form.append("file", policyFile);
//       else {
//         if (!policyText.trim()) return toast.error("Paste policy text or choose a file");
//         form.append("textInput", policyText.trim());
//       }
//       form.append("policyName", "User Policy");
//       const { data } = await axios.post(`${API}/policy/upload`, form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setPolicy(data.policy);
//       setAnalysis(null);
//       toast.success("Policy uploaded");
//     } catch (e) {
//       toast.error(e?.response?.data?.error || "Policy upload failed");
//     }
//   };

//   const analyze = async () => {
//     try {
//       if (!report || !policy) return toast.error("Upload report and policy first");
//       const { data } = await axios.post(`${API}/analyze`, {});
//       setAnalysis(data.analysis);
//       toast.success("Analysis ready");
//     } catch (e) {
//       toast.error(e?.response?.data?.error || "Analyze failed");
//     }
//   };

//   return (
//     <div className="w-full h-auto bg-[#f5f5f5] p-4 sm:p-6 lg:px-8">
//       {/* Top Row: Report & Policy */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto mb-6">
//         {/* Report */}
//         <section
//           ref={reportRef}
//           className="bg-[#f5f5f5] shadow-lg rounded-xl p-6 transition-transform hover:scale-[1.02]"
//         >
//           <h3 className="text-xl font-bold mb-4">Report</h3>
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
//             onChange={(e) => setReportFile(e.target.files[0] || null)}
//             className="mb-3"
//           />
//           <div className="text-center mb-3 text-gray-500">or</div>
//           <textarea
//             rows={4}
//             placeholder="Paste report text..."
//             value={reportText}
//             onChange={(e) => setReportText(e.target.value)}
//             className="w-full border rounded-md p-2 mb-3"
//           />
//           <button
//             onClick={uploadReport}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md"
//           >
//             Upload Report
//           </button>
//           {report && (
//             <div className="mt-4 divide-y divide-gray-400">
//               <div className="py-2"><b>Diagnosis:</b> {report.diagnosis || "-"}</div>
//               <div className="py-2"><b>Severity:</b> {report.severity || "-"}</div>
//               <div className="py-2"><b>Treatment:</b> {report.treatment || "-"}</div>
//               <div className="py-2"><b>Description:</b> {report.description || "-"}</div>
//             </div>
//           )}
//         </section>

//         {/* Policy */}
//         <section
//           ref={policyRef}
//           className={`bg-[#f5f5f5] shadow-lg rounded-xl p-6 transition-transform hover:scale-[1.02] ${!report ? "opacity-60" : ""}`}
//         >
//           <h3 className="text-xl font-bold mb-4">Policy</h3>
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
//             onChange={(e) => setPolicyFile(e.target.files[0] || null)}
//             disabled={!report}
//             className="mb-3"
//           />
//           <div className="text-center mb-3 text-gray-500">or</div>
//           <textarea
//             rows={4}
//             placeholder="Paste policy text..."
//             value={policyText}
//             onChange={(e) => setPolicyText(e.target.value)}
//             disabled={!report}
//             className="w-full border rounded-md p-2 mb-3"
//           />
//           <button
//             onClick={uploadPolicy}
//             disabled={!report}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
//           >
//             Upload Policy
//           </button>
//           {policy && (
//             <div className="mt-4 divide-y divide-gray-400">
//               <div className="py-2"><b>Policy Name:</b> {policy.policyName}</div>
//               <div className="py-2"><b>File:</b> {policy.filename || "—"}</div>
//               <div className="py-2"><b>Clauses:</b> {policy.clauses?.length || 0}</div>
//             </div>
//           )}
//         </section>
//       </div>

//       {/* Bottom Row: Analyze & Video */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
//         {/* Analyze */}
//         <section
//           ref={analyzeRef}
//           className="bg-[#f5f5f5] shadow-lg rounded-xl p-6 transition-transform hover:scale-[1.02]"
//         >
//           <h3 className="text-xl font-bold mb-4">Analyze</h3>
//           <button
//             onClick={analyze}
//             disabled={!report || !policy}
//             className="px-4 py-2 bg-green-600 text-white rounded-md disabled:opacity-50"
//           >
//             Compare Latest
//           </button>
//           {analysis && (
//             <div className="mt-4 divide-y divide-gray-400">
//               <div className="py-2"><b>Decision:</b> {analysis.decision}</div>
//               <div className="py-2"><b>Clause:</b> {analysis.clauseRef || "-"}</div>
//               <div className="py-2"><b>Limit:</b> {analysis.resultJson?.limit || "-"}</div>
//               <div className="py-2"><b>Justification:</b> {analysis.justification || "-"}</div>
//               <div className="py-2"><b>Confidence:</b> {analysis.confidence || "-"}</div>
//             </div>
//           )}
//         </section>

//         {/* Video */}
//         <section
//           ref={videoRef}
//           className="bg-[#f5f5f5] shadow-lg rounded-xl p-6 flex flex-col transition-transform hover:scale-[1.02] h-50"
//         >
//           <video
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="w-full rounded-lg shadow-md mb-4 h-full"
//           >
//             <source src={demoVideo} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <div className="text-center">
//             <h3 className="text-xl font-bold mb-2">Automated Workflows</h3>
//             <p className="text-gray-600">
//               Automate workflows to streamline tasks, boost efficiency, and save time
//             </p>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Analyzer;



































// src/components/Analyzer.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import gsap from "gsap";
import demoVideo from "../assets/card4.mp4";

const API = "http://localhost:5000/api";

const Analyzer = () => {
  const [reportFile, setReportFile] = useState(null);
  const [reportText, setReportText] = useState("");
  const [policyFile, setPolicyFile] = useState(null);
  const [policyText, setPolicyText] = useState("");
  const [report, setReport] = useState(null);
  const [policy, setPolicy] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const reportRef = useRef(null);
  const policyRef = useRef(null);
  const analyzeRef = useRef(null);
  const videoRef = useRef(null);

  // GSAP animations
  useEffect(() => {
    gsap.from([reportRef.current, policyRef.current], {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    gsap.from([analyzeRef.current, videoRef.current], {
      y: 80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.3,
      ease: "power3.out",
      delay: 0.3,
    });

    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  const uploadReport = async () => {
    try {
      const form = new FormData();
      if (reportFile) form.append("file", reportFile);
      else {
        if (!reportText.trim()) return toast.error("Paste report text or choose a file");
        form.append("textInput", reportText.trim());
      }
      const { data } = await axios.post(`${API}/report/upload`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setReport(data.report);
      setPolicy(null);
      setAnalysis(null);
      toast.success("Report uploaded");
    } catch (e) {
      toast.error(e?.response?.data?.error || "Report upload failed");
    }
  };

  const uploadPolicy = async () => {
    try {
      const form = new FormData();
      if (policyFile) form.append("file", policyFile);
      else {
        if (!policyText.trim()) return toast.error("Paste policy text or choose a file");
        form.append("textInput", policyText.trim());
      }
      form.append("policyName", "User Policy");
      const { data } = await axios.post(`${API}/policy/upload`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPolicy(data.policy);
      setAnalysis(null);
      toast.success("Policy uploaded");
    } catch (e) {
      toast.error(e?.response?.data?.error || "Policy upload failed");
    }
  };

  const analyze = async () => {
    try {
      if (!report || !policy) return toast.error("Upload report and policy first");
      const { data } = await axios.post(`${API}/analyze`, {});
      setAnalysis(data.analysis);
      toast.success("Analysis ready");
    } catch (e) {
      toast.error(e?.response?.data?.error || "Analyze failed");
    }
  };

  return (
    <div className="w-full h-auto bg-[#f5f5f5] p-4 sm:p-6 lg:px-8 custom-scrollbar">
      {/* Top Row: Report & Policy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto mb-6 lg:px-[30px]">
        {/* Report */}
        <section
          ref={reportRef}
          className="bg-[#f5f5f5] shadow-lg rounded-xl p-6 transition-transform hover:scale-[1.02]"
          style={{boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"}}
        >
          <h3 className="text-xl font-bold mb-4">Report</h3>
          <div className="flex-1">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
            onChange={(e) => setReportFile(e.target.files[0] || null)}
            className="p-2 rounded-md w-full mt-3 cursor-pointer"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
          />
          </div>
          <div className="text-center mb-3 mt-3 text-gray-500">or</div>
          <textarea
            rows={4}
            placeholder="Paste report text..."
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            className="flex-1 min-w-0 rounded-xl w-full px-3 py-2 border border-gray-300 focus:outline-none sm:px-4 sm:py-2"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
          }}
          />
          <button
            onClick={uploadReport}
            className="px-4 py-2 mt-5 bg-[#f5f5f5] text-black rounded-md w-full font-bold cursor-pointer"
            style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}
          >
            Upload Report
          </button>
          {report && (
            <div className="mt-4 divide-y divide-gray-400">
              <div className="py-2"><b>Diagnosis:</b> {report.diagnosis || "-"}</div>
              <div className="py-2"><b>Severity:</b> {report.severity || "-"}</div>
              <div className="py-2 text-justify"><b>Treatment:</b> {report.treatment || "-"}</div>
              <div className="py-2 text-justify "><b>Description:</b> {report.description || "-"}</div>
            </div>
          )}
        </section>

        {/* Policy */}
        <section
          ref={policyRef}
          className={`bg-[#f5f5f5 rounded-xl p-6 transition-transform text-black mb-15 hover:scale-[1.02] ${!report ? "opacity-60" : ""}`}
          style={{boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"}}
        >
          <h3 className="text-xl font-bold mb-4 text-black">Policy</h3>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
            onChange={(e) => setPolicyFile(e.target.files[0] || null)}
            disabled={!report}
            className="p-2 rounded-md w-full mt-3 cursor-pointer text-black disabled:cursor-not-allowed"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
          />
          <div className="text-center mb-3 text-gray-500 py-2">or</div>
          <textarea
            rows={4}
            placeholder="Paste policy text..."
            value={policyText}
            onChange={(e) => setPolicyText(e.target.value)}
            disabled={!report}
            className="flex-1 min-w-0 rounded-xl w-full px-3 py-2 border border-gray-300 focus:outline-none sm:px-4 sm:py-2 disabled:cursor-not-allowed"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
          }}
          />
          <button
            onClick={uploadPolicy}
            disabled={!report}
            className="px-4 py-2 mt-5 bg-[#f5f5f5] text-black rounded-md w-full font-bold cursor-pointer disabled:cursor-not-allowed"
            style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}
          >
            Upload Policy
          </button>
          {policy && (
            <div className="mt-4 divide-y divide-gray-400">
              <div className="py-2"><b>Policy Name:</b> {policy.policyName}</div>
              <div className="py-2"><b>File:</b> {policy.filename || "—"}</div>
              <div className="py-2"><b>Clauses:</b> {policy.clauses?.length || 0}</div>
            </div>
          )}
        </section>
      </div>

      {/* Bottom Row: Analyze & Video */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto lg:px-[30px]">
        {/* Analyze (3/4) */}
        <section
          ref={analyzeRef}
          className="bg-[#f5f5f5] shadow-lg rounded-xl p-6 transition-transform hover:scale-[1.02] lg:col-span-3"
          style={{boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"}}
        >
          <h3 className="text-xl font-bold mb-4">Analyze</h3>
          <button
            onClick={analyze}
            disabled={!report || !policy}
            className="px-4 py-2 mt-5 bg-[#f5f5f5] text-black rounded-md w-full font-bold cursor-pointer disabled:cursor-not-allowed"
            style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}
          >
            Compare Latest
          </button>
          {analysis && (
            <div className="mt-4 divide-y divide-gray-400">
              <div className="py-2"><b>Decision:</b> {analysis.decision}</div>
              <div className="py-2"><b>Clause:</b> {analysis.clauseRef || "-"}</div>
              <div className="py-2"><b>Limit:</b> {analysis.resultJson?.limit || "-"}</div>
              <div className="py-2 text-justify"><b>Justification:</b> {analysis.justification || "-"}</div>
              <div className="py-2"><b>Confidence:</b> {analysis.confidence || "-"}</div>
            </div>
          )}
        </section>

        {/* Video (1/4) */}
        <section
          ref={videoRef}
          className="bg-[#f5f5f5] shadow-lg rounded-xl p-6 flex flex-col transition-transform hover:scale-[1.02] lg:col-span-1"
          style={{boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"}}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full rounded-lg mb-4"
          >
            <source src={demoVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Automated Workflows</h3>
            <p className="text-gray-600 text-justify">
              Automate workflows to streamline tasks, boost efficiency, and save time
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Analyzer;
