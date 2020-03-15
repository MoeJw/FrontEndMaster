import React from "react";
import pf from "petfinder-client";
import { navigate } from "@reach/router";
import "./style.css";
const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

export default class Details extends React.Component {
  state = {
    loading: true
  };
  componentDidMount() {
    petfinder.pet
      .get({
        output: "full",
        id: this.props.id
      })
      .then(data => {
        let breed;
        if (Array.isArray(data.petfinder.pet.breeds.breed)) {
          breed = data.petfinder.pet.breed.join(",");
        } else {
          breed = data.petfinder.pet.breeds.breed;
        }

        this.setState({
          name: data.petfinder.pet.name,
          animal: data.petfinder.pet.animal,
          location: `${data.petfinder.pet.contact.city},${
            data.petfinder.pet.contact.state
          }`,
          description: data.petfinder.pet.description,
          media: data.petfinder.pet.media,
          breed,
          loading: false
        });
      })
      .catch(() => {
        navigate("/");
      });
  }
  render() {
    //this.state.lodaing ? <h1>loading....</h1> : 1;
    const { animal, breed, location, description, name } = this.state;
    //const name = this.props.name;
    if (this.state.loading) {
      return <h1>loading....</h1>;
    }

    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}
