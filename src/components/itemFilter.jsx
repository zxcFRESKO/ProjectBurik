export function ItemFilter({ data_id, text, func }) {
  return (
    <li onClick={func} className="filtration_li" data-id={data_id}>
      {text}
    </li>
  );
}
