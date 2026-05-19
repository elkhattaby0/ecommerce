export interface User {
    id: number;
    first_name: string;
    last_name: string;
    name: string;
    email: string;
    email_verified_at?: string;
    role?: string | null;
    plan?: string | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User | null;
    };
};

export type DashboardMetric = {
    label: string;
    value: string | number;
    tone: 'primary' | 'neutral' | 'success' | 'warning';
}

export type DashboardResponse = {
    role: string;
    plan: string | null;
    permissions: string[];
    metrics: DashboardMetric[];
    actions: string[];
    features: string[];
}

export type ApiNotification = {
    id: number;
    type: string;
    title: string;
    body?: string | null;
    is_read: boolean;
    read_at?: string | null;
    created_at?: string | null;
}

export type NotificationResponse = {
    data: ApiNotification[];
    unread_count: number;
}

export type ProductListItem = {
    id: number;
    name: string;
    slug: string;
    price: string;
    currency_code: string;
    store?: string | null;
    plan?: string | null;
    category?: string | null;
    status: string;
}

export type ProductResponse = {
    data: ProductListItem[];
}

export type SellerListItem = {
    id: number;
    name: string;
    email: string;
    plan?: string | null;
    store?: string | null;
    is_active: boolean;
    is_verified: boolean;
    rating?: string | null;
    total_sales: number;
}

export type SellerResponse = {
    data: SellerListItem[];
}

export type OrderListItem = {
    id: number;
    customer?: string | null;
    store?: string | null;
    status: string;
    total: string;
    currency_code: string;
    created_at?: string | null;
}

export type OrderResponse = {
    data: OrderListItem[];
}

export type TicketListItem = {
    id: number;
    subject: string;
    status: string;
    priority: string;
    customer?: string | null;
    assignee?: string | null;
    last_message_at?: string | null;
}

export type TicketResponse = {
    data: TicketListItem[];
}


export type Product = {
    id: number
    slug?: string
    image: string
    flags: string[]
    title: string
    info: string[]
    variant?: string
    trust?: string
    colorDots?: string[]
    nbrAvis: number
    oldPrice?: number
    price: number
    currency: string
}
