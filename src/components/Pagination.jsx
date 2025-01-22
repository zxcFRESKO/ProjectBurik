export default function Pagination({text, btn_class, func}){
    return (
        <button className={btn_class} onClick={func}>{text}</button>
    )
}