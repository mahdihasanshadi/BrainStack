/** Normalize BD numbers for wa.me links (8801XXXXXXXXX). */
export function toWhatsAppDigits(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("880")) return digits;
  if (digits.startsWith("0")) return `88${digits}`;
  if (digits.startsWith("1") && digits.length === 10) return `88${digits}`;
  return digits;
}

export function buildWhatsAppPaymentUrl(params: {
  whatsappNumber: string;
  courseTitle: string;
  amountBdt: number;
  paymentMethod: "bkash" | "nagad";
  parentName: string;
  phone: string;
  email: string;
  sessionId: string;
  merchantNumber: string;
}): string {
  const message = [
    "Assalamualaikum BrainStack team! 👋",
    "",
    "Ami course payment confirm korte chai (kotha diye):",
    `Course: ${params.courseTitle}`,
    `Amount: ৳${params.amountBdt.toLocaleString("en-BD")}`,
    `Method: ${params.paymentMethod === "bkash" ? "bKash" : "Nagad"}`,
    `Send money to: ${params.merchantNumber}`,
    "",
    `Parent: ${params.parentName}`,
    `Phone: ${params.phone}`,
    `Email: ${params.email}`,
    `Reference: ${params.sessionId}`,
    "",
    "Transaction ID: [আপনার Trx ID লিখুন]",
    "(Payment screenshot attach korben)",
  ].join("\n");

  const waNumber = toWhatsAppDigits(params.whatsappNumber);
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
}
