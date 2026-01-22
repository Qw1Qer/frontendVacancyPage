import logo from '../../assets/image2.svg'
import person from '../../assets/Vector.svg'
import  './Header.css';
import {useAppDispatch, useAppSelector} from "../../hooks/reducer.ts";
import {aboutMeChanged} from "../../store/slices/VacancySlice.ts";

const Header = () => {

    const dispatch = useAppDispatch();
    const forStyles = useAppSelector(state => state.vacancy.aboutMe)

    const handleChange = () => {
        dispatch(aboutMeChanged(true));
    }
    const handleSubmit = () => {
        dispatch(aboutMeChanged(false));
    }

    return (
        <div className="Header">
            <div className="Header__logo">
                <img src={logo}/> <div className="Header__name">.FrontEnd</div>
            </div>
            <div className="Header_menu">
                <div className={`Header_menu-vacancy--${forStyles}`} onClick={handleSubmit}>Вакансии FE</div>
                <div className={`Header_menu-aboutMe--${forStyles}`} onClick={handleChange}>
                   <img src={person}/>
                    <div className='Header_menu-aboutMe--text' >Обо мне</div>
                </div>
            </div>
        </div>
    );
};

export default Header;