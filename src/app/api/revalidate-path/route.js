import { revalidatePath } from "next/cache";

export async function POST(request) {
  const { path } = await request.json();

  try {
    revalidatePath(path);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to revalidate" }), {
      status: 500,
    });
  }
}
