import catGif from "../../assets/sad-cat.gif";
import './ErrorComponent.css'
import {Link} from "react-router-dom";


function ErrorComponent  ()  {


    return (
        <div className='Error__Script'>
            <div>
                <h1>Упс! Такой страницы не существует</h1>
                <Link to='/vacancies' className='LinkHome'>На главную</Link>
            </div>
            <p>Давайте перейдем к началу</p>
            <img alt='sad-cat' src={catGif} />
        </div>
    );
}

export default ErrorComponent;