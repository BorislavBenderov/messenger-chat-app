import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UPLOAD from '../../../assets/upload.png';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateDoc, arrayUnion, doc } from 'firebase/firestore';
import { AuthContext } from "../../../context/AuthContext";
import { database, storage } from "../../../firebaseConfig";

export const CreateMessage = ({ chatId, scroll }) => {
    const { loggedUser } = useContext(AuthContext);
    const [input, setInput] = useState('');

    const onUploadFile = (e) => {
        e.preventDefault();

        const image = e.target.files[0];

        const storageRef = ref(storage, `photos/${uuidv4()}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on('state_changed',
            (snapshot) => {
            },
            (err) => {
                alert(err.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadUrl) => {
                        updateDoc(doc(database, 'chats', chatId), {
                            messages: arrayUnion({
                                message: input,
                                id: uuidv4(),
                                img: loggedUser.photoURL,
                                uid: loggedUser.uid,
                                photo: downloadUrl
                            })
                        })
                            .then(() => {
                                setInput('');
                                scroll.current.scrollIntoView({ behavior: 'smooth' });
                            })
                            .catch((err) => {
                                alert(err.message);
                            })
                    })
            })
    }

    const onMessage = (e) => {
        e.preventDefault(e);

        if (input === '') {
            return;
        }

        updateDoc(doc(database, 'chats', chatId), {
            messages: arrayUnion({
                message: input,
                uid: loggedUser.uid,
                img: loggedUser.photoURL,
                id: uuidv4()
            })
        })
            .then(() => {
                setInput('');
                scroll.current.scrollIntoView({ behavior: 'smooth' });
            })
            .catch((err) => {
                alert(err.message);
            })

    }

    return (
        <section className="chat">
            <form className="chat__form" onSubmit={onMessage}>
                <input
                    className="message__box"
                    type="text"
                    placeholder="Type your message here"
                    name="message"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <div className="image__upload">
                    {!input
                        ? <><label htmlFor="image">
                            <img className="upload__img" src={UPLOAD} alt="" />
                        </label>
                            <input type="file" id="image" name="image" onChange={(e) => onUploadFile(e)} /></>
                        : <button className="send" type="submit">send</button>}
                </div>
            </form>
        </section>
    );
}