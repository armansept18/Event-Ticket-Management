import React, { useState } from "react";

export const ReferralForm = ({ onReferralSubmit }) => {
  const [referralCode, setReferralCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onReferralSubmit(referralCode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Masukkan Kode Referral"
        value={referralCode}
        onChange={(e) => setReferralCode(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReferralForm;
