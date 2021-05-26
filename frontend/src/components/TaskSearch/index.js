import './TaskSearch.css'
import {useState} from 'react'
import { Route, Switch } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { taskType } from '../../store/search';
import Search from '../Search';
import Devs from '../Devs'

function TaskSearch() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [search, setSearch] = useState()

  const LANGUAGES = ['Python', 'JavaScript', 'Ruby', 'Java', "C", "C++", "Motoko"]

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(taskType(search));
    history.push(`/search/${search}`)
  }


  return (
    <div className="dashboard">
      <form class="searchForm" onSubmit={handleSubmit}>
        <div className="taskSearch">
          <h2 className="taskSearch-greeting">Book Your Next Task</h2>
          <div></div>
          <input
            className="taskSearch-searchBar"
            maxLength="150"
            placeholder="choose what language you need help with"
            list="languages"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <button type="submit" className="taskSearch-searchButton">
            <i class="fas fa-search"></i>
          </button>
          <datalist className="taskSearch-datalist" id="languages">
            {LANGUAGES.map((lang, i) => (
              <option key={i}>{lang}</option>
            ))}
          </datalist>
          <div className="taskSearch-suggestions">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                className="taskSearch-suggestion"
                value={lang}
                onClick={(e) => setSearch(e.target.value)}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default TaskSearch
