import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export const Messages = ({ message }) => {
    const { loggedUser } = useContext(AuthContext);

    const currentUserMessages = message.uid === loggedUser.uid;
    return (
        <div className="message" style={{flexDirection: currentUserMessages ? 'row-reverse' : ''}}>
            <div className="message__img">
                <img
                    className="user__photo"
                    src={message.img}
                    alt=""
                />
            </div>
            <div className="message__info">
                <p>
                    {message.message}
                </p>
                <i>like</i>
            </div>
        </div>
    );
}