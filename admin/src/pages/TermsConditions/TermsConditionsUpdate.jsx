import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cancel from "../../components/Buttons/Cancel";
import { FaTrashAlt } from "react-icons/fa";
import Update from "../../components/Buttons/Update";
import UpdateData from "../../components/Popup/UpdateData";
import BE_URL from "../../config";

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

const TermsConditionsUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rowData = location.state?.rowData;

  const [termsConditions, setTermsConditions] = useState([
    {
      terms_conditions_title: "",
      terms_conditions_rules: [""],
    },
  ]);

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (rowData) {
      setTermsConditions([
        {
          terms_conditions_title: rowData.terms_conditions_title || "",
          terms_conditions_rules: rowData.terms_conditions_rules || [""],
        },
      ]);
    } else {
      alert("⚠️ No data found. Please go back and select an item to edit.");
      navigate("/terms-conditions");
    }
  }, [rowData, navigate]);

  const handleTitleChange = (index, value) => {
    const updatedTerms = [...termsConditions];
    updatedTerms[index].terms_conditions_title = value;
    setTermsConditions(updatedTerms);
  };

  const handleRulesChange = (index, ruleIndex, value) => {
    const updatedTerms = [...termsConditions];
    updatedTerms[index].terms_conditions_rules[ruleIndex] = value;
    setTermsConditions(updatedTerms);
  };

  const handleAddTitle = () => {
    setTermsConditions([
      ...termsConditions,
      { terms_conditions_title: "", terms_conditions_rules: [""] },
    ]);
  };

  const handleAddRule = (index) => {
    const updatedTerms = [...termsConditions];
    updatedTerms[index].terms_conditions_rules.push("");
    setTermsConditions(updatedTerms);
  };

  const handleRemoveRule = (index, ruleIndex) => {
    const updatedTerms = [...termsConditions];
    updatedTerms[index].terms_conditions_rules.splice(ruleIndex, 1);
    setTermsConditions(updatedTerms);
  };

  const handleRemoveTitle = (index) => {
    const updatedTerms = [...termsConditions];
    updatedTerms.splice(index, 1);
    setTermsConditions(updatedTerms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${BE_URL}/termsConditions/update/${rowData.id}`,
        {
          terms_conditions_title: termsConditions[0].terms_conditions_title,
          terms_conditions_rules: termsConditions[0].terms_conditions_rules,
        }
      );

      if (response.status === 200) {
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/terms-conditions");
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating terms & conditions:", error);
    }
  };

  const handleCancel = () => {
    navigate("/terms-conditions");
  };

  return (
    <div className="p-6">
      {showSuccess && <UpdateData onClose={() => setShowSuccess(false)} />}

      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Terms & Conditions
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {termsConditions.map((term, index) => (
            <div
              key={index}
              className="space-y-6 border p-4 rounded-lg"
              style={{ borderColor: "#1976d2" }}
            >
              <div className="flex justify-between items-center">
                <BlueTextField
                  label="Terms Title"
                  name={`terms_conditions_title_${index}`}
                  value={term.terms_conditions_title}
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                  fullWidth
                />
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
                  <div key={ruleIndex} className="flex items-center mb-2">
                    <BlueTextField
                      label={`Rule ${ruleIndex + 1}`}
                      name={`terms_conditions_rule_${ruleIndex}`}
                      value={rule}
                      onChange={(e) =>
                        handleRulesChange(index, ruleIndex, e.target.value)
                      }
                      fullWidth
                    />
                    {ruleIndex > 0 && (
                      <button
                        type="button"
                        className="ml-2 cursor-pointer text-red-500"
                        onClick={() => handleRemoveRule(index, ruleIndex)}
                      >
                        <FaTrashAlt />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="text-blue-600 cursor-pointer hover:text-blue-800"
                  onClick={() => handleAddRule(index)}
                >
                  + Add Rule
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="text-blue-600 cursor-pointer hover:text-blue-800"
            onClick={handleAddTitle}
          >
            + Add New Title
          </button>

          <div className="flex justify-end gap-4 mt-6">
            <Update type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TermsConditionsUpdate;
