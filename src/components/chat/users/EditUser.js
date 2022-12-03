import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { database, storage } from "../../../firebaseConfig";
import UPLOAD from '../../../assets/upload.png';
import { UserContext } from "../../../context/UserContext";

export const EditUser = () => {
    const { loggedUser } = useContext(AuthContext);
    const { users } = useContext(UserContext);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: loggedUser.displayName,
        userImg: loggedUser.photoURL
    });

    const changeHandler = (e) => {
        setValues(oldState => ({
            ...oldState,
            [e.target.name]: e.target.value
        }));
    };

    const onEdit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get('username');
        const userImg = formData.get('userImg');

        const isUsernameInUse = users.filter(user => user.uid !== loggedUser.uid).find(user => user.displayName === username);

        if (isUsernameInUse) {
            alert('This username is already in use!');
            return;
        }

        if (username === '') {
            alert('Please set a username!');
            return;
        }

        if (username.length < 2 || username.length > 10) {
            alert('Username must be more than 2 characters and less then 10!');
            return;
        }

        if (userImg.name === '') {
            updateProfile(loggedUser, {
                photoURL: loggedUser.photoURL,
                displayName: username
            });
            updateDoc(doc(database, 'users', loggedUser.uid), {
                userImg: loggedUser.photoURL,
                displayName: username,
            })
                .then(() => {
                    navigate(`/chat`);
                })
                .catch((err) => {
                    alert(err.message);
                })
        } else {
            const storageRef = ref(storage, `/users/${loggedUser?.email}`);
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
                            updateProfile(loggedUser, {
                                photoURL: downloadUrl,
                                displayName: username
                            });
                            updateDoc(doc(database, 'users', loggedUser.uid), {
                                userImg: downloadUrl,
                                displayName: username,
                            })
                                .then(() => {
                                    navigate(`/chat`);
                                })
                        })
                        .catch((err) => {
                            alert(err.message);
                        })
                })
        }
    }

    return (
        <form className='auth' onSubmit={onEdit}>
            <h3>Edit User</h3>
            <label htmlFor="username"></label>
            <input type="text" placeholder="Username" id="username" name="username" value={values.username} onChange={changeHandler} />
            <label htmlFor="userImg">
                <img
                    className="upload__img"
                    src={UPLOAD}
                    alt="" />
            </label>
            <input type="file"
                placeholder="Choose a photo"
                id="userImg"
                name="userImg"
                value={values.userImg?.name}
                onChange={changeHandler}
            />
            <button type="submit">Edit</button>
        </form>
    );
}