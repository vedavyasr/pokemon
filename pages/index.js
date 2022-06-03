/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";


export async function getServerSideProps() {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  const data = await resp.json();
    return {
      props: {
        pokemon: data
      }
    }
}



export default function Home({pokemon}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon app</title>
      </Head>
      <div className={styles.grid}>
        {pokemon.map((poke) => (
          <div className={styles.card} key={poke.id}>
            <Link href={`/pokemon/${poke.id}`}>
              <a>
                {/* <Image src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${poke.image}`}
                  alt={poke.name} width="100%" height="100%" layout='responsive' objectFit='contain'
                  ></Image>
                   */}
                <img
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${poke.image}`}
                  alt={poke.name}
                />
                <h3>{poke.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
