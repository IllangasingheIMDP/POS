import Sidebar from "../components/sidebar";
const ChefDashboard = () => {
    return (
      <div className="flex h-screen bg-neutral-900 text-white overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold font-['Montserrat']">Chef Dashboard</h1>
        <p>Welcome to the chef dashboard!</p>
        </div>
      </div>
    );
  };
  
  export default ChefDashboard;