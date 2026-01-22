import './VacancySearch.css'
import {useAppDispatch} from "../../hooks/reducer.ts";
import { setupSearchValue} from "../../store/slices/VacancySlice.ts";
import {useRef} from "react";



const VacancySearch = () => {

    const dispatch = useAppDispatch();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleSetupSearchValue =  () => {
       if(inputRef.current ){
           const value = inputRef.current.value.trim()
           dispatch(setupSearchValue(value))
       }

    }




    return (
        <div className="VacancySearch">
            <div className="VacancySearch__text">
                <h2>Список вакансий</h2>
                <span>по профессии Frontend-разработчик</span>
            </div>
            <div className="VacancySearch__input">
            <input placeholder="⌕ Должность или название компании" ref={inputRef} />
            <button onClick={handleSetupSearchValue}>Найти</button>
            </div>
        </div>
    );
};

export default VacancySearch;