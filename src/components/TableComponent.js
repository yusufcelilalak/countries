import styles from "./TableComponent.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import DataRow from "./DataRow";

const baseURL = "https://restcountries.com/v2/all";

const TableComponent = () => {
  const [countryData, setCountryData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(baseURL);
      const data = await response.data;

      setCountryData(data);
      setFilteredData(data);
      console.log("hey");
    } catch (error) {
      console.log(error.message);
    }
  };

  const searchHandler = (event) => {
    let word = event.target.value;

    word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    const newData = countryData.filter(
      (country) =>
        (country.name !== undefined && country.name.startsWith(word)) ||
        (country.capital !== undefined && country.capital.startsWith(word)) ||
        (country.region !== undefined && country.region.startsWith(word))
    );

    setFilteredData(newData);
  };

  const searchByCapitalHandler = (event) => {
    let word = event.target.value;

    word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    const newData = countryData.filter(
      (country) =>
        country.capital !== undefined && country.capital.startsWith(word)
    );

    setFilteredData(newData);
  };

  return (
    <div className={`row w-100 h-100 align-items-center  ${styles.container}`}>
      <Card className={`w-75 mx-auto my-5 p-0 ${styles.card}`}>
        <h1 className="text-center my-3">Countries</h1>
        <div>
          <Form.Control
            onChange={searchHandler}
            className={`w-25 me-4 float-end ${styles["search-input"]}`}
            type="text"
            placeholder="Search"
          />
        </div>
        <div className="table-responsive my-4">
          <Table
            className={`mx-auto table-hover align-middle text-center ${styles["country-table"]}`}
          >
            <thead>
              <tr className={` ${styles["table-head"]}`}>
                <th className="w-25">Name</th>
                <th className="d-flex justify-content-center align-items-center">
                  <div className="me-3">Capital</div>
                  <Form.Control
                    onChange={searchByCapitalHandler}
                    className={`p-1 ${styles["capital-search"]}`}
                    type="text"
                    placeholder="Search by Capital"
                  />
                </th>
                <th className="w-25">Region</th>
                <th className="w-25">Flag</th>
              </tr>
            </thead>
            <tbody>
              {filteredData &&
                filteredData.map((country) => (
                  <DataRow key={country.name} country={country} />
                ))}
            </tbody>
          </Table>
        </div>
      </Card>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default TableComponent;
