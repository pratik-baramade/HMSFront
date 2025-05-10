import React, { useState, useEffect } from 'react';

import BillingService from '../BillingService';
import Swal from 'sweetalert2';

const TotalAmount = () => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    BillingService.getAllbills().then((res) => {
      const total = res.data.reduce((sum, bill) => sum + bill.total_amount, 0);
      setTotalAmount(total);

      Swal.fire({
        title: 'Total Bill Amount in your Account',
        text: `Total Amount: ₹${total}`,
        icon: 'info',
        confirmButtonText: 'OK'
      });

    }).catch((err) => {
      console.error('Error fetching total amount:', err);
    });
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-primary">Total Bill Amount</h3>
      <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
    </div>
  );
};

export default TotalAmount;
