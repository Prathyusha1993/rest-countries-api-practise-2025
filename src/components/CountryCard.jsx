import React from "react";
import { Card, Button, Modal } from "react-bootstrap";
import ModalComponent from "./ModalComponent";

function CountryCard({ country, handleViewMore, handleCloseModal, showMore }) {
  return (
    <div className="country-card">
      <Card
        className="text-center shadow-sm"
        key={country.name.official}
        style={{ width: "18rem" }}
      >
        <Card.Img
          variant="top"
          src={country.flags.svg}
          alt={country.name.official}
          className="flag-img"
        />
        <Card.Body>
          <Card.Title>
            {country.name.official} <span>{country.flag}</span>{" "}
          </Card.Title>
          <Card.Text className="country-info">
            <p>Capital: {country.capital ? country.capital[0] : "N/A"} </p>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Region: {country.region}</p>
          </Card.Text>
          <Button onClick={() => handleViewMore(country)} variant="primary">
            View More
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CountryCard;
