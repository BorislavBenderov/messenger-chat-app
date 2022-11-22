import { setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

export const Login = () => {
    const { auth } = useContext(AuthContext);

    const onLogin = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (email === '' || password === '') {
            alert('Please fill all the fields!');
            return;
        }

        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        console.log('logged');
                    })
                    .catch((err) => {
                        alert(err.message);
                    })
            })
    }

    return (
        <form className='auth' onSubmit={onLogin}>
            <h3>Login Here</h3>
            <label htmlFor="email">Username</label>
            <input type="text" placeholder="Email" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
    );
}