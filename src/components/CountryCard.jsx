import React from "react";
import { Card, Button } from "react-bootstrap";

function CountryCard({ country }) {
  return (
    <div className="country-card">
      <Card
        className="text-center shadow-sm"
        key={country.name.official}
        style={{ width: "18rem" }}
      >
        <Card.Img variant="top" src={country.flags.svg} alt={country.name.official} className="flag-img" />
            <Card.Body>
              <Card.Title>
                {country.name.official} <span>{country.flag}</span>{" "}
              </Card.Title>
              <Card.Text className="country-info">
                <p>
                  Capital: {country.capital ? country.capital[0] : "N/A"}{" "}
                </p>
                <p>Population: {country.population.toLocaleString()}</p>
                <p>Region: {country.region}</p>
              </Card.Text>
              <Button variant="primary">View More</Button>
            </Card.Body>
        {/*  */}
      </Card>
    </div>
  );
}

export default CountryCard;
