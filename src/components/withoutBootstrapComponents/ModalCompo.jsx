import React from 'react'
import { Modal, Button } from 'react-bootstrap';

function ModalCompo({country, handleCloseModal, showMore}) {
  return (
    <div style={{alignContent:'center'}}>
        <Modal show={showMore} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{country.name.official}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <img src={country.flags.svg} alt={country.flags.alt} style={{objectFit:'cover', width:'300px', height:'150px'}} />
                    <p>Population: {country.population.toLocaleString()}</p>
                    <p>Region: {country.region}</p>
                    <p>Capital: {country.capital ? country.capital[0] : 'N/A' }</p>
                    <p>Native Name: {Object.values(country.name.nativeName || {}[0]) ?.common || 'N/A'}</p>
                    <p>Currencies: {country.currencies ? Object.values(country.currencies).map(c => c.name).join(',') : 'N/A' }</p>
                    <p>Used languages: {country.languages ? Object.values(country.languages).join(',') : 'N/A' }</p>
                    <p>Border Countries: {country.borders ? country.borders.join(',') : 'None'}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default ModalCompo;