import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';


export const Chat = () => {
    const { auth } = useContext(AuthContext);
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
                    <a className="btn" href="">
                        User
                    </a>
                    <Link className="btn" to="#" onClick={onLogout}>
                        Logout
                    </Link>
                </section>
            </div>
            <div className="users__page">
                <section className="user__info">
                    <img
                        className="user__photo"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                        alt=""
                    />
                    <h2 className="user__name">Borislav Benderov</h2>
                </section>
                <section className="search__bar">
                    <form className="search__form">
                        <input type="text" placeholder="Search" />
                    </form>
                </section>
                <section className="all__users">
                    <h3>Users</h3>
                    <div className="all__users__info">
                        <div className="all__users__card">
                            <img
                                className="user__photo"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                                alt=""
                            />
                            <p className="users__name">Gabriela B</p>
                        </div>
                        <div className="all__users__card">
                            <img
                                className="user__photo"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                                alt=""
                            />
                            <p className="users__name">Gabriela B</p>
                        </div>
                        <div className="all__users__card">
                            <img
                                className="user__photo"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                                alt=""
                            />
                            <p className="users__name">Gabriela B</p>
                        </div>
                        <div className="all__users__card">
                            <img
                                className="user__photo"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                                alt=""
                            />
                            <p className="users__name">Gabriela B</p>
                        </div>
                        <div className="all__users__card">
                            <img
                                className="user__photo"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                                alt=""
                            />
                            <p className="users__name">Gabriela B</p>
                        </div>
                        <div className="all__users__card">
                            <img
                                className="user__photo"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                                alt=""
                            />
                            <p className="users__name">Gabriela B</p>
                        </div>
                        <div className="all__users__card">
                            <img
                                className="user__photo"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                                alt=""
                            />
                            <p className="users__name">Gabriela B</p>
                        </div>
                    </div>
                </section>
            </div>
            <div className="chat__page">
                <section className="focused__user">
                    <h3>Gabriela B</h3>
                </section>
                <section className="messages">
                    <div className="message">
                        <div className="message__img">
                            <img
                                className="user__photo"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                                alt=""
                            />
                        </div>
                        <div className="message__info">
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Repudiandae autem aspernatur placeat nihil accusamus cum blanditiis
                                consequuntur molestias, ab nostrum? Ipsum enim, obcaecati quibusdam
                                totam sit voluptates? Quasi culpa qui nobis optio accusantium amet
                                vel dolorem numquam temporibus! Iusto, possimus?
                            </p>
                            <i>like</i>
                        </div>
                    </div>
                    <div className="message">
                        <div className="message__img">
                            <img
                                className="user__photo"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                                alt=""
                            />
                        </div>
                        <div className="message__info">
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Repudiandae autem aspernatur placeat nihil accusamus cum blanditiis
                                consequuntur molestias, ab nostrum? Ipsum enim, obcaecati quibusdam
                                totam sit voluptates? Quasi culpa qui nobis optio accusantium amet
                                vel dolorem numquam temporibus! Iusto, possimus?
                            </p>
                            <i>like</i>
                        </div>
                    </div>
                    <div className="message">
                        <div className="message__img">
                            <img
                                className="user__photo"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                                alt=""
                            />
                        </div>
                        <div className="message__info">
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Repudiandae autem aspernatur placeat nihil accusamus cum blanditiis
                                consequuntur molestias, ab nostrum? Ipsum enim, obcaecati quibusdam
                                totam sit voluptates? Quasi culpa qui nobis optio accusantium amet
                                vel dolorem numquam temporibus! Iusto, possimus?
                            </p>
                            <i>like</i>
                        </div>
                    </div>
                </section>
                <section className="chat">
                    <form className="chat__form">
                        <input
                            className="message__box"
                            type="text"
                            placeholder="Type your message here"
                        />
                        <input type="file" />
                    </form>
                </section>
            </div>
        </div>
    );
}