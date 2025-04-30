import { useEffect, useState } from "react";
import { baseURL } from "../../api";
import axios from "axios";

const useHook =() =>{
    const [supervisors, setSupervisors] = useState([]);
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      supervisor: "",
    });
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
  
    useEffect(() => {
      axios
        .get(`${baseURL}/supervisors`)
        .then((res) => setSupervisors(res.data))
        .catch(() => setMessage("Failed to load supervisors."));
    }, []);
  
    const handleChange = (e) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const validate = () => {
      const newErrors = {};
      if (!formData.firstName.match(/^[A-Za-z]+$/))
        newErrors.firstName = "Valid first name required";
      if (!formData.lastName.match(/^[A-Za-z]+$/))
        newErrors.lastName = "Valid last name required";
      if (!formData.supervisor) newErrors.supervisor = "Supervisor is required";
      return newErrors;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage("");
      const newErrors = validate();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
  
      try {
        const res = await axios.post(`${baseURL}/submit`, formData);
        setMessage(res.data.message);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          supervisor: "",
        });
        setErrors({});
      } catch (err) {
        const msg = err.response?.data?.errors?.[0]?.msg || "Submission failed.";
        setMessage(msg);
      }
    };
    return [
        formData,
        message,
        errors,
        supervisors,
        handleChange,
        handleSubmit,
    ]
}
export default useHook;