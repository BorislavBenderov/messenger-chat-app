import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { UserContext } from "../../../context/UserContext";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { database } from "../../../firebaseConfig";

export const Messages = ({ message, likes, scroll }) => {
    const { loggedUser } = useContext(AuthContext);
    const { chatId } = useContext(UserContext);

    const currentUserMessages = message.uid === loggedUser?.uid;

    const likeHandler = async () => {
        if (likes.includes(message.id)) {
            try {
                await updateDoc(doc(database, `chats/${chatId}`), {
                    likes: arrayRemove(message.id)
                });
            } catch (error) {
                alert(error.message);
            }


        } else {
            try {
                await updateDoc(doc(database, `chats/${chatId}`), {
                    likes: arrayUnion(message.id)
                })
            } catch (error) {
                alert(error.message);
            }
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
            {likes?.includes(message.id) || !currentUserMessages
                ? <i className={`fa fa-heart${!likes?.includes(message.id) ? '-o' : ''} fa-lg`}
                    style={{ cursor: 'pointer', color: likes?.includes(message.id) ? 'red' : null, marginLeft: '5px', marginRight: '5px' }}
                    onClick={!currentUserMessages ? likeHandler : null}
                ></i>
                : ''}
        </div>
    );
}