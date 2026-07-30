import type { OrderProps } from "./types";
import { ImSpoonKnife } from "react-icons/im";
import { MdDeliveryDining } from "react-icons/md";
import { IoReceiptOutline } from "react-icons/io5";

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

    {
        id: "ORD-2847",
        icon: IoReceiptOutline,
        items: 1,
        source: "Pickup",
        status: "Pending",
        time: "12m ago"
    }
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