type Props = {
  children: React.ReactNode;
};

export default function Button({ children }: Props) {
  return <button className="px-4 py-2 bg-blue-500 text-white rounded">{children}</button>;
}
