const btn = document.getElementById("fetch-data-btn");
const output = document.getElementById("output");

// Function to create and display a table
function displayTable(data, title) {
  const table = document.createElement("table");
  table.border = "1";
  
  // Add title
  const caption = document.createElement("caption");
  caption.textContent = title;
  table.appendChild(caption);
  
  // Create table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  
  // Get keys from first item for headers
  if (data.length > 0) {
    const keys = Object.keys(data[0]);
    keys.forEach(key => {
      const th = document.createElement("th");
      th.textContent = key;
      headerRow.appendChild(th);
    });
  }
  
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  // Create table body
  const tbody = document.createElement("tbody");
  data.forEach(item => {
    const row = document.createElement("tr");
    Object.values(item).forEach(value => {
      const td = document.createElement("td");
      td.textContent = typeof value === 'object' ? JSON.stringify(value) : value;
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });
  
  table.appendChild(tbody);
  output.appendChild(table);
}

// Promise API 1 - Fetch Posts
function PromiseAPI1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/posts")
        .then(response => response.json())
        .then(data => {
          displayTable(data.posts, "Posts");
          resolve(true);
        })
        .catch(error => reject(error));
    }, 1000);
  });
}

// Promise API 2 - Fetch Products
function PromiseAPI2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/products")
        .then(response => response.json())
        .then(data => {
          displayTable(data.products, "Products");
          resolve(true);
        })
        .catch(error => reject(error));
    }, 2000);
  });
}

// Promise API 3 - Fetch Todos
function PromiseAPI3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/todos")
        .then(response => response.json())
        .then(data => {
          displayTable(data.todos, "Todos");
          resolve(true);
        })
        .catch(error => reject(error));
    }, 3000);
  });
}

// Handle button click with promise chaining using .then()
function fetchDataWithPromiseChain() {
  output.innerHTML = "<p>Loading data...</p>";
  
  PromiseAPI1()
    .then(data1 => {
      if (data1) {
        return PromiseAPI2();
      }
    })
    .then(data2 => {
      if (data2) {
        return PromiseAPI3();
      }
    })
    .then(data3 => {
      if (data3) {
        console.log("All data fetched successfully!");
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      output.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    });
}

// Alternative: Handle button click with async/await
async function fetchDataWithAsyncAwait() {
  output.innerHTML = "<p>Loading data...</p>";
  
  try {
    const data1 = await PromiseAPI1();
    
    if (data1) {
      const data2 = await PromiseAPI2();
      
      if (data2) {
        const data3 = await PromiseAPI3();
        
        if (data3) {
          console.log("All data fetched successfully!");
        }
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    output.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
}

btn.addEventListener("click", fetchDataWithPromiseChain);