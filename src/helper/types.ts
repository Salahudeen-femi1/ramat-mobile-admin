import type { IconType } from "react-icons/lib";

export interface OrderProps {
  id: string;
  icon: IconType;
  items: number;
  source: string;
  status: "Ready" | "Processing" | "Pending";
  time: string;
}

export interface RegistrationProps {
  id: number;
  initials: string;
  name: string;
  joined: string;
}

export interface ReviewProps {
  id: number;
  customer: string;
  rating: number;
  review: string;
}