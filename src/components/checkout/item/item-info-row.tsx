interface Props {
  title: string;
  value: string;
}

export function ItemInfoRow(props: Props) {
  const { title, value } = props;
  return (
    <div className="flex justify-between">
      <p className="text-sm text-body">{title}</p>
      <span className="text-sm text-body text-end">{value}</span>
    </div>
  );
}
