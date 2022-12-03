import { useContext, useState } from "react";
import { AuthContext } from '../../context/AuthContext';
import { setPersistence, createUserWithEmailAndPassword, browserSessionPersistence, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { storage, database } from "../../firebaseConfig";
import { useNavigate, Link } from 'react-router-dom';
import UPLOAD from '../../assets/upload.png';

export const Register = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isFileAdd, setIsFileAdd] = useState(false);

    const onRegister = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const username = formData.get('username');
        const email = formData.get('email');
        const userImg = formData.get('userImg');
        const password = formData.get('password');
        const repeatPassword = formData.get('repeatPassword');

        if (username === '' || email === '' || userImg.name === '' || password === '' || repeatPassword === '') {
            alert('Please fill all the fields!');
            return;
        }

        setPersistence(auth, browserSessionPersistence)
            .then(async () => {
                const res = await createUserWithEmailAndPassword(auth, email, password);
                const storageRef = ref(storage, `users/${username}`);
                const uploadTask = uploadBytesResumable(storageRef, userImg);
                uploadTask.on('state_changed',
                    (snapshot) => {
                    },
                    (err) => {
                        alert(err.message);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((downloadUrl) => {
                                updateProfile(res.user, {
                                    displayName: username,
                                    photoURL: downloadUrl
                                });
                                setDoc(doc(database, 'users', res.user.uid), {
                                    displayName: username,
                                    userImg: downloadUrl,
                                    uid: res.user.uid
                                });
                            })
                    })
                navigate('/chat');
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    return (
        <form className='auth' onSubmit={onRegister}>
            <h3>Register Here</h3>
            <label htmlFor="username"></label>
            <input type="text" placeholder="Username" id="username" name="username" />
            <label htmlFor="email"></label>
            <input type="text" placeholder="Email" id="email" name="email" />
            <label htmlFor="password"></label>
            <input type="password" placeholder="Password" id="password" name="password" />
            <label htmlFor="repeatPassword"></label>
            <input type="password" placeholder="Repeat Password" id="repeatPassword" name="repeatPassword" />
            <label htmlFor="userImg"><img
                className="upload__img"
                src={UPLOAD}
                alt="" />
                {isFileAdd ? "File is added!" : "Add a file"}
            </label>
            <input type="file" placeholder="Choose a photo" id="userImg" name="userImg" onChange={() => setIsFileAdd(true)} />
            <div className="log-reg">
                <p>Already have an account?</p>
                <Link className='link' to="/">Sign in</Link>
            </div>
            <button type="submit">Register</button>
        </form>
    );
}