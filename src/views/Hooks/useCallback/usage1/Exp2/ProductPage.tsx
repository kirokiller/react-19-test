import ShippingForm from "./ShippingForm.js";

export default function ProductPage({
  productId,
  referrerId,
  theme,
}: {
  productId: number;
  referrerId: string;
  theme: string;
}) {
  const handleSubmit = (orderDetails: any) => {
    post("/product/" + productId + "/buy", {
      referrerId,
      orderDetails,
    });
  };

  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}

function post(url: string, data: any) {
  // Imagine this sends a request...
  console.log("POST /" + url);
  console.log(data);
}
