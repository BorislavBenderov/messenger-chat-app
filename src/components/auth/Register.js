export const Register = () => {
    return (
        <form className='auth'>
            <h3>Register Here</h3>
            <label htmlFor="username"></label>
            <input type="text" placeholder="Username" id="username" name="username" />
            <label htmlFor="email"></label>
            <input type="text" placeholder="Email" id="email" name="email" />
            <label htmlFor="userImg"></label>
            <input type="file" placeholder="Choose a photo" id="userImg" name="userImg" />
            <label htmlFor="password"></label>
            <input type="password" placeholder="Password" id="password" name="password" />
            <label htmlFor="repeatPassword"></label>
            <input type="password" placeholder="Repeat Password" id="repeatPassword" name="repeatPassword" />
            <button type="submit">Register</button>
        </form>
    );
}