import { baseUrl } from '../env';

export const handleFetch = async ({data, method, path}) => {
        try{
           const res = await fetch(`${baseUrl}/${path}`, {method: method, body: data && JSON.stringify(data), headers: {
            'Content-Type': 'application/json'
           }})
           const parsedRes = await res.json()
           return parsedRes
        }catch(e){
            return e
        }
}