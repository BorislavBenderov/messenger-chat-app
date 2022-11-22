import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

export const FocusedUser = () => {
    const { clickedUser } = useContext(UserContext);
    return (
        <div className="chat__page">
            <section className="focused__user">
                <h3>{clickedUser.displayName}</h3>
            </section>
            <section className="messages">
                <div className="message">
                    <div className="message__img">
                        <img
                            className="user__photo"
                            src={clickedUser.userImg}
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
    );
}