import React, { useState, useEffect, use } from "react";
import {
  Users,
  Ruler,
  Calendar,
  TrendingUp,
  Clock,
  Plus,
  Eye,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Activity,
  Star,
  ArrowRight,
  Target,
  Zap,
  Crown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userRole] = useState("Admin");

  const navigate = useNavigate();

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock recent activities and data
  const todayStats = {
    measurementsTaken: 3,
    newCustomers: 2,
    pendingAppointments: 5,
    completedTasks: 8,
  };

  const recentActivities = [
    {
      id: 1,
      type: "measurement",
      message: "Measurement completed for Rajesh Kumar",
      time: "2 hours ago",
      icon: Ruler,
      color: "text-blue-600",
    },
    {
      id: 2,
      type: "customer",
      message: "New customer Priya Sharma added",
      time: "4 hours ago",
      icon: Users,
      color: "text-green-600",
    },
    {
      id: 3,
      type: "appointment",
      message: "Appointment scheduled with Amit Singh",
      time: "6 hours ago",
      icon: Calendar,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "measurement",
      message: "Measurement updated for Sunita Verma",
      time: "1 day ago",
      icon: Ruler,
      color: "text-blue-600",
    },
    {
      id: 5,
      type: "task",
      message: "Weekly report generated successfully",
      time: "1 day ago",
      icon: CheckCircle,
      color: "text-green-600",
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      customer: "Vikram Gupta",
      time: "2:00 PM",
      type: "New Measurement",
    },
    { id: 2, customer: "Meera Patel", time: "3:30 PM", type: "Follow-up" },
    {
      id: 3,
      customer: "Rohit Sharma",
      time: "5:00 PM",
      type: "Alteration Check",
    },
  ];

  const quickActions = [
    {
      title: "Take New Measurement",
      description: "Start measuring a customer",
      icon: Ruler,
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => navigate("/measurements", { state: { autoOpen: true } }),
    },
    {
      title: "Add Customer",
      description: "Register new customer",
      icon: Users,
      color: "bg-green-500 hover:bg-green-600",
      action: () => navigate("/customer", { state: { autoOpen: true } }),
    },
    {
      title: "View Reports",
      description: "Check analytics & reports",
      icon: BarChart3,
      color: "bg-purple-500 hover:bg-purple-600",
      action: () => alert("Navigate to Reports"),
    },
    {
      title: "Schedule Appointment",
      description: "Book customer appointment",
      icon: Calendar,
      color: "bg-orange-500 hover:bg-orange-600",
      action: () => alert("Navigate to Schedule"),
    },
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Crown className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-600">
                  Admin Dashboard
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Good Morning! 👋
              </h1>
              <p className="text-gray-600 mt-1">{formatDate(currentTime)}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {formatTime(currentTime)}
              </div>
              <div className="text-sm text-gray-500">Current Time</div>
            </div>
          </div>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Measurements Today
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {todayStats.measurementsTaken}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  ↗ +2 from yesterday
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Ruler className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  New Customers
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  {todayStats.newCustomers}
                </p>
                <p className="text-xs text-green-600 mt-1">↗ Great progress!</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Pending Appointments
                </h3>
                <p className="text-2xl font-bold text-orange-600">
                  {todayStats.pendingAppointments}
                </p>
                <p className="text-xs text-orange-600 mt-1">→ 3 for today</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Tasks Completed
                </h3>
                <p className="text-2xl font-bold text-purple-600">
                  {todayStats.completedTasks}
                </p>
                <p className="text-xs text-green-600 mt-1">↗ Excellent work!</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                Quick Actions
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md`}
                >
                  <div className="flex items-center space-x-3">
                    <action.icon className="h-6 w-6" />
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-sm opacity-90">
                        {action.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Today's Appointments */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                Today's Appointments
              </h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {appointment.customer}
                      </div>
                      <div className="text-sm text-gray-600">
                        {appointment.type}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-blue-600">
                    {appointment.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Activity className="h-5 w-5 text-green-500 mr-2" />
                Recent Activity
              </h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className={`p-2 rounded-full bg-gray-100`}>
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Overview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Target className="h-5 w-5 text-purple-500 mr-2" />
                This Week
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">Measurements</span>
                </div>
                <span className="font-semibold text-gray-900">18</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-600">New Customers</span>
                </div>
                <span className="font-semibold text-gray-900">7</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600">Growth Rate</span>
                </div>
                <span className="font-semibold text-green-600">+12%</span>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white text-center">
                <div className="text-2xl font-bold">85%</div>
                <div className="text-sm opacity-90">Weekly Goal Progress</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
