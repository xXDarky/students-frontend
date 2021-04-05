import React from 'react'

export const LoginScreen = ({history}) => {
    const handleLogin = () => {
        history.replace('/')
    }
    return (
        <div className="container mt-5 animate__animated animate__fadeIn">
            <h1>Learning new skills with Students Registry</h1>
            <hr/>
            <button className="btn btn-primary" 
                    onClick={handleLogin}
            >
                Enter 
            </button>
        </div>
    )
}
