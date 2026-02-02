
import Layout from "./components/layout/Layout.tsx";
import './App.css'
import { Routes, Route } from "react-router-dom";
import AboutMe from "./components/AboutMe/AboutMe.tsx";
import VacancyList from "./components/VacancyList/VacancyList.tsx";
import SeeVacancy from "./components/SeeVacancy/SeeVacancy.tsx";
import VacanciesTab from "./components/VacanciesTab/VacanciesTab.tsx";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent.tsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path='vacancies/*' element={<VacancyList />} >
                    <Route path='moscow' element={<VacanciesTab tab='Москва'  />} />
                    <Route path='petersburg' element={<VacanciesTab tab='Санкт-Петербург'  />} />
                    <Route path='' element={<VacanciesTab tab='Все города' />} />
                </Route>
                <Route path="vacancies/:id" element={<SeeVacancy />} />
                <Route path="about" element={<AboutMe />} />
                <Route path="*" element={<ErrorComponent />} />
            </Route>
        </Routes>
    );
};

export default App;
