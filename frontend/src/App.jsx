
// import './App.css'

// import Discription from './components/Discription'
// import Hero from './components/Hero'
// import Navbar from './components/Navbar'
// import Services from './components/Services'


// function App() {


//   return (
//     <>
//       <Navbar />
//       <Hero/>
//       <Discription/>

//       <Services/> 
    
      
//     </>
//   )
// }

// export default App
















// import { Routes, Route } from "react-router-dom";
// import "./App.css";
// import Discription from "./components/Discription";
// import Hero from "./components/Hero";
// import Navbar from "./components/Navbar";
// import Services from "./components/Services";
// import Analyzer from "./components/Analyzer";
// import MultiReportingPage from "./features/multi-reporting/MultiReportingPage";
// import ChatBot from "./components/ChatBot";
// import ChatBox from "./components/ChatBox";

// function App() {
//   return (
//     <>
//       <Navbar /> {/* ✅ Navbar har page pe dikhna chahiye */}

//       <Routes>
//         {/* ✅ Home Page */}
//         <Route path="/" element={
//             <>
//               <Hero />
//               <Discription />
//               <Services />
//             </>
//           }
//         />

//         {/* ✅ Analyzer Page */}
//         <Route path="/analyzer" element={<Analyzer />} />
//         <Route path="/multi-reporting" element={<MultiReportingPage />} />
//         <Route path='/insureIQ' element={<ChatBot/>}/>
//         <Route path='/mediGuide' element={<ChatBox/>}/>   
//       </Routes>
//     </>
//   );
// }

// export default App;






// src/App.jsx
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Discription from "./components/Discription";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Analyzer from "./components/Analyzer";
import MultiReportingPage from "./features/multi-reporting/MultiReportingPage";
import ChatBot from "./components/ChatBot";
import ChatBox from "./components/ChatBox";
import BotLayout from "./components/BotLayout";

function App() {
  return (
    <>
      <Navbar /> {/* Navbar har page pe visible */}

      <Routes>
        {/* ✅ Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Discription />
              <Services />
            </>
          }
        />

        {/* ✅ Analyzer Page */}
        <Route path="/analyzer" element={<Analyzer />} />
        <Route path="/multi-reporting" element={<MultiReportingPage />} />

        {/* ✅ Bot Pages with Sidebar */}
        <Route
          path="/insureIQ"
          element={
            <BotLayout>
              <ChatBot />
            </BotLayout>
          }
        />
        <Route
          path="/mediGuide"
          element={
            <BotLayout>
              <ChatBox />
            </BotLayout>
          }
        />
        <Route
          path="/diagnoScan"
          element={
            <BotLayout>
              <div className="p-4">DiagnoScan Coming Soon!</div>
            </BotLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
