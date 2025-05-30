import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import CountryCard from "./CountryCard";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCountries(data);
      console.log("countries data:", data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div >
      <h2>Countires List</h2>
      {loading && <p>...Loading</p>}
      {error && <p>Error: {error}</p>}
      <Row>
      {countries.map((country) => (
        <Col md={3} sm={6} xs={12} >
        <CountryCard country={country}/>
        </Col>
      ))}
      </Row>
    </div>
  );
}

export default CountryList;
