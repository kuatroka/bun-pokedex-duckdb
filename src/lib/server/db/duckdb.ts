import duckdb from 'duckdb'
import { DUCKDB_PATH } from '$env/static/private';
import type { Cik, Cusip } from "./types";

// Instantiate DuckDB
const db = new duckdb.Database(DUCKDB_PATH,{
    "access_mode": "READ_ONLY"});
const conn = db.connect();
console.log(conn);


export async function getCik(limit=60): Promise<Cik[]> {  
    const query = (query: string) => {
        return new Promise<Cik[]>((resolve, reject) => {
            conn.all(query, (err, res: any) => {
                if (err) reject(err);
                resolve(res);
            })
        })
    };
    const sql = `select distinct(quarter) as quarter,
                from 
                main.main
                GROUP BY all
                LIMIT ${limit}`; // Use template literals correctly
    const entries: Cik[] = await query(sql);
    return entries as Cik[] ; // Return an object with entries property
};


export async function getCusip(limit=60, quarter?: string): Promise<Cusip[]> {
    const query = (query: string) => {
    return new Promise<Cusip[]>((resolve, reject) => {
        conn.all(query, (err, res: any) => {
            if (err) reject(err);
            resolve(res);
        })
    })
};
if (quarter === 'last') {
    let sql =`SELECT         
    DISTINCT(cusip) AS cusip,
    ANY_VALUE(name_of_issuer) AS name_of_issuer,
    ANY_VALUE(cusip_ticker) AS cusip_ticker,
    ANY_VALUE(quarter) AS quarter,
    last(value) AS value,
FROM main
WHERE cusip_ticker != 'null' AND quarter = '2023Q1'
GROUP BY cusip
ORDER BY value desc
LIMIT ${limit}`; 

            const entries: Cusip[] = await query(sql);
            return entries as Cusip[] ; // Return an object with entries property
} else {
    let sql = `SELECT         
                DISTINCT(cusip) AS cusip,
                ANY_VALUE(name_of_issuer) AS name_of_issuer,
                ANY_VALUE(cusip_ticker) AS cusip_ticker,
                ANY_VALUE(quarter) AS quarter,
                last(value) AS value,
            FROM main
            WHERE cusip_ticker != 'null' AND quarter = '${quarter}'
            GROUP BY cusip
            ORDER BY value desc
            LIMIT ${limit}`; 
            const entries: Cusip[] = await query(sql);
            return entries as Cusip[] ; // Return an object with entries property
};           


};
