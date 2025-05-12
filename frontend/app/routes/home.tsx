import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "POS System" },
    { name: "description", content: "Point of Sale System" },
  ];
}

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Welcome to POS System</h1>
    </div>
  );
}
