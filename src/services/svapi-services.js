export default class SwapiService {
    _apiBase = 'https://swapi.dev/api';

     getResource = async(url)=> {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    };

    getAllPeople = async () => {
        const res = await this.getResource(`/people/`);
        return res.results.map(this._transformPerson);
    };

    getPerson = async (id) => {
        const person = await this.getResource(`/people/${id}/`);
        return this._transformPerson(person);
    }

    getAllPlanets = async () => {
        const res = await this.getResource(`/planets/`);
        return res.results.map(this._transformPlanet);
    };

    getPlanet = async (id) => {
        const planet = await this.getResource(`/planets/${id}/`)
        return this._transformPlanet(planet);
    };

     getAllStarships = async() => {
        const res = await this.getResource(`/starships/`);
        return res.results.map(this._transformStarship);
    };

     getStarship = async(id)=> {
        const starship = this.getResource(`/starships/${id}/`);
        return this._transformStarship(starship);
    };

    _extractId =(item)=> {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    };

    _transformPlanet = (planet) => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        };
    };

    _transformStarship = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        };
    };

    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.hair_color,
            height: person.height,
            mass: person.mass

        };
    };
};

// const swapi = new SwapiService()
// swapi.getStarships(3).then((p) => {
//     console.log(p.name);
// });
//
//
// const swapi = new SwapiService()
// swapi.getStarship().then((item) => {
//     item.forEach((i) => {
//         console.log(i.name)
//     })
// })
//
// const swapi = new SwapiService()
// swapi.funcTest().then((people) => {
//     console.log(people)
// })


//
// const getResource = async (url) => {
//     const res = await fetch(url);
//     const body = await res.json()
//     return body
// }
//
// getResource('https://swapi.dev/api/people/1/')
//     .then((body) => {
//         console.log(body)
//     })
