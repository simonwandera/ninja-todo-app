import { useContext } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";
import { LocationContext } from "./contexts/LocationContext";

const Home = () =>{
    const{ data, isPending, error} = useFetch('https://keylogging.pythonanywhere.com/api/blogs');
    const { location } = useContext(LocationContext);
    
    return (
        <div className="home">
            { error && <div> { error} </div> }
            { isPending && <div>Loading...</div> }
            { data && <BlogList blogs={data} title = 'All Blogs' state_name = 'Read all the blogs below'/>}
        </div>
    )
}
export default Home;
