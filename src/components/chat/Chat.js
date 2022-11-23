import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Users } from './users/Users';
import { UserContext } from '../../context/UserContext';
import { FocusedUser } from './users/FocusedUser';


export const Chat = () => {
    const { auth } = useContext(AuthContext);
    const { clickedUser } = useContext(UserContext);
    const navigate = useNavigate();

    const onLogout = () => {
        signOut(auth)
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                alert(err.message);
            })
    };

    return (
        <div className="chat__container">
            <div className="header">
                <section className="header__btn__container">
                    <Link className="btn" to="/edit">
                        User
                    </Link>
                    <Link className="btn" to="#" onClick={onLogout}>
                        Logout
                    </Link>
                </section>
            </div>
                <Users />
            {clickedUser && <FocusedUser />}
        </div>
    );
}