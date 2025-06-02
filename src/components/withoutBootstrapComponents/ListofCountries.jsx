import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import ListCountryCard from './ListCountryCard';
import ModalCompo from './ModalCompo';

function ListofCountries() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const fetchCountries = async () => {
        try{
            setLoading(true);
            const response = await fetch('https://restcountries.com/v3.1/all')
            if(!response.ok) throw new Error('Error fetching data')
            const data = await response.json();
            console.log(data);
            setCountries(data);
            
        }catch(err){
            setError(err);
        }finally{
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

    const filteredCountries = countries.filter(country => 
        country.name.official.toLowerCase().includes(searchInput.toLowerCase())
    );

    const fetchSearchByName = async (name) => {
        try{
            const response = await fetch(`https://restcountries.com/v3.1/name/${name}`)
            if(!response.ok){
                if(response.status === 404){
                    setCountries([]);
                }else {
                    throw new Error('Error fetching data');
                }
            }else{
                const data = await response.json();
                setCountries(data);
            }
        }catch(err){
            setError(err.message);
        }
    }

    useEffect(() => {
        const debounceDelay = setTimeout(() => {
            if(searchInput.trim() !== ''){
                fetchSearchByName(searchInput.trim());
            }else{
                fetchCountries();
            }
        }, 500);
        return () => clearTimeout(debounceDelay);
    }, [searchInput]);

  return (
    <div>
        {loading && <p>...Loading</p>}
        {error && <p>Error: {error}</p>}
        <div>
            <input type='text' placeholder='Search...' style={{marginLeft:'20px', width:'400px '}} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        </div>
        <Row>
            {countries.map((country) => (
                <Col md={3} sm={6} xs={12} key={country.name.official}>
                    <ListCountryCard country={country} handleViewMore={handleViewMore} />
                </Col>
            ))}
        </Row>
        {selectedCountry && (
            <ModalCompo country={selectedCountry} handleCloseModal={handleCloseModal} showMore={showMore} />
        )}
    </div>
  )
}

export default ListofCountries;