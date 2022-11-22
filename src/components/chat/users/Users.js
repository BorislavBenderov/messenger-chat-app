import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { UserContext } from '../../../context/UserContext';
import { User } from "./User";

export const Users = () => {
    const { users } = useContext(UserContext);
    const { loggedUser } = useContext(AuthContext);
    const [search, setSearch] = useState('');

    const notCurrentUsers = users.filter(user => user.uid !== loggedUser?.uid)
        .filter(user => user.displayName.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="users__page">
            <section className="user__info">
                <img
                    className="user__photo"
                    src={loggedUser.photoURL}
                />
                <h2 className="user__name">{loggedUser.displayName}</h2>
            </section>
            <section className="search__bar">
                <form className="search__form">
                    <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                </form>
            </section>
            <section className="all__users">
                <h3>Users</h3>
                {notCurrentUsers.map(user => <User key={user.uid} user={user} />)}
            </section>
        </div>
    );
}