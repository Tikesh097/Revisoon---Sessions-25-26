import { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import AccountDetails from "./AccountDetails";
import Preferences from "./Preferences";

export default function FormContainer() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    newsletter: false
  });

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  return (
    <div style={{ width: 400 }}>
      {/* Progress Indicator */}
      <p>Step {step} of 3</p>

      {step === 1 && (
        <PersonalInfo
          data={formData}
          setData={setFormData}
          next={next}
        />
      )}

      {step === 2 && (
        <AccountDetails
          data={formData}
          setData={setFormData}
          next={next}
          back={back}
        />
      )}

      {step === 3 && (
        <Preferences
          data={formData}
          setData={setFormData}
          back={back}
        />
      )}
    </div>
  );
}
