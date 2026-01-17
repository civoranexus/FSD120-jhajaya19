export const dummyVisitors = [
  {
    _id: "visitor001",
    visitorName: "John Carter",
    visitorPhone: "9876543220",
    purpose: "personal",
    expectedEntryTime: new Date("2024-12-10T14:00:00"),
    status: "approved",
    unitId: "unit001",
    actualEntryTime: new Date("2024-12-10T14:15:00"),
    actualExitTime: null,
    notes: "Family friend visiting",
  },
  {
    _id: "visitor002",
    visitorName: "Amazon Delivery",
    visitorPhone: "9876543221",
    purpose: "delivery",
    expectedEntryTime: new Date("2024-12-10T11:00:00"),
    status: "checked_out",
    unitId: "unit002",
    actualEntryTime: new Date("2024-12-10T11:10:00"),
    actualExitTime: new Date("2024-12-10T11:25:00"),
    notes: "Package delivered - Amazon",
  },
  {
    _id: "visitor003",
    visitorName: "Mike Plumber",
    visitorPhone: "9876543222",
    purpose: "service",
    expectedEntryTime: new Date("2024-12-11T09:00:00"),
    status: "pending_approval",
    unitId: "unit001",
    notes: "Plumbing repair in kitchen",
  }
];

export const dummyMaintenance = [
  {
    _id: "maint001",
    title: "Leaking kitchen faucet",
    description: "Kitchen sink faucet is leaking continuously, need repair",
    category: "plumbing",
    priority: "high",
    status: "completed",
    userId: "user001", // Rajesh's request
    unitId: "unit001",
    assignedTo: "user003",
    createdAt: new Date("2024-12-04T10:15:00"),
    updatedAt: new Date("2024-12-05T16:30:00")
  },
  {
    _id: "maint002",
    title: "AC not cooling",
    description: "Bedroom AC blowing air but not cooling properly",
    category: "electrical",
    priority: "medium",
    status: "in_progress",
    userId: "user002", // Priya's request
    unitId: "unit002",
    assignedTo: "user003",
    createdAt: new Date("2024-12-08T14:20:00"),
    updatedAt: new Date("2024-12-09T09:00:00")
  },
  {
    _id: "maint003",
    title: "Broken balcony light",
    description: "Balcony light fixture broken, needs replacement",
    category: "electrical",
    priority: "low",
    status: "pending",
    userId: "user001", // Rajesh's another request
    unitId: "unit001",
    assignedTo: null,
    createdAt: new Date("2024-12-10T11:00:00"),
    updatedAt: new Date("2024-12-10T11:00:00")
  }
];

export const dummyBills = [
  {
    _id: "bill001",
    userId: "user001", // Rajesh's bill
    unitId: "unit001",
    billType: "maintenance",
    amount: 2500,
    dueDate: new Date("2024-12-10"),
    status: "pending",
    paidDate: null,
    description: "December 2024 Maintenance Charges",
    periodMonth: "Dec",
    periodYear: 2024,
    createdAt: new Date("2024-12-01"),
  },
  {
    _id: "bill002",
    userId: "user002", // Priya's bill
    unitId: "unit002",
    billType: "maintenance",
    amount: 3200,
    dueDate: new Date("2024-12-10"),
    status: "paid",
    paidDate: new Date("2024-12-05"),
    transactionId: "TXN123456",
    description: "December 2024 Maintenance Charges",
    periodMonth: "Dec",
    periodYear: 2024,
    createdAt: new Date("2024-12-01"),
  },
  {
    _id: "bill003",
    userId: "user001", // Rajesh's overdue bill
    unitId: "unit001",
    billType: "water",
    amount: 850,
    dueDate: new Date("2024-11-25"),
    status: "overdue",
    paidDate: null,
    description: "November 2024 Water Bill",
    periodMonth: "Nov",
    periodYear: 2024,
    createdAt: new Date("2024-11-15"),
  }
];

const dummyAnnouncements = [
  {
    _id: "announce001",
    title: "Diwali Celebrations",
    content: "Join us for Diwali celebrations on 25th October at Club House. Snacks and drinks will be served.",
    category: "event",
    priority: "medium",
    postedBy: "user002", // Posted by admin Priya
    isActive: true,
    eventDate: new Date("2024-10-25T18:00:00"),
    createdAt: new Date("2024-10-20T10:00:00"),
    updatedAt: new Date("2024-10-20T10:00:00")
  },
  {
    _id: "announce002",
    title: "Water Supply Interruption",
    content: "Water supply will be interrupted on 15th December from 9 AM to 5 PM for maintenance work. Please store water accordingly.",
    category: "maintenance",
    priority: "urgent",
    postedBy: "user002", // Posted by admin Priya
    isActive: true,
    createdAt: new Date("2024-12-12T09:00:00"),
    updatedAt: new Date("2024-12-12T09:00:00")
  },
  {
    _id: "announce003",
    title: "December Maintenance Due",
    content: "December maintenance fees are due by 10th December. Please pay online through the portal or at the office.",
    category: "payment",
    priority: "high",
    postedBy: "user002", // Posted by admin Priya
    isActive: true,
    createdAt: new Date("2024-12-01T10:00:00"),
    updatedAt: new Date("2024-12-01T10:00:00")
  }
];