import { useState } from "react";
import { useNavigate } from 'react-router';

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };
        fetch('https://keylogging.pythonanywhere.com/api/create', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log("New blog added");
            setIsPending(false)
            // history.go(-1);
            navigate('/');
        })
    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog author:</label>
                
                <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                {!isPending && <button className="button">Add blog</button>}
                {isPending && <button disabled>Adding blog... </button>}
            </form>

        </div>
    );
}

export default Create;