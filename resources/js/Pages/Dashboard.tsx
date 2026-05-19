import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { deleteJson, fetchJson, patchJson, postJson } from '@/lib/api';
import { DashboardResponse, OrderListItem, OrderResponse, ProductListItem, ProductResponse, SellerListItem, SellerResponse, TicketListItem, TicketResponse } from '@/types';
import { Head } from '@inertiajs/react';
import { FormEvent, useEffect, useMemo, useState } from 'react';

export default function Dashboard() {
    const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
    const [products, setProducts] = useState<ProductListItem[]>([]);
    const [orders, setOrders] = useState<OrderListItem[]>([]);
    const [tickets, setTickets] = useState<TicketListItem[]>([]);
    const [sellers, setSellers] = useState<SellerListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [ticketForm, setTicketForm] = useState({
        subject: '',
        message: '',
        priority: 'medium',
    });
    const [productForm, setProductForm] = useState({
        name: '',
        slug: '',
        base_price: '',
        currency_code: 'MAD',
        condition: 'new',
        description: '',
    });
    const [notificationForm, setNotificationForm] = useState({
        user_id: '',
        type: '',
        title: '',
        body: '',
    });

    const load = async () => {
        setLoading(true);

        try {
            const requests = [
                fetchJson<DashboardResponse>('/api/dashboard'),
                fetchJson<ProductResponse>('/api/products'),
                fetchJson<OrderResponse>('/api/orders'),
                fetchJson<TicketResponse>('/api/tickets'),
            ] as const;

            const [dashboardResponse, productsResponse, ordersResponse, ticketsResponse] = await Promise.all(requests);
            setDashboard(dashboardResponse);
            setProducts(productsResponse.data);
            setOrders(ordersResponse.data);
            setTickets(ticketsResponse.data);

            if (['admin', 'ceo', 'manager'].includes(dashboardResponse.role)) {
                const sellersResponse = await fetchJson<SellerResponse>('/api/sellers');
                setSellers(sellersResponse.data);
            } else {
                setSellers([]);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const toneClasses = useMemo(
        () => ({
            primary: 'bg-slate-900 text-white',
            neutral: 'bg-white text-slate-900',
            success: 'bg-emerald-500 text-white',
            warning: 'bg-amber-400 text-slate-900',
        }),
        [],
    );

    const submitTicket = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await postJson('/api/tickets', ticketForm);
        setTicketForm({ subject: '', message: '', priority: 'medium' });
        setMessage('Ticket created successfully.');
        await load();
    };

    const submitProduct = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await postJson('/api/products', {
            ...productForm,
            base_price: Number(productForm.base_price),
        });
        setProductForm({
            name: '',
            slug: '',
            base_price: '',
            currency_code: 'MAD',
            condition: 'new',
            description: '',
        });
        setMessage('Product created successfully.');
        await load();
    };

    const updateOrderStatus = async (orderId: number, status: string) => {
        await patchJson(`/api/orders/${orderId}`, { status });
        setMessage(`Order #${orderId} updated.`);
        await load();
    };

    const resolveTicket = async (ticketId: number) => {
        await patchJson(`/api/tickets/${ticketId}`, { status: 'resolved', message: 'Resolved from dashboard.' });
        setMessage(`Ticket #${ticketId} resolved.`);
        await load();
    };

    const toggleSeller = async (seller: SellerListItem) => {
        await patchJson(`/api/sellers/${seller.id}`, {
            is_active: !seller.is_active,
            plan: seller.plan ?? 'free',
            is_verified: seller.is_verified,
        });
        setMessage(`Seller ${seller.name} updated.`);
        await load();
    };

    const promotePlan = async (seller: SellerListItem, plan: 'free' | 'pro' | 'premium') => {
        await patchJson(`/api/sellers/${seller.id}`, {
            is_active: seller.is_active,
            plan,
            is_verified: seller.is_verified,
        });
        setMessage(`${seller.name} moved to ${plan}.`);
        await load();
    };

    const sendNotification = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await postJson('/api/notifications', {
            user_id: Number(notificationForm.user_id),
            type: notificationForm.type,
            title: notificationForm.title,
            body: notificationForm.body,
        });
        setNotificationForm({ user_id: '', type: '', title: '', body: '' });
        setMessage('Notification sent.');
    };

    const removeProduct = async (productId: number) => {
        await deleteJson(`/api/products/${productId}`);
        setMessage(`Product #${productId} deleted.`);
        await load();
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Dashboard
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Role-aware operational view connected to REST endpoints.
                    </p>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="bg-slate-100 py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {loading && (
                        <div className="rounded-3xl bg-white p-8 shadow-sm">
                            <p className="text-sm text-slate-500">Loading dashboard data...</p>
                        </div>
                    )}

                    {!loading && dashboard && (
                        <div className="space-y-8">
                            {message && (
                                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                                    {message}
                                </div>
                            )}
                            <section className="grid gap-4 md:grid-cols-4">
                                {dashboard.metrics.map((metric) => (
                                    <div
                                        key={metric.label}
                                        className={`rounded-3xl p-5 shadow-sm ${toneClasses[metric.tone]}`}
                                    >
                                        <p className="text-sm opacity-80">{metric.label}</p>
                                        <p className="mt-3 text-3xl font-semibold">{metric.value}</p>
                                    </div>
                                ))}
                            </section>

                            <section className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
                                <div className="rounded-3xl bg-white p-6 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">Role</p>
                                            <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                                                {dashboard.role.toUpperCase()} dashboard
                                            </h3>
                                        </div>
                                        {dashboard.plan && (
                                            <span className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white">
                                                {dashboard.plan.toUpperCase()} plan
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                                        {dashboard.actions.map((action) => (
                                            <div key={action} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                                                {action}
                                            </div>
                                        ))}
                                    </div>

                                    {dashboard.features.length > 0 && (
                                        <div className="mt-6">
                                            <p className="text-sm font-semibold text-slate-900">Plan features</p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {dashboard.features.map((feature) => (
                                                    <span key={feature} className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800">
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="rounded-3xl bg-white p-6 shadow-sm">
                                    <p className="text-sm font-semibold text-slate-900">Open support ticket</p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Buyers and sellers can open tickets. Support users see assigned work.
                                    </p>

                                    <form onSubmit={submitTicket} className="mt-5 space-y-3">
                                        <input
                                            type="text"
                                            value={ticketForm.subject}
                                            onChange={(event) => setTicketForm((current) => ({ ...current, subject: event.target.value }))}
                                            placeholder="Subject"
                                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                                        />
                                        <select
                                            value={ticketForm.priority}
                                            onChange={(event) => setTicketForm((current) => ({ ...current, priority: event.target.value }))}
                                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                        <textarea
                                            value={ticketForm.message}
                                            onChange={(event) => setTicketForm((current) => ({ ...current, message: event.target.value }))}
                                            placeholder="Describe the issue"
                                            className="h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                                        />
                                        <button type="submit" className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white">
                                            Create ticket
                                        </button>
                                    </form>
                                </div>
                            </section>

                            <section className="grid gap-6 xl:grid-cols-3">
                                <DataPanel
                                    title="Products API"
                                    subtitle="Latest products from REST endpoint"
                                    items={products.map((product) => `${product.name} - ${product.price} ${product.currency_code} - ${product.status}`)}
                                />
                                <DataPanel
                                    title="Orders API"
                                    subtitle="Recent order activity"
                                    items={orders.map((order) => `#${order.id} - ${order.status} - ${order.total} ${order.currency_code}`)}
                                />
                                <DataPanel
                                    title="Tickets API"
                                    subtitle="Support queue and customer issues"
                                    items={tickets.map((ticket) => `#${ticket.id} - ${ticket.subject} - ${ticket.status}`)}
                                />
                            </section>

                            {(dashboard.role === 'seller' || dashboard.role === 'admin' || dashboard.role === 'manager') && (
                                <section className="grid gap-6 lg:grid-cols-[1.1fr,1.4fr]">
                                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                                        <p className="text-lg font-semibold text-slate-900">Create product</p>
                                        <form onSubmit={submitProduct} className="mt-4 space-y-3">
                                            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Name" value={productForm.name} onChange={(event) => setProductForm((current) => ({ ...current, name: event.target.value }))} />
                                            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Slug" value={productForm.slug} onChange={(event) => setProductForm((current) => ({ ...current, slug: event.target.value }))} />
                                            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Price" value={productForm.base_price} onChange={(event) => setProductForm((current) => ({ ...current, base_price: event.target.value }))} />
                                            <textarea className="h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Description" value={productForm.description} onChange={(event) => setProductForm((current) => ({ ...current, description: event.target.value }))} />
                                            <button type="submit" className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white">Add product</button>
                                        </form>
                                    </div>

                                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                                        <p className="text-lg font-semibold text-slate-900">Manage products</p>
                                        <div className="mt-4 space-y-3">
                                            {products.map((product) => (
                                                <div key={product.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                                                    <div>
                                                        <p className="font-medium text-slate-900">{product.name}</p>
                                                        <p className="text-slate-500">{product.price} {product.currency_code} · {product.status}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button type="button" onClick={() => removeProduct(product.id)} className="rounded-xl border border-rose-200 px-3 py-2 text-rose-700">Delete</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {(dashboard.role === 'admin' || dashboard.role === 'ceo' || dashboard.role === 'manager') && (
                                <section className="grid gap-6 lg:grid-cols-2">
                                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                                        <p className="text-lg font-semibold text-slate-900">Manage sellers</p>
                                        <div className="mt-4 space-y-3">
                                            {sellers.map((seller) => (
                                                <div key={seller.id} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                                                    <div className="flex items-center justify-between gap-4">
                                                        <div>
                                                            <p className="font-medium text-slate-900">{seller.name}</p>
                                                            <p className="text-slate-500">{seller.store} · {seller.plan?.toUpperCase()} · Sales {seller.total_sales}</p>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            <button type="button" onClick={() => toggleSeller(seller)} className="rounded-xl border border-slate-200 px-3 py-2">
                                                                {seller.is_active ? 'Disable' : 'Enable'}
                                                            </button>
                                                            <button type="button" onClick={() => promotePlan(seller, 'free')} className="rounded-xl border border-slate-200 px-3 py-2">Free</button>
                                                            <button type="button" onClick={() => promotePlan(seller, 'pro')} className="rounded-xl border border-slate-200 px-3 py-2">Pro</button>
                                                            <button type="button" onClick={() => promotePlan(seller, 'premium')} className="rounded-xl border border-slate-200 px-3 py-2">Premium</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                                        <p className="text-lg font-semibold text-slate-900">Send notification</p>
                                        <form onSubmit={sendNotification} className="mt-4 space-y-3">
                                            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="User ID" value={notificationForm.user_id} onChange={(event) => setNotificationForm((current) => ({ ...current, user_id: event.target.value }))} />
                                            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Type" value={notificationForm.type} onChange={(event) => setNotificationForm((current) => ({ ...current, type: event.target.value }))} />
                                            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Title" value={notificationForm.title} onChange={(event) => setNotificationForm((current) => ({ ...current, title: event.target.value }))} />
                                            <textarea className="h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Body" value={notificationForm.body} onChange={(event) => setNotificationForm((current) => ({ ...current, body: event.target.value }))} />
                                            <button type="submit" className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white">Send</button>
                                        </form>
                                    </div>
                                </section>
                            )}

                            {(dashboard.role === 'admin' || dashboard.role === 'ceo' || dashboard.role === 'manager' || dashboard.role === 'support' || dashboard.role === 'seller') && (
                                <section className="grid gap-6 lg:grid-cols-2">
                                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                                        <p className="text-lg font-semibold text-slate-900">Manage orders</p>
                                        <div className="mt-4 space-y-3">
                                            {orders.map((order) => (
                                                <div key={order.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                                                    <div>
                                                        <p className="font-medium text-slate-900">Order #{order.id}</p>
                                                        <p className="text-slate-500">{order.status} · {order.total} {order.currency_code}</p>
                                                    </div>
                                                    <select
                                                        value={order.status}
                                                        onChange={(event) => updateOrderStatus(order.id, event.target.value)}
                                                        className="rounded-xl border border-slate-200 px-3 py-2"
                                                    >
                                                        {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                                                            <option key={status} value={status}>{status}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                                        <p className="text-lg font-semibold text-slate-900">Manage tickets</p>
                                        <div className="mt-4 space-y-3">
                                            {tickets.map((ticket) => (
                                                <div key={ticket.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                                                    <div>
                                                        <p className="font-medium text-slate-900">{ticket.subject}</p>
                                                        <p className="text-slate-500">{ticket.status} · {ticket.priority}</p>
                                                    </div>
                                                    {ticket.status !== 'resolved' && (
                                                        <button type="button" onClick={() => resolveTicket(ticket.id)} className="rounded-xl border border-emerald-200 px-3 py-2 text-emerald-700">
                                                            Resolve
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function DataPanel({ title, subtitle, items }: { title: string; subtitle: string; items: string[] }) {
    return (
        <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-lg font-semibold text-slate-900">{title}</p>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>

            <div className="mt-5 space-y-3">
                {items.length === 0 && <p className="text-sm text-slate-500">No records.</p>}
                {items.map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}
