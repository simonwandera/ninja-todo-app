import BlogList from "./BlogList";
import useFetch from "./useFetch";
const Home = () =>{
    const{ data, isPending, error} = useFetch('http://localhost:5000/api/blogs');
    return (
        <div className="home">
            { error && <div> { error} </div> }
            { isPending && <div>Loading...</div> }
            { data && <BlogList blogs={data} title = 'All Blogs' state_name = 'read them all'/>}
        </div>
    )
}
export default Home;
