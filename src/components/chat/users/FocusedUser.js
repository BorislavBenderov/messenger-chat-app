import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../../context/UserContext";
import { doc, onSnapshot } from 'firebase/firestore';
import { database } from "../../../firebaseConfig";
import { Messages } from '../messages/Messages';
import { CreateMessage } from "../messages/CreateMessage";

export const FocusedUser = () => {
    const { clickedUser, chatId } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [likes, setLikes] = useState([]);

    const scroll = useRef();

    useEffect(() => {
        onSnapshot(doc(database, 'chats', chatId), (snapshot) => {
            setMessages(snapshot.data().messages.map((item) => {
                return { ...item };
            }));
            setLikes(snapshot.data().likes);
        })
    }, [chatId]);

    return (
        <div className="chat__page">
            <section className="focused__user">
                <h3>{clickedUser.displayName}</h3>
            </section>
            <section className="messages">
                {messages.map(message => <Messages key={message.id} message={message} messages={messages} likes={likes} scroll={scroll} />)}
            </section>
            <CreateMessage chatId={chatId} scroll={scroll} />
        </div>
    );
}