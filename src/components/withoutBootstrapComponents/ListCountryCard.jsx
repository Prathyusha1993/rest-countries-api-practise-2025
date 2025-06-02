import React from 'react'
import { Button, Card } from 'react-bootstrap';

function ListCountryCard({country, handleViewMore}) {
  return (
    <div className='country-card'>
        <Card className="text-center shadow-sm" key={country.name.official} style={{width:'18rem'}}>
            <Card.Img src={country.flags.svg} alt={country.flags.alt} className="flag-img"/>
            <Card.Body>
                <Card.Title className="text-center">{country.name.official}<span>{country.flag}</span></Card.Title>
                <Card.Text className="country-info">
                    <ul style={{textDecoration:'none'}}>
                        <li key={country.name.official}>
                            <p>Capital: {country.capital ? country.capital[0]: 'N/A' }</p>
                            <p>Population: {country.population.toLocaleString()} </p>
                            <p>Region: {country.region}</p>
                        </li>
                    </ul>
                </Card.Text>
                <Button variant="primary" onClick={() => handleViewMore(country)}>View More</Button>
            </Card.Body>
        </Card>
    </div>
  )
}

export default ListCountryCard;