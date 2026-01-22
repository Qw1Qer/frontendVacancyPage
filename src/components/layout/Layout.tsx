import Header from "../Header/Header.tsx";
import VacancyList from "../VacancyList/VacancyList.tsx";
import './Layout.css'


const Layout = () => {
    return (
        <div className='layout'>
            <Header />
            <VacancyList />
        </div>
    );
};

export default Layout;