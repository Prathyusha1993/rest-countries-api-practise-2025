import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ListCountryCard from "./ListCountryCard";
import ModalCompo from "./ModalCompo";

function ListofCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState('name');

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) throw new Error("Error fetching data");
      const data = await response.json();
      console.log(data);
      setCountries(data);
    } catch (err) {
      setError(err);
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

  const handleCloseModal = () => {
    setShowMore(false);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.official.toLowerCase().includes(searchInput.toLowerCase())
  );

//   const fetchSearchByName = async (name) => {
//     try {
//       const response = await fetch(
//         `https://restcountries.com/v3.1/name/${name}`
//       );
//       if (!response.ok) {
//         if (response.status === 404) {
//           setCountries([]);
//         } else {
//           throw new Error("Error fetching data");
//         }
//       } else {
//         const data = await response.json();
//         setCountries(data);
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     const debounceDelay = setTimeout(() => {
//       if (searchInput.trim() !== "") {
//         fetchSearchByName(searchInput.trim());
//       } else {
//         fetchCountries();
//       }
//     }, 500);
//     return () => clearTimeout(debounceDelay);
//   }, [searchInput]);

const fetchSearch = async () => {
    if(!searchInput.trim()){
        fetchCountries();
        return;
    }
    const baseUrl = "https://restcountries.com/v3.1";
    let url='';
    switch(searchType){
        case 'name':
            url = `${baseUrl}/name/${searchInput.trim()}`;
            break;
        case 'region':
            url = `${baseUrl}/region/${searchInput.trim()}`;
            break;
        case 'language':
            url = `${baseUrl}/lang/${searchInput.trim()}`;
            break;
        case 'currency':
            url= `${baseUrl}/currency/${searchInput.trim()}`;
            break;
        default:
            url= '';
    }

    try {
        const response = await fetch(url);
        if(!response.ok){
            if(response.status == 404){
                setCountries([]);
            }else{
                throw new Error("Error fetching data");
            }
        }else{
            const data = await response.json();
            setCountries(data);
        }
    }catch(err){
        setError(err.message);
    }
};

useEffect(() => {
    const delay = setTimeout(() => {
        fetchSearch();
    }, 500);
    return () => clearTimeout(delay);
}, [searchInput, searchType]);

  return (
    <div>
        <div>
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value='name'>By Name</option>
                <option value='region'>By Region</option>
                <option value='language'>By Language</option>
                <option value='currency'>By Currency</option>
            </select>
        <input
          type="text"
          placeholder="Search..."
          style={{ marginLeft: "20px", width: "400px " }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      {loading && <p>...Loading</p>}
      {error && <p>Error: {error}</p>}
      <Row>
        {countries.map((country) => (
          <Col md={3} sm={6} xs={12} key={country.name.official}>
            <ListCountryCard
              country={country}
              handleViewMore={handleViewMore}
            />
          </Col>
        ))}
      </Row>
      {selectedCountry && (
        <ModalCompo
          country={selectedCountry}
          handleCloseModal={handleCloseModal}
          showMore={showMore}
        />
      )}
    </div>
  );
}

export default ListofCountries;
