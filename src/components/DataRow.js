import styles from "./DataRow.module.css";

const DataRow = (props) => {
  const { name, capital, region, flag } = props.country;
  return (
    <tr>
      <td>{name}</td>
      <td>{capital}</td>
      <td>{region}</td>
      <td>
        <img className={styles.flag} src={flag} alt="flag" />
      </td>
    </tr>
  );
};

export default DataRow;
