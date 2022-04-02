import "./Logo.css"

const Logo = (props) => {
    return (
        <div className="logo">{props.children}</div>
    );
}

export default Logo;