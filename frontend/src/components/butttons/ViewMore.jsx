import { NavLink } from "react-router-dom";

const ViewMore = ({LinkTo,Text}) => {
    return (

        <NavLink to={LinkTo} className="py-5 px-10">{Text}</NavLink>

    )
}

export default ViewMore
