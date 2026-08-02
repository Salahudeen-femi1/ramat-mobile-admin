import { ChevronRight } from "lucide-react";
import type { RegistrationProps } from "../helper/types";

interface Props {
  customer: RegistrationProps;
}

export default function RegistrationCard({
  customer,
}: Props) {
  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-100 last:border-none">

      <div className="flex gap-4 items-center">

        <div className="w-11 h-11 rounded-full bg-green-700 text-white flex items-center justify-center font-medium">
          {customer.initials}
        </div>

        <div>
          <h3 className="font-medium">
            {customer.name}
          </h3>

          <p className="text-gray-500 text-xs">
            Joined {customer.joined}
          </p>
        </div>

      </div>

      <ChevronRight
        className="text-green-700"
        size={20}
      />

    </div>
  );
}