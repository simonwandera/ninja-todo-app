import { useState, useContext } from "react";
import { useNavigate } from 'react-router';
import { userContext } from "./contexts/UserContext";


const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isPending, setIsPending] = useState(false)
    const navigate = useNavigate();
    const {userProfile, setUserProfile} = useContext(userContext)
    const [author, setAuthor] = useState(userProfile ? userProfile.username : 'Unauthenticated');

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
                
                {(userProfile && userProfile.usertype) ? <button className="button">Add blog</button> :
                <div className='loginAlert' onClick={() => navigate('/login')}>Please Log in to create a blog</div>
                }
                {isPending && <button disabled>Adding blog... </button>}
            </form>

        </div>
    );
}

export default Create;