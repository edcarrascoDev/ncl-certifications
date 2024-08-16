interface Props {
  title: string;
  actionChildren?: React.ReactNode;
}
export default function TableHeadComponent({ title, actionChildren }: Props) {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className=" py-2">{actionChildren}</div>
    </div>
  );
}
