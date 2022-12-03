import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { UserContext } from "../../../context/UserContext";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { database } from "../../../firebaseConfig";

export const Messages = ({ message, likes, scroll }) => {
    const { loggedUser } = useContext(AuthContext);
    const { chatId } = useContext(UserContext);

    const currentUserMessages = message.uid === loggedUser?.uid;

    const likeHandler = () => {
        if (likes.includes(message.id)) {
            updateDoc(doc(database, `chats/${chatId}`), {
                likes: arrayRemove(message.id)
            })
                .then(() => {
                    console.log('unliked');
                })
                .catch((err) => {
                    alert(err.message);
                })
        } else {
            updateDoc(doc(database, `chats/${chatId}`), {
                likes: arrayUnion(message.id)
            })
                .then(() => {
                    console.log('liked');
                })
                .catch((err) => {
                    alert(err.message);
                })
        }
    }

    return (
        <div className="message" style={{ flexDirection: currentUserMessages ? 'row-reverse' : '' }} ref={scroll}>
            <img
                className="user__photo"
                src={message.img}
                alt=""
            />
            {message.message
                ? <p style={{ backgroundColor: currentUserMessages ? 'blueviolet' : 'gray' }}>
                    {message.message}
                </p>
                : ''}
            {message.photo
                ? <img className="uploaded__photo" src={message.photo} alt="" />
                : ''}
            <i className={`fa fa-heart${!likes?.includes(message.id) ? '-o' : ''} fa-lg`}
                style={{ cursor: 'pointer', color: likes?.includes(message.id) ? 'red' : null }}
                onClick={likeHandler}
            ></i>
        </div>
    );
}