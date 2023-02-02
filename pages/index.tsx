import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

type stockData = {
  ticker: { S: string };
  open_price: { N: string };
  close_price: { N: string };
  date_time: { N: string };
};

export default function Home() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<stockData | null>(null);

  const getStockData = (stockTicker: string) => {
    console.log("get stock data called");
    fetch(
      `https://o2lx9o2209.execute-api.us-east-1.amazonaws.com/api/v1/stock?ticker=${stockTicker}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.Item);
      });
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      getStockData(input);
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            created with &nbsp;
            <code className={styles.code}>
              CDK, ExpressJs, Docker, and Next.js
            </code>
          </p>
        </div>

        <div className={styles.center}>
          <h2>Stonk 📈</h2>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            id="stock"
            name="stock"
          />
          <button onClick={() => getStockData(input)}>Search</button>
        </div>
        {data && (
          <div>
            <h3>Ticker</h3>
            <p>{data.ticker.S}</p>
            <h3>Close Price</h3>
            <p>{data.close_price.N}</p>
            <h3>Open Price</h3>

            <p>{data.open_price.N}</p>
            <h3>Date & Time</h3>
            <p>{new Date(parseInt(data.date_time.N, 10)).toString()}</p>
          </div>
        )}
        <div className={styles.grid}></div>
      </main>
    </>
  );
}
