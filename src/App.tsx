
import Layout from "./components/layout/Layout.tsx";
import './App.css'
import { Routes, Route } from "react-router-dom";
import AboutMe from "./components/AboutMe/AboutMe.tsx";
import VacancyList from "./components/VacancyList/VacancyList.tsx";
import SeeVacancy from "./components/SeeVacancy/SeeVacancy.tsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path='vacancies' element={<VacancyList />} />
                <Route path="vacancies/:id" element={<SeeVacancy />} />
                <Route path="about" element={<AboutMe />} />
            </Route>
        </Routes>
    );
};

export default App;
