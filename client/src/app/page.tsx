"use client"
import React, { useState } from 'react';

function Authorization() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function authorization(event: React.FormEvent) {
        event.preventDefault();
        setEmail('')
        setPassword('')
        try {
            const response = await fetch('http://localhost:3041/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={authorization}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default Authorization;
