import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getResult, selectValue } from './searchSlice'

export default function App() {
    let info = useSelector(selectValue).items
    const dispatch = useDispatch()
    const [keywords, setKeywords] = useState('')

    if (typeof info == "undefined"){
      info = [{name: " ", html_url: " ", stargazers_count: " ", watchers_count: " "}]
    }

    return (<div>
            <input type="text" placeholder="Please enter keywords" onChange={
                e => {setKeywords(e.target.value)
                dispatch(getResult(String(keywords)))}
            } />
            {/*<button type="submit" onClick={() => dispatch(getResult(String(keywords)))}>Search</button>*/}
            {info.map(item => {
                return (
                    <div>
                        <li>
                            <p>Project name:<a href={item.html_url}>{item.name}</a></p>
                            <p>Stargazers count:{item.stargazers_count}</p>
                            <p>Watchers count:{item.watchers_count}</p>
                        </li>
                    </div>
                );
            })
            }
          </div>)
}