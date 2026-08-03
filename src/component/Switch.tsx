import * as SwitchPrimitive from "@radix-ui/react-switch";

interface Props {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export default function Switch({ checked, onCheckedChange }: Props) {
  return (
    <SwitchPrimitive.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={`relative h-7 w-12 rounded-full transition-colors ${
        checked ? "bg-green-700" : "bg-gray-300"
      }`}
    >
      <SwitchPrimitive.Thumb
        className={`block h-5 w-5 rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </SwitchPrimitive.Root>
  );
}