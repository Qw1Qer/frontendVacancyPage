import './FilterCard.css'

interface FilterCardProps {
    card: string;
    onDelete: () => void;
}

const FilterCard = ({card,onDelete} : FilterCardProps) => {
    return (
        <div className='FilterCards'>
            {card} <button onClick={onDelete}>✖</button>
        </div>
    );
};

export default FilterCard;