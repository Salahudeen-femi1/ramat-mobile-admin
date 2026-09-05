import type { BusinessDay, Customer, MenuItem, orderData, OrderProps, Payment, PaymentProps, Review, StoreForm, TopItem } from "./types";
import { ImSpoonKnife } from "react-icons/im";
import { MdDeliveryDining } from "react-icons/md";
import { assets } from "../assets/assets";
import { CiBank } from "react-icons/ci";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { HiMiniReceiptRefund } from "react-icons/hi2";
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

export const userData = [
    {
      id: 1,
      customer: "Julian casablanka",
      contact_info: "johndoe@example.com",
      orders: "4",
      total_spent: "$ 120.00",
      last_order: "2023-08-15",
      status: "active",
      time: '1942',
      payment: "paid"
    },
    {
      id: 2,
      customer: "Julian casablanka",
      contact_info: "johndoe@example.com",
      orders: "4",
      total_spent: "$ 120.00",
      last_order: "2023-08-15",
      status: "inactive",
      time: '1942',
      payment: "paid"
    },
    {
      id: 3,
      customer: "Julian casablanka",
      contact_info: "johndoe@example.com",
      orders: "4",
      total_spent: "$ 120.00",
      last_order: "2023-08-15",
      status: "active",
      time: '1942',
      payment: "paid"
    },
  ]

export const data: orderData[] = [
    {
      order_no: "#ORD-1284",
      code: "k72",
      customer: "Julian casablanka",
      item_ordered: "1 Plate of rice and chicken",
      quantity: "4",
      amount: "$ 20.00",
      status: "recieved",
      time: '1942',
      payment: "paid"
    },
    {
      order_no: "#ORD-1284",
      code: "k72",
      customer: "Julian casablanka",
      item_ordered: "1 Plate of rice and chicken",
      quantity: "4",
      amount: "$ 20.00",
      status: "cancelled",
      time: '1942',
      payment: "failed"
    },
    {
      order_no: "#ORD-1284",
      code: "k72",
      customer: "Julian casablanka",
      item_ordered: "1 Plate of rice and chicken",
      quantity: "4",
      amount: "$ 20.00",
      status: "completed",
      time: '1942',
      payment: "pending"
    },
    {
      order_no: "#ORD-1284",
      code: "k72",
      customer: "Julian casablanka",
      item_ordered: "1 Plate of rice and chicken",
      quantity: "4",
      amount: "$ 20.00",
      status: "preparing",
      time: '1942',
      payment: "paid"
    },
    {
      order_no: "#ORD-1284",
      code: "k72",
      customer: "Julian casablanka",
      item_ordered: "1 Plate of rice and chicken",
      quantity: "4",
      amount: "$ 20.00",
      status: "ready",
      time: '1942',
      payment: "failed"
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

export const paymentStats: PaymentProps[] = [
    {
      label: "Total Revenue",
      value: "124,529.00",
      period: "vs last month",
      change: 12.5,
      icon: CiBank 
    },
    {
      label: "Today's Earning",
      value: "124,529.00",
      period: "vs yesterday",
      change: -8.5,
      icon: FaRegMoneyBillAlt 
    },
    {
      label: "Pending Settlement",
      value: "124,529.00",
      period: "vs last month",
      change: 16.5,
      icon: MdOutlinePendingActions
    },
    {
      label: "Refunds",
      value: "124,529.00",
      period: "vs refund rate",
      change: -12.5,
      icon: HiMiniReceiptRefund
    },
  ]

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

export const initialForm: StoreForm = {
  restaurantName: "Emerald Grill",
  contactEmail: "age2@emeraldgrill.com",
  phone: "+1 (555) 221-4567",
  address: "812 Emerald Heights Dr,\nSuite 104,\nSan Francisco, CA 94105",

  coverImage:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",

  logo: "",

  currency: "USD ($)",
  timezone: "(GMT-08:00) Pacific",
  taxId: "TX-90812-FF-00",

  facebook: "facebook.com/emeraldgrill",
  instagram: "instagram.com/emeraldgrill",
  youtube: "youtube.com/EmeraldGrillExperience",

  pickupTime: "15",
  deliveryTime: "25",

  autoAcceptOrders: true,
  maintenanceMode: false,
  maintenanceMessage:
    "Please check back shortly. We are currently performing maintenance.",
};

export const initialBusinessDays: BusinessDay[] = [
  {
    id: "mon-fri",
    label: "Mon - Fri",
    enabled: true,
    open: "08:00 AM",
    close: "10:00 PM",
  },
  {
    id: "sat-sun",
    label: "Sat - Sun",
    enabled: true,
    open: "10:00 AM",
    close: "11:00 PM",
  },
];

export const initialReviews: Review[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    avatar: "https://i.pravatar.cc/100?img=47",
    time: "2 hours ago",
    rating: 5,
    text: "Absolutely phenomenal experience. The burger was cooked to perfection, and the truffle mayo was out of this world! Service was incredibly fast despite the busy Friday night. Will definitely be coming back!",
    item: "Wagyu Truffle Burger",
    replied: false,
    isNew: true,
  },
  {
    id: 2,
    name: "David Chen",
    avatar: "https://i.pravatar.cc/100?img=12",
    time: "Yesterday",
    rating: 4,
    text: "The matcha was decent, but it took nearly 20 minutes to get it, and the cafe wasn't even that full. A bit disappointing with this speed of service.",
    item: "Emerald Matcha Latte",
    replied: true,
    reply:
      "Hi David, we're sorry about the delay you experienced. We'll work on improving our service speed.",
    replyTime: "22 hours ago",
  },
  {
    id: 3,
    name: "Michael Brown",
    avatar: "https://i.pravatar.cc/100?img=11",
    time: "2 days ago",
    rating: 3,
    text: "The food was good overall, but I expected a little more for the price. The atmosphere was great though.",
    item: "Crispy Calamari",
    replied: false,
  },
];

export const topItems: TopItem[] = [
  {
    id: 1,
    name: "Wagyu Truffle Burger",
    rating: 4.92,
    reviews: 142,
  },
  {
    id: 2,
    name: "Crispy Calamari",
    rating: 4.88,
    reviews: 96,
  },
  {
    id: 3,
    name: "Emerald Matcha Latte",
    rating: 4.79,
    reviews: 210,
  },
];