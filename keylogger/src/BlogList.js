import { Link } from 'react-router-dom';

const BlogList = ({ state_name, title, blogs }) => {
    return(
        <div className="blog-list">
            <h2>{ title }</h2>
            <h6>{ state_name }</h6>
            <nav className="home">
                {blogs.map((blog) => 
                <div className="blog-preview" key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                        <h2>{blog.title}</h2>
                        <h5>Written by {blog.author}</h5>
                    </Link>
                </div>
                )}
            </nav>
        </div>
    );
}

export default BlogList;