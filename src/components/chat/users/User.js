import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

export const User = ({ user }) => {
    const { setClickedUser } = useContext(UserContext);

    return (
        <div className="all__users__info" onClick={() => setClickedUser(user)}>
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