const ChefDashboard = () => {
    const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);

    return (
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold font-['Montserrat']">Chef Dashboard</h1>
        <p>Welcome to the chef dashboard!</p>
      </div>
    );
  };
  
  export default ChefDashboard;