import { FiMail, FiPhone } from "react-icons/fi";
import type { Customer } from "../helper/types";

interface Props {
  customer: Customer;
}

export default function CustomerCard({ customer }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-4">

        <img
          src={customer.image}
          className="h-16 w-16 rounded-full object-cover"
        />

        <div>

          <h2 className="text-lg font-medium">

            {customer.name}

          </h2>

        </div>

      </div>

      <div className="mt-8 space-y-5">

        <div className="flex gap-3">

          <div className="bg-gray-100 p-3 rounded-lg">
            <FiMail className="text-primary" />
          </div>

          <div>

            <p className="text-xs uppercase text-gray-500">

              Email

            </p>

            <p className="font-medium">

              {customer.email}

            </p>

          </div>

        </div>

        <div className="flex gap-3">

          <div className="bg-gray-100 p-3 rounded-lg">
            <FiPhone className="text-primary" />
          </div>

          <div>

            <p className="text-xs uppercase text-gray-500">

              Phone

            </p>

            <p className="font-medium">

              {customer.phone}

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}