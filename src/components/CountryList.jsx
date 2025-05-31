import React, { useEffect, useState } from "react";
import { Row, Col, Pagination } from "react-bootstrap";
import CountryCard from "./CountryCard";
import ModalComponent from "./ModalComponent";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchInput, setSearchInput] = useState('');
//   const [filteredCountries, setFilteredCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
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

  const handleViewMore = (country) => {
    setShowMore(true);
    setSelectedCountry(country);
  };

  const handleCloseModal = ()=> {
    setShowMore(false);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchInput]);

  const filteredCountries = countries.filter(country => country.name.official.toLowerCase().includes(searchInput.toLowerCase()));

  //   total number of pages
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  const countriesForCurrentPage = filteredCountries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div >
      <h2>Countires List</h2>
      {loading && <p>...Loading</p>}
      {error && <p>Error: {error}</p>}
      <div>
        <input type='text' placeholder="Search By Name" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      </div>
      <Row>
      {countriesForCurrentPage.map((country) => (
        <Col md={3} sm={6} xs={12} key={country.name.official}>
        <CountryCard country={country} handleViewMore={handleViewMore} />
        </Col>
      ))}
      </Row>
      {selectedCountry && (
        <ModalComponent country={selectedCountry} showMore={showMore} handleCloseModal={handleCloseModal} />
      )}
        <Pagination style={{dispplay:'flex', justifyContent:'center'}}>
            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1}/>
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}/>
            {[...Array(totalPages).keys()].map((page) => (
                <Pagination.Item 
                key={page+1} 
                active={page+1 === currentPage}
                onClick={() => handlePageChange(page+1)}
                 >{page+1}</Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}/>
            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      
    </div>
  );
}

export default CountryList;
