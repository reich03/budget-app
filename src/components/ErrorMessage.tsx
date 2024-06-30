type ErrorProps = {
  children: React.ReactNode;
};
export default function ErrorMessage({ children }:ErrorProps) {
  return (
    <div className="p-2 bg-red-600 rounded-lg">
      <p className="text-xl font-bold text-center text-white "> {children}</p>
    </div>
  );
}
