import { getDummyClientById, getDummyClients } from "@/lib/tempData";

// Dynamic metadata for dynamic routes
export async function generateMetadata({ params }) {
    const client = await getDummyClientById(params.clientId)
    return { title: `Client ${client.name}` };
}

// Static route generation for dynamic routes
export async function generateStaticParams() {
    const clients = await getDummyClients();
    const ids = clients.map((client) => ({ clientId: String(client.id) })); // Consistent naming
    return ids;
}

async function Page({ params }) {
    const client = await getDummyClientById(params.clientId);

    return (
        <div>
            {client.name}
        </div>
    );
}

export default Page;
