/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  IconButton,
  Button,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import axios from "axios";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import BE_URL from "../../../config";
import { useNavigate } from "react-router-dom";

const BlueTextField = styled(TextField)({
  "& label.Mui-focused": { color: "#1976d2" },
  "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#1976d2" },
    "&:hover fieldset": { borderColor: "#1565c0" },
    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
  },
});

const PackageDataDetailsInsert = () => {
  const [formData, setFormData] = useState({
    package_name_id: "",
    data_title: "",
    single_image: null,
    night: 0,
    day: 0,
    data_description: "",
    inclusions: [""],
    highlight: "",
    multiple_images: [],
    from_city_id: "",
    to_city_id: "",
    attraction: [""],
    faqs: [{ question: "", answer: "" }],
  });

  const [packageNames, setPackageNames] = useState([]);
  const [packageAreas, setPackageAreas] = useState([]);
  const [packageStates, setPackageStates] = useState([]);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch package names
    axios
      .get(`${BE_URL}/packageName`)
      .then((res) => setPackageNames(res.data.data || []))
      .catch((err) => console.error("Failed to fetch package names", err));

    // Fetch package area names (for from/to city)
    axios
      .get(`${BE_URL}/packageAreaName`)
      .then((res) => setPackageAreas(res.data.data || []))
      .catch((err) => console.error("Failed to fetch area names", err));

    axios
      .get(`${BE_URL}/packageStateName`)
      .then((res) => setPackageStates(res.data.data || []))
      .catch((err) => console.error("Failed to fetch state names", err));
  }, []);

  // Handle input changes for normal text/select/number
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  // Handle file changes for single_image
  const handleSingleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, single_image: e.target.files[0] }));
      setErrors((prev) => ({ ...prev, single_image: false }));
    }
  };

  // Handle multiple images change
  const handleMultipleImagesChange = (e) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        multiple_images: Array.from(e.target.files),
      }));
    }
  };

  // Dynamic list handlers for inclusions, attraction, faqs
  const handleArrayChange = (index, value, field, subfield = null) => {
    if (field === "faqs") {
      const faqsCopy = [...formData.faqs];
      faqsCopy[index][subfield] = value;
      setFormData((prev) => ({ ...prev, faqs: faqsCopy }));
    } else {
      const arrayCopy = [...formData[field]];
      arrayCopy[index] = value;
      setFormData((prev) => ({ ...prev, [field]: arrayCopy }));
    }
  };

  const addArrayItem = (field) => {
    if (field === "faqs") {
      setFormData((prev) => ({
        ...prev,
        faqs: [...prev.faqs, { question: "", answer: "" }],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
    }
  };

  const removeArrayItem = (field, index) => {
    if (field === "faqs") {
      const faqsCopy = [...formData.faqs];
      if (faqsCopy.length > 1) {
        faqsCopy.splice(index, 1);
        setFormData((prev) => ({ ...prev, faqs: faqsCopy }));
      }
    } else {
      const arrayCopy = [...formData[field]];
      if (arrayCopy.length > 1) {
        arrayCopy.splice(index, 1);
        setFormData((prev) => ({ ...prev, [field]: arrayCopy }));
      }
    }
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.package_name_id) newErrors.package_name_id = true;
    if (!formData.data_title.trim()) newErrors.data_title = true;
    if (!formData.single_image) newErrors.single_image = true;
    if (formData.night < 0) newErrors.night = true;
    if (formData.day < 0) newErrors.day = true;
    if (!formData.from_city_id) newErrors.from_city_id = true;
    if (!formData.to_city_id) newErrors.to_city_id = true;

    // Optional: validate inclusions, attraction, faqs for empty strings

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const formPayload = new FormData();

      formPayload.append("package_name_id", formData.package_name_id);
      formPayload.append("state_id", formData.state_id || null);
      formPayload.append("data_title", formData.data_title);
      formPayload.append("single_image", formData.single_image);
      formPayload.append("night", formData.night);
      formPayload.append("day", formData.day);
      formPayload.append("data_description", formData.data_description);
      formPayload.append("highlight", formData.highlight);

      // JSON.stringify the arrays
      formPayload.append("inclusions", JSON.stringify(formData.inclusions));
      formPayload.append("attraction", JSON.stringify(formData.attraction));
      formPayload.append("faqs", JSON.stringify(formData.faqs));

      formPayload.append("from_city_id", formData.from_city_id);
      formPayload.append("to_city_id", formData.to_city_id);

      // Append multiple images
      formData.multiple_images.forEach((file, i) => {
        formPayload.append("multiple_images", file);
      });

      const res = await axios.post(
        `${BE_URL}/packageDataDetails`,
        formPayload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.status === "success") {
        setSuccess(true);
        setFormData({
          package_name_id: "",
          state_id: "",
          data_title: "",
          single_image: null,
          night: 0,
          day: 0,
          data_description: "",
          inclusions: [""],
          highlight: "",
          multiple_images: [],
          from_city_id: "",
          to_city_id: "",
          attraction: [""],
          faqs: [{ question: "", answer: "" }],
        });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Insert failed");
      }
    } catch (error) {
      console.error("Insert error:", error);
      alert("Error submitting data");
    }
  };

  const handleCancel = () => {
    navigate("/package-data-details");
  };
  return (
    <div className="p-6">
      <div className=" border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Package Data Details
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
          {/* Package Name */}
          <BlueTextField
            select
            fullWidth
            label="Select Package Name"
            name="package_name_id"
            value={formData.package_name_id}
            onChange={handleChange}
            error={errors.package_name_id}
            helperText={errors.package_name_id && "Please select a package"}
            margin="normal"
            required
          >
            {packageNames.map((pkg) => (
              <MenuItem key={pkg.id} value={pkg.id}>
                {pkg.package_name}
              </MenuItem>
            ))}
          </BlueTextField>

          <BlueTextField
            select
            fullWidth
            label="Select State"
            name="state_id"
            value={formData.state_id}
            onChange={handleChange}
            error={errors.state_id}
            helperText={errors.state_id && "Please select a state"}
            margin="normal"
            required
          >
            {packageStates.map((state) => (
              <MenuItem key={state.id} value={state.id}>
                {state.package_state_name}
              </MenuItem>
            ))}
          </BlueTextField>

          {/* Data Title */}
          <BlueTextField
            label="Data Title"
            name="data_title"
            fullWidth
            value={formData.data_title}
            onChange={handleChange}
            error={errors.data_title}
            helperText={errors.data_title && "Please enter data title"}
            margin="normal"
            required
          />

          {/* Single Image */}
          <Box mt={2} mb={2}>
            <label className="mb-2 text-blue-700 font-semibold">
              Single Image (one file only)
            </label>
            <input
              type="file"
              accept="image/*"
              className="border border-blue-500 cursor-pointer rounded-md p-2 w-full"
              onChange={handleSingleImageChange}
              required
            />
            {errors.single_image && (
              <Typography color="error" variant="body2">
                Please upload a single image
              </Typography>
            )}
          </Box>

          {/* Night & Day */}
          <Stack direction="row" spacing={2} mt={2}>
            <BlueTextField
              label="Night"
              name="night"
              type="number"
              inputProps={{ min: 0 }}
              value={formData.night}
              onChange={handleChange}
              error={errors.night}
              helperText={errors.night && "Invalid night value"}
              required
              fullWidth
            />
            <BlueTextField
              label="Day"
              name="day"
              type="number"
              inputProps={{ min: 0 }}
              value={formData.day}
              onChange={handleChange}
              error={errors.day}
              helperText={errors.day && "Invalid day value"}
              required
              fullWidth
            />
          </Stack>

          {/* Data Description */}
          <BlueTextField
            label="Data Description"
            name="data_description"
            multiline
            rows={4}
            fullWidth
            value={formData.data_description}
            onChange={handleChange}
            margin="normal"
          />

          {/* Inclusions */}
          <Box mt={3}>
            <Typography variant="subtitle1">Inclusions</Typography>
            {formData.inclusions.map((item, idx) => (
              <Stack
                key={idx}
                direction="row"
                alignItems="center"
                spacing={1}
                mb={1}
              >
                <BlueTextField
                  fullWidth
                  value={item}
                  onChange={(e) =>
                    handleArrayChange(idx, e.target.value, "inclusions")
                  }
                  required={idx === 0}
                  label={`Inclusion #${idx + 1}`}
                />
                <IconButton
                  color="primary"
                  onClick={() => removeArrayItem("inclusions", idx)}
                  disabled={formData.inclusions.length === 1}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
                {idx === formData.inclusions.length - 1 && (
                  <IconButton
                    color="primary"
                    onClick={() => addArrayItem("inclusions")}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                )}
              </Stack>
            ))}
          </Box>

          {/* Multiple Images */}
          <Box mt={3} mb={3}>
            <label className="block mb-2 text-blue-700 font-semibold">
              Multiple Images (you can select multiple)
            </label>
            <input
              type="file"
              accept="image/*"
              className="border border-blue-500 cursor-pointer rounded-md p-2 w-full"
              multiple
              onChange={handleMultipleImagesChange}
            />
          </Box>

          {/* Data highlight */}
          <BlueTextField
            label="highlight"
            name="highlight"
            multiline
            rows={4}
            fullWidth
            value={formData.highlight}
            onChange={handleChange}
            margin="normal"
          />

          {/* From City & To City Select */}
          <Stack direction="row" spacing={2}>
            <BlueTextField
              select
              fullWidth
              label="From City"
              name="from_city_id"
              value={formData.from_city_id}
              onChange={handleChange}
              error={errors.from_city_id}
              helperText={errors.from_city_id && "Please select a from city"}
              required
            >
              {packageAreas.map((area) => (
                <MenuItem key={area.id} value={area.id}>
                  {area.package_area_name}
                </MenuItem>
              ))}
            </BlueTextField>

            <BlueTextField
              select
              fullWidth
              label="To City"
              name="to_city_id"
              value={formData.to_city_id}
              onChange={handleChange}
              error={errors.to_city_id}
              helperText={errors.to_city_id && "Please select a to city"}
              required
            >
              {packageAreas.map((area) => (
                <MenuItem key={area.id} value={area.id}>
                  {area.package_area_name}
                </MenuItem>
              ))}
            </BlueTextField>
          </Stack>

          {/* Attraction */}
          <Box mt={3}>
            <Typography variant="subtitle1">Attraction</Typography>
            {formData.attraction.map((item, idx) => (
              <Stack
                key={idx}
                direction="row"
                alignItems="center"
                spacing={1}
                mb={1}
              >
                <BlueTextField
                  fullWidth
                  value={item}
                  onChange={(e) =>
                    handleArrayChange(idx, e.target.value, "attraction")
                  }
                  required={idx === 0}
                  label={`Attraction #${idx + 1}`}
                />
                <IconButton
                  color="primary"
                  onClick={() => removeArrayItem("attraction", idx)}
                  disabled={formData.attraction.length === 1}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
                {idx === formData.attraction.length - 1 && (
                  <IconButton
                    color="primary"
                    onClick={() => addArrayItem("attraction")}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                )}
              </Stack>
            ))}
          </Box>

          {/* FAQs */}
          <Box mt={3}>
            <Typography variant="subtitle1">FAQs</Typography>
            {formData.faqs.map((faq, idx) => (
              <Box
                key={idx}
                mb={2}
                border={1}
                borderRadius={1}
                p={2}
                borderColor="grey.300"
              >
                <BlueTextField
                  fullWidth
                  label={`Question #${idx + 1}`}
                  value={faq.question}
                  onChange={(e) =>
                    handleArrayChange(idx, e.target.value, "faqs", "question")
                  }
                  required={idx === 0}
                  margin="normal"
                />
                <BlueTextField
                  fullWidth
                  label={`Answer #${idx + 1}`}
                  value={faq.answer}
                  onChange={(e) =>
                    handleArrayChange(idx, e.target.value, "faqs", "answer")
                  }
                  required={idx === 0}
                  margin="normal"
                />
                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                  <IconButton
                    color="primary"
                    onClick={() => removeArrayItem("faqs", idx)}
                    disabled={formData.faqs.length === 1}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  {idx === formData.faqs.length - 1 && (
                    <IconButton
                      color="primary"
                      onClick={() => addArrayItem("faqs")}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  )}
                </Stack>
              </Box>
            ))}
          </Box>

          {/* Submit / Cancel */}
          <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
            <Submit type="submit" />
            <Cancel onClick={handleCancel} />
          </Box>
        </form>

        {success && <SubmitData />}
      </div>
    </div>
  );
};

export default PackageDataDetailsInsert;
