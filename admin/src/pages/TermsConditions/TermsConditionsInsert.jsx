import React, { useState } from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Submit from "../../components/Buttons/Submit";
import Cancel from "../../components/Buttons/Cancel";
import { FaTrashAlt } from "react-icons/fa";
import SubmitData from "../../components/Popup/SubmitData";
import BE_URL from "../../config";
import axios from "axios";

const BlueTextField = styled(TextField)(() => ({
  "& label.Mui-focused": {
    color: "#1976d2",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#1976d2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#1976d2",
    },
    "&:hover fieldset": {
      borderColor: "#1565c0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
    },
  },
}));

const TermsConditionsInsert = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const [termsConditions, setTermsConditions] = useState([
    {
      terms_conditions_title: "",
      terms_conditions_rules: [""],
      errors: {
        title: "",
        rules: [""],
      },
    },
  ]);

  const handleTitleChange = (index, value) => {
    const updated = [...termsConditions];
    updated[index].terms_conditions_title = value;
    updated[index].errors.title = value.trim()
      ? ""
      : "Please fill out this field.";
    setTermsConditions(updated);
  };

  const handleRulesChange = (index, ruleIndex, value) => {
    const updated = [...termsConditions];
    updated[index].terms_conditions_rules[ruleIndex] = value;
    updated[index].errors.rules[ruleIndex] = value.trim()
      ? ""
      : "Please fill out this field.";
    setTermsConditions(updated);
  };

  const handleAddTitle = () => {
    setTermsConditions([
      ...termsConditions,
      {
        terms_conditions_title: "",
        terms_conditions_rules: [""],
        errors: {
          title: "",
          rules: [""],
        },
      },
    ]);
  };

  const handleAddRule = (index) => {
    const updated = [...termsConditions];
    updated[index].terms_conditions_rules.push("");
    updated[index].errors.rules.push("");
    setTermsConditions(updated);
  };

  const handleRemoveRule = (index, ruleIndex) => {
    const updated = [...termsConditions];
    updated[index].terms_conditions_rules.splice(ruleIndex, 1);
    updated[index].errors.rules.splice(ruleIndex, 1);
    setTermsConditions(updated);
  };

  const handleRemoveTitle = (index) => {
    const updated = [...termsConditions];
    updated.splice(index, 1);
    setTermsConditions(updated);
  };

  const validate = () => {
    let isValid = true;
    const updated = [...termsConditions];

    updated.forEach((term, i) => {
      if (!term.terms_conditions_title.trim()) {
        updated[i].errors.title = "Please fill out this field.";
        isValid = false;
      } else {
        updated[i].errors.title = "";
      }

      term.terms_conditions_rules.forEach((rule, j) => {
        if (!rule.trim()) {
          updated[i].errors.rules[j] = "Please fill out this field.";
          isValid = false;
        } else {
          updated[i].errors.rules[j] = "";
        }
      });
    });

    setTermsConditions(updated);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      for (const term of termsConditions) {
        const response = await axios.post(`${BE_URL}/termsConditions/insert`, {
          terms_conditions_title: term.terms_conditions_title,
          terms_conditions_rules: term.terms_conditions_rules,
        });

        if (response.status !== 201) {
          throw new Error("❌ Failed to add one of the terms.");
        }
      }

      console.log("✅ All terms submitted successfully:", termsConditions);
      setShowPopup(true); // ✅ show success popup

      // Reset form
      setTermsConditions([
        {
          terms_conditions_title: "",
          terms_conditions_rules: [""],
          errors: {
            title: "",
            rules: [""],
          },
        },
      ]);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("❌ Failed to add terms & conditions.");
    }
  };

  const handleCancel = () => {
    navigate("/terms-conditions");
  };

  return (
    <div className="p-6">
      {showPopup && <SubmitData onClose={() => setShowPopup(false)} />}

      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Terms & Conditions
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {termsConditions.map((term, index) => (
            <div
              key={index}
              className="space-y-6 border p-4 rounded-lg"
              style={{ borderColor: "#1976d2" }}
            >
              <div className="flex justify-between items-center">
                <div className="w-full">
                  <BlueTextField
                    label="Terms Title"
                    value={term.terms_conditions_title}
                    onChange={(e) => handleTitleChange(index, e.target.value)}
                    fullWidth
                    error={Boolean(term.errors.title)}
                    helperText={term.errors.title}
                  />
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    className="ml-2 cursor-pointer text-red-500"
                    onClick={() => handleRemoveTitle(index)}
                  >
                    <FaTrashAlt />
                  </button>
                )}
              </div>

              <div>
                <label className="block mb-2 text-blue-700 font-semibold">
                  Rules
                </label>
                {term.terms_conditions_rules.map((rule, ruleIndex) => (
                  <div key={ruleIndex} className="flex items-start mb-2 gap-2">
                    <div className="w-full">
                      <BlueTextField
                        label={`Rule ${ruleIndex + 1}`}
                        value={rule}
                        onChange={(e) =>
                          handleRulesChange(index, ruleIndex, e.target.value)
                        }
                        fullWidth
                        error={Boolean(term.errors.rules[ruleIndex])}
                        helperText={term.errors.rules[ruleIndex]}
                      />
                    </div>
                    {ruleIndex > 0 && (
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => handleRemoveRule(index, ruleIndex)}
                      >
                        <FaTrashAlt />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleAddRule(index)}
                >
                  + Add Rule
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="text-blue-600 hover:text-blue-800"
            onClick={handleAddTitle}
          >
            + Add New Title
          </button>

          <div className="flex justify-end gap-4 mt-6">
            <Submit type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TermsConditionsInsert;
