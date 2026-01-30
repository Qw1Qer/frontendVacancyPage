import './FilterCard.css'
import Cross from '../../assets/Cross.svg'

interface FilterCardProps {
    card: string;
    onDelete: () => void;
}

const FilterCard = ({card,onDelete} : FilterCardProps) => {
    return (
        <div className='FilterCards'>
            {card} <button onClick={onDelete}><img src={Cross} /></button>
        </div>
    );
};

export default FilterCard;