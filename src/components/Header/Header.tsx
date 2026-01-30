import logo from '../../assets/image2.svg'
import person from '../../assets/profile.svg'
import  './Header.css';
import {NavLink} from "react-router-dom";

const Header = () => {


    return (
        <div className="Header">
            <div className="Header__logo">
                <img src={logo}/> <div className="Header__name">.FrontEnd</div>
            </div>
            <div className="Header_menu">
                <NavLink to='vacancies' className={`Header_menu-vacancy`} >Вакансии FE</NavLink>
                <NavLink to='about' className="Header_menu-vacancy">
                   <img src={person}/>
                    <div className='Header_menu-aboutMe--text' >Обо мне</div>
                </NavLink>
        </div>
        </div>
    );
};

export default Header;