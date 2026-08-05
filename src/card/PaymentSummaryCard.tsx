import { MdCreditCard } from "react-icons/md";
import type { Payment } from "../helper/types";

interface Props {
  payment: Payment;
}

export default function PaymentSummaryCard({
  payment,
}: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">

      <h3 className="text-lg font-medium uppercase">

        Payment Summary

      </h3>

      <div className="mt-5 rounded-lg border border-gray-300 p-5">

        <div className="flex justify-between mb-5">

          <span className="text-gray-500">

            Method

          </span>

          <div className="flex items-center gap-2">

            <MdCreditCard />

            <span className="font-medium">

              {payment.method}

            </span>

          </div>

        </div>

        <div className="flex justify-between mb-5">

          <span className="text-gray-500">

            Reference

          </span>

          <span>

            {payment.reference}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">

            Status

          </span>

          <span className="rounded bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

            {payment.status}

          </span>

        </div>

      </div>

    </div>
  );
}