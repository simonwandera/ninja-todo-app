import {useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useNavigate } from 'react-router';
const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch('https://keylogging.pythonanywhere.com/api/blogs/' + id);
    let navigate = useNavigate()

    const handleClick = () => {
        fetch('https://keylogging.pythonanywhere.com/api/delete_blogs/' + blog.id, {
            method: 'POST'

        }).then(() => {
            navigate('/');
        })
    }

    return(
        <div className="blog-details"> 
            { isPending && <div> Loading... </div>}
            { error && <div> {error} </div>}
            {blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p> Written by {blog.author }</p>
                    <div> {blog.body }</div>
                    <button onClick={handleClick}>delete</button>
                </article>
            )}

        </div>
    )
}
export default BlogDetails;