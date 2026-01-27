/*Q1: Pivot Table Transformation (15 mins)
Transform sales data into a pivot table format.
*/


const sales = [
  { month: 'Jan', product: 'A', amount: 100 },
  { month: 'Jan', product: 'B', amount: 150 },
  { month: 'Feb', product: 'A', amount: 120 },
  { month: 'Feb', product: 'B', amount: 180 },
  { month: 'Mar', product: 'A', amount: 110 },
  { month: 'Mar', product: 'B', amount: 160 }
];

function pivotSalesData(sales) {
  return sales.reduce((result, { month, product, amount }) => {
    if (!result[product]) {
      result[product] = { total: 0 };
    }

    result[product][month] = amount;
    result[product].total += amount;

    return result;
  }, {});
}

const output = pivotSalesData(sales);
console.log(output);
