import React from 'react'
import { Modal, Button } from 'react-bootstrap';

function ModalComponent({showMore, handleCloseModal, country}) {
    // console.log("ModalComponent country:", countries);
  return (
    <div>
        <Modal show={showMore} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{country.name.official}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <img src={country.flags.svg} alt={country.flags.alt} style={{width:'100%', marginBottom:'10px', height:'180px'}}/>
           <p>Population: {country.popualtion}</p>
           <p>Region: {country.region}</p>
           <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
           <p>Native: {Object.values(country.name.nativeName || {})[0] ?.common || 'N/A'}</p>
           <p>Currencies: {country.currencies ? Object.values(country.currencies).map(c => c.name).join(',') : 'N/A'}</p>
           <p>Languages: {country.languages ? Object.values(country.languages).join(',') : 'N/A'}</p>
           <p>Border Countries: {country.borders ? country.borders.join(','): 'None'}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalComponent;