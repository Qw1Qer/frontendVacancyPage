import './VacancyCard.css'


interface VacancyCardProps {
    items?: string;
    fork?: {
        from: number;
        to: number;
        currency: string;
        gross: boolean;
    } | null;
    experience?: string | null;
    company?: string | null;
    workFormat: { id: string; name: string; }[];
    city?: string | null;
    ref: string
}

const VacancyCard = ({items,fork,experience,company, workFormat,city,ref}: VacancyCardProps) => {

    const cardFork = fork?.from ?`${fork?.from} - ${fork?.to}` :  fork?.to


    return (


        <div className='VacancyCard'>
            <div className='VacancyCard__header'>
            <div className='VacancyCard__info'>
                <div className='VacancyCard__info__name'>
            <div className='VacancyCard__name'>{items} </div>
                <div className='VacancyCard__salaryAndExperience'>
                    <div className='VacancyCard__fork'>{fork ? `${cardFork} ${fork?.currency}` : 'Не указано'}</div>
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
                <button>Смотреть вакансию</button>
                <button><a style={{textDecoration: "none", color: 'inherit'}} href={ref}>Откликнутся</a></button>
            </div>
            </div>
        </div>

    );
};

export default VacancyCard;