import './VacancyCard.css'
import {Link} from "react-router-dom";



interface VacancyCardProps {
    id?: string;
    items?: string;
    fork?: {
        from: number;
        to: number;
        currency: string;
        gross: boolean;
    } | null;
    experience?: string | null;
    company?: string | null;
    workFormat?: { id: string; name: string; }[];
    city?: string | null;
    ref?: string;
    vac?: boolean
}

const VacancyCard = ({id,items,fork,experience,company, workFormat,city,ref,vac}: VacancyCardProps) => {

    const forkTo = fork?.to ? `${fork.to}` : '' ;
    const forkFrom = fork?.from ? forkTo ? `${fork.from} -` : `${fork.from}` : '' ;

    function formatNumber(num: string): string {
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }



    return (


        <div className='VacancyCard'>
            <div className='VacancyCard__header'>
            <div className='VacancyCard__info'>
                <div className='VacancyCard__info__name'>
            <div className='VacancyCard__name'>{items} </div>
                <div className='VacancyCard__salaryAndExperience'>
                     <div className='VacancyCard__fork'>{fork ? `${formatNumber(forkFrom)} ${formatNumber(forkTo)} ${fork.currency}` : 'Не указано'}</div>
                    <div className='VacancyCard__experience'>{experience}</div>
                </div>
                </div>
                <div className='VacancyCard__info__experience'>
                <div className='VacancyCard__info__experience--company'>{company}</div>
                <div className={`VacancyCard__workFormat--${workFormat?.find(e => e.id)?.id}`}>
                    {workFormat?.find(e => e.name)?.name}
                </div>
                <div className="VacancyCard__info__experience--city">{city}</div>
                </div>
                </div>
            <div className='VacancyCard__buttons'>
                { !vac && <Link to={`/vacancies/${id}`} onClick={() => {
                    localStorage.clear()
                }} className='VacancyCard__button'>Смотреть вакансию</Link>}
               <a className={`VacancyCard__rel--${vac}`} href={ref} target="_blank"
                           rel="noopener noreferrer" >{vac ? "Откликнутся на hh.ru" : "Откликнутся"}</a>
            </div>
            </div>
        </div>

    );
};

export default VacancyCard;