import React from "react";
import pf from "petfinder-client";
import Pet from "./Pet";
import "./style.css";
const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: []
    };
  }
  componentDidMount() {
    const promise = petfinder.pet.find({
      output: "full",
      location: "Seattle, WA"
    });
    promise.then(data => {
      let pets;
      let pet = data.petfinder.pets;
      if (pet && pet.pet) {
        if (Array.isArray(pet.pet)) {
          pets = pet.pet;
        } else {
          pets = [pet.pet];
        }
      } else {
        pets = [];
      }
      this.setState({
        pets
      });
    });
  }
  render() {
    return (
      <div className="search">
        {this.state.pets.map(pet => {
          let breed;
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ");
          } else {
            breed = pet.breeds.breed;
          }
          return (
            <Pet
              key={pet.id}
              id={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city},${pet.contact.state}`}
            />
          );
        })}
      </div>
    );
  }
}
