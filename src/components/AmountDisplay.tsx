import { formatCurrency } from "../helpers";

type AmountProps = {
  label?: string;
  amount: number;
};
export default function AmountDisplay({ label, amount }: AmountProps) {
  return (
    <>
      <p className="text-2xl font-bold text-blue-600">
        {label && `${label} :`}
        <span className="font-black text-black">{formatCurrency(amount)}</span>
      </p>
    </>
  );
}
