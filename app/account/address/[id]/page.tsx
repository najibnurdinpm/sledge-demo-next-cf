import AddForm from "components/account/addForm";
import { getCustomer } from "lib/shopify";
import { Metadata } from "next";
import { cookies, headers } from "next/headers";

export const metadata: Metadata = {
  title: "Edit Address",
};

export default async function Page() {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";

  const getSession: any = cookies().get("session")?.value;

  const addressId = pathname?.split("/")[3];

  const { data }: any = await getCustomer(getSession);

  const { customer } = data;
  const defaultAddress = customer.defaultAddress;

  const normalizedAddress = decodeURIComponent(addressId ?? "").split("?")[0];

  const { node } = customer.addresses.edges.find((address: any) =>
    address.node.id!.startsWith(normalizedAddress),
  );

  const address = node;

  return (
    <div className="max-w-[1170px] mx-auto px-5 lg:px-20 xl:px-0 pt-[1.9rem]">
      <h3 className="mt-4 mb-6">Edit address</h3>
      <AddForm
        address={address}
        addressId={addressId}
        defaultAddress={defaultAddress}
        customerAccessToken={getSession}
        id={node.id}
      />
    </div>
  );
}
