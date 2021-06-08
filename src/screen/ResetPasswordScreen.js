import React from 'react'

export default function ResetPasswordScreen() {
    
    return (
        <div>
            <form className="form">
                <div>
                    <label htmlFor="email">Reset password</label>
                    <input type="email" placeholder="Enter email"/>
                </div>

                <div>
                <label />
                    <button className="primary" type="submit">
                        Reset password
                    </button>
                </div>
            </form>   
        </div>
    )
}


