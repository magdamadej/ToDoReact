import React from 'react';
import './Task.css';

const Task = (props) => {

    const style = {
        color: 'darkred',
    }

    const {
        text,
        date,
        id,
        active,
        important,
        finishDate
    } = props.task; //pobieranie

    if (active) {
        return (
            <div>
                {/* pobranie elementu */}
                <p>
                    {/* jeżeli important=true (zaznaczony priorytet), to pobiera style:darkred */}
                    <strong style={important ? style : null}>{text}</strong> - zrobić do <span>{date} </span>
                    <button className="tick" onClick={() => props.change(id)}>
                        <i class="fas fa-check"></i>
                    </button>
                    <button className="cross" onClick={() => props.delete(id)}>
                        <i class="fas fa-times"></i>
                    </button>
                </p>
            </div>
        );
    } else {

        const finish = new Date(finishDate).toLocaleDateString()
        return (
            <div>
                <p>
                    <strong>{text}</strong><em> (zrobić do {date}) </em>
                    <br /> - zadanie wykonane dnia: <span> {finish}</span>
                    <button className="cross cross1" onClick={() => props.delete(id)}>
                        Usuń
                    </button>
                </p>
            </div> //przekazanie zadań do sekcji zadań zrobionych
        )
    }
}

export default Task;