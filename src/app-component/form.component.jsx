import React, { useState } from 'react';
import "./form.style.css";

const Form = props => {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const handleCity = ((e) => {
        e.preventDefault();
        console.log(e.target.value)
        setCity(e.target.value)
    })

    const handleCountry = ((e) => {
        e.preventDefault();
        console.log(e.target.value)
        setCountry(e.target.value)
    })

    const onhandleSubmit = ((e) => {
        e.preventDefault();
        console.log(city)
        console.log(country)

        props.loadweather(city, country)
    })

    return (
        <div className="container">
            <div>{props.error ? error() : null}</div>
            <form onSubmit={onhandleSubmit}>
                <div className="row">

                    <div className="col-md-3 offset-md-2" >
                        <input
                            type="text"
                            className="form-control"
                            name="city"
                            autoComplete="off"
                            placeholder="City"
                            onChange={handleCity}
                        />
                    </div>

                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            name="country"
                            autoComplete="off"
                            placeholder="Country"
                            onChange={handleCountry}
                        />
                    </div>

                    <div className="col-md-3 mt-md-0 py-2 text-md-left ">
                        <button className="btn btn-warning" >Get Weather</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

function error() {
    return (
        <div className="alert alert-danger mx-5" role="alert">
            Please Enter City and Country
        </div>
    );
}

export default Form;
