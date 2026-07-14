const DEFAULT_BRANCHES = [
  { id: 'NY', name: 'New York HQ', region: 'North America', revenue: 4.2, employees: 340, inventory: 89, status: 'Optimal', color: '#10B981', icon: '🗽', revTrend: '+18%', orders: 1240, address: '5th Ave, New York, NY 10001', country: 'USA', state: 'NY', city: 'New York', manager: 'Sarah Jenkins', contact: '+1 (555) 019-2834', email: 'ny@businessbrain.com', mapLeft: '22%', mapTop: '38%' },
  { id: 'LDN', name: 'London Hub', region: 'Europe', revenue: 2.8, employees: 185, inventory: 92, status: 'Optimal', color: '#10B981', icon: '🏛', revTrend: '+12%', orders: 820, address: '12 Pall Mall, London SW1Y 5EA', country: 'UK', state: 'Greater London', city: 'London', manager: 'David Smith', contact: '+44 20 7946 0958', email: 'ldn@businessbrain.com', mapLeft: '44%', mapTop: '28%' },
  { id: 'SGP', name: 'Singapore', region: 'Asia Pacific', revenue: 3.1, employees: 210, inventory: 45, status: 'Warning', color: '#F59E0B', icon: '🌏', revTrend: '+8%', orders: 950, address: '8 Marina Blvd, Singapore 018981', country: 'Singapore', state: 'Central', city: 'Singapore', manager: 'Lee Wei', contact: '+65 6789 0123', email: 'sgp@businessbrain.com', mapLeft: '74%', mapTop: '58%' },
  { id: 'TKY', name: 'Tokyo Operations', region: 'Asia Pacific', revenue: 1.9, employees: 120, inventory: 98, status: 'Optimal', color: '#10B981', icon: '🗼', revTrend: '+24%', orders: 610, address: '4-Chome Shiba-Koen, Minato City, Tokyo 105-0011', country: 'Japan', state: 'Tokyo', city: 'Tokyo', manager: 'Yuki Sato', contact: '+81 3 5555 0142', email: 'tky@businessbrain.com', mapLeft: '82%', mapTop: '35%' },
];

const DEFAULT_PRODUCTS = [
  { sku: 'SKU-1042', name: 'Circuit Board Pro X', stock: 1240, minStock: 200, purchasePrice: 45, sellingPrice: 89, warehouse: 'Warehouse A', category: 'Electronics', brand: 'TechParts', supplier: 'GlobalTech Ltd.', barcode: '742696010429', status: 'Optimal', image: '' },
  { sku: 'SKU-2038', name: 'Packaging Unit B-200', stock: 85, minStock: 100, purchasePrice: 12, sellingPrice: 25, warehouse: 'Warehouse B', category: 'Packaging', brand: 'BoxCo', supplier: 'BoxCo Supply', barcode: '742696020381', status: 'Low', image: '' },
  { sku: 'SKU-4411', name: 'Raw Steel Block 5T', stock: 320, minStock: 50, purchasePrice: 450, sellingPrice: 890, warehouse: 'Warehouse C', category: 'Raw Materials', brand: 'MetalCorp', supplier: 'MetalCorp Inc.', barcode: '742696044110', status: 'Optimal', image: '' },
];

export const mockDb = {
  getBranches: () => {
    const data = localStorage.getItem('bb_branches');
    if (!data) {
      localStorage.setItem('bb_branches', JSON.stringify(DEFAULT_BRANCHES));
      return DEFAULT_BRANCHES;
    }
    return JSON.parse(data);
  },
  
  saveBranch: (branch) => {
    const branches = mockDb.getBranches();
    const newId = branch.id || branch.name.slice(0, 3).toUpperCase() + Math.floor(Math.random() * 100);
    const newBranch = {
      ...branch,
      id: newId,
      revenue: parseFloat((Math.random() * 2 + 1).toFixed(1)),
      orders: Math.floor(Math.random() * 500 + 200),
      inventory: Math.floor(Math.random() * 40 + 50),
      status: 'Optimal',
      color: '#10B981',
      icon: '🏢',
      revTrend: `+${Math.floor(Math.random() * 15 + 5)}%`,
      mapLeft: Math.floor(Math.random() * 60 + 20) + '%',
      mapTop: Math.floor(Math.random() * 40 + 20) + '%',
    };
    branches.push(newBranch);
    localStorage.setItem('bb_branches', JSON.stringify(branches));
    return newBranch;
  },

  getProducts: () => {
    const data = localStorage.getItem('bb_products');
    if (!data) {
      localStorage.setItem('bb_products', JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
    return JSON.parse(data);
  },

  saveProduct: (product) => {
    const products = mockDb.getProducts();
    const newProduct = {
      ...product,
      stock: parseInt(product.quantity || product.stock || 0),
      minStock: parseInt(product.minStock || 0),
      purchasePrice: parseFloat(product.purchasePrice || 0),
      sellingPrice: parseFloat(product.sellingPrice || 0),
      status: parseInt(product.quantity || product.stock || 0) <= parseInt(product.minStock || 0) ? 'Low' : 'Optimal',
    };
    products.push(newProduct);
    localStorage.setItem('bb_products', JSON.stringify(products));
    return newProduct;
  },

  updateProductStock: (sku, qtyToAdd) => {
    const products = mockDb.getProducts();
    const updated = products.map(p => {
      if (p.sku.toUpperCase() === sku.toUpperCase()) {
        const newStock = p.stock + parseInt(qtyToAdd);
        return {
          ...p,
          stock: newStock,
          status: newStock <= p.minStock ? 'Low' : 'Optimal'
        };
      }
      return p;
    });
    localStorage.setItem('bb_products', JSON.stringify(updated));
    return updated.find(p => p.sku.toUpperCase() === sku.toUpperCase());
  },

  getScanHistory: () => {
    const data = localStorage.getItem('bb_scan_history');
    return data ? JSON.parse(data) : [];
  },

  addScanHistory: (sku, productName) => {
    const history = mockDb.getScanHistory();
    const newScan = {
      sku,
      productName,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString()
    };
    history.unshift(newScan);
    localStorage.setItem('bb_scan_history', JSON.stringify(history.slice(0, 10))); // keep last 10
    return history;
  }
};
