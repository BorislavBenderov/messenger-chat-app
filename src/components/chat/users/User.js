import { useContext } from "react";
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { AuthContext } from "../../../context/AuthContext";
import { UserContext } from "../../../context/UserContext";
import { database } from "../../../firebaseConfig";

export const User = ({ user }) => {
    const { setClickedUser, setChatId } = useContext(UserContext);
    const { loggedUser } = useContext(AuthContext);

    const handleSelect = async () => {
        const combinedId = loggedUser.uid > user.uid
            ? loggedUser.uid + user.uid
            : user.uid + loggedUser.uid;

        try {
            const res = await getDoc(doc(database, 'chats', combinedId));

            if (!res.exists()) {
                await setDoc(doc(database, 'chats', combinedId), {
                    messages: []
                })
            }

            setClickedUser(user);
            setChatId(combinedId);

        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="all__users__info" onClick={handleSelect}>
            <div className="all__users__card">
                <img
                    className="user__photo"
                    src={user.userImg}
                    alt=""
                />
                <p className="users__name">{user.displayName}</p>
            </div>
        </div>
    );
}