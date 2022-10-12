import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getResult, selectValue } from './searchSlice';

const _ = require('lodash');

export default function App() {
  let info = useSelector(selectValue).items;
  const dispatch = useDispatch();

  if (typeof info === 'undefined') {
    info = [{
      name: ' ', html_url: ' ', stargazers_count: ' ', watchers_count: ' ',
    }];
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Please enter keywords"
        onChange={(_.debounce((e) => {
          if (e.target.value.length >= 3) {
            dispatch(getResult(String(e.target.value)));
          }
        }, 1000))}
      />

      {info.map((item) => (
        <div style={{ backgroundColor: 'lightgray' }}>
          <p>
            Project name:
            <a href={item.html_url}>{item.name}</a>
          </p>
          <p>
            Stargazers count:
            {item.stargazers_count}
          </p>
          <p>
            Watchers count:
            {item.watchers_count}
          </p>
        </div>
      ))}
    </div>
  );
}
