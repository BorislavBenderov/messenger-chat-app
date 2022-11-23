import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import { updateDoc, doc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { database } from "../../../firebaseConfig";
import { AuthContext } from "../../../context/AuthContext";
import { Messages } from './Messages';
import { v4 as uuidv4 } from 'uuid';

export const FocusedUser = () => {
    const { loggedUser } = useContext(AuthContext);
    const { clickedUser, chatId } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [likes, setLikes] = useState([]);
    const [input, setInput] = useState('');

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

        if (input === '') {
            alert('Please enter a valid message.');
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
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    return (
        <div className="chat__page">
            <section className="focused__user">
                <h3>{clickedUser.displayName}</h3>
            </section>
            <section className="messages">
                {messages.map(message => <Messages key={message.id} message={message} messages={messages} likes={likes}/>)}
            </section>
            <section className="chat">
                <form className="chat__form" onSubmit={onMessage}>
                    <input
                        className="message__box"
                        type="text"
                        placeholder="Type your message here"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <input type="file" />
                </form>
            </section>
        </div>
    );
}