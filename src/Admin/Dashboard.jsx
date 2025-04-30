import { DollarSign, CarFront, Users, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "₹1,245,000",
    icon: <DollarSign className="w-5 h-5 text-orange-500" />,
    bg: "bg-orange-100",
    change: "+24%",
  },
  {
    title: "Total Bookings",
    value: "842",
    icon: <CarFront className="w-5 h-5 text-blue-500" />,
    bg: "bg-blue-100",
    change: "+18%",
  },
  {
    title: "Total Users",
    value: "1,253",
    icon: <Users className="w-5 h-5 text-green-500" />,
    bg: "bg-green-100",
    change: "+12%",
  },
  {
    title: "Conversion Rate",
    value: "68%",
    icon: <TrendingUp className="w-5 h-5 text-purple-500" />,
    bg: "bg-purple-100",
    change: "+9%",
  },
]

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-auto md:mt-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <span className="text-gray-500 text-sm">Last updated: 4/17/2025</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-4 md:p-5 flex flex-col gap-3 md:gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-gray-500 text-sm">{stat.title}</h4>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`rounded-full p-3 ${stat.bg}`}>{stat.icon}</div>
            </div>
            <p className="text-sm text-green-600">
              ↑ {stat.change} <span className="text-gray-500">from last month</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
