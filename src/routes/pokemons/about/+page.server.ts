import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({params}) => {
    // throw new Error('Not implemented'); 
    return {
        about:  'This is the about page from "+page.ts" file'   };
};