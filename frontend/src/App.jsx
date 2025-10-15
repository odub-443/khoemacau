import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/Form";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Dashboard Layout */}
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Home />} />

          {/* Others Page */}
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/blank" element={<Blank />} />

          {/* Forms */}
          <Route path="/forms" element={<FormElements />} />
          <Route path="/form-elements" element={<FormElements />} />
          <Route path="/form-dahi" element={<FormElements />} />
          <Route path="/form-asa" element={<FormElements />} />
          <Route path="/form-dipto" element={<FormElements />} />
          <Route path="/form-oi" element={<FormElements />} />
          <Route path="/form-fpto" element={<FormElements />} />
          <Route path="/form-pahi" element={<FormElements />} />
          <Route path="/form-scipto" element={<FormElements />} />
          <Route path="/form-pdpto" element={<FormElements />} />
          <Route path="/form-pcpc" element={<FormElements />} />
          <Route path="/form-rci" element={<FormElements />} />

          {/* Tables */}
          <Route path="/basic-tables" element={<BasicTables />} />
          <Route path="/table-dahi" element={<BasicTables />} />
          <Route path="/table-asa" element={<BasicTables />} />
          <Route path="/table-dipto" element={<BasicTables />} />
          <Route path="/table-oi" element={<BasicTables />} />
          <Route path="/table-fpto" element={<BasicTables />} />
          <Route path="/table-pahi" element={<BasicTables />} />
          <Route path="/table-scipto" element={<BasicTables />} />
          <Route path="/table-pdpto" element={<BasicTables />} />
          <Route path="/table-pcpc" element={<BasicTables />} />
          <Route path="/table-rci" element={<BasicTables />} />

          {/* Ui Elements */}
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />

          {/* Charts */}
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />
        </Route>

        {/* Auth Layout */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
