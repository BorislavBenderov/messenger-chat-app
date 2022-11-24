import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../../context/UserContext";
import { updateDoc, doc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { database, storage } from "../../../firebaseConfig";
import { AuthContext } from "../../../context/AuthContext";
import { Messages } from './Messages';
import { v4 as uuidv4 } from 'uuid';
import UPLOAD from '../../../assets/upload.png';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const FocusedUser = () => {
    const { loggedUser } = useContext(AuthContext);
    const { clickedUser, chatId } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [likes, setLikes] = useState([]);
    const [input, setInput] = useState('');
    const inputFileRef = useRef(null);
    const scroll = useRef();

    useEffect(() => {
        onSnapshot(doc(database, 'chats', chatId), (snapshot) => {
            setMessages(snapshot.data().messages.map((item) => {
                return { ...item };
            }));
            setLikes(snapshot.data().likes);
        })
    }, [chatId]);

    const onMessage = (e) => {
        e.preventDefault(e);

        const formdata = new FormData(e.target);
        const image = formdata.get('image');

        if (input === '' && image.name === '') {
            return;
        }

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
                                uid: loggedUser.uid,
                                img: loggedUser.photoURL,
                                id: uuidv4(),
                                photo: downloadUrl || null
                            })
                        })
                            .then(() => {
                                setInput('');
                                inputFileRef.current.value = null;
                                scroll.current.scrollIntoView({ behavior: 'smooth' });
                            })
                            .catch((err) => {
                                alert(err.message);
                            })
                    })
            })
    }

    return (
        <div className="chat__page">
            <section className="focused__user">
                <h3>{clickedUser.displayName}</h3>
            </section>
            <section className="messages">
                {messages.map(message => <Messages key={message.id} message={message} messages={messages} likes={likes} scroll={scroll} />)}
            </section>
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
                        <label htmlFor="image">
                            <img className="upload__img" src={UPLOAD} alt="" />
                        </label>
                        <input ref={inputFileRef} type="file" id="image" name="image" />
                    </div>
                </form>
            </section>
        </div>
    );
}