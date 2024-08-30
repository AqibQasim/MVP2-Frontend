import { notFound } from "next/navigation";

// Dummy data
export async function getDummyClients() {
    const clients = [
        {
            id: 1,
            name: "Nacho Fernandez",
            email: "nachofernandez@email.com"
        },
        {
            id: 2,
            name: "Dani Carvajal",
            email: "danicarvajal@email.com"
        }
    ];

    // Simulate network delay
    // await new Promise((res) => setTimeout(res, 1000));

    return clients;
}

export async function getDummyClientById(id) {
    try {

        const client = (await getDummyClients()).find(client => client.id === id);

        // Simulate network delay
        // await new Promise((res) => setTimeout(res, 1000));

        if (!client) {
            throw new Error(`Client with id ${id} not found`);
        }
        return client;

    } catch (error) {
        console.log(error)
        notFound()
    }
}
