import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Board from '../LandingPage/Board/Board';
import SearchBox from './SearchBox';

function SearchPage() {
    const [searchParams] = useSearchParams();
    
    console.log(searchParams.get('search_type'))
    
    const params = { keyword: searchParams.get('keyword'), 
        search_type: searchParams.get('search_type'),
        postslength: searchParams.get('postslength')
    }
    console.log(params)
    return (
        <div >
            <Board params={params}/>
        </div>
    )
}

export default SearchPage