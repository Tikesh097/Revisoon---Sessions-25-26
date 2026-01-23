// The Scenario: HR Analytics Dashboard

// The Dataset:
const employees = [
  { id: 1, name: "Alice", department: "Engineering", salary: 120000, experience: 5, rating: 4.8 },
  { id: 2, name: "Bob", department: "Engineering", salary: 95000, experience: 2, rating: 3.9 },
  { id: 3, name: "Charlie", department: "Sales", salary: 80000, experience: 4, rating: 4.5 },
  { id: 4, name: "Diana", department: "HR", salary: 70000, experience: 1, rating: 3.2 },
  { id: 5, name: "Evan", department: "Engineering", salary: 135000, experience: 7, rating: 4.9 },
  { id: 6, name: "Fiona", department: "Marketing", salary: 90000, experience: 3, rating: 4.1 },
  { id: 7, name: "George", department: "Sales", salary: 65000, experience: 1, rating: 3.5 },
  { id: 8, name: "Hannah", department: "Engineering", salary: 110000, experience: 4, rating: 4.6 },
  { id: 9, name: "Ian", department: "Marketing", salary: 105000, experience: 6, rating: 4.7 },
  { id: 10, name: "Jenny", department: "HR", salary: 72000, experience: 3, rating: 3.8 },
  { id: 11, name: "Kevin", department: "Sales", salary: 125000, experience: 8, rating: 4.2 },
  { id: 12, name: "Liam", department: "Engineering", salary: 98000, experience: 3, rating: 4.0 },
  { id: 13, name: "Mia", department: "Design", salary: 85000, experience: 2, rating: 4.3 },
  { id: 14, name: "Noah", department: "Design", salary: 115000, experience: 9, rating: 4.8 },
  { id: 15, name: "Olivia", department: "Marketing", salary: 78000, experience: 2, rating: 3.9 }
];

//The "VIP List" (Chaining: Filter + Map)
const vipList = employees
  .filter(emp => emp.rating >= 4.5)
  .map(emp => emp.name);

console.log(vipList);

//Budget Planning (Chaining: Filter + Reduce)
const engineeringBudget = employees
  .filter(emp => emp.department === "Engineering")
  .reduce((total, emp) => total + emp.salary, 0);

console.log(engineeringBudget);

//Experience Ranking (Sort)
const experienceRanking = [...employees].sort((a, b) => {
  if (b.experience !== a.experience) {
    return b.experience - a.experience;
  }
  return b.salary - a.salary;
});

console.log(experienceRanking);

// Department Census (Aggregation: Reduce)
const departmentCount = employees.reduce((acc, emp) => {
  acc[emp.department] = (acc[emp.department] || 0) + 1;
  return acc;
}, {});

console.log(departmentCount);

//  The "Boss Level" (Complex Aggregation
