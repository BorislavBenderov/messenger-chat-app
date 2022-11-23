import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { database, storage } from "../../../firebaseConfig";

export const EditUser = () => {
    const { loggedUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: loggedUser.displayName,
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

        if (username === '') {
            alert('Please set a username!');
            return;
        }

        const storageRef = ref(storage, `/users/${loggedUser.displayName}`);
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
                            displayName: username
                        })
                            .then(() => {
                                navigate('/chat');
                            })

                    })
                    .catch((err) => {
                        alert(err.message);
                    })
            })
    }

    return (
        <form className='auth' onSubmit={onEdit}>
            <h3>Edit User</h3>
            <label htmlFor="username"></label>
            <input type="text" placeholder="Username" id="username" name="username" value={values.username} onChange={changeHandler} />
            <label htmlFor="userImg"></label>
            <input type="file" placeholder="Choose a photo" id="userImg" name="userImg" />
            <button type="submit">Edit</button>
        </form>
    );
}