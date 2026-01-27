import { useState } from "react";

export default function App() {
  const STEPS = ["shipping", "billing", "payment", "review"];

  const validators = {
    shipping: (data) => data.address.length > 5,
    billing: (data) => data.billingName.length > 2,
    payment: (data) => /^\d{16}$/.test(data.cardNumber),
    review: () => true
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    address: "",
    billingName: "",
    cardNumber: ""
  });

  const stepKey = STEPS[currentStep];
  const isValid = validators[stepKey](formData);

  const next = () => {
    if (!isValid) {
      setError("Please complete this step correctly");
      return;
    }

    setError("");
    setCompletedSteps((prev) => {
      const copy = new Set(prev);
      copy.add(currentStep);
      return copy;
    });

    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goToStep = (index) => {
    if (completedSteps.has(index)) {
      setError("");
      setCurrentStep(index);
    }
  };

  const renderStep = () => {
    switch (stepKey) {
      case "shipping":
        return (
          <input
            placeholder="Shipping Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        );

      case "billing":
        return (
          <input
            placeholder="Billing Name"
            value={formData.billingName}
            onChange={(e) =>
              setFormData({ ...formData, billingName: e.target.value })
            }
          />
        );

      case "payment":
        return (
          <input
            placeholder="16-digit Card Number"
            value={formData.cardNumber}
            onChange={(e) =>
              setFormData({ ...formData, cardNumber: e.target.value })
            }
          />
        );

      case "review":
        return <pre>{JSON.stringify(formData, null, 2)}</pre>;

      default:
        return null;
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "30px auto" }}>
      <h2>Checkout Wizard</h2>


      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {STEPS.map((step, i) => (
          <button
            key={step}
            disabled={!completedSteps.has(i) && i !== currentStep}
            onClick={() => goToStep(i)}
            style={{
              fontWeight: i === currentStep ? "bold" : "normal"
            }}
          >
            {step}
          </button>
        ))}
      </div>


      <div style={{ marginBottom: 10 }}>{renderStep()}</div>


      {error && <p style={{ color: "red" }}>{error}</p>}


      <button
        onClick={next}
        disabled={!isValid || currentStep === STEPS.length - 1}
      >
        Next
      </button>

      <p style={{ marginTop: 10 }}>
        Step {currentStep + 1} / {STEPS.length}
      </p>
    </div>
  );
}
