import type { Customer, MenuItem, OrderProps, Payment } from "./types";
import { ImSpoonKnife } from "react-icons/im";
import { MdDeliveryDining } from "react-icons/md";
import { assets } from "../assets/assets";
// import { IoReceiptOutline } from "react-icons/io5";

interface dataProps {
    label: string;
    value: string;
    description?: string;
}

export const dashboardData: dataProps[] = [
    {
        label: 'Orders Today',
        value: '142'
    },
    {
        label: 'Active Orders',
        value: '18'
    },
    {
        label: 'Ready for Pickup',
        value: '06',
        description: 'Across 4 delivery provider'
    },
    {
        label: 'Completed Orders',
        value: '118',
        description: "Today's total efficiency"
    },
    {
        label: 'Revenue Today',
        value: 'N40,000',
        description: "8.4%"
    },
    {
        label: 'Monthly Revenue',
        value: 'N92.5k',
        description: "8.4%"
    },
    {
        label: 'Total Customers',
        value: '24',
        description: "8.4%"
    },
]

export const recentOrders: OrderProps[] = [
    {
        id: "ORD-2849",
        icon: ImSpoonKnife,
        items: 2,
        source: "Table 04",
        status: "Ready",
        time: "2m ago"
    },

    {
        id: "ORD-2848",
        icon: MdDeliveryDining,
        items: 5,
        source: "Uber Eats",
        status: "Processing",
        time: "5m ago"
    },
];

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Jollof Rice",
    category: "rice",
    image: assets.jollof,
    price: 28,
    featured: true,
    available: true,
  },
  {
    id: "2",
    name: "Chips & Chicken",
    category: "Rice",
    image: assets.chips,
    price: 34,
    available: true,
  },
  {
    id: "3",
    name: "Parfait",
    category: "parfait",
    image: assets.parfait,
    price: 18,
    soldOut: true,
    available: false,
  },
  {
    id: "4",
    name: "Semo",
    category: "okele",
    image: assets.semo,
    price: 18,
    soldOut: true,
    available: false,
  },
  {
    id: "5",
    name: "Shawarma",
    category: "shawarma",
    image: assets.shawarma,
    price: 18,
    soldOut: true,
    available: false,
  },
  {
    id: "6",
    name: "Ice Cream",
    category: "Ice cream",
    image: assets.icecream,
    price: 18,
    soldOut: true,
    available: false,
  },
  {
    id: "7",
    name: "Smoothies",
    category: "Smoothies",
    image: assets.smoothies,
    price: 18,
    soldOut: true,
    available: false,
  },
  {
    id: "8",
    name: "Hollandia",
    category: "driks",
    image: assets.hollandia,
    price: 18,
    soldOut: true,
    available: false,
  },
];

export const reviews = [
    {
        id: 1,
        customer: "Julianne S.",
        rating: 5,
        review:
            "The truffle risotto was absolutely sublime. Exceptional service and beautiful ambience."
    },

    {
        id: 2,
        customer: "Marcus Thorne",
        rating: 4,
        review:
            "Great presentation on the sea bass. The wine pairing was spot on."
    }
];

export const orderItems = [
    {
        id: 1,
        label: 'Jollof Rice',
        quantity: 2,
        price: 2800,
        image: assets.jollof,
        status: "paid"
    },
    {
        id: 2,
        label: 'Jollof Rice',
        quantity: 2,
        price: 2800,
        image: assets.jollof,
        status: "paid"
    },
]

export const customer: Customer = {
  name: "Eleanor Vance",
  email: "e.vance@corporate.com",
  phone: "+1 (555) 019-2234",
  image: "/images/avatar.png",
};

export const payment: Payment = {
  method: "Mastercard",
  cardNumber: "•••• 9921",
  reference: "#CHG_882931",
  status: "Paid",
};

export const registrations = [
    {
        id: 1,
        initials: "EK",
        name: "Elena Kostic",
        joined: "45m ago"
    },

    {
        id: 2,
        initials: "DL",
        name: "David Lin",
        joined: "1h ago"
    }
];