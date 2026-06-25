export type DependencyStatus = "up" | "down";

export interface HealthResponse {
  status: "ok" | "error";
  db: DependencyStatus;
  redis: DependencyStatus;
}
