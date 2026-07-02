"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "2rem", textAlign: "center" }}>
        <h1>Something went wrong</h1>
        <p style={{ color: "#666", marginTop: "0.5rem" }}>
          BrainStack ran into an error. Please refresh or try again.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem 1.5rem",
            background: "#3893F4",
            color: "#fff",
            border: "none",
            borderRadius: "9999px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
