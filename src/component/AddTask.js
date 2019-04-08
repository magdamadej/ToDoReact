import React, { Component } from 'react';
import './AddTask.css';
import axios from 'axios';
class AddTask extends Component {

    minDate = new Date().toISOString().slice(0, 10);
    state = {
        text: '',
        checked: false,
        date: this.minDate
    }

    handleText = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    handleCheckbox = (e) => {
        this.setState({
            checked: e.target.checked
        })
    }

    handleDate = (e) => {
        this.setState({
            date: e.target.value
        })
    }

    //czyszczenie pola dodaj zadanie po dodaniu zadania
    handleClick = () => {


        const { text, checked, date } = this.state;
        if (text.length > 2) {
            const add = this.props.add(text, date, checked);
            if (add) {
                this.setState({
                    title: '',
                    checked: false,
                    date: this.minDate
                })
            }
        } else {

        }
    }

    handleChange = event => this.setState({ text: event.target.value });

    handleSubmit(newTask) {
        axios.post("http://195.181.210.249:3000/todo/", {
            title: newTask.title,
            author: "Magda",
        })
            .then(() => this.getData());
    }

    render() {
        let maxDate = this.minDate.slice(0, 4) * 1 + 1;
        maxDate = maxDate + "-12-31";

        return (
            <div className="form" onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" placeholder="dodaj zadanie" name="title" value={this.state.title} onChange={this.handleChange.bind(this)} />
                <input type="checkbox" checked={this.state.checked} id="important" onChange={this.handleCheckbox} />
                <label htmlFor="important">Priorytet</label><br />
                <label htmlFor="date">Do kiedy zrobić</label>
                <input type="date" value={this.state.date} min={this.minDate} max={maxDate} onChange={this.handleDate} />
                <br />
                <button onClick={this.handleClick}>Dodaj zadanie</button>

            </div>
        );
    }
}

export default AddTask;