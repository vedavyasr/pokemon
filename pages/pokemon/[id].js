/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Details.module.css";

export async function getServerSideProps({ params }) {
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );
  const data = await resp.json();
  return {
    props: {
      pokemon: data,
    },
  };
}

export default function Details({pokemon}) {
 
  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <Link href="/">
        <a>Back to Home</a>
      </Link>

      <div>
        <img
          src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
          alt={pokemon.name}
          className={styles.picture}
        />
      </div>
      <div>
        <div className={styles.name}>{pokemon.name}</div>
        <div className={styles.type}>{pokemon?.type?.join(", ")}</div>
      </div>
      <table>
        <thead className={styles.header}>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {pokemon?.stats?.map(({ name, value }) => (
            <tr key={name}>
              <td className={styles.attribute}>{name}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
