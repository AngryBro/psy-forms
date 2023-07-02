import "./css/Spinner.css";

export const Spinner = ({color}) => (
    <div className="spinner-loader" style={{"--spinner-color": color}}>
        <span className="spinner-timer">Loading…</span>
    </div>
)