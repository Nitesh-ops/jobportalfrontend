import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/nav-bar";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Footer } from "./components/footer";
import { PostJobs } from "./pages/PostJobs";
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
             <Route path="/postjobs" element={<PostJobs />} />
            {/* <Route path="/register" element={<RegisterPage />} />  */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
        
      </BrowserRouter>
      
    </>
  );
}

export default App;
