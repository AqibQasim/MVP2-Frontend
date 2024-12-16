"use client";
import DashboardSection from "@/components/DashboardSection";
import Table from "@/components/Table";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "./AdminJobsFormModal";
import { createStripeAccount } from "@/utils/stripeAccount";

function AdminClientsTable({ clients, totalClients, role }) {
  const path = window.location.href;

  const [jobStatus, setJobStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    content: "",
  });

  const generatePassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return password;
  };
  const password = generatePassword();

  const handleGenerateContent = () => {
    const contentTemplate = `Hey ${formData.companyName},

We’re thrilled to invite you to start using our product! Below are your credentials to get started:

Email: ${formData.email}
Password: ${password}
You can log in and explore the platform here: https://app.co-ventech.com/login.
We’re confident you’ll love the features and benefits our product offers.

If you have any questions or need assistance, feel free to reach out to us at support@co-ventech.com.

Looking forward to seeing you onboard!

Best regards,
Zubair Alam
Co-ventech
    `;
    setFormData((prevData) => ({
      ...prevData,
      content: contentTemplate,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Generate password here to ensure consistency
    const password = generatePassword();

    const signupBody = {
      name: formData.companyName,
      email: formData.email,
      password: password,
      method: "signup",
      user_role: "client",
    };

    const sendEmailBody = {
      to: formData.email,
      subject: "Inviting a client",
      text: formData.content,
    };

    try {
      // Call Signup API
      const signupResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupBody),
        },
      );

      if (!signupResponse.ok) {
        throw new Error("Failed to sign up the client.");
      }

      // Update the content with the correct password before sending the email
      const updatedContent = `Hey ${formData.companyName || "Company Name"},
  
  We’re thrilled to invite you to start using our product! Below are your credentials to get started:
  
  Email: ${formData.email || "Client email"}
  Password: ${password}
  You can log in and explore the platform here: https://app.co-ventech.com/login.
  We’re confident you’ll love the features and benefits our product offers.
  
  If you have any questions or need assistance, feel free to reach out to us at support@co-ventech.com.
  
  Looking forward to seeing you onboard!
  
  Best regards,
  Zubair Alam
  Co-ventech
  `;

      // Update the sendEmailBody with the correct content
      sendEmailBody.text = updatedContent;

      const emailResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendEmailBody),
        },
      );

      if (!emailResponse.ok) {
        throw new Error("Failed to send the invitation email.");
      }

      alert("Client invited successfully!");
      createStripeAccount(
        {
          name: formData.companyName,
          email: formData.email,
        },
        "invitation",
        "client",
        signupResponse
      );
      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Email with this account already created");
    } finally {
      setLoading(false);
    }
  };

  const handleJobStatusChange = (event) => {
    setJobStatus(event.target.value);
  };
  const filteredClients = clients
    .filter((client) => {
      if (jobStatus === "" || jobStatus === "All Jobs") {
        return true;
      } else if (jobStatus === "jobs") {
        return client.job_postings.length > 0;
      } else if (jobStatus === "nojobs") {
        return client.job_postings.length === 0;
      }
      return true;
    })
    .filter(
      (client) =>
        !searchTerm ||
        (typeof client?.name === "string" &&
          client?.name.toLowerCase().includes(searchTerm.toLowerCase())),
    );

  const router = useRouter();

  const onNext = useCallback(() => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, filteredClients.length),
    );
  }, [filteredClients.length, itemsPerPage]);

  const onPrev = useCallback(() => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  }, [itemsPerPage]);

  useEffect(() => {
    // Reset to first page whenever the filters/search change
    setStartIndex(0);
  }, [searchTerm, jobStatus]);

  const paginatedClients = filteredClients.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <>
      <DashboardSection
        className="!min-h-full"
        paragraph="These are all"
        heading="Clients"
        href={!path.includes("/admin/clients") ? `/admin/clients` : null}
        info={`Total Clients: ${totalClients || 0}`}
      >
        {role !== "dashboard" && (
          <div className="mb-4 flex justify-between">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name"
                className="mb-4 cursor-pointer rounded border border-gray-300 p-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <button
                onClick={() => {
                  setShowForm(true);
                  handleGenerateContent();
                }}
                className="hover:bg-primary-hover active:bg-primary-hover focus:ring-primary-hover rounded bg-primary px-8 py-2 text-base font-medium text-white transition-colors duration-300 ease-in-out focus:outline-none focus:ring focus:ring-offset-2"
              >
                Invite A New Client +
              </button>
            </div>
            <div>
              <select
                id="options"
                value={jobStatus}
                onChange={handleJobStatusChange}
                className="rounded border border-gray-300 p-2"
              >
                <option value="">List of Jobs </option>
                <option value="nojobs">No Jobs Posted </option>
                <option value="jobs"> Posted Jobs </option>
              </select>
            </div>
          </div>
        )}

        <Table columns="grid-cols-[1fr_1.5fr_12rem_12rem]">
          <Table.Header>
            <div className="info">Client-Name</div>
            <div className="info text-center">Email</div>
            <div className="info text-center">Total Jobs</div>
            <div className="info text-center">Total Candidates</div>
          </Table.Header>
          <Table.Body
            data={paginatedClients}
            render={(client) => (
              <Table.Row
                key={client.client_id}
                onClick={() =>
                  router.push(`/admin/clients/${client.client_id}`)
                }
              >
                <div className="cursor-pointer">{client.name}</div>
                <div className="cursor-pointer break-words text-center">
                  {client.email}
                </div>
                <div className="cursor-pointer text-center">
                  {client?.job_postings?.length}
                </div>
                <div className="cursor-pointer text-center">
                  {client?.assigned_customers?.length ?? 0}
                </div>
              </Table.Row>
            )}
          />
          {role !== "dashboard" && (
            <Table.Footer
              data={filteredClients}
              startIndex={startIndex + 1}
              endIndex={Math.min(
                startIndex + itemsPerPage,
                filteredClients.length,
              )}
              onNext={onNext}
              onPrevious={onPrev}
            />
          )}
        </Table>
        <Modal
          className="w-[50%]"
          isOpen={showForm}
          onClose={() => setShowForm(false)}
        >
          <h3 className="mb-4 text-xl font-semibold">Enter Your Details</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange} // Add this line to enable editing
                className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                rows="6"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-2 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                {loading ? "Sending" : "Send Invitation"}
              </button>
            </div>
          </form>
        </Modal>
      </DashboardSection>
    </>
  );
}

export default AdminClientsTable;
