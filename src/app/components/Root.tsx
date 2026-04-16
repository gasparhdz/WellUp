import { Outlet } from "react-router";

export default function Root() {
  return (
    <div className="min-h-dvh w-full bg-transparent">
      <Outlet />
    </div>
  );
}
