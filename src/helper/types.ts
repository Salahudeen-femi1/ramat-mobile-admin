import type { IconType } from "react-icons/lib";
import { menuItems } from "./data";

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

export interface TableColumnProps<T = unknown> {
  label: string | React.ReactNode;
  key?: string;
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
  tableHeadingClassName?: string;
}

export interface ReusableTableProps<
  T extends { id?: number | string },
> extends PaginationControlProps {
  columns: TableColumnProps<T>[];
  isLoading: boolean;
  data: T[];
  error: unknown;
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  isDeleting?: boolean;
  hasSerialNo?: boolean;
  tableType?: string;
  selectable?: boolean;
  selectedRowIds?: Array<number | string>;
  onToggleRowSelection?: (id: number | string) => void;
  onToggleAllRows?: (checked: boolean) => void;
  getRowId?: (item: T, index: number) => number | string | undefined;
}

// types/order.ts

export interface Customer {
  name: string;
  email: string;
  phone: string;
  image: string;
}

export interface Payment {
  method: string;
  cardNumber: string;
  reference: string;
  status: "Paid" | "Pending";
}

export interface OrderStatus {
  value:
    | "Received"
    | "In Kitchen"
    | "Ready"
    | "Picked Up";
}

export interface orderData {
  order_no: string;
  code: string;
  customer: string;
  item_ordered: string;
  quantity: string;
  amount: string;
  status: "recieved" | "cancelled" | "completed" | "preparing" | "ready";
  time: string;
  payment: "paid" | "pending" | "failed";
}

export type Review = {
  id: number;
  name: string;
  avatar: string;
  time: string;
  rating: number;
  text: string;
  item: string;
  replied: boolean;
  reply?: string;
  replyTime?: string;
  isNew?: boolean;
};

export type TopItem = {
  id: number;
  name: string;
  rating: number;
  reviews: number;
};

export interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  tableType?: string;
}

 interface MenuItem {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  featured?: boolean;
  available: boolean;
  soldOut?: boolean;
  items: string;
}

export interface MenuResponse {
  success: boolean;
  message: string;
  id: string 
  _id: string | number
  items: MenuItem[];
}

export interface orderedItem {
  id: string | number;
  image: string;
  price: number;
  label: string;
  status: string;
  quantity: number | string;
}

export interface PaymentProps {
  label: string;
  value: string;
  period: string;
  change: number;
  icon: IconType;
}

export type BusinessDay = {
  id: string;
  label: string;
  enabled: boolean;
  open: string;
  close: string;
};



export interface PaymentHistoryResponse {
  payments?: PaymentTransaction[];
  data?: PaymentTransaction[];
  total_revenue?: string | number;
  daily_earning?: string | number;
  pending_settlement?: string | number;
  refunds?: string | number;
}

export interface PaymentTransaction {
  id?: string | number;
  transaction_id?: string;
  Tranaction_id?: string;
  date: string;
  order_id: string;
  amount: string | number;
  method?: string;
  payment_method?: string;
  status: "success" | "pending" | "failed";
  customer: string;
}

export type StoreForm = {
  restaurantName: string;
  contactEmail: string;
  phone: string;
  address: string;

  coverImage: string;
  logo: string;

  currency: string;
  timezone: string;
  taxId: string;

  facebook: string;
  instagram: string;
  youtube: string;

  pickupTime: string;
  deliveryTime: string;

  autoAcceptOrders: boolean;
  maintenanceMode: boolean;
  maintenanceMessage: string;
};

export interface ModifierOption {
  name: string;
  price: number;
}

export interface ModifierGroup {
  name: string;
  options: ModifierOption[];
  required: boolean;
  multiple: boolean;
}

export interface AdminLoginProps {
  email: string;
  pin: string;
}

export interface AdminLoginResponse {
    token: string;
    message: string;
    user: {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
        role: string;
    };
}

export interface CreateMealPayload {
  name: string;
  description: string;
  category: string;
  price: number;
  image?: File | null;
  availableForOrder: boolean;
  preparationTime?: string | number;
  trackInventory: boolean;
  modifierGroups: ModifierGroup[];
}

export interface Category {
  _id: string;
  name: string;
}

export interface UserProps {
  id: string;
  email: string;
  role: string;
}

export interface DietaryTag {
  _id: string;
  name: string;
}