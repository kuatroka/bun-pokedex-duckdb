import { getCik, getCusip } from "$lib/server/db/duckdb";
import type { PageServerLoad } from './$types';


console.time("total")
export const load: PageServerLoad = async ({ url }) => {
    let quarterParams = url.searchParams.get('quarter') || '2003Q1'
    let limitParams = 18;

        return  {   entries_cusip: await getCusip(limitParams, quarterParams),  
                    entries_cik: await getCik(8)
            }  ; 

};
console.timeEnd("total")


// export async function load({ params}) {
//     const entries = await getCik();
//     if (!entries) {
//         throw new Error('Album not found');
//     };
//     const entries2 = await getCusip();
//     if (!entries2) {
//         throw new Error('Album not found');
//     };

//     return  { entries2, entries } ;
// 	};











