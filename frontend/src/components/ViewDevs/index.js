import { useSelector, useDispatch  } from "react-redux";
import "./ViewDevs.css"

const ViewDevs = () => {
  const devs = useSelector(state => state.search.res.devs)
  return (
    <ul>{devs.map((dev) =><li key={dev}>{dev.fullName}</li>)}</ul>
    // <h1>Hello</h1>
  )

}

export default ViewDevs
