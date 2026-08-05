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

export interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  tableType?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  featured?: boolean;
  available: boolean;
  soldOut?: boolean;
}

export interface orderedItem {
  id: string | number;
  image: string;
  price: number;
  label: string;
  status: string;
  quantity: number | string;
}