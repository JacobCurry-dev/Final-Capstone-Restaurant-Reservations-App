import Credits from "./Credits";

export default function Footer () {
    return (
        <div style={{
            background: '#393a44'
        }}>
            <div className="mt-2">
            <div style={{ color: 'white' }}>
                Credits
            </div>
            <br />
            <Credits />
        </div>
        </div>
    );
}