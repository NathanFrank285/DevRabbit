// import 'Search.css'
import { useSelector, useDispatch } from "react-redux";

function Search() {
  const searchValue = useSelector(state => state.search.value)
  console.log('I am the searched value',searchValue)
  return (
    <h2 className="title">Find the perfect {searchValue} developer</h2>
  )

}

export default Search
