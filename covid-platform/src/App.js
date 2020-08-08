import React from 'react';
import Axios from 'axios';
import './style.css';
export default class App extends React.Component {


    constructor(props) {
        super(props);

        this.getCountryData = this.getCountryData.bind(this);
    }

    state = {
        confirmed: 0,
        revovered: 0,
        deaths: 0,
        countries: []
    }

    countrie: [];
    componentDidMount() {

        this.getData();
    }


    async getData() {




        const res = await Axios.get("https://covid19.mathdro.id/api");
        const resCountry = await Axios.get("https://covid19.mathdro.id/api/countries");
        //const resCountry = await Axios.get("https://api.first.org/data/v1/countries");

        console.log("result", resCountry);
        const countries = Object.keys(resCountry.data.countries);
        // fetch('https://covid19.mathdro.id/api/countries')
        //   .then(response => response.json())
        //   .then(data => {
        //       console.log("datas :",data)
        //   })   //console.log("datas:",data.countries[1].name));

        // const response = await fetch("https:covid19.mathdro.id/api/countries");
        // const data = await response.json();


        // console.log("datas:",data.countries)
        // const countries = this.state.data.countries.map(i,key)=>{
        //     key.push(i.name)
        // }
        this.setState({
            confirmed: res.data.confirmed.value,
            recovered: res.data.recovered.value,
            deaths: res.data.deaths.value,
            countries
        });
    }
    renderCountryOption() {
        return this.state.countries.map((country, i) => {
            return <option key = { i } > { country } < /option>
        });
    }

    async getCountryData(i) {
        try {
            const res = await Axios.get(`https://covid19.mathdro.id/api/countries/${i.target.value}`);
            this.setState({
                confirmed: res.data.confirmed.value,
                recovered: res.data.recovered.value,
                deaths: res.data.deaths.value,
            });

        } catch (err) {
            console.log("country not found", err.response);
            if (err.response.status = 404) {
                this.setState({
                    confirmed: "no confirmed data",
                    recovered: "no recovered data",
                    deaths: "no deaths data",
                });
            }
        }

    }
    render() {


        return ( < div className = "container" >
            <
            h1 > Corona virus < /h1> <
            select onChange = { this.getCountryData } > { this.renderCountryOption() } <
            /select>


            <
            div className = "flex" >

            <
            div className = "box confirmed" >
            <
            h3 > confirmed < /h3> <
            h4 > { this.state.confirmed } < /h4> <
            /div>

            <
            div className = "box recovered" >
            <
            h3 > recovered < /h3> <
            h4 > { this.state.recovered } < /h4> <
            /div>


            <
            div className = "box deaths" >
            <
            h3 > deaths < /h3> <
            h4 > { this.state.deaths } < /h4> <
            /div> <
            /div> <
            /div>

        );
    }
}