import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { IntroSplash } from "./components/IntroSplash";
import { GuestProvider } from "./context/GuestContext";
import { Home } from "./pages/Home";
import { Schedule } from "./pages/Schedule";
import { Party } from "./pages/Party";
import { Photos } from "./pages/Photos";
import { Faq } from "./pages/Faq";
import { Rsvp } from "./pages/Rsvp";

export default function App() {
  return (
    <GuestProvider>
      <IntroSplash />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/party" element={<Party />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/rsvp" element={<Rsvp />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </GuestProvider>
  );
}
